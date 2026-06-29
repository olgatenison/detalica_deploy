import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";

import { projects } from "@/app/data/projects";
import ProjectGallery from "../../components/ProjectGallery";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;

  const project = projects.find((project) => project.slug === slug);

  if (!project) {
    notFound();
  }

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
                  {project.area !== null && project.area !== undefined && (
                    <>
                      <dt className="text-sm font-medium text-gray-500">
                        Area
                      </dt>
                      <dd className="mt-1 text-gray-700">
                        {project.area.toLocaleString("en-US")}{" "}
                        {project.areaUnit}
                      </dd>
                    </>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <dt className="font-semibold text-gray-950">Stage</dt>
                  <dd className="mt-1 text-gray-700">{project.stage}</dd>
                </div>
              </dl>
            </aside>
          </div>

          {project.images.length > 0 && (
            <ProjectGallery title={project.title} images={project.images} />
          )}
        </div>
      </section>
    </main>
  );
}
