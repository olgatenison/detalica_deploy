"use client";

import Link from "next/link";
import { useState, type SyntheticEvent } from "react";

type Errors = {
  name?: string;
  email?: string;
  message?: string;
  privacy?: string;
  form?: string;
};

export function ContactSection() {
  const [errors, setErrors] = useState<Errors>({});
  const [successMessage, setSuccessMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const privacy = formData.get("privacy");

    const newErrors: Errors = {};

    if (name.length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }

    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (message.length < 10) {
      newErrors.message = "Message must be at least 10 characters.";
    }

    if (!privacy) {
      newErrors.privacy = "You must agree to the Privacy Policy.";
    }

    setErrors(newErrors);
    setSuccessMessage("");

    if (Object.keys(newErrors).length > 0) return;

    try {
      setIsSending(true);

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      form.reset();
      setSuccessMessage("Your message has been sent successfully.");
    } catch {
      setErrors({
        form: "Something went wrong. Please try again later.",
      });
    } finally {
      setIsSending(false);
    }
  }

  const fieldClassName =
    "mt-4 block w-full border-0 border-b-2 border-gray-950 bg-transparent px-0 py-3 text-base text-gray-950 outline-none shadow-none placeholder:text-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus:shadow-none";

  const textareaClassName =
    "mt-4 block w-full resize-none border-0 border-b-2 border-gray-950 bg-transparent px-0 py-3 text-base text-gray-950 outline-none shadow-none placeholder:text-gray-500 focus:border-gray-400 focus:outline-none focus:ring-0 focus:shadow-none";

  const linkClassName =
    "text-gray-950 underline underline-offset-4 transition hover:text-gray-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2";

  return (
    <section className="bg-white py-24 text-gray-950">
      <div className="mx-auto max-w-xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <h1 className="w-full text-6xl font-semibold tracking-tight text-balance sm:text-7xl lg:max-w-lg">
              Let’s make it done together
            </h1>

            <div className="mt-12 w-full text-base leading-7 text-gray-500 sm:text-lg">
              <p>
                We provide architectural, structural, and BIM support for
                building and infrastructure projects.
              </p>

              <p className="mt-6">
                If you are looking for a reliable partner to support your
                project team with documentation, coordination, or technical
                delivery, send us a message.
              </p>
            </div>
          </div>

          <form
            className="w-full"
            onSubmit={handleSubmit}
            noValidate
            aria-describedby={errors.form ? "form-error" : undefined}
          >
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="mb-1 block text-base font-medium"
                >
                  Name <span aria-hidden="true">*</span>
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className={fieldClassName}
                />

                {errors.name && (
                  <p id="name-error" className="mt-1 text-sm text-[#D15052]">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-1 block text-base font-medium"
                >
                  Email <span aria-hidden="true">*</span>
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={fieldClassName}
                />

                {errors.email && (
                  <p id="email-error" className="mt-1 text-sm text-[#D15052]">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-1 block text-base font-medium"
                >
                  Message <span aria-hidden="true">*</span>
                </label>

                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  placeholder="Tell us about your project, required support, timeline, or documentation scope."
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={
                    errors.message ? "message-error" : undefined
                  }
                  className={textareaClassName}
                />

                {errors.message && (
                  <p id="message-error" className="mt-1 text-sm text-[#D15052]">
                    {errors.message}
                  </p>
                )}
              </div>

              <div>
                <div className="flex gap-3">
                  <input
                    id="privacy"
                    name="privacy"
                    type="checkbox"
                    required
                    aria-invalid={Boolean(errors.privacy)}
                    aria-describedby={
                      errors.privacy ? "privacy-error" : undefined
                    }
                    className="mt-1 size-4 border-gray-950 accent-gray-950 outline-none shadow-none focus:outline-none focus:ring-0 focus:shadow-none"
                  />

                  <label
                    htmlFor="privacy"
                    className="text-sm leading-6 text-gray-700"
                  >
                    I agree to the{" "}
                    <Link
                      href="/privacy-policy"
                      className="font-medium text-gray-950 underline underline-offset-4 transition hover:text-gray-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </label>
                </div>

                {errors.privacy && (
                  <p id="privacy-error" className="mt-1 text-sm text-[#D15052]">
                    {errors.privacy}
                  </p>
                )}
              </div>

              {successMessage && (
                <p
                  className="text-sm text-gray-700"
                  role="status"
                  aria-live="polite"
                >
                  {successMessage}
                </p>
              )}

              {errors.form && (
                <p
                  id="form-error"
                  className="text-sm text-[#D15052]"
                  role="alert"
                >
                  {errors.form}
                </p>
              )}

              <button
                type="submit"
                disabled={isSending}
                className="inline-flex h-11 w-full items-center justify-center border border-gray-950 bg-gray-950 px-6 text-sm font-medium text-white transition hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSending ? "Sending..." : "Send message"}
              </button>
            </div>
          </form>
        </div>

        <div className="mt-16 border-t border-gray-200 pt-10 lg:mt-20 lg:pt-12">
          <p className="text-2xl font-bold text-gray-950">
            Prefer to contact us directly?
          </p>

          <address className="mt-8 not-italic">
            <ul
              className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-20"
              aria-label="Direct contact details"
            >
              <li className="grid grid-cols-1 gap-4 sm:grid-cols-[minmax(0,220px)_minmax(0,1fr)] sm:gap-8">
                <div>
                  <p className="text-lg font-medium text-gray-950">
                    Alex Dvornychenko
                  </p>
                  <p className="text-base text-gray-500">Structural Engineer</p>
                </div>

                <div className="min-w-0 space-y-1 text-sm sm:text-base">
                  <p className="wrap-break-word">
                    <a
                      href="mailto:Oleksandr.Dvornychenko@detailica.com"
                      aria-label="Email Alex Dvornychenko"
                      className={linkClassName}
                    >
                      Oleksandr.Dvornychenko@detailica.com
                    </a>
                  </p>

                  <p>
                    <a
                      href="tel:+37258311129"
                      aria-label="Call Alex Dvornychenko"
                      className={linkClassName}
                    >
                      +372 583 111 29
                    </a>
                  </p>
                </div>
              </li>

              <li className="grid grid-cols-1 gap-4 sm:grid-cols-[minmax(0,220px)_minmax(0,1fr)] sm:gap-8">
                <div>
                  <p className="text-lg font-medium text-gray-950">
                    Oksana Kuchura
                  </p>
                  <p className="text-base text-gray-500">Architect</p>
                </div>

                <div className="min-w-0 space-y-1 text-sm sm:text-base">
                  <p className="wrap-break-word">
                    <a
                      href="mailto:Oksana.Kuchura@detailica.com"
                      aria-label="Email Oksana Kuchura"
                      className={linkClassName}
                    >
                      Oksana.Kuchura@detailica.com
                    </a>
                  </p>

                  <p>
                    <a
                      href="tel:+37258311107"
                      aria-label="Call Oksana Kuchura"
                      className={linkClassName}
                    >
                      +372 583 111 07
                    </a>
                  </p>
                </div>
              </li>
            </ul>
          </address>
        </div>
      </div>
    </section>
  );
}
