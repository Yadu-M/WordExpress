let availableLanguages = {};
let userLang = '';

chrome.runtime.onInstalled.addListener(({reason, previousVersion}) => {
  /**
   * Onboarding
   */
  if (reason === 'install') {
    chrome.tabs.create({
      url: "html-css/onboarding.html",    
    });
  };   

  /**
   * Creating context menu
   */
  chrome.contextMenus.create ({
      contexts: ['selection'],
      title: 'play translated text',
      id: 'selection'    
  });

  /**
 * Grabbing all the available tts languages
 */

   
  chrome.tts.getVoices()
    .then(response => {
      response.forEach(element => {
        
        availableLanguages[element.lang] = element.voiceName;
      });
    })
    .catch(error => console.log(error)); 


    /**
     * Sending appropriate resources
     */
    chrome.runtime.onMessage.addListener(
      (message, sender, sendResponse) => {
        if (message.action === 'retrieveLanguages') {
          sendResponse(availableLanguages);
        }
        else sendResponse('made no sense');
    })


   



});

/**
 * @property {String} text - Required text to be translated by GPT
 * @return {String} 
 */



// const API = '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'
// const url = 'https://api.openai.com/v1/completions'

// /**
//  * @property {String} text - Required text to be translated by GPT
//  * @return {String} 
//  */
// async function translatedText(text) {
  
//   let ans = ''
//   await fetch(url, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': "Bearer " + API,
//     },
//     body: JSON.stringify({
//       'model': 'text-davinci-003',
//       'prompt': `You are a translation bot, help me translate
//                 the following text into french:
//                 Start of the text: 
//                 ${text}
//                 End of the text:`,
//       'max_tokens': 15,
//       'temperature': 0
//     })
//   })
//   .then(response => response.json())
//   .then(data => {
//     ans = data.choices[0].text;
//   })
//   .catch(error => console.log(error))  

//   return ans;

// }

chrome.storage.onChanged.addListener(
  (changes, areaName) => {
    console.log(changes.selectedLang.newValue);
    userLang = changes.selectedLang.newValue;
  }
)


chrome.contextMenus.onClicked.addListener (
  info => {

    let TtsOptions = {
      'enqueue': true,
      'lang': userLang,
      'pitch': 0.5,
      'voiceName': availableLanguages[userLang],
      'volume': 1
    }

    chrome.tts.speak(`${info.selectionText}`, TtsOptions);

      
});;



