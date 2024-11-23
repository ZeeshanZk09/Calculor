// import Image from "next/image";
// import { ReactNode } from "react";
// import About from './about/page'
// function Input() {
//   return (
//   )
// }
// import { Input } from "postcss";
// import { Form } from "react-form";
"use client";
import React, { useState } from "react";
import { evaluate } from "mathjs";

interface TypeButton {
  text: string;
  className?: string;
  handleClick: () => void;
}

function Button({ text, className, handleClick }: TypeButton) {
  return (
    <button type="button" className={className} onClick={handleClick}>
      {text}
    </button>
  );
}



export default function Home() {
  const btnNames = [
    "7",
    "8",
    "9",
    "Del",
    "4",
    "5",
    "6",
    "/",
    "1",
    "2",
    "3",
    "-",
    ".",
    "0",
    "=",
    "+",
  ];

  const btnClasses =
    "w-14 h-14 text-lg font-semibold text-white transition-transform transform rounded-full bg-gray-700 hover:scale-110 hover:bg-gradient-to-r hover:from-gray-500 hover:to-slate-500 focus:ring-4 focus:ring-gray-300 shadow-lg active:scale-95 justify-self-center";

  const [inputValue, setInputValue] = useState("");

  // Display Logic
  const display = (btn: string) => {
    if (btn === ".") {
      // Prevent multiple decimals in a single number
      const currentNumber = inputValue.split(/[^\d.]/).pop() || "";
      if (currentNumber.includes(".")) return;
    }

    if (["+", "-", "/", "*"].includes(btn)) {
      // Prevent continuous operators
      if (["+", "-", "/", "*"].includes(inputValue.slice(-1))) {
        setInputValue((prev) => prev.slice(0, -1) + btn);
        return;
      }
    }

    setInputValue((prev) => prev + btn);
  };

  // Calculate Logic
  const calculate = () => {
    try {
      if (inputValue.includes("/0")) {
        setInputValue("∞ infinity");
        return;
      }
      const result = evaluate(inputValue);
      setInputValue(String(result));
    } catch {
      setInputValue("Error");
    }
  };

  // Clear Input
  const clear = () => {
    setInputValue("");
  };

  // Prevent Default Form Submission
  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <main className="w-screen h-screen bg-gradient-to-tl from-gray-500 to-slate-500 flex items-center justify-center py-3 sm:py-10">
      <form
        onSubmit={handleFormSubmit}
        className="w-[90%] sm:w-4/6 bg-[#030303e4] lg:w-1/4 selection:bg-transparent h-[80%] rounded-lg border border-white flex flex-col gap-2 p-2"
        name="calc"
      >
        <input
          type="text"
          className="h-28 border text-4xl text-right px-2 py-1 text-white border-white outline-none overflow-auto grid-cols-4 rounded-lg rounded-b-sm shadow-inner shadow-[#ffffffc2] bg-gray-800"
          value={inputValue}
          placeholder="0"
          readOnly
        />
        <section className="w-full h-full border shadow-inner shadow-[#ffffffc2] border-white rounded-lg rounded-t-sm text-white grid gap-2 grid-cols-4 justify-center items-center">
          {btnNames.map((btn, index) => (
            <Button
              key={index}
              text={btn}
              className={btnClasses}
              handleClick={
                btn === "="
                  ? calculate
                  : btn === "Del"
                  ? clear
                  : () => display(btn)
              }
            />
          ))}
        </section>
      </form>
    </main>
  );
}

// import React from 'react'

// const ComponentsPassInProp = () => {
//   const text =
//     "Should you encounter other problems, please first search the bug tracker (also look at the closed issues) and the mailing list, chances are that the problem was reported already. Also make sure that you use an up to date Git for Windows version (or a current snapshot build). If it has not been reported yet, please follow our bug reporting guidelines and report the bug.";

//   // const Heading: () => JSX.Element | Element = () => {
//     // return <Main />;
//   // };
//   return (
//     <div>

//        {/* <Header text={text} heading={ <Heading />} /> */}

//     </div>
//   )
// }

// export {ComponentsPassInProp}
