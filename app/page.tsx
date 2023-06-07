"use client";

import React, { useState } from "react";
import Dice from "@/components/Dice";
import Nav, { DiceSet } from "@/components/Nav";

const diceSets: DiceSet[] = [
  {
    name: "Two Sided Dice",
    diceOptions: [
      {
        name: "Two 6 Sided Dice",
        Component: ({ name }) => <Dice name={name} min={1} max={6} numDie={2} />
      }
    ]
  },
  {
    name: "Root Dice",
    diceOptions: [
      {
        name: "Battle Dice",
        Component: ({ name }) => <Dice name={name} min={0} max={3} numDie={2} />
      },
      {
        name: "Mob Die",
        Component: ({ name }) => (
          <Dice
            name={name}
            min={1}
            max={6}
            numDie={1}
            images={[
              { src: "/assets/Fox.png", alt: "Fox" },
              { src: "/assets/Fox.png", alt: "Fox" },
              { src: "/assets/Mouse.png", alt: "Mouse" },
              { src: "/assets/Mouse.png", alt: "Mouse" },
              { src: "/assets/Rabbit.png", alt: "Rabbit" },
              { src: "/assets/Rabbit.png", alt: "Rabbit" }
            ]}
          />
        )
      },
      {
        name: "Hireling Die (Leader)",
        Component: ({ name }) => (
          <Dice
            name={name}
            min={1}
            max={6}
            numDie={1}
            images={[
              { src: "/assets/Leader-1.png", alt: "1" },
              { src: "/assets/Leader-1.png", alt: "1" },
              { src: "/assets/Leader-1.png", alt: "1" },
              { src: "/assets/Leader-2.png", alt: "2" },
              { src: "/assets/Leader-2.png", alt: "2" },
              { src: "/assets/Leader-2.png", alt: "2" }
            ]}
          />
        )
      },
      {
        name: "Hireling Die (Follower)",
        Component: ({ name }) => (
          <Dice
            name={name}
            min={1}
            max={6}
            numDie={1}
            images={[
              { src: "/assets/Follower-2.png", alt: "2" },
              { src: "/assets/Follower-2.png", alt: "2" },
              { src: "/assets/Follower-2.png", alt: "2" },
              { src: "/assets/Follower-3.png", alt: "3" },
              { src: "/assets/Follower-3.png", alt: "3" },
              { src: "/assets/Follower-4.png", alt: "4" }
            ]}
          />
        )
      }
    ]
  }
];

const Home = () => {
  const [selectedDiceSet, setSelectedDiceSet] = useState(diceSets[0]);
  const [selectedDice, setSelectedDice] = useState(diceSets[0].diceOptions[0]);
  const { Component: DiceComponent, name: diceName } = selectedDice;

  const selectDiceSet = (diceSet: DiceSet) => {
    setSelectedDiceSet(diceSet);
    setSelectedDice(diceSet.diceOptions[0]);
  };

  const numberOfDiceOptions = selectedDiceSet.diceOptions.length;

  return (
    <div className="relative h-screen">
      <Nav
        diceSets={diceSets}
        selectedDiceSet={selectedDiceSet}
        setSelectedDiceSet={selectDiceSet}
      />

      <main
        className={`flex flex-col ${
          numberOfDiceOptions < 2 ? "justify-center" : "justify-between"
        } pt-16 h-full sm:flex-row`}
      >
        <DiceComponent name={diceName} />
        <div
          className={`z-50 w-full sm:w-1/2 bg-gray-800  ${
            numberOfDiceOptions < 2 ? "hidden" : ""
          } overflow-auto `}
        >
          <div className="flex flex-col px-2 pt-2 pb-3 space-y-1">
            {selectedDiceSet.diceOptions.map((dice) => {
              if (dice.name === selectedDice.name) {
                return (
                  <button
                    key={dice.name}
                    className="block px-3 py-2 text-base font-medium text-white whitespace-nowrap bg-gray-900 rounded-md"
                    aria-current="page"
                  >
                    {dice.name}
                  </button>
                );
              } else {
                return (
                  <button
                    key={dice.name}
                    onClick={() => setSelectedDice(dice)}
                    className="block px-3 py-2 text-base font-medium text-gray-300 whitespace-nowrap rounded-md hover:bg-gray-700 hover:text-white"
                  >
                    {dice.name}
                  </button>
                );
              }
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
