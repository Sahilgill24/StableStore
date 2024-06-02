import logo from "@/assets/logo.svg";

import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { AnimatedGradientText } from "./animated-gradient-text";
import clsx from "clsx";

interface NavbarProps {
  active: "Home" | "Pay" | "Docs" | "Dev";
}

export default function Navbar(props: NavbarProps) {
  const links = [
    { name: "Home", href: "/" },
    { name: "Pay", href: "/pay" },
    { name: "Docs", href: "/docs" },
  ];
  return (
    <>
      <nav className="dark:bg-transparent fixed w-full">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={logo} alt="logo" />
          </a>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <Link to="/dashboard">
              <Button
                size={"lg"}
                variant={props.active === "Dev" ? "secondary" : "ghost"}
              >
                <AnimatedGradientText text="Dev" />
                &nbsp;Mode
              </Button>
            </Link>
            <button
              data-collapse-toggle="navbar-cta"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-cta"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className="items-center hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-cta"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
              {links.map((link) => {
                return (
                  <Link
                    to={link.href}
                    className={clsx(
                      "transition-all duration-150 hover:text-muted-foreground",
                      {
                        "underline underline-offset-2 decoration-2 decoration-primary":
                          props.active === link.name,
                      }
                    )}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}