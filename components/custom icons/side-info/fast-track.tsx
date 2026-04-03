import * as React from "react";

const FastTrack: React.FC<React.SVGProps<SVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    id="Layer_1"
    data-name="Layer 1"
    viewBox="0 0 24 24"
    width="24"
    height="24"
  >
    <path
      fill="#6D6D6D"
      d="m12.39 11 2.92-2.92-1.37-1.34L8.69 12l5.25 5.25 1.38-1.37L12.4 13h7.48v5.85a1.06 1.06 0 0 1-1.06 1.06H5.18a1.06 1.06 0 0 1-1.06-1.06V5.17a1.05 1.05 0 0 1 1.06-1h13.64a1.05 1.05 0 0 1 1.06 1V11Z"
    ></path>
  </svg>
);

export default React.memo(FastTrack);
