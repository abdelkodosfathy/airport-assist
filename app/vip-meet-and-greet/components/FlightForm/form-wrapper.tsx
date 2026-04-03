const FormWrapper = ({ children }: { children: React.ReactNode }) => (
  <div
    className="px-10 py-6 bg-white rounded-2xl"
    style={{ boxShadow: "0px 11.48px 114.76px 0px #A7A7A73D" }}
  >
    <h4 className="font-manrope font-medium text-[18.75px]">
      Flight Information
    </h4>
    <span className="inline-block w-full h-0.5 bg-[#CFCFCF]" />
    <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-6">{children}</div>
  </div>
);

export default FormWrapper;
