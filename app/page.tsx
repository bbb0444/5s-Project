import FiveSenses from "./components/five-senses";
import "./styles/fonts.css";
import React, { useState, useEffect } from "react";

export default function Home() {
  return (
    <main>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <div>
          <FiveSenses />
        </div>
        <div style={{ fontFamily: "lcd" }}>
          <h1>welcome.</h1>
        </div>
      </div>
    </main>
  );
}
