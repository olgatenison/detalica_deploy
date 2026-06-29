"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { services } from "../data/services";

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[number];
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.5,
        delay: 0.12 + index * 0.08,
        ease: "easeOut",
      }}
      className="relative flex min-h-136 flex-col rounded-4xl border border-black/10 bg-white/95 p-8 shadow-xl shadow-black/5 ring-1 ring-black/5 backdrop-blur"
    >
      <p className="text-base font-semibold uppercase tracking-[0.2em] text-accent">
        {service.eyebrow}
      </p>

      <h3 className="mt-5 text-2xl font-semibold tracking-tight text-gray-950">
        {service.title}
      </h3>

      <p className="mt-4 text-base leading-7 text-gray-500">
        {service.shortDescription}
      </p>

      <div aria-hidden="true" className="mt-7 h-px w-full bg-accent" />

      <ul className="mt-8 space-y-4">
        {service.features.map((feature) => (
          <li
            key={feature}
            className="flex gap-3 text-sm leading-6 text-gray-600"
          >
            <span
              aria-hidden="true"
              className="mt-0.5 text-lg leading-none text-accent"
            >
              +
            </span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-10">
        <Link
          href={service.href}
          aria-label={`Read more about ${service.title}`}
          className="inline-flex h-11 w-full items-center justify-center border border-gray-950 bg-gray-950 px-5 text-base font-medium text-white transition hover:bg-black/70 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          Read more
        </Link>
      </div>
    </motion.article>
  );
}

export default function DetailicaServices() {
  return (
    <section
      aria-labelledby="core-services-title"
      className="relative overflow-hidden bg-white py-20 sm:py-28 lg:py-32"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-base font-medium uppercase tracking-widest text-gray-500">
            Core Services
          </p>

          <h2
            id="core-services-title"
            className="mt-5 text-4xl font-semibold text-gray-950 text-balance lg:text-5xl"
          >
            Documentation and BIM support for project delivery
          </h2>

          <p className="mt-6 mb-32 w-full text-lg leading-7 font-light text-gray-600 text-balance md:mx-auto md:max-w-lg sm:mb-0 lg:max-w-2xl">
            We support architecture and engineering teams with clear
            documentation, coordinated BIM workflows and reliable technical
            project delivery.
          </p>
        </motion.div>

        <div className="relative mx-auto mt-20 py-12 sm:mt-32 sm:py-16">
          <div
            aria-hidden="true"
            className="absolute inset-x-2 top-32 bottom-0 -mx-8 max-w-7xl rounded-4xl bg-[#d9d6d5] bg-cover bg-center bg-no-repeat ring-1 ring-inset ring-black/5"
          />

          <div className="relative -mt-32 mx-auto grid max-w-xl grid-cols-1 gap-6 md:max-w-lg lg:max-w-5xl lg:grid-cols-3">
            {services.map((service, index) => (
              <ServiceCard key={service.slug} service={service} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
