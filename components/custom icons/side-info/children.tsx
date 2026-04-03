import * as React from "react";

const Children: React.FC<React.SVGProps<SVGElement>> = (props) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    fill='none'
    viewBox='0 0 24 24'
  >
    <path
      fill='#2A4157'
      fillOpacity='0.24'
      d='M11.013 16.5c.143-2.824 1.512-5.5 4.487-5.5s4.344 2.676 4.487 5.5a.48.48 0 0 1-.487.5h-8a.48.48 0 0 1-.487-.5'
    ></path>
    <path
      fill='#2A4157'
      fillOpacity='0.24'
      d='M4.013 16.5C4.156 13.676 5.525 11 8.5 11s4.344 2.676 4.487 5.5a.48.48 0 0 1-.487.5h-8a.48.48 0 0 1-.487-.5'
    ></path>
    <circle
      cx='15.5'
      cy='7.5'
      r='2.5'
      fill='#2A4157'
      fillOpacity='0.24'
    ></circle>
    <circle
      cx='2.5'
      cy='2.5'
      r='2.5'
      fill='#2A4157'
      fillOpacity='0.24'
      transform='matrix(-1 0 0 1 11 5)'
    ></circle>
    <path
      fill='#6D6D6D'
      d='M7.014 17.5C7.173 14.676 8.694 12 12 12s4.827 2.676 4.986 5.5c.015.276-.21.5-.486.5h-9a.48.48 0 0 1-.486-.5'
    ></path>
    <circle cx='12' cy='8' r='3' fill='#6D6D6D'></circle>
  </svg>
);

export default React.memo(Children);
