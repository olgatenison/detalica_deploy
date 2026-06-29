"use client";

import Image from "next/image";
import { useRef, useState } from "react";

type ProjectGalleryProps = {
  title: string;
  images: string[];
};

export default function ProjectGallery({ title, images }: ProjectGalleryProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  function scrollToImage(direction: "prev" | "next") {
    const container = scrollRef.current;

    if (!container) return;

    const nextIndex =
      direction === "next"
        ? Math.min(currentIndex + 1, images.length - 1)
        : Math.max(currentIndex - 1, 0);

    const target = container.children[nextIndex] as HTMLElement | undefined;

    if (!target) return;

    target.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });

    setCurrentIndex(nextIndex);
  }

  return (
    <section className="mt-16 lg:mt-24" aria-label="Project gallery">
      <div className="-mx-4 overflow-hidden px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div
          ref={scrollRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-4 scrollbar-none [&::-webkit-scrollbar]:hidden"
        >
          {images.map((image, index) => (
            <div
              key={image}
              className="relative aspect-4/3 w-[82vw] shrink-0 snap-start overflow-hidden bg-gray-100 sm:w-[48vw] lg:w-[32vw]"
            >
              <Image
                src={image}
                alt={`${title} image ${index + 1}`}
                fill
                priority={index === 0}
                sizes="(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 82vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-5 text-sm text-gray-500">
          <button
            type="button"
            onClick={() => scrollToImage("prev")}
            disabled={currentIndex === 0}
            className="transition hover:text-gray-950 disabled:pointer-events-none disabled:opacity-30"
            aria-label="Previous image"
          >
            ←
          </button>

          <button
            type="button"
            onClick={() => scrollToImage("next")}
            disabled={currentIndex === images.length - 1}
            className="transition hover:text-gray-950 disabled:pointer-events-none disabled:opacity-30"
            aria-label="Next image"
          >
            →
          </button>

          <span>
            {currentIndex + 1}/{images.length}
          </span>
        </div>
      </div>
    </section>
  );
}
