"use client";

import { useState, useEffect } from "react";
import DonationModal from "@/components/shared/donation-modal";
import { trackEvent } from "@/lib/track";

function AutoDonateModal() {
  const [open, setOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    if (hasShown) return;

    const timer = setTimeout(() => {
      setOpen(true);
      setHasShown(true);
      trackEvent("auto_donate_modal_shown");
    }, 5000);

    return () => clearTimeout(timer);
  }, [hasShown]);

  return <DonationModal open={open} onOpenChange={setOpen} />;
}

export default AutoDonateModal;