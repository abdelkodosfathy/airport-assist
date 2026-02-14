// "use client";
// import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { useAdditionalServicesStore } from "@/store/useAdditionalServices";
// import { ArrowDownToLineIcon, UploadCloud } from "lucide-react";
// import { useRef } from "react";

// interface StepsProps {
//   onFocus?: () => void;
// }

// const UploadFilesSeciton = ({ onFocus }: StepsProps) => {
//   const {
//     // imageFile,
//     // passengerFile,
//     wheelchair,
//     additionalRequirements,
//     setImageFile,
//     setPassengerFile,
//     setWheelchair,
//     setAdditionalRequirements,
//   } = useAdditionalServicesStore();

//   const passengerFileRef = useRef<HTMLInputElement>(null);
//   const ticketFileRef = useRef<HTMLInputElement>(null);

//   const handlePassengerFileSelect = (
//     e: React.ChangeEvent<HTMLInputElement>,
//   ) => {
//     const file = e.target.files?.[0] || null;
//     setPassengerFile(file);
//   };

//   const handleTicketUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0] || null;
//     if (!file) return;

//     setImageFile(file);
//   };

//   return (
//     <div
//       onClick={() => {
//         onFocus?.();
//       }}
//       style={{
//         boxShadow: "0px 11.48px 114.76px 0px #A7A7A73D",
//       }}
//       className="px-10 py-6 bg-white rounded-2xl "
//     >
//       <h4 className="font-manrope font-medium text-[18.75px] leading-[1.3] tracking-normal">
//         Additional Services & Information
//       </h4>
//       <span className="inline-block w-full h-0.5 bg-[#CFCFCF]" />
//       <div className="space-y-4 mt-4">
//         <div className="p-4 space-y-4 bg-[#F4F4F4] border border-[#E0E0E0] rounded-lg">
//           <p className="text-sm">
//             Please download the passenger data form, fill it out, and upload it
//             below:
//           </p>

//           <p className="text-[#7B5A41] flex items-center gap-2 font-bold cursor-pointer">
//             <ArrowDownToLineIcon className="inline" />
//             Download passenger data file
//           </p>

//           {/* Hidden input */}
//           <input
//             ref={passengerFileRef}
//             type="file"
//             accept=".pdf,.xlsx,.xls,.csv"
//             hidden
//             onChange={handlePassengerFileSelect}
//           />
//           <Button
//             type="button"
//             onClick={() => passengerFileRef.current?.click()}
//             style={{
//               background:
//                 "linear-gradient(179.26deg, #7B5A41 0.64%, #DFB08D 223.79%)",
//               border: "1.26px solid #966B4B",
//             }}
//             className="cursor-pointer h-7 font-[Manrope] py-0 px-8 rounded-full text-white"
//           >
//             Choose File <UploadCloud />
//           </Button>
//         </div>
//         <div className="p-4 space-y-4 bg-[#F4F4F4] border border-[#E0E0E0] rounded-lg">
//           <p className="text-sm">
//             Upload your tickets now, or we'll contact you later.
//             <br />
//             Drag & drop or click to upload.
//             <br />
//             Formats: JPEG, PNG, PDF.
//           </p>

//           <p className="text-[#7B5A41] flex items-center gap-2 font-bold">
//             <ArrowDownToLineIcon className="inline" />
//             Upload your Flight Tickets (optional)
//           </p>

//           <input
//             ref={ticketFileRef}
//             hidden
//             type="file"
//             accept="image/jpeg,image/png,application/pdf"
//             onChange={handleTicketUpload}
//           />

//           <Button
//             type="button"
//             onClick={() => ticketFileRef.current?.click()}
//             style={{
//               background:
//                 "linear-gradient(179.26deg, #7B5A41 0.64%, #DFB08D 223.79%)",
//               border: "1.26px solid #966B4B",
//             }}
//             className="cursor-pointer h-7 font-[Manrope] py-0 px-8 rounded-full text-white"
//           >
//             Choose File <UploadCloud />
//           </Button>
//         </div>

