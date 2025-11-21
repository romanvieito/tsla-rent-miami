'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

interface DateTimePickerProps {
  date: Date | null;
  setDate: (date: Date | null) => void;
  minDate?: Date;
  className?: string;
}

// Format a Date into the string format expected by `datetime-local` inputs.
function formatForInput(date: Date | null): string {
  if (!date) return '';

  const pad = (value: number) => String(value).padStart(2, '0');

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  // `datetime-local` expects "YYYY-MM-DDTHH:mm"
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

// Normalise the minimum date so that, like the previous implementation,
// it only restricts by *day* (at the start of that day).
function getMinInputValue(minDate?: Date): string {
  const base = minDate ? new Date(minDate) : new Date();
  base.setHours(0, 0, 0, 0);
  return formatForInput(base);
}

export function DateTimePicker({
  date,
  setDate,
  minDate,
  className,
}: DateTimePickerProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (!value) {
      setDate(null);
      return;
    }

    const next = new Date(value);

    if (Number.isNaN(next.getTime())) {
      setDate(null);
      return;
    }

    setDate(next);
  };

  const minString = React.useMemo(() => getMinInputValue(minDate), [minDate]);

  return (
    <input
      type="datetime-local"
      value={formatForInput(date)}
      onChange={handleChange}
      min={minString}
      className={cn(
        'w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/20',
        className
      )}
    />
  );
}


