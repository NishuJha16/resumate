import ThemeToggle from "../theme-toggle/theme-toggle-button";
import Logo from "../../assets/resumate-logo.png";
import { NavLink, useLocation } from "react-router";
import { Menu } from "@mui/icons-material";
import { ClickAwayListener, Paper } from "@mui/material";
import { useEffect, useState } from "react";

const getNavbarLinks = () => {
  return (
    <>
      <NavLink
        to={String("/resume-builder")}
        className={({ isActive }) =>
          isActive
            ? "text-white bg-[rgb(245,124,6)] rounded-sm px-2 py-1 whitespace-nowrap"
            : "text-gray-700 dark:text-[rgba(255,255,255,0.7)] px-2 py-1 whitespace-nowrap"
        }
      >
        Resume Builder
      </NavLink>

      <NavLink
        to="/saved-resumes"
        className={({ isActive }) =>
          isActive
            ? "text-white bg-[rgb(245,124,6)] rounded-sm px-2 py-1 whitespace-nowrap"
            : "text-gray-700 dark:text-[rgba(255,255,255,0.7)] px-2 py-1 whitespace-nowrap"
        }
      >
        Saved Resumes
      </NavLink>
      <NavLink
        to="/resume-analyzer"
        className={({ isActive }) =>
          isActive
            ? "text-white bg-[rgb(245,124,6)] rounded-sm px-2 py-1 whitespace-nowrap"
            : "text-gray-700 dark:text-[rgba(255,255,255,0.7)] px-2 py-1 whitespace-nowrap"
        }
      >
        Resume Analyzer
      </NavLink>

      <ThemeToggle />
    </>
  );
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);
  return (
    <header
      className="fixed dark:text-white px-4 md:px-2  border-gray-200 
     dark:bg-[rgb(24,124,120,0.2)] bg-white items-center z-[100] justify-between w-full  false 
      "
    >
      <div className="flex items-center justify-between w-full">
        <NavLink
          className="flex items-center gap-2 py-2 -ml-1 text-xl sm:ml-4"
          to="/"
        >
          <div className="flex items-center">
            <img src={Logo} className="w-[48px] pr-2" />
            <span className="oleo-script-bold dark:text-[#fff] text-[#000] ">
              Resum
            </span>
            <span className="oleo-script-bold text-[rgb(245,124,6)]">ate</span>
          </div>
        </NavLink>
        <ClickAwayListener
          onClickAway={() => isMenuOpen && setIsMenuOpen(false)}
        >
          <div className="relative mr-2 flex md:hidden">
            <Menu onClick={() => setIsMenuOpen(!isMenuOpen)} />
            {isMenuOpen && (
              <Paper className="absolute z-40 top-6 right-0 flex flex-col gap-1">
                {getNavbarLinks()}
              </Paper>
            )}
          </div>
        </ClickAwayListener>
        <div className="items-center justify-center gap-4 mr-2 dark:text-darkText-400 hidden md:flex">
          {getNavbarLinks()}
          {/* <div className="relative">
            <a
              className="inline-block py-1.5 font-semibold px-4 text-sm bg-[rgb(245,124,6)] text-white rounded-md hover:bg-opacity-90 transition-colors"
              href="/login?redirect=%2F"
            >
              Login
            </a>
          </div> */}
        </div>
      </div>
    </header>
  );
};
export default Header;
