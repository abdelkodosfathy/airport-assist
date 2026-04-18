import * as React from "react";

const CPhone: React.FC<React.SVGProps<SVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    id="Layer_1"
    data-name="Layer 1"
    width={48}
    height={48}
    viewBox="0 0 24 24"
  >
    <g xmlns="http://www.w3.org/2000/svg" id="Layer_1-2" data-name="Layer 1">
      <path
        d="m21 17-.35 2.67a1.17 1.17 0 0 1-.73.95c-2.47.92-5.77.11-7.73-.89a1.5 1.5 0 0 0-.19-.13 16.52 16.52 0 0 1-8-8.31 4 4 0 0 1-.16-.35c-.08-.18-.16-.38-.23-.58-.69-1.95-1-4.77.18-6.76A1.25 1.25 0 0 1 4.92 3h2.87a1.45 1.45 0 0 1 1.47 1.55 10.5 10.5 0 0 0 .27 3.34 1.67 1.67 0 0 1-.71 1.67 8.2 8.2 0 0 0-1.51 1.63 10.4 10.4 0 0 0 5.1 5.15 7.4 7.4 0 0 0 1.75-1.13 2 2 0 0 1 1.84-.46 12.2 12.2 0 0 0 3.51.66A1.43 1.43 0 0 1 21 17"
        className="cls-1"
        fill="#7B5A41"
        stroke="none"
      ></path>
    </g>
  </svg>
);

export default React.memo(CPhone);
