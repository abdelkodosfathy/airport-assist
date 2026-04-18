"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { LogOut, ArrowRight } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { ProtectedPage } from "@/components/ProtectedPage";
import { apiPost } from "@/lib/api/http";
import { useRouter } from "next/navigation";
import {
  CalendarIcon,
  IconProps,
  NotepadIcon,
  PersonIcon,
} from "./components/icons";
import { useOrders } from "@/lib/hooks/useOrders";
import { BookingOrder, useOrdersStore } from "@/store/useOrdersStore";
import { formatNumber } from "@/lib/formatNumbers";
import { statusConfig } from "@/components/BookingStatusCard";

// ─── Types ─────────────────────────────────────────────────────────────────────
type Tab = "on-hold" | "completed";
type Section = "personal" | "orders";

interface TabsProps {
  currentTab: Tab;
  onSelectTab: (tab: Tab) => void;
}

interface OrderCardProps {
  order: BookingOrder;
  index: number;
}

interface SidebarNavProps {
  active: Section;
  onSelect: (section: Section) => void;
}

interface MainPanelProps {
  active: Section;
}

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

  return (
    <div
      ref={cardRef}
      onMouseEnter={() =>
        gsap.to(cardRef.current, {
          y: -4,
          boxShadow: "0 12px 32px rgba(123,90,65,0.18)",
          duration: 0.25,
          ease: "power2.out",
        })
      }
      onMouseLeave={() =>
        gsap.to(cardRef.current, {
          y: 0,
          boxShadow: "none",
          duration: 0.25,
          ease: "power2.in",
        })
      }
      className="bg-[#F4F4F4] border border-[#E0E0E0] rounded-lg overflow-hidden cursor-pointer flex flex-col"
    >
      <div className="flex flex-col gap-6 p-6">
        <BookingStatusBadge status={order.booking_status}/>
        <p className="text-[#8F8F8F]">Order Number</p>
        {/* <p className="text-2xl font-bold">{order.id}</p> */}
        <p className="text-2xl font-bold lowercase">{order.booking_uuid}</p>
        <div className="flex gap-4 text-[#8F8F8F]">
          <p className="flex gap-2">
            <CalendarIcon />
            {/* {order.date} */}
            {order.created_at}
          </p>
          {/* <p className="flex gap-2"> */}
            {/* <MapPinIcon /> */}
            {/* {order.location} */}
          {/* </p> */}
        </div>
      </div>
      <div className="flex gap-2 p-6 mt-auto bg-[#e7e4e2]">
        <p className="font-bold">Total: {formatNumber(order.total)}</p>
        <p className="text-[#8F8F8F]">({order.package.package_name})</p>
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
      {(
        [
          ["on-hold", "On hold", onHoldRef],
          ["completed", "Completed", completedRef],
        ] as const
      ).map(([tab, label, ref]) => (
        <button
          key={tab}
          ref={ref}
          onClick={() => handleClick(tab, ref)}
          className="rounded-4xl h-10 shadow-sm cursor-pointer flex items-center gap-2 px-4 text-sm font-medium transition-colors duration-200"
          style={{
            background: currentTab === tab ? "#7B5A41" : "#F7F7F7",
            color: currentTab === tab ? "white" : "#8F8F8F",
          }}
        >
          <span
            className="min-w-2.25 min-h-2.25 rounded-full transition-colors duration-200"
            style={{ background: currentTab === tab ? "white" : "#8F8F8F" }}
          />
          {label}
        </button>
      ))}
    </div>
  );
};

