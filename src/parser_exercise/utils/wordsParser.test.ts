import { countAlphabetInWords, alphabet } from "./wordsParser";

test("should have 5 E", () => {
  const result = countAlphabetInWords("The dog jumped over the fence");

  expect(result["A"]).toBe(0);
  expect(result["B"]).toBe(0);
  expect(result["C"]).toBe(1);
  expect(result["D"]).toBe(2);
  expect(result["E"]).toBe(5);
});

test("should have every alphabet letter to be have 0 occurences", () => {
  const result = countAlphabetInWords(undefined);

  alphabet.forEach((letter) => {
    expect(result[letter]).toBe(0);
  });
});
