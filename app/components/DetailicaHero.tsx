"use client";

import { motion } from "framer-motion";
import Link from "next/link";

function HeroButton({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}) {
  const base =
    "inline-flex h-11 items-center justify-center border px-5 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black";

  const styles = {
    primary: "border-gray-950 bg-gray-950 text-white hover:bg-black/70",
    secondary:
      "border-gray-300 bg-white/80 text-gray-950 hover:border-gray-950 hover:bg-white",
  };

  return (
    <Link href={href} className={`${base} ${styles[variant]}`}>
      {children}
    </Link>
  );
}

export function DetailicaHero() {
  return (
    <section
      aria-labelledby="detailica-hero-title"
      className="relative overflow-hidden bg-white"
    >
      {/* Desktop / tablet background */}
      <div
        aria-hidden="true"
        className="absolute inset-2 bottom-0 mx-auto hidden max-w-7xl rounded-4xl bg-[#d8d4d4] bg-[url('/24.jpg')] bg-contain bg-right bg-no-repeat ring-1 ring-inset ring-black/5 md:block"
      />

      {/* Desktop / tablet overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-2 bottom-0 mx-auto hidden max-w-7xl rounded-4xl bg-[radial-gradient(circle_at_18%_28%,rgba(255,255,255,0.82)_0%,rgba(255,255,255,0.62)_28%,rgba(255,255,255,0.25)_48%,rgba(255,255,255,0)_70%)] md:block"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Mobile: whole hero inside grey rounded block */}
        <div className="rounded-4xl bg-[#d8d4d4] p-3 ring-1 ring-inset ring-black/5 md:bg-transparent md:p-0 md:ring-0">
          <div className="pt-0 pb-10 md:py-24">
            {/* Mobile image first */}
            <div
              aria-hidden="true"
              className="mb-10 aspect-4/3 rounded-3xl bg-[url('/25.jpg')] bg-contain bg-center bg-no-repeat md:hidden"
            />

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="max-w-4xl px-1 md:px-0 "
            >
              <p className="text-base font-medium uppercase tracking-[0.22em] text-gray-950/60">
                Detailica
              </p>

              <h1
                id="detailica-hero-title"
                className="mt-5 text-4xl font-semibold text-gray-950  lg:text-5xl lg:max-w-full max-w-lg"
              >
                Supporting Architecture and Engineering Teams Across
                International Projects
              </h1>

              <p className="mt-6 w-full text-lg leading-7 font-light text-gray-600 text-balance md:max-w-lg lg:max-w-2xl">
                DETAILICA acts as an integrated project partner, supporting
                architecture and engineering teams with documentation, modelling
                and technical project development across international markets.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <HeroButton href="/services">Explore services</HeroButton>

                <HeroButton href="/contact" variant="secondary">
                  Let’s collaborate
                </HeroButton>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
