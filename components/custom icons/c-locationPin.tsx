import * as React from "react";

const CLocationPin: React.FC<React.SVGProps<SVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={48}
    height={48}
    viewBox="0 0 24 24"
  >
    <g xmlns="http://www.w3.org/2000/svg" id="Layer_1-2" data-name="Layer 1">
      <path
        d="M18.86 11c0 5.38-5.51 8.69-6.65 9.32a.47.47 0 0 1-.42 0c-1.14-.63-6.65-3.94-6.65-9.32 0-4.29 2.57-7.29 6.86-7.29s6.86 2.96 6.86 7.29"
        className="cls-1"
        fill="none"
        stroke="#7B5A41"
        strokeWidth={1.5}
        ></path>
      <path
        d="M8.57 10.53A3.43 3.43 0 1 0 12 7.1a3.41 3.41 0 0 0-3.43 3.43"
        className="cls-1"
        fill="none"
        strokeWidth={1.5}
        stroke="#7B5A41"
      ></path>
    </g>
  </svg>
);

export default React.memo(CLocationPin);