//         <div className="flex items-start gap-3">
//           <Checkbox
//             id="wheelchair"
//             name="wheelchair"
//             checked={wheelchair}
//             onCheckedChange={(value) => setWheelchair(Boolean(value))}
//             className="w-6 h-6 rounded-md bg-[#F4F4F4]
//             data-[state=checked]:bg-[#664F31]
//             data-[state=checked]:border-[#664F31]"
//           />

//           <Label
//             htmlFor="wheelchair"
//             className="text-sm leading-relaxed cursor-pointer"
//           >
//             Wheelchair requested from the airline
//           </Label>
//         </div>
//         <div className="flex items-center gap-4 rounded-lg bg-[#FFFBEF] px-4 py-3 border border-[#7B5A414D] text-[#7B5A41]">
//           <div className="min-w-6 w-6 min-h-6 h-6 text-lg bg-[#7B5A41] rounded-full grid place-content-center">
//             <p className="text-white">!</p>
//           </div>
//           <p>
//             Wheelchair assistance must be arranged directly with your airline.
//             By ticking this box, you confirm that you have selected wheelchair
//             assistance on your flight booking.
//           </p>
//         </div>

//         <div className="space-y-2 md:col-span-2">
//           <Label htmlFor="additionalRequirements" className="gap-0">
//             Additional requirements
//             <span className="text-sm text-muted-foreground">(optional)</span>
//           </Label>
//           <Textarea
//             id="additionalRequirements"
//             name="additionalRequirements"
//             value={additionalRequirements}
//             onChange={(e) => setAdditionalRequirements(e.target.value)}
//             placeholder="Any Special Notes"
//             className="pl-4 pr-10 bg-[#F4F4F4] border border-[#E0E0E0]"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UploadFilesSeciton;

// "use client";

// import React, { forwardRef, useImperativeHandle, useRef } from "react";
// import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { useAdditionalServicesStore } from "@/store/useAdditionalServices";
// import { ArrowDownToLineIcon, UploadCloud } from "lucide-react";

// // Ref handle type
// export type UploadFilesSectionHandle = {
//   isValid: () => boolean;
// };

// interface StepsProps {
//   onFocus?: () => void;
// }

// const UploadFilesSeciton = forwardRef<UploadFilesSectionHandle, StepsProps>(
//   ({ onFocus }, ref) => {
//     const {
//       wheelchair,
//       additionalRequirements,
//       setImageFile,
//       setPassengerFile,
//       setWheelchair,
//       setAdditionalRequirements,
//       // imageFile, passengerFile
//     } = useAdditionalServicesStore();

//     const passengerFileRef = useRef<HTMLInputElement>(null);
//     const ticketFileRef = useRef<HTMLInputElement>(null);

//     // Expose isValid to parent
//     useImperativeHandle(ref, () => ({
//       isValid: () => {
//         // Example validation: passenger file is required
//         return !!passengerFileRef.current?.files?.[0];
//       },
//     }));

//     const handlePassengerFileSelect = (
//       e: React.ChangeEvent<HTMLInputElement>,
//     ) => {
//       const file = e.target.files?.[0] || null;
//       setPassengerFile(file);
//     };

//     const handleTicketUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//       const file = e.target.files?.[0] || null;
//       if (!file) return;
//       setImageFile(file);
//     };

//     return (
//       <div
//         onClick={() => {
//           onFocus?.();
//         }}
//         style={{
//           boxShadow: "0px 11.48px 114.76px 0px #A7A7A73D",
//         }}
//         className="px-10 py-6 bg-white rounded-2xl"
//       >
//         <h4 className="font-manrope font-medium text-[18.75px] leading-[1.3] tracking-normal">
//           Additional Services & Information
//         </h4>
//         <span className="inline-block w-full h-0.5 bg-[#CFCFCF]" />
//         <div className="space-y-4 mt-4">
//           {/* Passenger File */}
//           <div className="p-4 space-y-4 bg-[#F4F4F4] border border-[#E0E0E0] rounded-lg">
//             <p className="text-sm">
//               Please download the passenger data form, fill it out, and upload
//               it below:
//             </p>

