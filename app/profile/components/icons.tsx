export interface IconProps {
  color?: string;
}
// ─── Icons ─────────────────────────────────────────────────────────────────────
const PersonIcon = ({ color = "#7B5A41" }: IconProps) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="4" stroke={color} strokeWidth="2" />
    <path
      d="M4 20c0-4 3.6-7 8-7s8 3 8 7"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const NotepadIcon = ({ color = "#8F8F8F" }: IconProps) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <rect
      x="4"
      y="3"
      width="16"
      height="18"
      rx="2"
      stroke={color}
      strokeWidth="2"
    />
    <path
      d="M8 7h8M8 11h8M8 15h5"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const CalendarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <rect
      x="3"
      y="4"
      width="18"
      height="18"
      rx="2"
      stroke="#8F8F8F"
      strokeWidth="2"
    />
    <path
      d="M16 2v4M8 2v4M3 10h18"
      stroke="#8F8F8F"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const MapPinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
      stroke="#8F8F8F"
      strokeWidth="2"
    />
    <circle cx="12" cy="9" r="2.5" stroke="#8F8F8F" strokeWidth="2" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path
      d="M5 12h14M13 6l6 6-6 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export { PersonIcon, NotepadIcon, CalendarIcon, MapPinIcon, ArrowRightIcon };
