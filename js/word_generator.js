const pickRandom = arr => arr[Math.floor(Math.random() * arr.length)];
const randInt = (a,b) => Math.floor(Math.random()*(b-a+1))+a;

function generateRandomWord(letters, vowels, minLen, maxLen) {
    const wordLength = randInt(minLen, maxLen);
    let word = '';
    
    for (let i = 0; i < wordLength; i++) {
        word += pickRandom(letters) + pickRandom(vowels)
    }
    
    return word;
}

export function generateRandomWords(letters, vowels, opts) {
    const words = [];
    for (let i = 0; i < opts["n_words"]; i++) {
        words.push(generateRandomWord(letters, vowels, opts["minLen"], opts["maxLen"]));
    }
    return words;
}