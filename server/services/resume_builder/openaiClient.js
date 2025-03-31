require('dotenv').config(); // so it reads OPENAI_API_KEY from .env if you use that approach
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY // or just process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

module.exports = openai;
