export const alphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z"
];

export const generateAlphabetDict = (): { [key: string]: number } =>
  alphabet.reduce((acc, cur) => ({ ...acc, [cur]: 0 }), {});

export const countAlphabetInWords = (words: string | undefined) => {
  const dict = generateAlphabetDict();
  if (!words) {
    return dict;
  }
  const wordList = words.split(" ");
  wordList.forEach((word) => {
    const uppercaseWord = word.toUpperCase();
    const exist: { [key: string]: number } = {};
    const letters = uppercaseWord.split("");
    letters.forEach((letter) => {
      if (!exist[letter]) {
        dict[letter] += 1;
        exist[letter] = 1;
      }
    });
  });
  return dict;
};
