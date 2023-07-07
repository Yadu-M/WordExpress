/**
 * 
 * @param {String} text 
 */
async function cleanUpText(text) {
    // Remove new lines
    text = text.replace(/\n/g, '');

    // Remove nonsensical characters
    text = text.replace(/[^\w\s.,!?]/g, '');

    return text;    
}

export default cleanUpText;