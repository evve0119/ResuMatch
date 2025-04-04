const fs = require('fs');
const path = require('path');
const openai = require('../openaiClient');
const puppeteer = require('puppeteer');

/**
 * Generates a PDF resume using:
 * 1) A predefined HTML template (ResumeTemplate.html)
 * 2) An inline CSS file (style_cloyola.css)
 * 3) The user’s JSON data (resumeObj)
 * 4) OpenAI for final formatting/filling placeholders
 */
async function generateResumePDF(resumeObj) {

  console.log('** [Step 0] Starting PDF generation...');

  try {
    // ---------------- Step 1: Read Template & CSS ----------------
    console.log('** [Step 1] Reading template and CSS from disk...');
    const templatePath = path.join(__dirname, 'resumeTemplate.html');
    const resumeTemplateString = fs.readFileSync(templatePath, 'utf8');

    const cssPath = path.join(__dirname, 'css', 'style_cloyola.css');
    const cssContent = fs.readFileSync(cssPath, 'utf8');

    // ---------------- Step 2: Build Prompt ----------------
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

    Here is the resume template (placeholders, minimal styles, etc.):
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

    // ---------------- Step 3: Call OpenAI ----------------
    console.log('** [Step 3] Calling OpenAI with the template & data...');
    const completion = await openai.createChatCompletion({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'You fill placeholders in an HTML template using JSON data. Output raw HTML only.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.0
    });

    let generatedHTML = completion.data.choices[0].message.content.trim();
    console.log('** [Step 3] Received HTML from OpenAI. Length:', generatedHTML.length);

    // ---------------- Step 4: Clean Up GPT Output ----------------
    const cleanedHTML = generatedHTML
      .replace(/```html\s*/gi, '')
      .replace(/```/g, '')
      .trim();

    console.log('** [Step 4] Cleaned HTML ready for Puppeteer.');

    // ---------------- Step 5: Convert to PDF ----------------
    console.log('** [Step 5] Launching Puppeteer to generate PDF...');


    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    await page.setContent(cleanedHTML, { waitUntil: 'networkidle0' });


    const pdfUint8Array = await page.pdf({
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
      scale: 0.96,
    });

    await browser.close();

    // 🚨 Important Fix:
    const pdfBuffer = Buffer.from(pdfUint8Array);

    // Double-check (for debugging)
    // console.log('pdfBuffer is Buffer:', Buffer.isBuffer(pdfBuffer));
    // console.log('pdfBuffer length:', pdfBuffer.length);

    console.log('** [Step 6] PDF buffer generated successfully.');

    return pdfBuffer;

  } catch (error) {
    console.error('❌ Error generating PDF:', error);
    throw error;
  }
}

module.exports = {
  generateResumePDF,
};
