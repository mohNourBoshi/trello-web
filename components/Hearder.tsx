"use client";

import Image from "next/image";
import { MagnifyingGlassIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import React from "react";
import Avatar from "react-avatar";
function Hearder() {
  return (
    <header>
      <div className="flex flex-col md:flex-row  p-5 bg-gray-500/10 items-center ">
        <div
          className="
          absolute 
          left-0
          top-0 
          w-full
          h-96
          bg-gradient-to-br
          from-pink-400
          to-[#0055d1]
          rounded-md
          blur-3xl
          opacity-50
          -z-40

          "
        ></div>
        <Image
          src="https://links.papareact.com/c2cdd5"
          alt="trello logo"
          width={300}
          height={100}
          className="w-44 md:56 pb-18 md:pb-0 object-contain      "
        />

        <div className="flex items-center space-x-5 flex-1 justify-end w-full">
          {/* search bar */}
          <form
            className="flex items-center space-x-5 bg-white rounded-md 
            p-2 shadow-md flex-1 md:flex-initial"
          >
            <MagnifyingGlassIcon className="w-6 h-6 text-gray-400" />

            <input
              type="text"
              name="ididid"
              placeholder="Search"
              id="ididid"
              className="flex-1 outline-none p-2"
            />
            <button hidden type="submit">
              Search
            </button>
          </form>
          <Avatar name="muhammad nour" round size="50" color="#0055d1" />
        </div>
      </div>

      <div className="flex items-center justify-center px-5   md:py-0 ">
        <p className=" flex items-center text-sm font-light  pr-2 shadow-xl rounded-xl w-fit bg-white text-[#0055d1]  italic ">
          <UserCircleIcon className="inline-block h-10 w-10 text-[#0055d1]  mr-1" />
          let ai gpt Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>
    </header>
  );
}

export default Hearder;
