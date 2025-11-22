'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { CalendarIcon, Clock } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';

interface DateTimePickerProps {
  date: Date | null;
  setDate: (date: Date | null) => void;
  minDate?: Date;
  className?: string;
}

export function DateTimePicker({
  date,
  setDate,
  minDate,
  className,
}: DateTimePickerProps) {
  const [open, setOpen] = React.useState(false);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (!selectedDate) {
      setDate(null);
      return;
    }

    const newDate = new Date(selectedDate);
    // Preserve existing time if available, otherwise default to 9:00 AM
    if (date) {
      newDate.setHours(date.getHours(), date.getMinutes());
    } else {
      newDate.setHours(9, 0); // Default to 9:00 AM
    }
    setDate(newDate);
  };

  const handleTimeSelect = (time: string) => {
    if (!date) return;

    const [hours, minutes] = time.split(':').map(Number);
    const newDate = new Date(date);
    newDate.setHours(hours, minutes);
    setDate(newDate);
  };

  // Generate time slots in 30 minute increments
  const timeSlots = React.useMemo(() => {
    const slots = [];
    for (let i = 0; i < 24; i++) {
      for (let j = 0; j < 60; j += 30) {
        const hour = i.toString().padStart(2, '0');
        const minute = j.toString().padStart(2, '0');
        slots.push(`${hour}:${minute}`);
      }
    }
    return slots;
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'w-full justify-start text-left font-normal rounded-xl px-4 py-3 text-sm h-auto',
            !date && 'text-muted-foreground',
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, 'PPP p') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 flex" align="start" side="bottom" sideOffset={8}>
        <div className="p-3 border-r border-border">
          <Calendar
            mode="single"
            selected={date || undefined}
            onSelect={handleDateSelect}
            disabled={(date) => {
              if (!minDate) return false;
              const minDateStart = new Date(minDate);
              minDateStart.setHours(0, 0, 0, 0);
              const checkDate = new Date(date);
              checkDate.setHours(0, 0, 0, 0);
              return checkDate < minDateStart;
            }}
            initialFocus
            className="p-0"
          />
        </div>
        <div className="w-[160px] p-3">
          <div className="flex items-center gap-2 mb-3 px-1">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Time</span>
          </div>
          <ScrollArea className="h-[280px]">
            <div className="flex flex-col gap-1">
              {timeSlots.map((time) => {
                const [hours, minutes] = time.split(':').map(Number);
                const isSelected = date && date.getHours() === hours && date.getMinutes() === minutes;
                
                // Format time for display (e.g., "9:00 AM")
                const displayDate = new Date();
                displayDate.setHours(hours, minutes);
                const displayTime = format(displayDate, 'p');

                return (
                  <Button
                    key={time}
                    variant={isSelected ? "default" : "ghost"}
                    className={cn(
                      "justify-start font-normal h-8 px-2",
                      isSelected && "bg-primary text-primary-foreground"
                    )}
                    onClick={() => handleTimeSelect(time)}
                    disabled={!date}
                  >
                    {displayTime}
                  </Button>
                );
              })}
            </div>
          </ScrollArea>
        </div>
      </PopoverContent>
    </Popover>
  );
}


