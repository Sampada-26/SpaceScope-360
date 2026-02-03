import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "outline" | "glow";
};

export default function GlassButton({ variant = "outline", ...props }: Props) {
  const base =
    "px-4 py-2 rounded-full text-sm font-medium transition active:scale-[0.98]";
  const outline =
    "glass hover:bg-white/10 text-white/90";
  const glow =
    "bg-white/10 border border-white/15 shadow-glow hover:bg-white/14";

  return (
    <button
      {...props}
      className={`${base} ${variant === "glow" ? glow : outline} ${props.className ?? ""}`}
    />
  );
}
