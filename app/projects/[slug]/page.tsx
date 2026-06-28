"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useRef, useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { projects } from "@/app/data/projects";

export default function ProjectPage() {
  const params = useParams<{ slug: string }>();
  const project = projects.find((project) => project.slug === params.slug);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!project) {
    notFound();
  }

  const scrollToImage = (direction: "prev" | "next") => {
    const container = scrollRef.current;

    if (!container) return;

    const nextIndex =
      direction === "next"
        ? Math.min(currentIndex + 1, project.images.length - 1)
        : Math.max(currentIndex - 1, 0);

    const target = container.children[nextIndex] as HTMLElement | undefined;

    if (!target) return;

    target.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });

    setCurrentIndex(nextIndex);
  };

  return (
    <main className="bg-white text-gray-950">
      <section className="pt-6 sm:pt-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-gray-950"
          >
            <ArrowLeftIcon className="size-4" />
            Back to projects
          </Link>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-x-12 gap-y-12 lg:grid-cols-[1fr_420px] lg:gap-x-16">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500">
                {project.shortTitle}
              </p>

              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
                {project.title}
              </h1>

              <p className="mt-4 text-xl font-medium uppercase tracking-tight text-gray-800">
                {project.stage}
              </p>
            </div>

            <div className="hidden lg:block" />

            <div className="border-t border-gray-950 pt-8">
              <div className="grid gap-8 text-base leading-8 text-gray-700 md:grid-cols-2">
                <p>{project.description}</p>
                <p>{project.challenge}</p>
              </div>
            </div>

            <aside className="border-t border-gray-950 pt-8">
              <dl className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-2">
                <div>
                  <dt className="font-semibold text-gray-950">Location</dt>
                  <dd className="mt-1 text-gray-700">{project.location}</dd>
                </div>

                <div>
                  <dt className="font-semibold text-gray-950">Status</dt>
                  <dd className="mt-1 text-gray-700">{project.status}</dd>
                </div>

                <div>
                  <dt className="font-semibold text-gray-950">Completed</dt>
                  <dd className="mt-1 text-gray-700">{project.year}</dd>
                </div>

                <div>
                  <dt className="font-semibold text-gray-950">Size</dt>
                  <dd className="mt-1 text-gray-700">
                    {project.area.toLocaleString("en-US")} {project.areaUnit}
                  </dd>
                </div>

                <div className="sm:col-span-2">
                  <dt className="font-semibold text-gray-950">Stage</dt>
                  <dd className="mt-1 text-gray-700">{project.stage}</dd>
                </div>
              </dl>
            </aside>
          </div>

          {project.images.length > 0 && (
            <section className="mt-16 lg:mt-24" aria-label="Project gallery">
              <div className="-mx-4 overflow-hidden px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                <div
                  ref={scrollRef}
                  className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-4 scrollbar-none [&::-webkit-scrollbar]:hidden"
                >
                  {project.images.map((image, index) => (
                    <div
                      key={image}
                      className="relative aspect-4/3 w-[82vw] shrink-0 snap-start overflow-hidden bg-gray-100 sm:w-[48vw] lg:w-[32vw]"
                    >
                      <Image
                        src={image}
                        alt={`${project.title} image ${index + 1}`}
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
                    disabled={currentIndex === project.images.length - 1}
                    className="transition hover:text-gray-950 disabled:pointer-events-none disabled:opacity-30"
                    aria-label="Next image"
                  >
                    →
                  </button>

                  <span>
                    {currentIndex + 1}/{project.images.length}
                  </span>
                </div>
              </div>
            </section>
          )}
        </div>
      </section>
    </main>
  );
}
