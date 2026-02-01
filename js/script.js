// Imports 
import {LETTERS, VOWELS, LESSONS} from "./data.js"
import {generateRandomWords} from "./word_generator.js"

// Elements 
const lessonBox = document.getElementById("lessonBox")
const letterBox = document.getElementById("letterBox");
const vowelBox  = document.getElementById("vowelBox");
const output    = document.getElementById("output");
const errorBox  = document.getElementById("status-msg");

// Fill letters and vowels
Object.entries(LETTERS).forEach(([id, letter]) => {
  letterBox.appendChild(
    createLetterCheckbox(id, letter, "letters")
  );
});
Object.entries(VOWELS).forEach(([id, vowel]) => {
  vowelBox.appendChild(
    createLetterCheckbox(id, vowel.isolated, "vowels")
  );
});

// Fill lesson presets
LESSONS.forEach((lesson, index) => {
  const button = document.createElement("button");
  button.textContent = "Leçon " + (index+1);
  button.onclick = () => setValueToLetterboxes(true, lesson);
  button.click();

  lessonBox.appendChild(button)
});

// Connect buttons
/* Coming soon...
document.getElementById("selectAllLetters").onclick = () => {
  setValueToLetterboxes(true);
}
document.getElementById("clearLetters").onclick = () => {
  setValueToLetterboxes(false);
}
*/
document.getElementById("copy").onclick = async () => {
  try {
    await navigator.clipboard.writeText(output.textContent);
    errorBox.className = "status-msg success" 
    errorBox.textContent = "Les mots ont bien été copiés.";
  } catch (err) {
    errorBox.className = "status-msg error" 
    errorBox.textContent = "Impossible de copier les mots.";
  }
}

// Dynamically adjust the min value of maxLen
document.getElementById('maxLen').min = document.getElementById('minLen').value;
  document.getElementById('minLen').addEventListener('change', function() {
    const maxLen = document.getElementById('maxLen');

    const minVal = Number(this.value);
    const maxVal = Number(maxLen.value);

    maxLen.min = minVal;
    if (maxVal < minVal) {
      maxLen.value = minVal;
    }
  });

// Generate button
document.getElementById("generate").onclick = () => {
  const selectedLetters = [...document.querySelectorAll("[data-group=letters]:checked")].map(e => LETTERS[e.id]);
  const selectedVowels = [...document.querySelectorAll("[data-group=vowels]:checked")].map(e => VOWELS[e.id].attached);

  errorBox.textContent = "";
  errorBox.className = "status-msg error" 
  if (selectedLetters.length === 0) {
    return errorBox.textContent = "Veuillez choisir au moins une lettre.";
  }
  if (selectedVowels.length === 0) {
    return errorBox.textContent = "Veuillez choisir au moins une voyelle.";
  }

  const opts = {};
  opts["n_words"] = Number(document.getElementById("count").value);
  opts["minLen"] = Number(document.getElementById("minLen").value);
  opts["maxLen"] = Number(document.getElementById("maxLen").value);

  const words = generateRandomWords(selectedLetters, selectedVowels, opts);

  const per_line = document.getElementById("perLine");
  output.textContent = words.map((w, i) => (i + 1) % per_line.value === 0 ? w + "\n" : w + "   ").join("");

}

//======= FUNCTIONS ========

/**
 * Creates a checkbox element for a given letter and group.
 *
 * @param {string} id - The unique identifier for the checkbox input.
 * @param {string} letter - The letter to be displayed.
 * @param {string} group - The group to which the checkbox belongs, set as a data attribute. (letters or vowels)
 * @returns {DocumentFragment} A cloned template containing the checkbox and its label.
 */
function createLetterCheckbox(id, letter, group) {
  const letterbox_template = document.getElementById("letterboxTemplate")

  const clone = letterbox_template.content.cloneNode(true)

  const input = clone.querySelector("input");
  input.id = id;
  input.dataset.group = group;

  const span = clone.querySelector("span")
  span.textContent = letter;

  return clone;
}

/**
 * Sets the checked state of letter and vowel checkboxes based on the provided value and IDs.
 *
 * @param {boolean} value - The value to set for the checkboxes (true for checked, false for unchecked).
 * @param {Object} [ids={}] - An object containing arrays of IDs for letters and vowels.
 *                            Structure: { letters: [id1, id2, ...], vowels: [id1, id2, ...] }
 *                            If ids is empty, the value is applied to all checkboxes.
 */
function setValueToLetterboxes(value, ids = {}) {
  // Set checked value to all letters
  document.querySelectorAll("[data-group=letters]").forEach(letter => {
    letter.checked = Object.keys(ids).length === 0 || ids.letters.includes(letter.id) ? value : !value;
  });

  // Set checked value to all vowels
  document.querySelectorAll("[data-group=vowels]").forEach(vowel => {
    vowel.checked = Object.keys(ids).length === 0 || ids.vowels.includes(vowel.id) ? value : !value;
  });
}


