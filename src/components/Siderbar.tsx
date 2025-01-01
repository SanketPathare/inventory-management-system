"use client";

import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { sidebar } from "@/lib/data";
import { Trello } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close sidebar when route changes on mobile
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 z-40 md:hidden hover:bg-gray-100 "
      >
        <Menu className="h-7 w-7 " />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 z-50 h-full w-64 bg-white transform transition-transform duration-200 ease-in-out
          md:relative md:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Close button for mobile */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4  md:hidden hover:bg-gray-100 "
        >
          <X className="h-7 w-7" />
        </button>

        {/* Existing Sidebar Content */}
        <div className="flex h-full max-h-screen flex-col">
          <div className="flex h-16 items-center border-b px-6">
            <Link
              href="/"
              className="flex items-center gap-2 font-semibold hover:text-gray-900 transition-colors"
            >
              <Trello className="h-5 w-5" />
              <span>IMS</span>
            </Link>
          </div>

          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="grid gap-1 px-4">
              {sidebar?.map((item) => (
                <li key={item.link}>
                  <Link
                    href={item.link}
                    className={`
                      flex items-center gap-3 rounded-lg px-3 py-2
                      text-sm font-medium text-gray-700
                      transition-all hover:bg-gray-100
                      ${
                        pathname === item.link
                          ? "bg-green-100 text-green-900"
                          : ""
                      }
                    `}
                  >
                    {item.icon}
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
