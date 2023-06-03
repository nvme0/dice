"use client";

import React, { Fragment, useState } from "react";
import Dice from "@/components/Dice";
import Nav, { DiceOption } from "@/components/Nav";

const diceOptions: DiceOption[] = [
  {
    name: "Two 6 Sided Dice",
    Component: ({ name }) => <Dice name={name} min={1} max={6} numDie={2} />
  },
  {
    name: "Root Battle Dice",
    Component: ({ name }) => <Dice name={name} min={0} max={3} numDie={2} />
  },
  {
    name: "Root Mob Die",
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
    name: "Root Hireling Die (Leader)",
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
    name: "Root Hireling Die (Follower)",
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
];

const Home = () => {
  const [selectedDice, setSelectedDice] = useState(diceOptions[0]);
  const { Component: DiceComponent, name: diceName } = selectedDice;

  return (
    <Fragment>
      <Nav
        diceOptions={diceOptions}
        selectedDice={selectedDice}
        setSelectedDice={setSelectedDice}
      />
      <main className="flex flex-col items-center mt-8 min-h-screen">
        {<DiceComponent name={diceName} />}
      </main>
    </Fragment>
  );
};

export default Home;
