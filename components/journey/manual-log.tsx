"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ManualLogProps {
  onLog: (distanceKm: number) => void;
  disabled?: boolean;
}

function ManualLog({ onLog, disabled }: ManualLogProps) {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    const km = parseFloat(value);
    if (km > 0) {
      onLog(km);
      setValue("");
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs font-bold tracking-widest text-muted-foreground uppercase">
        Manual Log
      </p>
      <div className="flex gap-2">
        <Input
          type="number"
          step="0.1"
          min="0"
          placeholder="KM"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          disabled={disabled}
          className="h-12 text-lg"
        />
        <Button
          onClick={handleSubmit}
          disabled={disabled || !value || parseFloat(value) <= 0}
          className="h-12 px-6 text-base font-bold"
        >
          + Add
        </Button>
      </div>
    </div>
  );
}

export default ManualLog;
