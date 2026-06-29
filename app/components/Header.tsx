"use client";

import { Fragment } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars2Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";
import { clsx } from "clsx";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const links = [
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About us" },
  { href: "/contact", label: "Contact" },
];

/* ---------- decorative plus-grid ---------- */

function PlusGridIcon({
  placement,
  className = "",
}: {
  placement: `${"top" | "bottom"} ${"left" | "right"}`;
  className?: string;
}) {
  const [yAxis, xAxis] = placement.split(" ");

  return (
    <svg
      viewBox="0 0 15 15"
      aria-hidden="true"
      className={clsx(
        "absolute size-3.75 fill-black/10",
        yAxis === "top" ? "-top-2" : "-bottom-2",
        xAxis === "left" ? "-left-2" : "-right-2",
        className,
      )}
    >
      <path d="M8 0H7V7H0V8H7V15H8V8H15V7H8V0Z" />
    </svg>
  );
}

function PlusGridItem({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={clsx("group/item relative", className)}>
      <PlusGridIcon
        placement="top left"
        className="hidden group-first/item:block"
      />
      <PlusGridIcon placement="top right" />
      <PlusGridIcon
        placement="bottom left"
        className="hidden group-first/item:group-last/row:block"
      />
      <PlusGridIcon
        placement="bottom right"
        className="hidden group-last/row:block"
      />
      {children}
    </div>
  );
}

function PlusGridRow({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={clsx(
        "group/row relative isolate pt-[calc(var(--spacing)*2+1px)] last:pb-[calc(var(--spacing)*2+1px)]",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2"
      >
        <div className="absolute inset-x-0 top-0 border-t border-black/5" />
        <div className="absolute inset-x-0 top-2 border-t border-black/5" />
        <div className="absolute inset-x-0 bottom-0 hidden border-b border-black/5 group-last/row:block" />
        <div className="absolute inset-x-0 bottom-2 hidden border-b border-black/5 group-last/row:block" />
      </div>

      {children}
    </div>
  );
}

/* ---------- desktop nav ---------- */

function DesktopNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Main navigation" className="relative hidden lg:flex">
      {links.map(({ href, label }) => {
        const active = pathname === href || pathname.startsWith(`${href}/`);

        return (
          <PlusGridItem key={href} className="flex">
            <Link
              href={href}
              aria-current={active ? "page" : undefined}
              suppressHydrationWarning
              className={clsx(
                "flex items-center px-4 py-3 text-base font-medium transition-colors hover:bg-black/2.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black",
                active ? "text-black" : "text-gray-500 hover:text-black",
              )}
            >
              {label}
            </Link>
          </PlusGridItem>
        );
      })}
    </nav>
  );
}

/* ---------- mobile nav ---------- */

function MobileNavButton({ open }: { open: boolean }) {
  return (
    <DisclosureButton
      className="relative flex size-12 items-center justify-center self-center rounded-lg data-hover:bg-black/5 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-black lg:hidden"
      aria-label={open ? "Close main menu" : "Open main menu"}
    >
      <AnimatePresence initial={false} mode="wait">
        {open ? (
          <motion.span
            key="close"
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.15 }}
          >
            <XMarkIcon className="size-6" aria-hidden="true" />
          </motion.span>
        ) : (
          <motion.span
            key="open"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <Bars2Icon className="size-6" aria-hidden="true" />
          </motion.span>
        )}
      </AnimatePresence>
    </DisclosureButton>
  );
}

function MobileNav() {
  const pathname = usePathname();

  return (
    <DisclosurePanel className="relative lg:hidden">
      <nav
        aria-label="Mobile navigation"
        className="flex flex-col gap-4 px-4 py-4 sm:px-6"
      >
        {links.map(({ href, label }, i) => {
          const active = pathname === href || pathname.startsWith(`${href}/`);

          return (
            <motion.div
              key={href}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: i * 0.05 }}
            >
              <DisclosureButton as={Fragment}>
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  suppressHydrationWarning
                  className={clsx(
                    "block text-base font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black",
                    active ? "text-black" : "text-gray-500 hover:text-black",
                  )}
                >
                  {label}
                </Link>
              </DisclosureButton>
            </motion.div>
          );
        })}
      </nav>

      <div className="absolute inset-x-0 top-0 border-t border-black/5" />
      <div className="absolute inset-x-0 top-2 border-t border-black/5" />
    </DisclosurePanel>
  );
}

/* ---------- navbar ---------- */

export function Navbar({ banner }: { banner?: React.ReactNode }) {
  return (
    <Disclosure as="header" className="pt-6">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <PlusGridRow className="relative flex justify-between">
              <div className="relative flex items-center gap-6">
                <PlusGridItem className="py-3">
                  <Link
                    href="/"
                    aria-label="Go to homepage"
                    className="flex items-center focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    <Image
                      src="/logo-line.svg"
                      alt="DETAILICA"
                      width={80}
                      height={26}
                      className="h-5 w-auto sm:h-6"
                      priority
                    />
                  </Link>
                </PlusGridItem>

                {banner && (
                  <div className="relative hidden items-center py-3 lg:flex">
                    {banner}
                  </div>
                )}
              </div>

              <DesktopNav />

              <MobileNavButton open={open} />
            </PlusGridRow>
          </div>

          <MobileNav />
        </>
      )}
    </Disclosure>
  );
}
