'use client'
import { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

type Props = {};

const DateOfBirth = (props: Props) => {
  const [month, setMonth] = useState<string>("");
  const [day, setDay] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [daysInMonth, setDaysInMonth] = useState<number>(31);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const months = [
    { value: "1", label: "January", days: 31 },
    { value: "2", label: "February", days: 28 },
    { value: "3", label: "March", days: 31 },
    { value: "4", label: "April", days: 30 },
    { value: "5", label: "May", days: 31 },
    { value: "6", label: "June", days: 30 },
    { value: "7", label: "July", days: 31 },
    { value: "8", label: "August", days: 31 },
    { value: "9", label: "September", days: 30 },
    { value: "10", label: "October", days: 31 },
    { value: "11", label: "November", days: 30 },
    { value: "12", label: "December", days: 31 }
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 120 }, (_, i) => currentYear - i);

  const isLeapYear = (year: number): boolean => {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  };

  useEffect(() => {
    if (month) {
      const selectedMonth = months.find(m => m.value === month);
      if (selectedMonth) {
        let days = selectedMonth.days;
        
        if (month === "2" && year) {
          const yearNum = parseInt(year);
          days = isLeapYear(yearNum) ? 29 : 28;
        }
        
        setDaysInMonth(days);
        
        if (day && parseInt(day) > days) {
          setDay("");
        }
      }
    }
  }, [month, year]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as Element).closest('.custom-select')) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const CustomSelect = ({ 
    value, 
    onChange, 
    placeholder, 
    options, 
    disabled = false,
    name 
  }: { 
    value: string; 
    onChange: (val: string) => void; 
    placeholder: string; 
    options: Array<{ value: string; label: string }>; 
    disabled?: boolean;
    name: string;
  }) => {
    const isOpen = openDropdown === name;
    const selectedOption = options.find(opt => opt.value === value);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleScroll = (e: React.WheelEvent<HTMLDivElement>) => {
        e.preventDefault();
    //   const element = e.currentTarget;
    //   const { scrollTop, scrollHeight, clientHeight } = element;
      
    //   // Check if scrolling down and at bottom
    //   const isAtBottom = scrollTop + clientHeight >= scrollHeight;
    //   // Check if scrolling up and at top
    //   const isAtTop = scrollTop === 0;
      
    //   // Prevent page scroll if at boundaries
    //   if ((isAtBottom && e.deltaY > 0) || (isAtTop && e.deltaY < 0)) {
    //   }
    };

    return (
      <div className="custom-select relative flex-1">
        <button
          type="button"
          onClick={() => !disabled && setOpenDropdown(isOpen ? null : name)}
          disabled={disabled}
          className={`w-full px-4 py-2 bg-[#F4F4F4] border border-[#E0E0E0] rounded-md flex items-center justify-between text-left ${
            disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-100'
          }`}
        >
          <span className={selectedOption ? 'text-black' : 'text-gray-500'}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isOpen && (
          <div 
            ref={dropdownRef}
            onWheel={handleScroll}
            className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto scrollbar-none"
          >
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setOpenDropdown(null);
                }}
                className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                  value === option.value ? 'bg-gray-50 font-medium' : ''
                }`}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex gap-2">
      <CustomSelect
        name="month"
        value={month}
        onChange={setMonth}
        placeholder="Month"
        options={months}
      />

      <CustomSelect
        name="day"
        value={day}
        onChange={setDay}
        placeholder="Day"
        options={days.map(d => ({ value: d.toString(), label: d.toString() }))}
        disabled={!month}
      />

      <CustomSelect
        name="year"
        value={year}
        onChange={setYear}
        placeholder="Year"
        options={years.map(y => ({ value: y.toString(), label: y.toString() }))}
      />
    </div>
  );
};

export default DateOfBirth;