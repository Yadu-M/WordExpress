const apiKey = 'sk-...SYFJ'
const url = 'https://api.openai.com/v1/engines/davinci-codex/completions'
const prePrompt = `You are to assume the role of a dictionary bot, 
        you will be provided with a word or a sentence. 
        You are to then explain the given term/sentence in a concise form'
`
function generateReply(prompt) {

    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`    
    }

    const requestBody = {
        prompt: "Hello,",
        max_tokens: 5,
        n: 1,
        stop: "\n",
        temperature: 0.5,
    };
    
    // const reply =  await fetch(url, {
    //     method: 'POST',
    //     headers,
    //     body: 
    // })

}
 

// console.log('test')