import React, { useState } from "react";

export type DiceOption = {
  name: string;
  Component: (props: { name: string }) => JSX.Element;
};

export interface NavProps {
  diceOptions: DiceOption[];
  selectedDice: DiceOption;
  setSelectedDice: (dice: DiceOption) => void;
}

export default function Nav({
  diceOptions,
  selectedDice,
  setSelectedDice
}: NavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  const selectDice = (dice: DiceOption) => {
    setSelectedDice(dice);
    setIsOpen(false);
  };

  return (
    <nav className="w-full bg-gray-800">
      <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex relative justify-between items-center h-16">
          <div className="flex absolute inset-y-0 left-0 items-center">
            <button
              type="button"
              className="inline-flex justify-center items-center p-2 text-gray-400 rounded-md hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={toggleOpen}
            >
              <span className="sr-only">Open main menu</span>

              <svg
                className="block w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>

              <svg
                className="hidden w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div
        className={`z-50 absolute w-full bg-gray-800 ${isOpen ? "":"hidden"}`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {diceOptions.map((diceOption) => {
            if (diceOption.name === selectedDice.name) {
              return (
                <button
                  key={diceOption.name}
                  className="block px-3 py-2 text-base font-medium text-white bg-gray-900 rounded-md"
                  aria-current="page"
                >
                  {diceOption.name}
                </button>
              );
            } else {
              return (
                <button
                  key={diceOption.name}
                  onClick={() => selectDice(diceOption)}
                  className="block px-3 py-2 text-base font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
                >
                  {diceOption.name}
                </button>
              );
            }
          })}
        </div>
      </div>
    </nav>
  );
}