//             <p className="text-[#7B5A41] flex items-center gap-2 font-bold cursor-pointer">
//               <ArrowDownToLineIcon className="inline" />
//               Download passenger data file
//             </p>

//             <input
//               ref={passengerFileRef}
//               type="file"
//               accept=".pdf,.xlsx,.xls,.csv"
//               hidden
//               onChange={handlePassengerFileSelect}
//             />
//             <Button
//               type="button"
//               onClick={() => passengerFileRef.current?.click()}
//               style={{
//                 background:
//                   "linear-gradient(179.26deg, #7B5A41 0.64%, #DFB08D 223.79%)",
//                 border: "1.26px solid #966B4B",
//               }}
//               className="cursor-pointer h-7 font-[Manrope] py-0 px-8 rounded-full text-white"
//             >
//               Choose File <UploadCloud />
//             </Button>
//           </div>

//           {/* Ticket Upload */}
//           <div className="p-4 space-y-4 bg-[#F4F4F4] border border-[#E0E0E0] rounded-lg">
//             <p className="text-sm">
//               Upload your tickets now, or we'll contact you later.
//               <br />
//               Drag & drop or click to upload.
//               <br />
//               Formats: JPEG, PNG, PDF.
//             </p>

//             <p className="text-[#7B5A41] flex items-center gap-2 font-bold">
//               <ArrowDownToLineIcon className="inline" />
//               Upload your Flight Tickets (optional)
//             </p>

//             <input
//               ref={ticketFileRef}
//               hidden
//               type="file"
//               accept="image/jpeg,image/png"
//               onChange={handleTicketUpload}
//             />

//             <Button
//               type="button"
//               onClick={() => ticketFileRef.current?.click()}
//               style={{
//                 background:
//                   "linear-gradient(179.26deg, #7B5A41 0.64%, #DFB08D 223.79%)",
//                 border: "1.26px solid #966B4B",
//               }}
//               className="cursor-pointer h-7 font-[Manrope] py-0 px-8 rounded-full text-white"
//             >
//               Choose File <UploadCloud />
//             </Button>
//           </div>

//           {/* Wheelchair */}
//           <div className="flex items-start gap-3">
//             <Checkbox
//               id="wheelchair"
//               name="wheelchair"
//               checked={wheelchair}
//               onCheckedChange={(value) => setWheelchair(Boolean(value))}
//               className="w-6 h-6 rounded-md bg-[#F4F4F4]
//                 data-[state=checked]:bg-[#664F31]
//                 data-[state=checked]:border-[#664F31]"
//             />

//             <Label
//               htmlFor="wheelchair"
//               className="text-sm leading-relaxed cursor-pointer"
//             >
//               Wheelchair requested from the airline
//             </Label>
//           </div>

//           <div className="space-y-2 md:col-span-2">
//             <Label htmlFor="additionalRequirements" className="gap-0">
//               Additional requirements
//               <span className="text-sm text-muted-foreground">(optional)</span>
//             </Label>
//             <Textarea
//               id="additionalRequirements"
//               name="additionalRequirements"
//               value={additionalRequirements}
//               onChange={(e) => setAdditionalRequirements(e.target.value)}
//               placeholder="Any Special Notes"
//               className="pl-4 pr-10 bg-[#F4F4F4] border border-[#E0E0E0]"
//             />
//           </div>
//         </div>
//       </div>
//     );
//   },
// );

// UploadFilesSeciton.displayName = "UploadFilesSeciton";

// export default UploadFilesSeciton;

