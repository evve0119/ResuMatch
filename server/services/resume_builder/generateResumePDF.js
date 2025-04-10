const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const openai = require('../openaiClient');

// Set up global btoa in Node.js
global.btoa = (str) => Buffer.from(str).toString('base64');

const PDFSHIFT_API_KEY = process.env.PDFSHIFT_API_KEY;

async function generateResumePDF(resumeObj) {
  console.log('** [Step 0] Starting PDF generation...');

  try {
    // Step 1: Read template & CSS
    console.log('** [Step 1] Reading template and CSS from disk...');
    const templatePath = path.join(__dirname, 'resumeTemplate.html');
    const resumeTemplateString = fs.readFileSync(templatePath, 'utf8');

    const cssPath = path.join(__dirname, 'css', 'style_cloyola.css');
    const cssContent = fs.readFileSync(cssPath, 'utf8');

    // Step 2: Build prompt
    console.log('** [Step 2] Preparing prompt for OpenAI...');
    const prompt = `
    You are an expert resume formatter.

    We have an HTML template that includes placeholders (like {{personalInfo.name}}, {{#each education_details}}, etc.).
    Using the structured JSON data below, fill in the placeholders accordingly.

    - If a value is missing, remove its placeholder (do not leave empty braces).
    - For multi-item fields (like experience_details.key_responsibilities), convert each item into its own bullet (<ul><li>...</li></ul>).
    - Maintain the original HTML structure from the template.
    - Merge the CSS below into a <style> block in the <head>.
    - Center the top header name and contact info if required.
    - DO NOT add <hr> lines anywhere; keep section headings as <h2> with a bottom border in CSS if needed.
    - DO NOT wrap any output in triple backticks or code fences.
    - If the text in a bullet is too long, you may insert <br> to avoid overly long lines.
    - Ensure city/state + date ranges remain right-aligned in the same row.
    - You MUST return valid HTML that’s ready for PDF conversion.

    Here is the resume template:
    ---
    ${resumeTemplateString}
    ---

    Here is the CSS content:
    ---
    ${cssContent}
    ---

    Here is the JSON data to fill into the template:
    ${JSON.stringify(resumeObj, null, 2)}
    `.trim();

    // Step 3: Call OpenAI to get filled HTML
    console.log('** [Step 3] Calling OpenAI with the template & data...');
    const completion = await openai.createChatCompletion({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'You fill placeholders in HTML with JSON data. Output raw HTML only.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.0
    });

    let generatedHTML = completion.data.choices[0].message.content.trim();
    console.log('** [Step 3] Received HTML from OpenAI. Length:', generatedHTML.length);

    // Step 4: Clean HTML
    const cleanedHTML = generatedHTML
      .replace(/```html\s*/gi, '')
      .replace(/```/g, '')
      .trim();
    console.log('** [Step 4] Cleaned HTML ready for PDFShift...');

    // Step 5: Send to PDFShift using node-fetch
    console.log('** [Step 5] Sending request to PDFShift...');
    const auth = 'Basic ' + btoa('api:' + PDFSHIFT_API_KEY);

    const response = await fetch('https://api.pdfshift.io/v3/convert/pdf', {
      method: 'POST',
      headers: {
        Authorization: auth,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        source: cleanedHTML,
        landscape: false,
        use_print: true,
        sandbox: false, // Remove or set to false in production
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`PDFShift Error: ${response.status} ${response.statusText} - ${errText}`);
    }

    const pdfBuffer = await response.buffer();
    console.log('** [Step 6] PDF generated successfully. Buffer length:', pdfBuffer.length);

    return Buffer.from(pdfBuffer); // 🔁 Keep return type the same

  } catch (error) {
    console.error('❌ Error generating PDF:', error.message);
    throw error;
  }
}

module.exports = {
  generateResumePDF,
};
