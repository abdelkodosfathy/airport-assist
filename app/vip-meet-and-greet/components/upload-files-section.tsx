"use client";

import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAdditionalServicesStore } from "@/store/useAdditionalServices";
import { ArrowDownToLineIcon, UploadCloud, FileText, X } from "lucide-react";
import WheelchairCheckbox from "./WheelChairBox";
import { useAirportPackageStore } from "@/store/packageStore";

const renderLabel = (text: string) => {
  const match = text.match(/(.*?)(\s*\(optional\))/i);

  if (!match) return text;

  return (
    <>
      {match[1]}
      <span className="text-xs lowercase text-[#7A7A7A]">{match[2]}</span>
    </>
  );
};

type UploadFieldProps = {
  file: File | null | undefined;
  onSelect: (file: File | null) => void;
  onRemove: () => void;
  accept: string;
  label: string;
  description: string;
  fileLabel: string;
};

const UploadField = ({
  file,
  onSelect,
  onRemove,
  accept,
  label,
  description,
  fileLabel,
}: UploadFieldProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSelect(e.target.files?.[0] || null);
  };

  if (!file) {
    return (
      <div className="p-4 space-y-4 bg-[#F4F4F4] border border-[#E0E0E0] rounded-lg">
        <p className="text-sm">{description}</p>

        <p className="normal-case text-[#7B5A41] flex items-center gap-1 font-bold">
          <ArrowDownToLineIcon />
          {renderLabel(label)}
        </p>

        <input
          ref={inputRef}
          type="file"
          hidden
          accept={accept}
          onChange={handleChange}
        />

        <Button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="h-7 px-8 rounded-full text-white"
          style={{
            background:
              "linear-gradient(179.26deg, #7B5A41 0.64%, #DFB08D 223.79%)",
            border: "1.26px solid #966B4B",
          }}
        >
          Choose File <UploadCloud />
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4 bg-[#F4F4F4] border border-[#E0E0E0] rounded-lg">
      <div className="flex justify-between gap-3">
        <div className="flex gap-3 flex-1 min-w-0">
          <div className="w-10 h-10 bg-[#7B5A41] rounded-lg flex items-center justify-center">
            <FileText className="text-white w-5 h-5" />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{file.name}</p>
            <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
            <p className="text-xs text-[#7B5A41] font-medium">{fileLabel}</p>
          </div>
        </div>

        <button
          onClick={onRemove}
          className="p-1 hover:bg-red-100 rounded-full"
        >
          <X className="w-4 h-4 text-red-500" />
        </button>
      </div>
    </div>
  );
};

const UploadFilesSection = ({ onFocus }: { onFocus?: () => void }) => {
  const {
    imageFile,
    passengerFile,
    setImageFile,
    setPassengerFile,
    additionalRequirements,
    setAdditionalRequirements,
  } = useAdditionalServicesStore();

  const selectedPackage = useAirportPackageStore((s) => s.airportPackage);

  const slug = selectedPackage?.package.package_slug;
  const dataFilesRequierd = slug === "signature" || slug === "vip"; // vip refers to signature salone
  return (
    <div onClick={onFocus} className="px-10 py-6 bg-white rounded-2xl">
      <h4 className="font-medium mb-2 text-[18.75px]">
        Additional Services & Information
      </h4>

      <span className="block w-full h-0.5 bg-[#CFCFCF]" />

      <div className="mt-4 space-y-4">
        {/* Passenger */}
        {dataFilesRequierd ? (
          <UploadField
            file={passengerFile}
            onSelect={setPassengerFile}
            onRemove={() => setPassengerFile(null)}
            accept=".pdf,.xlsx,.xls,.csv"
            label="Download passenger data file"
            description="Please download the passenger data form, fill it out, and upload it below:"
            fileLabel="Passenger Data Form"
          />
        ) : null}

        {/* Ticket */}
        <UploadField
          file={imageFile}
          onSelect={setImageFile}
          onRemove={() => setImageFile(null)}
          accept="image/jpeg,image/png,application/pdf"
          label="Upload your Flight Tickets (optional)"
          description="Upload your tickets now, or we'll contact you later Drag & drop or click to upload Formats: JPEG, PNG, PDF.**"
          fileLabel="Flight Ticket"
        />

        <WheelchairCheckbox />

        <div className="space-y-2">
          <Label>Additional requirements</Label>
          <Textarea
            value={additionalRequirements}
            onChange={(e) => setAdditionalRequirements(e.target.value)}
            className="bg-[#F4F4F4]"
          />
        </div>
      </div>
    </div>
  );
};

export default UploadFilesSection;