"use client";

import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAdditionalServicesStore } from "@/store/useAdditionalServices";
import { ArrowDownToLineIcon, UploadCloud, FileText, X } from "lucide-react";
export type UploadFilesData = {
  wheelchair: boolean;
  additionalRequirements: string;
  passengerFile: File | null;
  imageFile: File | null;
};
// Ref handle type
export type UploadFilesSectionHandle = {
  isValid: () => boolean;
  getData: () => UploadFilesData;
};

interface StepsProps {
  onFocus?: () => void;
}

const UploadFilesSection = forwardRef<UploadFilesSectionHandle, StepsProps>(
  ({ onFocus }, ref) => {
    const {
      wheelchair,
      additionalRequirements,
      imageFile,
      passengerFile,
      setImageFile,
      setPassengerFile,
      setWheelchair,
      setAdditionalRequirements,
    } = useAdditionalServicesStore();

    const passengerFileRef = useRef<HTMLInputElement>(null);
    const ticketFileRef = useRef<HTMLInputElement>(null);

    // Expose isValid to parent
    useImperativeHandle(ref, () => ({
      isValid: () => {
        return !!passengerFile;
      },

      getData: () => {
        return {
          wheelchair: wheelchair ?? false,
          additionalRequirements: additionalRequirements ?? "",
          passengerFile: passengerFile ?? null,
          imageFile: imageFile ?? null,
        };
      },
    }));

    const handlePassengerFileSelect = (
      e: React.ChangeEvent<HTMLInputElement>,
    ) => {
      const file = e.target.files?.[0] || null;
      setPassengerFile(file);
    };

    const handleTicketUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] || null;
      if (!file) return;
      setImageFile(file);
    };

    const handleRemovePassengerFile = () => {
      setPassengerFile(null);
      if (passengerFileRef.current) {
        passengerFileRef.current.value = "";
      }
    };

    const handleRemoveTicketFile = () => {
      setImageFile(null);
      if (ticketFileRef.current) {
        ticketFileRef.current.value = "";
      }
    };

    const formatFileSize = (bytes: number) => {
      if (bytes < 1024) return bytes + " B";
      if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
      return (bytes / (1024 * 1024)).toFixed(1) + " MB";
    };

    return (
      <div
        onClick={() => {
          onFocus?.();
        }}
        style={{
          boxShadow: "0px 11.48px 114.76px 0px #A7A7A73D",
        }}
        className="px-10 py-6 bg-white rounded-2xl"
      >
        <h4 className="font-manrope font-medium text-[18.75px] leading-[1.3] tracking-normal">
          Additional Services & Information
        </h4>
        <span className="inline-block w-full h-0.5 bg-[#CFCFCF]" />

        <div className="gap-6 mt-4">
          {/* Upload Forms */}
          <div className="space-y-4">
            {/* Passenger File - Show upload section OR file display */}
            {!passengerFile ? (
              <div className="p-4 space-y-4 bg-[#F4F4F4] border border-[#E0E0E0] rounded-lg">
                <p className="text-sm">
                  Please download the passenger data form, fill it out, and
                  upload it below:
                </p>

                <p className="text-[#7B5A41] flex items-center gap-2 font-bold cursor-pointer">
                  <ArrowDownToLineIcon className="inline" />
                  Download passenger data file
                </p>

                <input
                  ref={passengerFileRef}
                  type="file"
                  accept=".pdf,.xlsx,.xls,.csv"
                  hidden
                  onChange={handlePassengerFileSelect}
                />
                <Button
                  type="button"
                  onClick={() => passengerFileRef.current?.click()}
                  style={{
                    background:
                      "linear-gradient(179.26deg, #7B5A41 0.64%, #DFB08D 223.79%)",
                    border: "1.26px solid #966B4B",
                  }}
                  className="cursor-pointer h-7 font-[Manrope] py-0 px-8 rounded-full text-white"
                >
                  Choose File <UploadCloud />
                </Button>
              </div>
            ) : (
              <div className="p-4 bg-[#F4F4F4] border border-[#E0E0E0] shadow-xs rounded-lg">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className="flex-shrink-0 w-10 h-10 bg-[#7B5A41] rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#664F31] truncate">
                        {passengerFile.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatFileSize(passengerFile.size)}
                      </p>
                      <p className="text-xs text-[#7B5A41] mt-1 font-medium">
                        Passenger Data Form
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemovePassengerFile}
                    className="flex-shrink-0 p-1 hover:bg-red-100 rounded-full transition-colors"
                    aria-label="Remove file"
                  >
                    <X className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>
            )}

            {/* Ticket Upload - Show upload section OR file display */}
            {!imageFile ? (
              <div className="p-4 space-y-4 bg-[#F4F4F4] border border-[#E0E0E0] rounded-lg">
                <p className="text-sm">
                  Upload your tickets now, or we'll contact you later.
                  <br />
                  Drag & drop or click to upload.
                  <br />
                  Formats: JPEG, PNG, PDF.
                </p>

                <p className="text-[#7B5A41] flex items-center gap-2 font-bold">
                  <ArrowDownToLineIcon className="inline" />
                  Upload your Flight Tickets (optional)
                </p>

                <input
                  ref={ticketFileRef}
                  hidden
                  type="file"
                  accept="image/jpeg,image/png,application/pdf"
                  onChange={handleTicketUpload}
                />

                <Button
                  type="button"
                  onClick={() => ticketFileRef.current?.click()}
                  style={{
                    background:
                      "linear-gradient(179.26deg, #7B5A41 0.64%, #DFB08D 223.79%)",
                    border: "1.26px solid #966B4B",
                  }}
                  className="cursor-pointer h-7 font-[Manrope] py-0 px-8 rounded-full text-white"
                >
                  Choose File <UploadCloud />
                </Button>
              </div>
            ) : (
              <div className="p-4 bg-[#F4F4F4] border border-[#E0E0E0] shadow-xs rounded-lg">
                <div className="flex items-start justify-between gap-3 ">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className="flex-shrink-0 w-10 h-10 bg-[#7B5A41] rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#664F31] truncate">
                        {imageFile.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatFileSize(imageFile.size)}
                      </p>
                      <p className="text-xs text-[#7B5A41] mt-1 font-medium">
                        Flight Ticket
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveTicketFile}
                    className="flex-shrink-0 p-1 hover:bg-red-100 rounded-full transition-colors"
                    aria-label="Remove file"
                  >
                    <X className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>
            )}

            {/* Wheelchair */}
            <div className="flex items-start gap-3">
              <Checkbox
                id="wheelchair"
                name="wheelchair"
                checked={wheelchair}
                onCheckedChange={(value) => setWheelchair(Boolean(value))}
                className="w-6 h-6 rounded-md bg-[#F4F4F4] 
                  data-[state=checked]:bg-[#7B5A41] 
                  data-[state=checked]:border-[#7B5A41]"
              />

              <Label
                htmlFor="wheelchair"
                className="text-sm leading-relaxed cursor-pointer"
              >
                Wheelchair requested from the airline
              </Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="additionalRequirements" className="gap-0">
                Additional requirements
                <span className="text-sm text-muted-foreground ml-1">
                  (optional)
                </span>
              </Label>
              <Textarea
                id="additionalRequirements"
                name="additionalRequirements"
                value={additionalRequirements}
                onChange={(e) => setAdditionalRequirements(e.target.value)}
                placeholder="Any Special Notes"
                className="pl-4 pr-10 bg-[#F4F4F4] border border-[#E0E0E0]"
              />
            </div>
          </div>
        </div>
      </div>
    );
  },
);

UploadFilesSection.displayName = "UploadFilesSection";

export default UploadFilesSection;
