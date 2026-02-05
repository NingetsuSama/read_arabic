import {WORDS} from "./data.js"

const pickRandom = arr => arr[Math.floor(Math.random() * arr.length)];
const randInt = (a,b) => Math.floor(Math.random()*(b-a+1))+a;
function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
} 

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

export function findWords(letters, vowels, opts) {
    // Create a set of letters and vowels to match
    const matchSet = new Set([...letters, ...vowels]);

    // Randomize the word list
    shuffle(WORDS);

    // Currently found words
    let n_found = 0, found_words = [];

    for (const word of WORDS) {

            // Check the difference between the letter set of the word and the match set
            const wordSet = new Set(word);

            if (wordSet.isSubsetOf(matchSet)){
                found_words.push(word);
                n_found += 1;
            }

            // Stop if we have found enough words
            if (n_found >= opts["n_words"]) {
                break;
            }
    }

    const remaining_words = opts["n_words"] - n_found;

    let random_words = [];
    if (remaining_words > 0) {
        random_words = generateRandomWords(letters, vowels, {n_words: remaining_words, minLen: opts["minLen"], maxLen: opts["maxLen"]});
    }

    
    return {"real": found_words, "random": random_words};
}
