import Image from "next/image";
import Link from "next/link";
import { ArrowLongRightIcon } from "@heroicons/react/20/solid";
import { projects } from "@/app/data/projects";

export default function ProjectsPage() {
  return (
    <main className="bg-white">
      <section className="py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500">
              Projects
            </p>

            <h1 className="mt-4 max-w-4xl text-5xl font-semibold tracking-tight text-gray-950 text-balance sm:text-7xl">
              Selected project experience
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
              A closer look at the project types, delivery stages, and technical
              workflows we support across architecture, engineering, and BIM
              documentation.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-16 sm:mt-20 lg:grid-cols-3">
            {projects.map((project) => {
              const href = project.link || `/projects/${project.slug}`;
              const imageUrl = project.coverImage || project.images[0];

              return (
                <article
                  key={project.slug}
                  className="group flex flex-col bg-white"
                >
                  <Link href={href} className="relative block overflow-hidden">
                    <Image
                      src={imageUrl}
                      alt={project.title}
                      width={800}
                      height={520}
                      className="aspect-4/3 w-full object-contain transition duration-500 group-hover:scale-105"
                    />
                    {/* 
                    <div className="absolute inset-0 ring-1 ring-inset ring-black/10" /> */}
                  </Link>

                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex flex-wrap items-center gap-3 text-xs">
                      <span className="font-medium uppercase tracking-[0.2em] text-gray-500">
                        {project.shortTitle}
                      </span>

                      <span className="text-gray-300">/</span>

                      <span className="text-gray-500">{project.location}</span>

                      <span className="text-gray-300">/</span>

                      <span className="text-gray-500">{project.year}</span>
                    </div>

                    <h2 className="mt-4 text-xl font-semibold tracking-tight text-gray-950">
                      <Link
                        href={href}
                        className="transition group-hover:text-gray-600"
                      >
                        {project.title}
                      </Link>
                    </h2>

                    <div className="mt-4 flex flex-wrap gap-2 text-xs text-gray-600">
                      <span className="border border-black/10 px-2 py-1">
                        {project.area.toLocaleString()} {project.areaUnit}
                      </span>

                      <span className="border border-black/10 px-2 py-1">
                        {project.status}
                      </span>

                      <span className="border border-black/10 px-2 py-1">
                        {project.stage}
                      </span>
                    </div>

                    <p className="mt-4 line-clamp-3 text-sm leading-6 text-gray-600 max-w-2xl">
                      {project.description}
                    </p>

                    <div className="mt-auto pt-8">
                      <Link
                        href={href}
                        className="inline-flex items-center gap-2 text-sm font-medium text-gray-950"
                      >
                        View project
                        <ArrowLongRightIcon className="size-5" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
