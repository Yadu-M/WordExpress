const languageOptionsDom = document.getElementById("language");


if (languageOptionsDom.children.length === 1) {
    loadlanguageOptions(languages);
}

/**
 * 
 * @param {Promise} func  
 */
async function loadlanguageOptions(func) {
    let languageList = {};

    //  fetching the languages
    await func()
    .then(response => languageList = response);  

    const languageKey = Object.keys(languageList);

    // injecting each option for the language dropdown
    languageKey.forEach((key) => {
        const option = document.createElement("option");
        option.text = key;
        option.value = languageList.key;

        languageOptionsDom.appendChild(option);
    });    
}

// const languageOptions = {};
// const languageOptionsForms = document.getElementById('language');


/**
 * 
 * @returns All the supported languages
 */
async function languages() {
    try {
        const response = await chrome.runtime.sendMessage({ action: "retrieveLanguages" });        
        return response;
    }
    catch(error) {
        console.error(error);
    }
}


