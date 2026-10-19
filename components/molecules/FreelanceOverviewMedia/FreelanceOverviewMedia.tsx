'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { IconButton } from '@/components/atoms';

interface FreelanceOverviewImage {
  src: string;
  alt: string;
}

interface FreelanceOverviewMediaProps {
  images: FreelanceOverviewImage[];
  previousLabel: string;
  nextLabel: string;
}

export function FreelanceOverviewMedia({
  images,
  previousLabel,
  nextLabel,
}: FreelanceOverviewMediaProps) {
  const validImages = images.length > 0 ? images : [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  const handlePrevious = useCallback(() => {
    setCurrentIndex((previous) => (previous === 0 ? validImages.length - 1 : previous - 1));
  }, [validImages.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((previous) => (previous === validImages.length - 1 ? 0 : previous + 1));
  }, [validImages.length]);

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    touchStartXRef.current = touch.clientX;
    touchStartYRef.current = touch.clientY;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartXRef.current == null || touchStartYRef.current == null) {
      return;
    }

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStartXRef.current;
    const deltaY = touch.clientY - touchStartYRef.current;

    touchStartXRef.current = null;
    touchStartYRef.current = null;

    if (Math.abs(deltaX) < 40 || Math.abs(deltaX) <= Math.abs(deltaY)) {
      return;
    }

    if (deltaX < 0) {
      handleNext();
      return;
    }

    handlePrevious();
  };

  useEffect(() => {
    if (validImages.length <= 1) {
      return;
    }

    const autoplayTimer = window.setInterval(() => {
      handleNext();
    }, 10000);

    return () => {
      window.clearInterval(autoplayTimer);
    };
  }, [handleNext, validImages.length]);

  if (validImages.length === 0) {
    return null;
  }

  if (validImages.length === 1) {
    const image = validImages[0];
    return (
      <div className="relative mb-6 aspect-[16/9] w-full overflow-hidden rounded-xl border border-border">
        <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 66vw, 100vw" className="object-cover" />
      </div>
    );
  }

  return (
    <div className="mb-6">
      <div
        className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-border"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex h-full w-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {validImages.map((image, index) => (
            <div key={`${image.src}-${index}`} className="relative h-full w-full shrink-0 grow-0 basis-full">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1024px) 66vw, 100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-3">
          <IconButton
            icon={ChevronLeft}
            label={previousLabel}
            variant="secondary"
            size="sm"
            className="pointer-events-auto"
            onClick={handlePrevious}
          />
          <IconButton
            icon={ChevronRight}
            label={nextLabel}
            variant="secondary"
            size="sm"
            className="pointer-events-auto"
            onClick={handleNext}
          />
        </div>
      </div>

      <div className="mt-3 flex justify-center gap-2">
        {validImages.map((image, index) => (
          <button
            key={`${image.src}-${index}`}
            type="button"
            aria-label={`${index + 1}`}
            onClick={() => setCurrentIndex(index)}
            className={`h-2.5 w-2.5 rounded-full transition-colors ${
              currentIndex === index ? 'bg-primary' : 'bg-border'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
