import * as React from "react";

const WaterDrop: React.FC<React.SVGProps<SVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    fill="none"
    viewBox="0 0 22 22"
  >
    <path
      stroke="#7B5A41"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.338"
      d="M10.703 19.624a6.244 6.244 0 0 0 6.244-6.244c0-1.784-.892-3.479-2.676-4.906s-3.122-3.568-3.568-5.798c-.446 2.23-1.784 4.371-3.568 5.798s-2.676 3.122-2.676 4.906a6.244 6.244 0 0 0 6.244 6.244"
    ></path>
  </svg>
);

export default WaterDrop;
