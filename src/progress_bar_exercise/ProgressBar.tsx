import React from "react";
import { useState, useEffect } from "react";
import classNames from "classnames";
import { Button } from "../common/Button/Button";
import "./progress-bar.scss";

export const ProgressBarApp = () => {
  // State
  const [label, setLabel] = useState<string>("Start Request");
  const [progress, setProgress] = useState<number>(0);
  const [canFinish, setCanFinish] = useState<boolean>(false);
  const [stopInterval, setStopInterval] = useState<() => void>(() => () => {});

  // Handlers
  const startRequest = () => {
    setLabel("Loading...");
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    setStopInterval(() => () => {
      clearInterval(timer);
    });
  };

  const finishRequest = () => {
    setProgress(100);
  };

  // Effects
  useEffect(() => {
    // User can force finish manually once the progress is > than 90
    setCanFinish(progress >= 90 && progress < 100);
  }, [progress, setCanFinish]);

  useEffect(() => {
    if (canFinish) {
      setLabel("Finish Request");
      stopInterval();
    }
    if (progress === 100) {
      // Resetting the exercice once the request is completed
      // for easy testing
      setTimeout(() => {
        setLabel("Start Request");
        setProgress(0);
      }, 5000);
    }
  }, [progress, setLabel, setProgress, stopInterval, canFinish]);

  return (
    <div className="progress-bar--container">
      <ProgressBar percent={progress} />
      <Button
        label={label}
        variant={canFinish ? "error" : "success"}
        onClick={canFinish ? finishRequest : startRequest}
        disabled={progress > 0 && !canFinish}
      />
    </div>
  );
};

type ProgressBarProps = {
  percent: number;
};

export const ProgressBar = ({ percent }: ProgressBarProps) => {
  const percentWidth = percent >= 100 ? 100 : percent;
  const progressBarClass = classNames({
    "progress-bar": true,
    "progress-bar__hide": percent >= 100
  });
  return (
    <div className={progressBarClass}>
      <div className="progress-bar--back">
        <div
          className="progress-bar--front"
          style={{ width: `${percentWidth}%` }}
        />
      </div>
    </div>
  );
};
