export const LETTERS = {
  //"L_0627": "ا",
  "L_0628": "ب",
  "L_062A": "ت",
  "L_062B": "ث",
  "L_062C": "ج",
  "L_062D": "ح",
  "L_062E": "خ",
  "L_062F": "د",
  "L_0630": "ذ",
  "L_0631": "ر",
  "L_0632": "ز",
  "L_0633": "س",
  "L_0634": "ش",
  "L_0635": "ص",
  "L_0636": "ض",
  "L_0637": "ط",
  "L_0638": "ظ",
  "L_0639": "ع",
  "L_063A": "غ",
  "L_0641": "ف",
  "L_0642": "ق",
  "L_0643": "ك",
  "L_0644": "ل",
  "L_0645": "م",
  "L_0646": "ن",
  "L_0647": "ه",
  "L_0648": "و",
  "L_064A": "ي"
};

export const VOWELS = {
  // Short vowels
  "fatha": {isolated: "ﹶ", attached: "\u064E"}, // Fatha
  "damma": {isolated: "ﹸ", attached: "\u064F"}, // Damma
  "kasra": {isolated: "ﹺ", attached: "\u0650"}, // Kasra
  // Double vowels
  "fathatein": {isolated: "ﹰ", attached: "\u064B"}, // Fathatein
  "dammatein": {isolated: "ﹲ", attached: "\u064C"}, // Dammatein
  "kasratein": {isolated: "ﹴ", attached: "\u064D"}, // Kasratein
  // Long vowels
  "alif": {isolated: "ا", attached: "ا"}, // Alif
  "ya": {isolated: "ي", attached: "ي"}, // Ya
  "waw": {isolated: "و", attached: "و"}, // Waw
  // Other
  "shadda": {isolated: "ﹼ", attached: "\u0651"}, // Shadda
  "soukoune": {isolated: "ﹾ", attached: "\u0652"}, // Soukoune
};

export const LESSONS = [
  {letters: ["L_0628", "L_062A", "L_062B", "L_062C", "L_062D", "L_062E", "L_0646"], vowels: ["fatha", "damma", "kasra", "soukoune"]},
  {letters: ["L_0633", "L_0634", "L_0641", "L_0642", "L_0643", "L_0644", "L_0645"], vowels: ["fatha", "damma", "kasra", "soukoune", "shadda"]},
  {letters: ["L_062F", "L_0630", "L_0631", "L_0632", "L_0648", "L_064A"], vowels: ["fatha", "damma", "kasra", "soukoune", "shadda", "alif", "ya", "waw"]},
]

export const WORDS = (await fetch("../words.txt").then(r => r.text())).split(/\r?\n/);