// ─── Orders Panel ──────────────────────────────────────────────────────────────
const Orders = () => {
  const [currentTab, setCurrentTab] = useState<Tab>("on-hold");
  const listRef = useRef<HTMLDivElement>(null);

  const { data, isLoading } = useOrders();

  // console.log(data.data);

  const storeOrders = useOrdersStore((s) => s.storeOrders);
  const bookings = useOrdersStore((s) => s.bookings);

  useEffect(() => {
    if (data?.data?.bookings) {
      storeOrders(data.data);
    }
  }, [data]);

  const handleTabChange = (tab: Tab) => {
    if (tab === currentTab) return;
    gsap.to(listRef.current, {
      opacity: 0,
      x: tab === "completed" ? -20 : 20,
      duration: 0.18,
      ease: "power2.in",
      onComplete: () => {
        setCurrentTab(tab);
        gsap.fromTo(
          listRef.current,
          { opacity: 0, x: tab === "completed" ? 20 : -20 },
          { opacity: 1, x: 0, duration: 0.28, ease: "power2.out" },
        );
      },
    });
  };

  // const orders = currentTab === "on-hold" ? ON_HOLD_ORDERS : COMPLETED_ORDERS;
  const filteredOrders = bookings.filter((b) => {
    if (currentTab === "on-hold") {
      return b.booking_status !== "completed_successfully";
    }
    return b.booking_status === "completed_successfully";
  });
  return (
    <div className="shadow-md space-y-4 px-9 py-7.5 bg-white rounded-2xl flex-[3]">
      <Tabs currentTab={currentTab} onSelectTab={handleTabChange} />
      <div ref={listRef} className="space-y-3">
        {/* {filteredOrders.map((order, i) => (
          <OrderCard key={order.booking_id} order={order} index={i} />
        ))} */}
        {filteredOrders.map((order, i) => (
          <OrderCard key={order.booking_id} order={order} index={i} />
        ))}
      </div>
    </div>
  );
};

