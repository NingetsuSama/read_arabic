// Imports 
import {LETTERS, VOWELS, LESSONS} from "./data.js"
import {findWords, generateRandomWords} from "./word_generator.js"

// Elements 
const lessonBox = document.getElementById("lessonBox")
const letterBox = document.getElementById("letterBox");
const vowelBox  = document.getElementById("vowelBox");
const realWordOutput = document.getElementById("realWordOutput");
const randomWordOutput = document.getElementById("randomWordOutput");
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
  button.onclick = () => {setValueToGroup(true, "letters", lesson.letters); setValueToGroup(true, "vowels", lesson.vowels);};

  lessonBox.appendChild(button)
});

// Connect buttons
document.getElementById("selectAllLetters").onclick = () => {
  setValueToGroup(true, "letters");
}
document.getElementById("clearLetters").onclick = () => {
  setValueToGroup(false, "letters");
}
document.getElementById("selectAllVowels").onclick = () => {
  setValueToGroup(true, "vowels");
}
document.getElementById("clearVowels").onclick = () => {
  setValueToGroup(false, "vowels");
}
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
document.getElementById("clear").onclick = () => {
  realWordOutput.textContent = "";
  randomWordOutput.textContent = "";
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

  const words = findWords(selectedLetters, selectedVowels, opts);
  console.log(words.real);
  console.log(words.random);

  const per_line = Number(document.getElementById("perLine").value);
  console.log(per_line)
  realWordOutput.textContent = words.real.map((w, i) => (i + 1) % per_line === 0 ? w + "\n" : w + "   ").join("");
  randomWordOutput.textContent = words.random.map((w, i) => (words.real.length + i + 1) % per_line === 0 ? w + "\n" : w + "   ").join("");

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
 * Sets the checked state of a checkbox group based on the provided value and IDs.
 *
 * @param {boolean} value - The value to set for the checkboxes (true for checked, false for unchecked).
 * @param {string} group - The data-group attribute value to identify the checkbox group (e.g., "letters" or "vowels").
 * @param {Object} [ids=[]] - An object containing arrays of IDs.
 *                            If ids is empty, the value is applied to all checkboxes of the group.
 */
function setValueToGroup(value, group, ids = []) {
  // Set checked value to all checkboxes of the group
  document.querySelectorAll(`[data-group=${group}]`).forEach(group_item => {
    group_item.checked = Object.keys(ids).length === 0 || ids.includes(group_item.id) ? value : !value;
  });
}

