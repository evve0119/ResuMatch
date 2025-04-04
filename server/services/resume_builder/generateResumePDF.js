const fs = require('fs');
const path = require('path');
const openai = require('../openaiClient');

// Dual Puppeteer Setup
const isRunningOnAzure = process.env.AZURE_FUNCTIONS_ENVIRONMENT === 'Production';

let puppeteer, chromium;

if (isRunningOnAzure) {
  puppeteer = require('puppeteer-core');
  chromium = require('chrome-aws-lambda');
} else {
  puppeteer = require('puppeteer');
}

async function generateResumePDF(resumeObj) {
  console.log('** [Step 0] Starting PDF generation...');
  console.log('[ENV] AZURE_FUNCTIONS_ENVIRONMENT =', process.env.AZURE_FUNCTIONS_ENVIRONMENT);

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
    You are an expert resume formatter...
    -- omitted for brevity --
    ${resumeTemplateString}
    ---
    ${cssContent}
    ---
    ${JSON.stringify(resumeObj, null, 2)}
    `.trim();

    // Step 3: Call OpenAI
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

    // Clean HTML
    const cleanedHTML = generatedHTML
      .replace(/```html\s*/gi, '')
      .replace(/```/g, '')
      .trim();

    console.log('** [Step 4] Cleaned HTML ready for Puppeteer.');

    // Step 5: Launch Puppeteer
    console.log('** [Step 5] Launching Puppeteer...');
    const launchOptions = isRunningOnAzure
      ? {
          args: chromium.args,
          executablePath: await chromium.executablePath, // ✅ No fallback
          headless: chromium.headless,
        }
      : {
          headless: 'new',
        };

    const browser = await puppeteer.launch(launchOptions);
    const page = await browser.newPage();
    await page.setContent(cleanedHTML, { waitUntil: 'networkidle0' });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
      scale: 0.96,
    });

    await browser.close();
    console.log('** [Step 6] PDF generated successfully.');
    return Buffer.from(pdfBuffer);

  } catch (error) {
    console.error('❌ Error generating PDF:', error);
    throw error;
  }
}

module.exports = {
  generateResumePDF,
};
