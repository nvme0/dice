import React, { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import Button from "@/components/Button";

const DICE_SOUNDS_SRC = "/assets/dice-sounds-4s.mp3";
const DICE_DURATION_S = 4.2;
const RANDOMISER_INTERVAL_MS = 100;
const DICE_COUNT_DOWN_START = (DICE_DURATION_S * 1000) / RANDOMISER_INTERVAL_MS;

interface DieProps {
  value: number;
  image?: { src: string; alt: string };
  alt?: string;
}

function Die({ value, image }: DieProps) {
  return (
    <div className="flex overflow-hidden relative justify-center items-center w-24 h-24 text-6xl rounded-lg shadow bg-slate-600">
      {image ? (
        <Image
          src={image.src}
          fill
          alt={image.alt}
          className="object-contain p-2"
        />
      ) : (
        value
      )}
    </div>
  );
}

export interface DiceProps {
  name: string;
  min: number;
  max: number;
  numDie: number;
  images?: { src: string; alt: string }[];
}

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function Dice({
  name,
  min,
  max,
  numDie,
  images = []
}: DiceProps) {
  const [timer, setTimer] = useState<NodeJS.Timer | null>(null);
  const [rollCountDown, setRollCountDown] = useState(0);
  const [values, setValues] = useState<number[]>(
    Array.from({ length: numDie }, () => min)
  );
  const [diceSounds, setDiceSounds] = useState<HTMLAudioElement | null>(null);

  const hasImages = images.length === max - min + 1;

  const roll = () => {
    setValues(Array.from({ length: numDie }, () => getRandomInt(min, max)));
  };

  const rollDice = () => {
    setRollCountDown(DICE_COUNT_DOWN_START);
    diceSounds?.play();
  };

  useEffect(() => {
    setDiceSounds(new Audio(DICE_SOUNDS_SRC));
  }, []);

  useEffect(() => {
    if (rollCountDown && timer === null) {
      const newTimer = setInterval(() => {
        roll();
        setRollCountDown(rollCountDown - 1);
      }, 100);

      setTimer(newTimer);
    } else if (rollCountDown === 0 && timer !== null) {
      clearInterval(timer);
      setTimer(null);
    }

    return () => {
      if (timer) {
        setTimer(null);
        return clearInterval(timer);
      }
    };
  }, [timer, setTimer, rollCountDown, setRollCountDown, roll]);

  return (
    <Fragment>
      <h2 className="mb-4 text-2xl font-semibold">{name}</h2>
      <div className="flex justify-between items-center m-2 space-x-4">
        {values.map((value, index) => (
          <Die
            key={`Die-${index}`}
            value={value}
            image={hasImages ? images[value - min] : undefined}
          />
        ))}
      </div>
      <div className="m-4">
        <Button onClick={rollDice} disabled={rollCountDown !== 0}>
          Roll {numDie > 1 ? "Dice" : "Die"}
        </Button>
      </div>
    </Fragment>
  );
}
