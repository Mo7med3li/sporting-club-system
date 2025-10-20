"use client";

import Image from "next/image";
import Link from "next/link";
import Logo from "../../../../public/assets/imgs/logo.png";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const Header = () => {
  // links
  const links = [
    { href: "/", label: "Home" },
    { href: "/members", label: "Members" },
    { href: "/sports", label: "Sports" },
  ];

  // pathname
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-blue-200/80 py-1 px-4 md:px-16 ">
      <div className="container mx-auto px-4 flex h-14 items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight">
          <Image
            src={Logo}
            alt="Logo"
            width={50}
            height={50}
            className="rounded-full"
          />
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-gray-500 hover:text-blue-600 font-medium transition-colors",
                pathname === link.href && "text-blue-600 font-bold"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
