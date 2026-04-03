"use client";

import React from "react";
import {
  Clock1,
  Clock2,
  Clock3,
  Clock4,
  Clock5,
  Clock6,
  Clock7,
  Clock8,
  Clock9,
  Clock10,
  Clock11,
  Clock12,
} from "lucide-react";

const clockIcons = [
  Clock1,
  Clock2,
  Clock3,
  Clock4,
  Clock5,
  Clock6,
  Clock7,
  Clock8,
  Clock9,
  Clock10,
  Clock11,
  Clock12,
];

const getClockIndex = (time?: string): number => {
  if (!time) return 0;

  const [hours] = time.split(":").map(Number);

  return hours % 12;
};

type TimeIconProps = {
  time: string;
  size?: number;
} & React.SVGProps<SVGSVGElement>;

const TimeIcon: React.FC<TimeIconProps> = ({ time, size = 24, ...props }) => {
  const index = getClockIndex(time);
  const Icon = clockIcons[index] || Clock1;

  return <Icon size={size} {...props} />;
};

export default TimeIcon;
