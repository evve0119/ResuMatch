const fs = require('fs');
const path = require('path');
const openai = require('./openaiClient');
const puppeteer = require('puppeteer');

/**
 * Generates a PDF resume using:
 * 1) A predefined HTML template (ResumeTemplate.html)
 * 2) An inline CSS file (style_cloyola.css)
 * 3) The user’s JSON data (resumeObj)
 * 4) OpenAI for final formatting/filling placeholders
 */
async function generateResumePDF(resumeObj) {
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
    // Remove any lingering code fences (just in case)
    const cleanedHTML = generatedHTML
      .replace(/```html\s*/gi, '')
      .replace(/```/g, '')
      .trim();

    fs.writeFileSync('debug_generatedResume.html', cleanedHTML, 'utf8');
    console.log('** [Step 4] Cleaned HTML saved to debug_generatedResume.html');

    // ---------------- Step 5: Convert to PDF ----------------
    console.log('** [Step 5] Launching Puppeteer to generate PDF...');
    const browser = await puppeteer.launch({ headless: 'new', timeout: 60000 });
    const page = await browser.newPage();

    // We already have the final HTML (template + data + CSS) from OpenAI.
    await page.setContent(cleanedHTML, { waitUntil: 'networkidle0' });

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const pdfPath = `output_resume_${timestamp}.pdf`;

    await page.pdf({
      path: pdfPath,
      format: 'A4',
      printBackground: true,      // Usually better to keep background if we have styled sections
      preferCSSPageSize: true,
      scale: 0.96
    });

    await browser.close();
    console.log('** [Step 6] PDF generated at:', pdfPath);

    return { pdfPath };
  } catch (error) {
    console.error('❌ Error generating PDF:', error);
    throw error;
  }
}

module.exports = {
  generateResumePDF,
};
