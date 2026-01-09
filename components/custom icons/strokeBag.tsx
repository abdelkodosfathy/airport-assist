import * as React from "react";

const StrokeBag: React.FC<React.SVGProps<SVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="19"
    height="19"
    fill="none"
    viewBox="0 0 19 19"
  >
    <path
      stroke="#6A7282"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.552"
      d="M12.418 15.056V2.639a1.55 1.55 0 0 0-1.553-1.553H7.761A1.55 1.55 0 0 0 6.21 2.64v12.417"
    ></path>
    <path
      stroke="#6A7282"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.552"
      d="M15.52 4.19H3.103c-.857 0-1.552.696-1.552 1.553v7.76c0 .858.695 1.553 1.552 1.553H15.52c.857 0 1.552-.695 1.552-1.552v-7.76c0-.858-.695-1.553-1.552-1.553"
    ></path>
  </svg>
);

export default StrokeBag;
