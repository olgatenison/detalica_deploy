"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";

const stats = [
  {
    value: 140,
    suffix: "+",
    label: "Projects completed",
  },
  {
    value: 10,
    suffix: "",
    label: "Countries",
  },
  {
    value: 18,
    suffix: "+",
    label: "Years experience",
  },
  {
    value: 3,
    suffix: "",
    label: "Workflows",
  },
];

const workflowCards = [
  {
    eyebrow: "01 / EN Projects",
    title: "Eurocode-Based Workflows",
    text: "Experience working within Eurocode-oriented design environments, BIM coordination processes and multidisciplinary project teams across European projects.",
  },
  {
    eyebrow: "02 / KR Projects",
    title: "Ukrainian Project Experience",
    text: "Familiarity with Ukrainian documentation structure, sheet organization, annotation styles and residential/commercial drafting workflows.",
  },
  {
    eyebrow: "03 / US Projects",
    title: "US Documentation Experience",
    text: "Familiarity with US documentation structure, sheet organization, annotation styles and residential/commercial drafting workflows.",
  },
  {
    eyebrow: "BIM Delivery",
    title: "Multidisciplinary Workflows",
    text: "Revit-based coordination workflows, IFC exchange, model integration and production support within collaborative BIM environments.",
  },
];

function AnimatedNumber({
  value,
  suffix = "",
  label,
  start,
}: {
  value: number;
  suffix?: string;
  label: string;
  start: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();

  const motionValue = useMotionValue(shouldReduceMotion ? value : 0);
  const springValue = useSpring(motionValue, {
    damping: 28,
    stiffness: 90,
  });

  const rounded = useTransform(springValue, (latest) =>
    Math.round(latest).toLocaleString("en-US"),
  );

  useEffect(() => {
    if (shouldReduceMotion || start) {
      motionValue.set(value);
    }
  }, [motionValue, shouldReduceMotion, start, value]);

  const readableValue = `${value.toLocaleString("en-US")}${suffix}`;

  return (
    <span aria-label={`${readableValue} ${label}`}>
      <span aria-hidden="true">
        <motion.span>{rounded}</motion.span>
        {suffix}
      </span>
    </span>
  );
}

export function DetailicaIntroStats() {
  const shouldReduceMotion = useReducedMotion();

  const statsRef = useRef<HTMLDivElement | null>(null);
  const isStatsInView = useInView(statsRef, {
    once: true,
    amount: 0.2,
  });

  const fadeIn = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-80px" },
      };

  return (
    <section
      aria-labelledby="workflow-experience-title"
      className="relative overflow-hidden bg-white lg:pt-20 pt-16 "
    >
      <div className="mx-auto max-w-xl md:max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            {...fadeIn}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <p className="text-base font-medium tracking-widest text-gray-500 uppercase md:text-left text-center ">
              How We Integrate With Project Teams
            </p>

            <h2
              id="workflow-experience-title"
              className="mt-5 text-4xl font-semibold text-gray-950 text-balance lg:text-5xl  md:text-left text-center"
            >
              International Workflow Experience
            </h2>

            <p className="mt-6 w-full text-lg leading-7 font-light text-gray-600 text-balance md:max-w-lg lg:max-w-2xl  md:text-left text-center">
              Experience adapting documentation workflows to local standards,
              coordination practices and project delivery requirements across
              different regions.
            </p>
          </motion.div>

          <motion.div
            ref={statsRef}
            {...fadeIn}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <p className="text-base font-medium uppercase tracking-widest text-gray-500">
              The numbers
            </p>

            <hr className="mt-5 border-t border-gray-200" />

            <dl className="mt-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-2 gap-x-8 gap-y-5">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="border-b border-dotted border-gray-200 pb-5"
                >
                  <dt className="mt-2 text-sm leading-6 text-gray-600">
                    {stat.label}
                  </dt>

                  <dd className="order-first text-5xl font-medium tracking-tight text-gray-950 sm:text-6xl">
                    <AnimatedNumber
                      value={stat.value}
                      suffix={stat.suffix}
                      label={stat.label}
                      start={isStatsInView}
                    />
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>

        <motion.div
          {...fadeIn}
          transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
          className="mt-14"
        >
          <div className="grid grid-cols-1 gap-6 md:gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {workflowCards.map((card, index) => {
              const cardMotion = shouldReduceMotion
                ? {}
                : {
                    initial: { opacity: 0, y: 28 },
                    whileInView: { opacity: 1, y: 0 },
                    viewport: { once: true, margin: "-120px" },
                  };

              return (
                <motion.article
                  key={card.title}
                  {...cardMotion}
                  transition={{
                    duration: 0.5,
                    delay: 0.15 + index * 0.08,
                    ease: "easeOut",
                  }}
                  className="max-w-full sm:max-w-64 md:max-w-full min-h-40 lg:min-h-64 rounded-4xl sm:mb-0 mb-12"
                >
                  <p className="text-base font-medium uppercase tracking-[0.18em] text-accent">
                    {card.eyebrow}
                  </p>

                  <div
                    aria-hidden="true"
                    className="mt-5 h-px  w-12 bg-accent"
                  />

                  <h3 className="mt-6 text-xl font-semibold text-gray-950">
                    {card.title}
                  </h3>

                  <p className="mt-4 text-base leading-6 text-gray-500">
                    {card.text}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
