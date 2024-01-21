import FiveSenses from "./components/FiveSenses";
import Header from "./components/Header";
import ScrollingText from "./components/ScrollingText";
import React, { useState, useEffect } from "react";
import "./globals.scss";

export default function Home() {
  return (
    <main className="">
      <div className="">
        {/* <div className="w-1/3 min-w-40"> */}
        <ScrollingText />
        <Header></Header>
      </div>
      {/* <div className="w-2/3 min-w-80 p-6 flex">
        <div className="flex-1">
        </div>
      </div> */}
      {/* <div>
        <FiveSenses />
      </div> */}
    </main>
  );
}
