"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const links = [
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About us" },
  { href: "/contact", label: "Contact" },
];

const legalLinks = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/legal-information", label: "Legal Information" },
];

function FooterNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Footer navigation"
      className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-center lg:justify-end"
    >
      {links.map(({ href, label }) => {
        const active = pathname === href;

        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={
              active
                ? "text-base font-medium text-gray-950 transition-colors"
                : "text-base font-medium text-gray-600 transition-colors hover:text-gray-950"
            }
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="border-b border-zinc-200 pb-10">
          <div className="flex flex-col items-center gap-8 text-center lg:flex-row lg:justify-between lg:text-left">
            <Link href="/" aria-label="Home" className="flex items-center">
              <Image
                src="/logo-line.svg"
                alt="DETAILICA"
                width={80}
                height={26}
                className="h-5 w-auto sm:h-6"
                priority
              />
            </Link>

            <FooterNav />
          </div>
        </div>

        <div className="flex flex-col items-center gap-6 pt-10 text-center lg:flex-row lg:items-start lg:justify-between lg:text-left">
          <div className="flex flex-col items-center gap-2 text-gray-600 lg:items-start">
            <p>© {new Date().getFullYear()} DETAILICA. All rights reserved.</p>

            <a
              href="https://dvi.example"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center justify-center gap-2 text-gray-600 transition hover:text-gray-950"
              aria-label="Designed and developed by DVI"
            >
              <span>Designed and developed by</span>

              <Image
                src="/dvi.png"
                alt="DVI"
                width={60}
                height={16}
                className="h-5 w-auto"
              />
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 lg:justify-start">
            {legalLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-gray-600 transition hover:text-gray-950"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
