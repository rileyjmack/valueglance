"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-black shadow-lg mb-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-center h-16">
          <div className="flex items-center">
            <div className="flex space-x-8">
              <Link
                href="/chart"
                className={`inline-flex items-center px-4 pt-1 border-b-2 text-sm font-medium ${
                  pathname === "/chart"
                    ? "border-blue-500 text-white"
                    : "border-transparent text-gray-400 hover:border-gray-500 hover:text-white"
                }`}
              >
                Chart
              </Link>
              <Link
                href="/table"
                className={`inline-flex items-center px-4 pt-1 border-b-2 text-sm font-medium ${
                  pathname === "/table"
                    ? "border-blue-500 text-white"
                    : "border-transparent text-gray-400 hover:border-gray-500 hover:text-white"
                }`}
              >
                Table
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
