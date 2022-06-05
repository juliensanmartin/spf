import React from "react";
import { useState } from "react";
import classNames from "classnames";
import { Button } from "../common/Button/Button";
import {
  countAlphabetInWords,
  generateAlphabetDict
} from "./utils/wordsParser";
import "./parser.scss";

const initialAlphabetCount = generateAlphabetDict();

export const Parser = () => {
  const [alphabetCount, setAlphabetCount] = useState<{ [key: string]: number }>(
    initialAlphabetCount
  );
  const [phrase, setPhrase] = useState<string | undefined>(undefined);

  const handleParseClick = () => {
    const result = countAlphabetInWords(phrase);
    setAlphabetCount(result);
  };

  const handleResetClick = () => {
    setPhrase("");
    setAlphabetCount(initialAlphabetCount);
  };

  const handleTextAreaChange = (words: string | undefined) => {
    setPhrase(words);
  };

  return (
    <div>
      <TextArea onChange={handleTextAreaChange} value={phrase} />
      <div className="parser--button-group">
        <Button onClick={handleParseClick} label="Parse" variant="success" />
        <Button onClick={handleResetClick} label="Reset" variant="warning" />
      </div>
      <AlphabetGrid alphabetCount={alphabetCount} />
    </div>
  );
};

type TextAreaProps = {
  onChange: (words: string | undefined) => void;
  value: string | undefined;
};

export const TextArea = ({ onChange, value }: TextAreaProps) => {
  return (
    <div className="textarea--container">
      <label className="textarea--label">Phrase</label>

      <textarea
        className="textarea--input"
        value={value}
        rows={5}
        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
          onChange(event?.target?.value);
        }}
      />
    </div>
  );
};

type AlphabetGridProps = {
  alphabetCount: { [key: string]: number };
};

export const AlphabetGrid = ({ alphabetCount }: AlphabetGridProps) => {
  return (
    <div className="alphabet-grid--container">
      {Object.keys(alphabetCount).map((letter) => {
        const alphabetClass = classNames({
          "alphabet-grid--letter": true,
          "alphabet-grid--letter__found": alphabetCount[letter] > 0
        });
        return (
          <div className={alphabetClass}>
            <div>{letter}</div>
            <div>{alphabetCount[letter]}</div>
          </div>
        );
      })}
    </div>
  );
};