// ─── Sidebar Nav ───────────────────────────────────────────────────────────────
const SidebarNav = ({ active, onSelect }: SidebarNavProps) => {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const itemRefs = useRef<Record<string, HTMLLIElement | null>>({});

  const items: { id: Section; label: string; icon: React.FC<IconProps> }[] = [
    { id: "personal", label: "Personal Information", icon: PersonIcon },
    { id: "orders", label: "My Orders", icon: NotepadIcon },
  ];

  const handleClick = (id: Section) => {
    const el = itemRefs.current[id];
    if (el)
      gsap.fromTo(
        el,
        { x: -6 },
        { x: 0, duration: 0.4, ease: "elastic.out(1,0.5)" },
      );
    onSelect(id);
  };

  const handleLogout = async () => {
    try {
      await apiPost("/auth/logout");
    } catch (_) {
    } finally {
      logout();
      router.push("/login");
    }
  };

  return (
    <div className="flex-1 rounded-2xl flex flex-col bg-white p-4.5 shadow-md self-start min-h-100 gap-3">
      {/* User Info */}
      {user && (
        <div className="px-3 py-3 bg-[#F4F4F4] rounded-xl">
          <p className="font-semibold text-[15px]">{user.user_name}</p>
          <p className="text-[#8F8F8F] text-sm truncate">{user.email}</p>
          <p className="text-xs text-[#7B5A41] mt-1 capitalize">
            {user.user_type}
          </p>
          {user.loyalty_points !== "0" && (
            <p className="text-xs text-[#7B5A41] mt-0.5">
              🏅 {user.loyalty_points} pts
            </p>
          )}
        </div>
      )}

      <ul className="space-y-2 flex flex-col flex-1 w-full">
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
                ${
                  isActive
                    ? "rounded-sm bg-[#7B5A41] text-white border-[#7B5A41]"
                    : "rounded-md bg-[#E6E6E64F] text-[#8F8F8F] border-[#E1E1E1]"
                }`}
            >
              <Icon color={isActive ? "white" : "#8F8F8F"} />
              <p>{label}</p>
            </li>
          );
        })}

        <li
          onClick={handleLogout}
          className="flex items-center mt-auto gap-2 p-3 cursor-pointer transition-colors duration-200 rounded-md bg-red-100 border border-red-300"
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
  const user = useAuthStore((s) => s.user);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });

  const panelRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  // Sync form when user loads
  useEffect(() => {
    if (user) {
      setForm({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone: user.phone ?? "",
      });
    }
  }, [user]);

  useEffect(() => {
    gsap.fromTo(
      panelRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
    );
  }, []);

  const handleEditOrSubmit = () => {
    gsap.fromTo(
      btnRef.current,
      { scale: 0.92 },
      { scale: 1, duration: 0.35, ease: "back.out(2)" },
    );
    if (editing) {
      // TODO: call update API here e.g. apiPatch("/account/update", form)
    }
    setEditing((prev) => !prev);
  };

  const fields = [
    { id: "first_name", label: "First Name", type: "text" },
    { id: "last_name", label: "Last Name", type: "text" },
    { id: "email", label: "Email", type: "email" },
    { id: "phone", label: "Phone", type: "tel" },
  ] as const;

  return (
    <div
      ref={panelRef}
      className="shadow-md px-9 py-7.5 bg-white rounded-2xl flex-[3]"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 w-full">
        {fields.map(({ id, label, type }) => (
          <div key={id} className="space-y-2 mb-6">
            <label htmlFor={id} className="font-semibold text-[15px] block">
              {label}
            </label>
            <input
              id={id}
              disabled={!editing}
              type={type}
              value={form[id]}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, [id]: e.target.value }))
              }
              className="w-full pl-4 pr-10 py-5.5 rounded-xl bg-[#F4F4F4] border text-sm outline-none transition-all duration-200"
              style={{
                borderColor: editing ? "#7B5A41" : "#E0E0E0",
                background: editing ? "white" : "#F4F4F4",
                cursor: editing ? "text" : "default",
              }}
            />
          </div>
        ))}

        {/* Read-only fields */}
        <div className="space-y-2 mb-6">
          <label className="font-semibold text-[15px] block">
            Account Type
          </label>
          <input
            disabled
            value={user?.user_type ?? ""}
            className="w-full pl-4 pr-10 py-5.5 rounded-xl bg-[#F4F4F4] border border-[#E0E0E0] text-sm outline-none capitalize"
          />
        </div>

        <div className="space-y-2 mb-6">
          <label className="font-semibold text-[15px] block">
            Loyalty Points
          </label>
          <input
            disabled
            value={user?.loyalty_points ?? "0"}
            className="w-full pl-4 pr-10 py-5.5 rounded-xl bg-[#F4F4F4] border border-[#E0E0E0] text-sm outline-none"
          />
        </div>
      </div>

      <button
        ref={btnRef}
        onClick={handleEditOrSubmit}
        className="flex items-center gap-2 text-sm px-10 py-5 rounded-xl font-medium cursor-pointer transition-all duration-200 mt-4 border"
        style={{
          background: editing
            ? "linear-gradient(179.26deg,#7B5A41 0.64%,#DFB08D 223.79%)"
            : "#ECECEC",
          color: editing ? "white" : "#7A7A7A",
          borderColor: editing ? "#966B4B" : "#D1D1D1",
        }}
      >
        {editing ? "Submit" : "Edit"} <ArrowRight size={16} />
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
    <ProtectedPage>
      <div className="min-h-screen bg-[#f9f7f5] p-8">
        <div ref={pageRef} className="flex gap-4 mx-auto">
          <SidebarNav active={activeSection} onSelect={setActiveSection} />
          <MainPanel active={activeSection} />
        </div>
      </div>
    </ProtectedPage>
  );
}



interface Props {
  status: keyof typeof statusConfig;
}

export const BookingStatusBadge = ({ status }: Props) => {
  const config = statusConfig[status];

  if (!config) return null;

  const Icon = config.icon;

  return (
    <div className="flex items-center gap-2">
      <div
        className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${config.iconBg} ${config.iconColor}`}
      >
        <Icon size={14} />
        <span>{config.title}</span>
      </div>
    </div>
  );
};