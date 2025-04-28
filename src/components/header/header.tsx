import ThemeToggle from "../theme-toggle/theme-toggle-button";
import Logo from "../../assets/resumate.svg";

const Header = () => {
  return (
    <header
      className="fixed dark:text-white px-4 md:px-2  border-gray-200 
    dark:bg-darkBox-900 dark:bg-[rgb(24,24,27)] bg-white items-center z-[100] justify-between w-full  false 
      "
    >
      <div className="flex items-center justify-between w-full">
        <a
          className="flex items-center gap-2 py-2 -ml-1 text-xl sm:ml-4"
          href="/"
        >
          <div className="flex items-center">
            <img src={Logo} className="w-[36px] h-[36px] pr-2" />
            <span className="oleo-script-bold dark:text-[#fff] text-[#000] ">
              Resum
            </span>
            <span className="oleo-script-bold text-[rgb(245,124,6)]">ate</span>
          </div>
        </a>
        <div className="items-center justify-center gap-2 mr-2 dark:text-darkText-400 flex">
          <a
            className="px-2 py-1.5 relative  text-sm round-border font-[550] text-black dark:text-[rgba(255,255,255,0.7)] dark:hover:bg-darkBox-800 "
            href="/support"
          >
            Template
          </a>

          <ThemeToggle />
          <div className="relative">
            <a
              className="inline-block py-1.5 font-semibold px-4 text-sm bg-[rgb(245,124,6)] text-white rounded-md hover:bg-opacity-90 transition-colors"
              href="/login?redirect=%2F"
            >
              Login
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
