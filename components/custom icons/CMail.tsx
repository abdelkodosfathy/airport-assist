import * as React from "react";

const CMail: React.FC<React.SVGProps<SVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={48} height={48} viewBox="0 0 24 24">
    <g xmlns="http://www.w3.org/2000/svg" id="Layer_1-2" data-name="Layer 1">
      <path
        d="M20 4.14a1.78 1.78 0 0 1 1.44.74l-9.56 8.33L2.43 5A1.81 1.81 0 0 1 4 4.14ZM2.17 18V6.51L9 12.37l-6.82 5.86a2 2 0 0 1-.01-.23m.62 1.42a1.78 1.78 0 0 0 1.21.44h16a1.7 1.7 0 0 0 1-.34l-7.22-6.29-1.3 1.13a1 1 0 0 1-1.28 0L10 13.23Zm12-7 7 6.06a2 2 0 0 0 0-.44V6.28Z"
        className="cls-1"
        fill="#7B5A41"
        stroke="none"
      ></path>
    </g>
  </svg>
);

export default React.memo(CMail);
