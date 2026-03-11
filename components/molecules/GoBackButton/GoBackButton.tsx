'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/atoms";

export const GoBackButton = () => {
  const router = useRouter();
  const t = useTranslations("goBackButton");
  const [isInternal, setIsInternal] = useState(false);

  useEffect(() => {
    const referrer = document.referrer;
    if (referrer && referrer.startsWith(window.location.origin)) {
      setIsInternal(true);
    }
  }, []);

  const handleNavigation = () => {
    if (isInternal && window.history.length > 1) {
      router.back();
    } else {
      router.push("/connect"); 
    }
  };

  return (
    <Button onClick={handleNavigation} variant="outline" className="mt-4">
      {t("label")}
    </Button>
  );
};