"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { LogOut } from "lucide-react";

// ─── Types ─────────────────────────────────────────────────────────────────────
type Tab = "on-hold" | "completed";
type Section = "personal" | "orders";

interface Order {
  id: string;
  date: string;
  location: string;
  price: string;
  trips: string;
}

interface IconProps {
  color?: string;
}

interface TabsProps {
  currentTab: Tab;
  onSelectTab: (tab: Tab) => void;
}

interface OrderCardProps {
  order: Order;
  index: number;
}

interface SidebarNavProps {
  active: Section;
  onSelect: (section: Section) => void;
}

interface MainPanelProps {
  active: Section;
}

interface FieldConfig {
  id: string;
  label: string;
  placeholder: string;
  col: number;
  type?: string;
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

// ─── Mock Data ─────────────────────────────────────────────────────────────────
const ON_HOLD_ORDERS: Order[] = [
  {
    id: "CTH-89812",
    date: "23 June 2025",
    location: "Cairo → London",
    price: "250 USD",
    trips: "One Trip",
  },
  {
    id: "CTH-74201",
    date: "14 July 2025",
    location: "Dubai → Paris",
    price: "380 USD",
    trips: "Round Trip",
  },
];

const COMPLETED_ORDERS: Order[] = [
  {
    id: "CTH-55310",
    date: "10 March 2025",
    location: "Riyadh → Rome",
    price: "420 USD",
    trips: "One Trip",
  },
  {
    id: "CTH-33198",
    date: "2 Jan 2025",
    location: "Kuwait → Berlin",
    price: "310 USD",
    trips: "Round Trip",
  },
];

// ─── OrderCard ─────────────────────────────────────────────────────────────────
const OrderCard = ({ order, index }: OrderCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 24, scale: 0.97 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.45,
        ease: "power3.out",
        delay: index * 0.1,
      },
    );
  }, [index]);

  const handleHoverIn = () => {
    gsap.to(cardRef.current, {
      y: -4,
      boxShadow: "0 12px 32px rgba(123,90,65,0.18)",
      duration: 0.25,
      ease: "power2.out",
    });
  };

  const handleHoverOut = () => {
    gsap.to(cardRef.current, {
      y: 0,
      boxShadow: "none",
      duration: 0.25,
      ease: "power2.in",
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleHoverIn}
      onMouseLeave={handleHoverOut}
      className="bg-[#F4F4F4] border border-[#E0E0E0] rounded-lg overflow-hidden cursor-pointer flex flex-col"
    >
      <div className="flex flex-col gap-6 p-6">
        <p className="text-[#8F8F8F]">Order Number</p>
        <p className="text-2xl font-bold">{order.id}</p>
        <div className="flex gap-4 text-[#8F8F8F]">
          <p className="flex gap-2">
            <CalendarIcon />
            {order.date}
          </p>
          <p className="flex gap-2">
            <MapPinIcon />
            {order.location}
          </p>
        </div>
      </div>
      <div className="flex gap-2 p-6 mt-auto bg-[#e7e4e2]">
        <p className="font-bold">Total: {order.price}</p>
        <p className="text-[#8F8F8F]">({order.trips})</p>
      </div>
    </div>
  );
};

// ─── Tabs ──────────────────────────────────────────────────────────────────────
const Tabs = ({ currentTab, onSelectTab }: TabsProps) => {
  const onHoldRef = useRef<HTMLButtonElement>(null);
  const completedRef = useRef<HTMLButtonElement>(null);

  const handleClick = (
    tab: Tab,
    ref: React.RefObject<HTMLButtonElement | null>,
  ) => {
    gsap.fromTo(
      ref.current,
      { scale: 0.93 },
      { scale: 1, duration: 0.3, ease: "back.out(2)" },
    );
    onSelectTab(tab);
  };

  return (
    <div className="flex gap-3">
      <button
        ref={onHoldRef}
        onClick={() => handleClick("on-hold", onHoldRef)}
        className="rounded-4xl h-10 shadow-sm cursor-pointer flex items-center gap-2 px-4 text-sm font-medium transition-colors duration-200"
        style={{
          background: currentTab === "on-hold" ? "#7B5A41" : "#F7F7F7",
          color: currentTab === "on-hold" ? "white" : "#8F8F8F",
        }}
      >
        <span
          className="min-w-2.25 min-h-2.25 rounded-full transition-colors duration-200"
          style={{ background: currentTab === "on-hold" ? "white" : "#8F8F8F" }}
        />
        On hold
      </button>

      <button
        ref={completedRef}
        onClick={() => handleClick("completed", completedRef)}
        className="rounded-4xl h-10 shadow-sm cursor-pointer flex items-center gap-2 px-4 text-sm font-medium transition-colors duration-200"
        style={{
          background: currentTab === "completed" ? "#7B5A41" : "#F7F7F7",
          color: currentTab === "completed" ? "white" : "#8F8F8F",
        }}
      >
        <span
          className="min-w-2.25 min-h-2.25 rounded-full transition-colors duration-200"
          style={{
            background: currentTab === "completed" ? "white" : "#8F8F8F",
          }}
        />
        Completed
      </button>
    </div>
  );
};

