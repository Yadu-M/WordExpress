/**
 * 
 * @param {String} text Cleans up text
 * @returns {String}
 */
function cleanUpText(text) {
  // Remove new lines
  text = text.replace(/\n/g, '');

  // Remove nonsensical characters
  text = text.replace(/[^\w\s.,!?]/g, '');

  return text;    
}

chrome.runtime.onInstalled.addListener(({reason, previousVersion}) => {
  if (reason === 'install') {
    chrome.tabs.create({
      url: "html/onboarding.html",    
    });
  }
});

async function test(text){
  importScripts("module.js");

  const response = cleanUpText(text);

  return response;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // Handle the message received from the content script
  console.log(message);

  // Clean up the text
  console.log(typeof(message));
  // text = cleanUpText(message);
  // console.log(text);

  // Send a response back to the content script
  sendResponse(true);

  // Explicitly return true to indicate that sendResponse will be called asynchronously
  return true;
});



