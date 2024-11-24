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
    "Clr",
    "()",
    "%",
    "Del",
    "7",
    "8",
    "9",
    "^",
    "4",
    "5",
    "6",
    "×",
    "1",
    "2",
    "3",
    "/",
    ".",
    "0",
    "-",
    "+",
    "=",
  ];

  const btnClasses =
    "m-4  font-semibold transition-transform transform  hover:scale-105  shadow-lg active:scale-50 justify-self-center outline-none";

  const [inputValue, setInputValue] = useState("");
  const [lastBracket, setLastBracket] = useState<"(" | ")" | null>(null); // State to track last bracket


  // Display Logic
  const display = (btn: string) => {
    if (btn === "()") {
      if (lastBracket === "(") {
        setInputValue(inputValue + ")");
        setLastBracket(")"); // Update last bracket to )
      } else {
        setInputValue(inputValue + "(");
        setLastBracket("("); // Update last bracket to (
      }
      return;
    }

    if (btn === ".") {
      // /[^\d.]/ Yani ye pattern kisi bhi character ko match karta hai jo digit ya decimal point NAHI hai
      // inputValue.split(/[^\d.]/) Yani inputValue ko split karta hai jahan operators (+,-,*,/) hain kisi bhi character ko jo digit ya decimal point NAHI hai  Example: Agar inputValue = "123+45.6" hai to split result hoga ["123", "45.6"]
      // .pop() Yani last element ko remove karta hai array se
      // || "" Yani agar inputValue.split(/[^\d.]/).pop() empty hai to currentNumber ko empty string set karta hai
      const currentNumber = inputValue.split(/[^\d.]/).pop() || "";
      // currentNumber.includes(".") Yani agar currentNumber me "." hai to return karta hai
      if (currentNumber.includes(".")) return;
    }

    if (["+", "-", "/", "×" , "%", "^" ,"." ].includes(btn)) {
      // inputValue.slice(-1) Yani last character ko remove karta hai
      if (["+", "-", "/", "×" , "%", "^" ,"."].includes(inputValue.slice(-1))) {
        // prev.slice(0, -1) Yani previous value ko remove karta hai
        // + btn Yani previous value + current operator
        // setInputValue Yani inputValue ko set karta hai
        // prev.slice(0, -1) + btn Yani previous value ko remove karta hai aur current operator add karta hai
        setInputValue((prev) => prev.slice(0, -1) + btn);
        return;
      }
    }
    // prev + btn Yani previous value + current operator
    // setInputValue Yani inputValue ko set karta hai
    // prev + btn Yani previous value + current operator
    // Example: Agar inputValue = "123" hai aur btn = "+" hai to inputValue hoga "123+"
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
      setInputValue(result ? result : "");
    } catch {
      setInputValue("Error");
    }
  };
  const clearOne = () => {
    setInputValue(inputValue.slice(0, -1));
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
        className="w-[90%] sm:w-4/6 bg-[#030303e4] lg:w-1/4 selection:bg-transparent sm:h-full   rounded-lg border border-white flex flex-col gap-2 p-2"
        name="calc"
      >
        <input
          type="text"
          className="h-28 border text-4xl text-right px-2 py-1 text-white border-white outline-none overflow-auto grid-cols-4 rounded-lg rounded-b-sm shadow-inner shadow-[#ffffffc2] bg-gray-800"
          value={inputValue}
          placeholder="0"
          readOnly
        />
        <section className="w-full h-full border shadow-inner shadow-[#ffffffc2] border-white rounded-lg rounded-t-sm text-white  grid grid-cols-4 grid-rows-6">
          {btnNames.map((btn, index) => (
            <Button
              key={index}
              text={btn}
              className={
                btn === "+"
                  ? `${btnClasses} 
                    h-[136px] row-span-2 w-12 rounded-lg text-zinc-950 text-5xl bg-white focus:ring-0`
                  : btn === "="
                  ? `${btnClasses} 
                    w-48 sm:w-56 col-span-3 h-12 rounded-lg  text-zinc-300 text-5xl bg-amber-600 focus:ring-0`
                  : btn === "-" ||
                    btn === "^" ||
                    btn === "()" ||
                    btn === "%" ||
                    btn === "×" ||
                    btn === "/"
                  ? `${btnClasses} 
                    w-12 h-12 text-indigo-300 text-xl rounded-full bg-gray-700 hover:scale-105 hover:bg-gradient-to-r hover:from-gray-500 hover:to-slate-500 focus:ring-4 focus:ring-gray-300`
                  : btn === "Del" || btn === "Clr"
                  ? `${btnClasses} text-red-300 hover:text-red-700 w-12 rounded-full h-12 text-lg  bg-gray-700 hover:bg-gradient-to-r hover:from-gray-500 hover:to-slate-500`
                  : btn
                  ? `${btnClasses} text-white w-12 rounded-full h-12 text-lg bg-gray-700 hover:bg-gradient-to-r hover:from-gray-500 hover:to-slate-500 focus:ring-4 focus:ring-gray-300`
                  : ""
              }
              handleClick={
                btn === "="
                  ? () => calculate()
                  : btn === "Del"
                  ? () => clear()
                  : btn === "Clr"
                  ? () => clearOne()
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