// ─── Orders Panel ──────────────────────────────────────────────────────────────
const Orders = () => {
  const [currentTab, setCurrentTab] = useState<Tab>("on-hold");
  const listRef = useRef<HTMLDivElement>(null);
  const prevTab = useRef<Tab>(currentTab);

  const handleTabChange = (tab: Tab) => {
    if (tab === currentTab) return;
    gsap.to(listRef.current, {
      opacity: 0,
      x: tab === "completed" ? -20 : 20,
      duration: 0.18,
      ease: "power2.in",
      onComplete: () => {
        prevTab.current = tab;
        setCurrentTab(tab);
        gsap.fromTo(
          listRef.current,
          { opacity: 0, x: tab === "completed" ? 20 : -20 },
          { opacity: 1, x: 0, duration: 0.28, ease: "power2.out" },
        );
      },
    });
  };

  const orders: Order[] =
    currentTab === "on-hold" ? ON_HOLD_ORDERS : COMPLETED_ORDERS;

  return (
    <div className="shadow-md space-y-4 px-9 py-7.5 bg-white rounded-2xl flex-[3]">
      <Tabs currentTab={currentTab} onSelectTab={handleTabChange} />
      <div ref={listRef} className="space-y-3">
        {orders.map((order, i) => (
          <OrderCard key={order.id} order={order} index={i} />
        ))}
      </div>
    </div>
  );
};

// ─── Sidebar Nav ───────────────────────────────────────────────────────────────
const SidebarNav = ({ active, onSelect }: SidebarNavProps) => {
  const items: { id: Section; label: string; icon: React.FC<IconProps> }[] = [
    { id: "personal", label: "Personal Information", icon: PersonIcon },
    { id: "orders", label: "My Orders", icon: NotepadIcon },
  ];

  const itemRefs = useRef<Record<string, HTMLLIElement | null>>({});

  const handleClick = (id: Section) => {
    const el = itemRefs.current[id];
    if (el) {
      gsap.fromTo(
        el,
        { x: -6 },
        { x: 0, duration: 0.4, ease: "elastic.out(1,0.5)" },
      );
    }
    onSelect(id);
  };

  return (
    <div className="flex-1 rounded-2xl flex items-stretch bg-white p-4.5 shadow-md self-start min-h-100">
      <ul className="space-y-2 flex flex-col w-full">
        {items.map(({ id, label, icon: Icon }) => {
          const isActive = active === id;
          return (
            <li
              key={id}
              ref={(el) => {
                itemRefs.current[id] = el;
              }}
              onClick={() => handleClick(id)}
              className={`flex items-center gap-2 p-3 border cursor-pointer transition-colors duration-200 
								${isActive ? "rounded-sm bg-[#7B5A41] text-[white] border-[#7B5A41]" : "rounded-md bg-[#E6E6E64F] text-[#8F8F8F] border-[#E1E1E1]"}`}
            >
              <Icon color={isActive ? "white" : "#8F8F8F"} />
              <p>{label}</p>
            </li>
          );
        })}

        <li
          className={`flex items-center mt-auto gap-2 p-3 cursor-pointer transition-colors duration-200 rounded-md bg-red-100 border border-red-300`}
        >
          <p className="text-red-500 gap-2 flex">
            <LogOut /> Log out
          </p>
        </li>
      </ul>
    </div>
  );
};

