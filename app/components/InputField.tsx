/* ------------------ Reusable Input Component ------------------ */
interface InputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  error?: string;
}

export default function InputField({ icon, error, ...props }: InputFieldProps) {
  return (
    <div className="relative">
      {icon && (
        <span className="absolute left-3 top-3 text-custom-paynes-gray/70">
          {icon}
        </span>
      )}
      <input
        {...props}
        className={`w-full border ${
          error ? "border-red-400" : "border-slate-300"
        } rounded-xl pl-10 pr-3 py-3 text-sm 
          text-custom-paynes-gray placeholder-custom-paynes-gray/50
          focus:ring-2 focus:ring-custom-amber focus:outline-none`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}