"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Loader2, Mail, MapPin } from "lucide-react";
import { GitHubLogoIcon, InstagramLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { GradientWord, Reveal } from "@/components/home/primitives";
import { useContactUsMutation } from "@/redux/features/api/apiSlice";

const OFFICIAL_EMAIL = "gdgoncampushit@gmail.com";
const MAP_LINK = "https://maps.app.goo.gl/5EWuJrJPR7KrZxTQ7";
// Haldia (22.06°N, 88.07°E) as a percentage of public/world.svg's 2000x857 viewBox.
const HALDIA_ON_MAP = { left: "73.5%", top: "42%" };

const channels = [
  {
    icon: Mail,
    label: "Email",
    value: OFFICIAL_EMAIL,
    href: `mailto:${OFFICIAL_EMAIL}`,
    accent: "text-blue-500",
  },
  {
    icon: MapPin,
    label: "Visit",
    value: "Haldia Institute of Technology, Haldia, West Bengal",
    href: MAP_LINK,
    accent: "text-red-500",
  },
];

const socials = [
  { icon: InstagramLogoIcon, label: "Instagram", href: "https://www.instagram.com/gdg_hit/" },
  { icon: LinkedInLogoIcon, label: "LinkedIn", href: "https://www.linkedin.com/company/gdgoncampushit/" },
  { icon: GitHubLogoIcon, label: "GitHub", href: "https://github.com/GDG-on-campus-HIT" },
];

type FormState = { name: string; email: string; phone: string; message: string };
type FormErrors = Partial<Record<keyof FormState, string>>;

const EMPTY_FORM: FormState = { name: "", email: "", phone: "", message: "" };

const validate = (form: FormState): FormErrors => {
  const errors: FormErrors = {};
  if (!form.name.trim()) errors.name = "Please tell us your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errors.email = "Enter a valid email address.";
  if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\D/g, "").slice(-10)))
    errors.phone = "Enter a valid 10-digit mobile number.";
  if (form.message.trim().length < 10) errors.message = "Your message should be at least 10 characters.";
  return errors;
};

