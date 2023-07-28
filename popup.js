const languageOptionsDom = document.getElementById("language");

var options = {};
let languageList = {};

document.addEventListener('DOMContentLoaded', function() {
    loadlanguageOptions(languages);

    const element = document.getElementById("lang-default");

    chrome.storage.local.get(["selectedLang"]).then((result) => {

        if (result.selectedLang === null) {  
            element.label = 'Select A Language';
        }
        else {
            element.label = result.selectedLang
        }

    });

    

    const temp = document.getElementById('language');
    temp.addEventListener('change', event => {
        options["lang"] = event.target.value;
        saveSettings(options);
    });
});

/**
 * 
 * @param {Promise} func  
 */
async function loadlanguageOptions(func) {
    

    //  fetching the languages
    await func()
    .then(response => languageList = response)
    .catch(error => console.log(error));  

    const languageKey = Object.keys(languageList);

    console.log(languageList)

    chrome.storage.local.get(["selectedLang"]).then((result) => {
    

        // injecting each option for the language dropdown
        languageKey.forEach((key) => {
            const option = document.createElement("option");
            
            option.text = key;
            option.value = key;
            

        key !== result.selectedLang?
            languageOptionsDom.appendChild(option):null;
            
        });    
    })
}

// const languageOptions = {};
// const languageOptionsForms = document.getElementById('language');

function saveSettings(options) {
    //var storage = chrome.storage.local;

    // storage.set(langValue, function() {
    //     console.log("saved");
    // });

    chrome.storage.local.set({ selectedLang: options["lang"] }).then(() => {
        console.log(`Value is set ${options["lang"]}`);
    });
}




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