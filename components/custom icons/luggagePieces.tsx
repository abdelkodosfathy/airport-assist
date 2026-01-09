import * as React from "react";

const LuggagePieces: React.FC<React.SVGProps<SVGElement>> = (props) => (
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
      d="M14.27 17.84V3.567a1.784 1.784 0 0 0-1.783-1.784H8.919a1.784 1.784 0 0 0-1.784 1.784v14.271"
    ></path>
    <path
      stroke="#7B5A41"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.338"
      d="M17.839 5.352H3.567c-.985 0-1.784.798-1.784 1.784v8.92c0 .985.799 1.783 1.784 1.783H17.84c.985 0 1.784-.798 1.784-1.784v-8.92c0-.985-.799-1.783-1.784-1.783"
    ></path>
  </svg>
);

export default LuggagePieces;
