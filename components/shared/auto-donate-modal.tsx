"use client";

import { useState, useEffect } from "react";
import DonationModal from "@/components/shared/donation-modal";

function AutoDonateModal() {
  const [open, setOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    if (hasShown) return;

    const timer = setTimeout(() => {
      setOpen(true);
      setHasShown(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, [hasShown]);

  return <DonationModal open={open} onOpenChange={setOpen} />;
}

export default AutoDonateModal;