// ─── Personal Info Panel ───────────────────────────────────────────────────────
const PersonalInfo = () => {
  const [editing, setEditing] = useState<boolean>(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    gsap.fromTo(
      panelRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
    );
  }, []);

  const handleEdit = () => {
    gsap.fromTo(
      btnRef.current,
      { scale: 0.92 },
      { scale: 1, duration: 0.35, ease: "back.out(2)" },
    );
    setEditing((prev) => !prev);
  };

  const fields: FieldConfig[] = [
    { id: "name", label: "Name", placeholder: "Full Name Here", col: 1 },
    { id: "city", label: "City", placeholder: "Your City", col: 1 },
    { id: "email", label: "Email", placeholder: "example@example.com", col: 1 },
    {
      id: "password",
      label: "Password",
      placeholder: "••••••••",
      col: 1,
      type: "password",
    },
  ];

  return (
    <div
      ref={panelRef}
      className="shadow-md px-9 py-7.5 bg-white rounded-2xl flex-[3]"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 w-full">
        {fields.map(({ id, label, placeholder, col, type = "text" }) => (
          <div key={id} className={`space-y-2 col-span-${col} mb-6`}>
            <label htmlFor={id} className="font-semibold text-[15px] block">
              {label}
            </label>
            <input
              id={id}
              disabled={!editing}
              type={type}
              placeholder={placeholder}
              className="w-full pl-4 pr-10 py-5.5 rounded-xl bg-[#F4F4F4] border border-[#E0E0E0] text-sm outline-none transition-all duration-200"
              style={{
                borderColor: editing ? "#7B5A41" : "#E0E0E0",
                background: editing ? "white" : "#F4F4F4",
                cursor: editing ? "text" : "default",
              }}
            />
          </div>
        ))}

        <div className="space-y-2 col-span-2 mb-6">
          <label htmlFor="address" className="font-semibold text-[15px] block">
            Address
          </label>
          <textarea
            id="address"
            disabled={!editing}
            placeholder="221B Baker Street, London, NW1 6XE"
            rows={3}
            className="w-full p-7.5 rounded-xl bg-[#F4F4F4] border border-[#E0E0E0] text-sm outline-none resize-none transition-all duration-200"
            style={{
              borderColor: editing ? "#7B5A41" : "#E0E0E0",
              background: editing ? "white" : "#F4F4F4",
              cursor: editing ? "text" : "default",
            }}
          />
        </div>
      </div>

      <button
        ref={btnRef}
        onClick={handleEdit}
        className="flex items-center gap-2 text-sm px-10 py-5 rounded-xl font-medium cursor-pointer transition-all duration-200 mt-4 border"
        style={{
          background: editing
            ? "linear-gradient(179.26deg,#7B5A41 0.64%,#DFB08D 223.79%)"
            : "#ECECEC",
          color: editing ? "white" : "#7A7A7A",
          borderColor: editing ? "#966B4B" : "#D1D1D1",
        }}
      >
        Submit <ArrowRightIcon />
      </button>
    </div>
  );
};

// ─── Main Panel ────────────────────────────────────────────────────────────────
const MainPanel = ({ active }: MainPanelProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const prevActive = useRef<Section>(active);

  useEffect(() => {
    if (prevActive.current !== active) {
      gsap.fromTo(
        wrapperRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" },
      );
      prevActive.current = active;
    }
  }, [active]);

  return (
    <div ref={wrapperRef} className="flex-[3]">
      {active === "personal" ? <PersonalInfo /> : <Orders />}
    </div>
  );
};

// ─── Profile Page ──────────────────────────────────────────────────────────────
export default function ProfilePage() {
  const [activeSection, setActiveSection] = useState<Section>("orders");
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pageRef.current) {
      gsap.fromTo(
        pageRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.12, duration: 0.5, ease: "power3.out" },
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#f9f7f5] p-8">
      <div ref={pageRef} className="flex gap-4 mx-auto">
        <SidebarNav active={activeSection} onSelect={setActiveSection} />
        <MainPanel active={activeSection} />
      </div>
    </div>
  );
}
