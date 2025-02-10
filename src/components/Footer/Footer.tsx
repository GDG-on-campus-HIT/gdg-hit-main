"use client";
import { useState, useEffect } from 'react';
import { Facebook, Twitter, Github } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from '../ModeToggle';

const Footer = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  const socialIcons = [
    { Icon: Facebook, href: "https://facebook.com" },
    { Icon: Twitter, href: "https://twitter.com" },
  
    { Icon: Github, href: "https://github.com" }
  ];

  const quickLinks = [
    { label: "About Us", href: "/about" },
    { label: "Activities", href: "/activities" },
    { label: "Our Team", href: "/team" },
    { label: "Events", href: "/events" }
  ];

  return (
    <footer className=" transition-colors duration-300">
      <div className="max-container py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* GDG On Campus Section */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg dark:text-white">GDG On Campus HIT</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Empowering students through technology, innovation, and community collaboration at Haldia Institute of Technology.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg dark:text-white">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href} 
                    className="
                      text-sm text-neutral-700 
                      dark:text-neutral-300 
                      hover:text-blue-600 
                      dark:hover:text-blue-400 
                      transition-colors
                    "
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg dark:text-white">Contact Us</h3>
            <div className="space-y-2 text-sm">
              <p className="text-neutral-700 dark:text-neutral-300">
                📧 gdg@hit.ac.in
              </p>
              <p className="text-neutral-700 dark:text-neutral-300">
                📍 Haldia Institute of Technology, Haldia
              </p>
            </div>
          </div>

          {/* Social Icons */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg dark:text-white">Follow Us</h3>
            <div className="flex space-x-4">
              {socialIcons.map(({ Icon, href }) => (
                <Link 
                  key={href} 
                  href={href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="
                    text-neutral-600 
                    dark:text-neutral-400 
                    hover:text-neutral-900 
                    dark:hover:text-neutral-100 
                    transition-colors
                  "
                >
                  <Icon size={20} />
                </Link>
              ))}
            </div>
            <ModeToggle/>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-12 pt-6 border-t border-neutral-300 dark:border-neutral-700">
          <p className="text-sm text-neutral-600 dark:text-neutral-500">
            © 2024 GDG On Campus HIT. All rights reserved.
          </p>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-500">
            Made with ❤️ by GDG HIT Team
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;