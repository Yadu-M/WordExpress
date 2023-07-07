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

  text = text.slice(4);

  return text;    
}

chrome.runtime.onInstalled.addListener(({reason, previousVersion}) => {
  if (reason === 'install') {
    chrome.tabs.create({
      url: "html/onboarding.html",    
    });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // Handle the message received from the content script
  var text = '';
  try {
    text = JSON.stringify(message);
    text = cleanUpText(text);
  } catch (error) {
    console.log(error);
    sendResponse(false);
  }
  console.log(text);
  sendResponse(true);  
  
  // Explicitly return true to indicate that sendResponse will be called asynchronously
  return true;
});



