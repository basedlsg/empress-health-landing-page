"use client";

import { ArrowUpRight } from "lucide-react";

const MinimalCenteredFooter = () => {
  const navigation = [
    { name: "Home", href: "#" },
    { name: "About", href: "#" },
    { name: "Services", href: "#" },
    { name: "Shop", href: "#" },
    { name: "Resources", href: "#" },
    { name: "Contact", href: "#" },
  ];

  const social = [
    { name: "Instagram", href: "https://instagram.com/empresshealth" },
    { name: "Facebook", href: "https://facebook.com/empresshealth" },
    { name: "Twitter", href: "https://twitter.com/empresshealth" },
  ];

  const legal = [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Refund Policy", href: "#" },
  ];

  return (
    <section className="bg-[#F5F2EF] flex flex-col items-center gap-14 py-32">
      <nav className="container flex flex-col items-center gap-4">
        <ul className="flex flex-wrap items-center justify-center gap-6">
          {navigation.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className="font-medium text-[#4A235A] transition-opacity hover:opacity-75"
              >
                {item.name}
              </a>
            </li>
          ))}
          {social.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className="flex items-center gap-0.5 font-medium text-[#4A235A] transition-opacity hover:opacity-75"
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.name} <ArrowUpRight className="size-4" />
              </a>
            </li>
          ))}
        </ul>
        <ul className="flex flex-wrap items-center justify-center gap-6">
          {legal.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className="text-sm text-[#6B5B73] transition-opacity hover:opacity-75"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="text-sm text-[#6B5B73]">
        © 2024 Empress Health. All rights reserved.
      </div>
    </section>
  );
};

export { MinimalCenteredFooter };