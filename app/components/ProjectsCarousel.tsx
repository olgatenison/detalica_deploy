"use client";

import * as Headless from "@headlessui/react";
import { ArrowLongRightIcon } from "@heroicons/react/20/solid";
import { clsx } from "clsx";
import {
  MotionValue,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  type HTMLMotionProps,
} from "framer-motion";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import useMeasure, { type RectReadOnly } from "react-use-measure";
import Link from "next/link";
import Image from "next/image";

import { projects } from "@/app/data/projects";

function ProjectCard({
  shortTitle,
  title,
  coverImage,
  slug,
  location,
  year,
  stage,
  area,
  areaUnit,
  bounds,
  scrollX,
  ...props
}: {
  shortTitle: string;
  title: string;
  coverImage: string;
  slug: string;
  location: string;
  year: string;
  stage: string;
  area: number;
  areaUnit: string;
  bounds: RectReadOnly;
  scrollX: MotionValue<number>;
} & HTMLMotionProps<"article">) {
  const [element, setElement] = useState<HTMLElement | null>(null);

  const computeOpacity = useCallback(() => {
    if (!element || bounds.width === 0) return 1;

    const rect = element.getBoundingClientRect();

    if (rect.left < bounds.left) {
      const diff = bounds.left - rect.left;
      const percent = diff / rect.width;
      return Math.max(0.5, 1 - percent);
    }

    if (rect.right > bounds.right) {
      const diff = rect.right - bounds.right;
      const percent = diff / rect.width;
      return Math.max(0.5, 1 - percent);
    }

    return 1;
  }, [element, bounds.width, bounds.left, bounds.right]);

  const opacity = useSpring(computeOpacity(), {
    stiffness: 154,
    damping: 23,
  });

  useLayoutEffect(() => {
    opacity.set(computeOpacity());
  }, [computeOpacity, opacity]);

  useMotionValueEvent(scrollX, "change", () => {
    opacity.set(computeOpacity());
  });

  return (
    <motion.article
      ref={setElement}
      style={{ opacity }}
      {...props}
      className="relative flex h-140 w-72 shrink-0 snap-start scroll-ml-(--scroll-padding) flex-col overflow-hidden border border-black/10 bg-white sm:w-96"
    >
      <div className="relative h-55 shrink-0 border-b border-black/10 bg-gray-100">
        <Image
          src={coverImage}
          alt={title}
          fill
          draggable={false}
          sizes="(min-width: 640px) 384px, 288px"
          className="select-none object-cover"
        />
      </div>

      <div className="flex min-h-0 flex-1 flex-col p-6">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-gray-500">
          {shortTitle}
        </p>

        <h3 className="mt-4 text-xl font-semibold text-gray-950 line-clamp-3">
          {title}
        </h3>

        <p className="mt-5 text-sm leading-6 text-gray-500">
          {location} · {year} · {area.toLocaleString("en-US")} {areaUnit}
        </p>

        <p className="mt-6 text-sm leading-6 text-gray-500 line-clamp-2">
          {stage}
        </p>

        <div className="mt-auto pt-6">
          <Link
            href={`/projects/${slug}`}
            className="inline-flex items-center gap-2 text-base font-medium text-gray-950"
          >
            View project
            <ArrowLongRightIcon className="size-5" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export function ProjectsCarousel() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const { scrollX } = useScroll({ container: scrollRef });
  const [setReferenceWindowRef, bounds] = useMeasure();
  const [activeIndex, setActiveIndex] = useState(0);

  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  useMotionValueEvent(scrollX, "change", (x) => {
    const firstChild = scrollRef.current?.children[0] as
      | HTMLElement
      | undefined;

    if (!firstChild) return;

    const gap = 32;
    const width = firstChild.clientWidth + gap;

    setActiveIndex(Math.round(x / width));
  });

  function scrollTo(index: number) {
    const firstChild = scrollRef.current?.children[0] as
      | HTMLElement
      | undefined;

    if (!scrollRef.current || !firstChild) return;

    const gap = 32;
    const width = firstChild.offsetWidth;

    scrollRef.current.scrollTo({
      left: (width + gap) * index,
      behavior: "smooth",
    });
  }

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (!scrollRef.current) return;

    isDraggingRef.current = true;
    startXRef.current = event.clientX;
    scrollLeftRef.current = scrollRef.current.scrollLeft;

    scrollRef.current.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!isDraggingRef.current || !scrollRef.current) return;

    const diff = event.clientX - startXRef.current;
    scrollRef.current.scrollLeft = scrollLeftRef.current - diff;
  }

  function handlePointerUp(event: React.PointerEvent<HTMLDivElement>) {
    if (!scrollRef.current) return;

    isDraggingRef.current = false;
    scrollRef.current.releasePointerCapture(event.pointerId);
  }

  function handlePointerLeave() {
    isDraggingRef.current = false;
  }

  return (
    <section className="overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div ref={setReferenceWindowRef}>
          <p className="text-base font-medium uppercase tracking-widest text-gray-500">
            Projects
          </p>

          <h2 className="mt-5 text-4xl font-semibold text-gray-950 text-balance lg:text-5xl">
            Selected project experience across documentation and BIM delivery
          </h2>

          <p className="mt-6 mb-32 w-full text-lg leading-7 font-light text-gray-600 text-balance md:max-w-lg sm:mb-0 lg:max-w-2xl">
            A look at the project types, delivery stages, and technical
            workflows we support for architecture, engineering, and construction
            teams.
          </p>
        </div>
      </div>

      <div
        ref={scrollRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerLeave={handlePointerLeave}
        className={clsx(
          "mt-6 md:mt-14 flex cursor-grab gap-8 px-(--scroll-padding) active:cursor-grabbing",
          "scrollbar-none select-none [&::-webkit-scrollbar]:hidden",
          "snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-smooth",
          "touch-pan-x",
          "[--scroll-padding:max(--spacing(4),calc((100vw-(var(--container-7xl)))/2))] sm:[--scroll-padding:max(--spacing(6),calc((100vw-(var(--container-7xl)))/2))] lg:[--scroll-padding:max(--spacing(8),calc((100vw-(var(--container-7xl)))/2))]",
        )}
      >
        {projects.map((project, index) => (
          <ProjectCard
            key={project.slug}
            {...project}
            bounds={bounds}
            scrollX={scrollX}
            onClick={() => scrollTo(index)}
          />
        ))}

        <div className="w-8 shrink-0 sm:w-32" />
      </div>

      <div className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-base font-medium text-gray-950"
          >
            View all projects
            <ArrowLongRightIcon className="size-5" />
          </Link>

          <div className="hidden gap-2 sm:flex">
            {projects.map((project, index) => (
              <Headless.Button
                key={project.slug}
                onClick={() => scrollTo(index)}
                data-active={activeIndex === index ? true : undefined}
                aria-label={`Scroll to ${project.title}`}
                className={clsx(
                  "size-2.5 border border-transparent bg-gray-300 transition",
                  "data-active:bg-gray-500 data-hover:bg-gray-400",
                  "forced-colors:data-active:bg-[Highlight] forced-colors:data-focus:outline-offset-4",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
