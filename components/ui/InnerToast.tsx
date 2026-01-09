import { ReactNode } from "react";

const DefaultIcon = () => (
  <div className="min-w-6 w-6 min-h-6 h-6 text-lg bg-[#7B5A41] rounded-full grid place-content-center">
    <p className="text-white">!</p>
  </div>
);

const InnerToast = ({
  text,
  icon,
}: {
  text: string;
  icon?: ReactNode;
}) => (
  <div className="flex items-center mb-4 gap-4 rounded-lg bg-[#FFFBEF] px-4 py-3 border border-[#7B5A414D] text-[#7B5A41]">
    {icon ? icon : <DefaultIcon />}
    <p>{text}</p>
  </div>
);

export default InnerToast;
