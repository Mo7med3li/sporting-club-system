import Link from "next/link";

export default function Home() {
  const homeLinks = [
    { href: "/members", label: "View Members" },
    { href: "/sports", label: "View Sports" },
  ];
  return (
    <main className="mx-auto max-w-4xl text-center">
      <h1 className="text-3xl md:text-5xl text-blue-500 font-bold">
        Welcome to the Sporting Club
      </h1>
      <p className="mt-4 text-muted-foreground text-base md:text-lg">
        Manage members, organize sports, and keep your club running smoothly.
      </p>
      <div className="mt-8 flex items-center justify-center gap-4">
        {homeLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className=" items-center justify-center rounded-md px-5 py-2.5 text-sm font-medium shadow hover:opacity-90 transition border hover:bg-blue-500 border-blue-500 hover:text-white"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </main>
  );
}
