import { Calendar as CalendarUI } from "@/components/ui/calendar";
import { FormControl } from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import moment from "moment";
import { useState } from "react";

interface Props {
  field: {
    value: string;
    onChange: (value: string) => void;
  };
}

export const Calendar: React.FC<Props> = ({ field }) => {
  const { value, onChange } = field;
  const [isOpen, setIsOpen] = useState(false);
  const defaultDate = value ? moment(value, "DD.MM.YYYY") : undefined;
  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    onChange(date.toLocaleDateString()); // Форматируем дату в строку
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant={"outline"}
            className={cn("h-12 pl-3 text-left text-md w-full justify-start")}
          >
            {value ?? value}
            <CalendarIcon className="h-5 w-5 cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 opacity-30 hover:opacity-100" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <CalendarUI
          mode="single"
          selected={defaultDate}
          onSelect={handleDateSelect}
          captionLayout="dropdown-buttons"
          fromYear={1950}
          toYear={new Date().getFullYear()}
          showOutsideDays={false}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};
