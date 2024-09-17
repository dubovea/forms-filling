import { X } from "lucide-react";
import React from "react";

interface Props {
  className?: string;
  onClick?: VoidFunction;
}

export const ClearButton: React.FC<Props> = ({ onClick}) => {
  return (
    <X
      className="h-5 w-5 cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 opacity-30 hover:opacity-100 cursor-pointer"
      onClick={onClick}
    />
  );
};
