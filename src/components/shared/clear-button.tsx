import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import React from "react";

interface Props {
  className?: string;
  disabled?: boolean;
  onClick?: VoidFunction;
}

export const ClearButton: React.FC<Props> = ({
  onClick,
  disabled,
  className,
}) => {
  return (
    <X
      className={cn(
        "h-5 w-5 cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 opacity-30 hover:opacity-100 cursor-pointer",
        disabled && "opacity-30 cursor-not-allowed pointer-events-none",
        className
      )}
      onClick={onClick}
    />
  );
};
