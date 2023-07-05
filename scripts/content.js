let selectedText = '';

document.addEventListener('mouseup', () => {
    const selection = window.getSelection().toString();
    if (selection) {
        
        selectedText = selection;       
        chrome.runtime.sendMessage({ text: selectedText })
            .then(success => {
                if (success) {
                    console.log('success')
                }
                else
                    console.log('failure')
            })
        
        // chrome.runtime.sendMessage({
        //     message: selectedText
        // }, (response) => {
        //     if (response)
        //         console.log('success')
        // })
    }
});


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log(request)
});
  