const inputClass =
  "w-full rounded-xl border border-black/10 bg-white/60 px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 dark:border-white/10 dark:bg-white/[0.03] dark:text-white dark:placeholder:text-neutral-600";

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [sent, setSent] = useState(false);
  const [contactUs, { isLoading, isError, reset }] = useContactUsMutation();

  const update = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    try {
      await contactUs({
        name: form.name.trim(),
        email: form.email.trim(),
        mobile_number: Number(form.phone.replace(/\D/g, "").slice(-10)),
        message: form.message.trim(),
      }).unwrap();
      setSent(true);
      setForm(EMPTY_FORM);
    } catch {
      // isError renders the fallback message below the form
    }
  };

  const startOver = () => {
    reset();
    setSent(false);
  };

  return (
    <div className="relative isolate overflow-hidden pt-20">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[40rem]">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
        <div className="absolute left-1/2 top-[-14rem] h-[30rem] w-[56rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-500/20 via-green-500/15 to-yellow-500/20 opacity-50 blur-[140px] dark:opacity-30" />
      </div>

      <section className="max-container pb-24 pt-12 md:pt-20">
        <Reveal className="max-w-3xl">
          <h1 className="white-gradient-text text-4xl leading-[1.08] tracking-tight md:text-6xl lg:text-7xl">
            Let&apos;s <GradientWord accent="blue">Talk</GradientWord>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-600 dark:text-neutral-400 md:text-lg">
            Questions about an event, ideas for a collaboration, or want to speak at one of our
            sessions? Send us a message and the team will get back to you.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-12 md:mt-16 lg:grid-cols-5 lg:gap-16">
          <Reveal className="lg:col-span-2">
            <ul className="border-t border-black/10 dark:border-white/10">
              {channels.map((channel) => (
                <li key={channel.label}>
                  <a
                    href={channel.href}
                    target={channel.href.startsWith("http") ? "_blank" : undefined}
                    rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group flex items-start gap-4 border-b border-black/10 py-6 transition-colors dark:border-white/10"
                  >
                    <channel.icon className={cn("mt-0.5 h-5 w-5 shrink-0", channel.accent)} />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-neutral-500">{channel.label}</p>
                      <p className="mt-1 break-words text-base font-medium text-neutral-900 transition-colors group-hover:text-blue-600 dark:text-neutral-100 dark:group-hover:text-blue-400">
                        {channel.value}
                      </p>
                    </div>
                    <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-neutral-400 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-neutral-900 dark:group-hover:text-white" />
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <p className="text-sm text-neutral-500">Follow along</p>
              <div className="mt-4 flex gap-3">
                {socials.map((social) => (
                  <Link
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 text-neutral-600 transition-all duration-300 hover:-translate-y-0.5 hover:border-black/30 hover:text-neutral-900 dark:border-white/10 dark:text-neutral-400 dark:hover:border-white/30 dark:hover:text-white"
                  >
                    <social.icon width={18} height={18} />
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-3">
            <div className="gradient-card relative overflow-hidden rounded-3xl border border-black/5 p-6 dark:border-white/5 sm:p-8 md:p-10">
              <div aria-hidden className="absolute inset-x-0 top-0 flex h-1">
                <span className="flex-1 bg-blue-500" />
                <span className="flex-1 bg-red-500" />
                <span className="flex-1 bg-yellow-500" />
                <span className="flex-1 bg-green-500" />
              </div>

              {sent ? (
                <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500/10 text-green-600 ring-1 ring-green-500/20 dark:text-green-400">
                    <Check className="h-6 w-6" strokeWidth={2.5} />
                  </span>
                  <h2 className="mt-6 text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white">
                    Message sent
                  </h2>
                  <p className="mt-3 max-w-sm text-neutral-600 dark:text-neutral-400">
                    Thanks for reaching out. Someone from the team will reply to your email soon.
                  </p>
                  <button
                    onClick={startOver}
                    className="mt-8 text-sm font-medium text-neutral-900 underline decoration-blue-500 underline-offset-4 hover:decoration-2 dark:text-white"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <h2 className="text-xl font-semibold text-neutral-900 dark:text-white md:text-2xl">
                    Send us a message
                  </h2>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Full name" htmlFor="name" error={errors.name}>
                      <input
                        id="name"
                        autoComplete="name"
                        value={form.name}
                        onChange={update("name")}
                        placeholder="Your name"
                        aria-invalid={!!errors.name}
                        className={cn(inputClass, errors.name && "border-red-500/60")}
                      />
                    </Field>
                    <Field label="Phone number" htmlFor="phone" error={errors.phone}>
                      <input
                        id="phone"
                        type="tel"
                        inputMode="numeric"
                        autoComplete="tel"
                        value={form.phone}
                        onChange={update("phone")}
                        placeholder="10-digit mobile number"
                        aria-invalid={!!errors.phone}
                        className={cn(inputClass, errors.phone && "border-red-500/60")}
                      />
                    </Field>
                  </div>

                  <Field label="Email address" htmlFor="email" error={errors.email}>
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={update("email")}
                      placeholder="you@example.com"
                      aria-invalid={!!errors.email}
                      className={cn(inputClass, errors.email && "border-red-500/60")}
                    />
                  </Field>

                  <Field label="Message" htmlFor="message" error={errors.message}>
                    <textarea
                      id="message"
                      rows={6}
                      value={form.message}
                      onChange={update("message")}
                      placeholder="How can we help?"
                      aria-invalid={!!errors.message}
                      className={cn(inputClass, "resize-none", errors.message && "border-red-500/60")}
                    />
                  </Field>

                  {isError && (
                    <p role="alert" className="text-sm text-red-600 dark:text-red-400">
                      We couldn&apos;t send your message. Please try again, or email us at{" "}
                      <a href={`mailto:${OFFICIAL_EMAIL}`} className="underline underline-offset-4">
                        {OFFICIAL_EMAIL}
                      </a>
                      .
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="group relative inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-gradient-to-bl from-blue-600 to-blue-950 px-6 py-3 text-sm font-medium text-white shadow-[0_10px_40px_-12px_rgba(37,99,235,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_50px_-12px_rgba(37,99,235,0.9)] disabled:pointer-events-none disabled:opacity-70 sm:w-auto"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending
                      </>
                    ) : (
                      <>
                        Send message
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-20 md:mt-28">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <h2 className="white-gradient-text text-3xl tracking-tight md:text-4xl">Find us on campus</h2>
            <a
              href={MAP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-neutral-700 underline decoration-black/20 underline-offset-4 hover:text-neutral-950 hover:decoration-red-500 dark:text-neutral-300 dark:decoration-white/20 dark:hover:text-white"
            >
              Open in Google Maps
            </a>
          </div>
          <div className="relative mt-10">
            <img
              src="/world.svg"
              alt="World map with Haldia, West Bengal, India marked"
              loading="lazy"
              className="w-full select-none opacity-60 dark:opacity-50"
            />
            <div className="absolute" style={HALDIA_ON_MAP}>
              <span className="absolute h-16 w-16 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-blue-500/25 md:h-24 md:w-24" />
              <span className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500 ring-4 ring-blue-500/30" />
              <a
                href={MAP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-blue-500 px-4 py-1.5 text-xs font-medium text-white shadow-[0_10px_30px_-10px_rgba(59,130,246,0.9)] transition-colors hover:bg-blue-600 md:bottom-4 md:px-6 md:py-2 md:text-sm"
              >
                We are here
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
        {label}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
}
