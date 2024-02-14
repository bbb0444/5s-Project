import React from "react";

const SVGicon = ({ color = "", path = "", ...props }) => (
  <svg {...props} fill={color}>
    <path d={path} />
  </svg>
);

export default SVGicon;
