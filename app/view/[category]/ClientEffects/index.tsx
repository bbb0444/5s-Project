"use client";
import { useEffect } from "react";

function Index() {
  useEffect(() => {
    document.documentElement.style.backgroundColor = "white";
  }, []);

  return null;
}

export default Index;
