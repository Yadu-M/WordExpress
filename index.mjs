import express from "express";
import 'dotenv/config';

const app = express();

app.get('/', async (req, resp) => {
    const apiKey = process.env.TRANSLATION_API_KEY;
    console.log(apiKey);
    let data = {};
    
    try {
      data = await translatedText(apiKey);
    } catch (error) {
      console.log(error);
    }

    resp.send('test');
})

/**
 * 
 * @param {String} key The Api Key
 * @returns Translated Text
 */
async function translatedText(key) {

}

export { app as wordExpressBackend };