import React from "react";
import { Category } from "../lib/types";
import { getPosts } from "../lib/mockData";

interface params {
  searchParams: string;
}

function page({ searchParams }: params) {
  return <div>page</div>;
}

export default page;
