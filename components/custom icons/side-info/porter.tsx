import * as React from "react";

const Porter: React.FC<React.SVGProps<SVGElement>> = (props) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    fill='none'
    viewBox='0 0 24 24'
  >
    <path
      stroke='#6D6D6D'
      strokeLinejoin='round'
      strokeWidth='2'
      d='M9 6.471v-2a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v2'
    ></path>
    <path
      fill='#6D6D6D'
      fillRule='evenodd'
      d='M18 7a2 2 0 0 1 2 2v8.998a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2zm-9.25 3.29a.5.5 0 0 0 0 1h7.5a.5.5 0 0 0 0-1z'
      clipRule='evenodd'
    ></path>
    <path
      fill='#6D6D6D'
      d='M7 20.471h3.3v1a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1zM14.7 20.471H18v1a1 1 0 0 1-1 1h-1.3a1 1 0 0 1-1-1z'
    ></path>
  </svg>
);

export default React.memo(Porter);
