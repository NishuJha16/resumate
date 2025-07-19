import ThemeToggle from "../theme-toggle/theme-toggle-button";
import Logo from "../../assets/resumate-logo.png";
import { NavLink, useLocation, useNavigate } from "react-router";
import { Menu } from "@mui/icons-material";
import {
  Box,
  Button,
  ClickAwayListener,
  Dialog,
  Paper,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { supabase } from "../../supabase/config";
import LoadingIcon from "../../assets/loader.svg";

const getNavbarLinks = () => {
  return (
    <>
      <NavLink
        to={String("/resume-builder")}
        className={({ isActive }) =>
          isActive
            ? "text-[rgb(245,124,6)] border-b-2 border-amber-600 px-2 py-1 whitespace-nowrap"
            : "text-gray-700 dark:text-[rgba(255,255,255,0.7)] px-2 py-1 whitespace-nowrap"
        }
      >
        Resume Builder
      </NavLink>

      <NavLink
        to="/saved-resumes"
        className={({ isActive }) =>
          isActive
            ? "text-[rgb(245,124,6)] border-b-2 border-amber-600 px-2 py-1 whitespace-nowrap"
            : "text-gray-700 dark:text-[rgba(255,255,255,0.7)] px-2 py-1 whitespace-nowrap"
        }
      >
        Saved Resumes
      </NavLink>
      <NavLink
        to="/resume-analyzer"
        className={({ isActive }) =>
          isActive
            ? "text-[rgb(245,124,6)] border-b-2 border-amber-600 px-2 py-1 whitespace-nowrap"
            : "text-gray-700 dark:text-[rgba(255,255,255,0.7)] px-2 py-1 whitespace-nowrap"
        }
      >
        Resume Analyzer
      </NavLink>
    </>
  );
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();
  const handleLogout = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Logout error:", error.message);
      } else {
        navigate("/login");
        localStorage.clear();
      }
    } catch (error) {
      console.error("Unexpected error during logout:", error);
    } finally {
      setLoading(false);
    }
  };

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
                <Button
                  variant="contained"
                  className="!text-white"
                  onClick={() => setIsModalOpen(true)}
                >
                  Logout
                </Button>
              </Paper>
            )}
          </div>
        </ClickAwayListener>
        <div className="items-center justify-center gap-4 mr-2 dark:text-darkText-400 hidden md:flex">
          {getNavbarLinks()}
          <Button
            variant="contained"
            className="!text-white"
            onClick={() => setIsModalOpen(true)}
          >
            Logout
          </Button>
          <ThemeToggle />
        </div>
      </div>
      <Dialog
        onClose={() => setIsModalOpen(false)}
        open={isModalOpen}
        maxWidth="xs"
        fullWidth
      >
        <Box className="flex flex-col gap-4 justify-center p-4">
          <Typography className="!text-xl !font-bold mt-4">LOGOUT</Typography>
          <Typography className="text-gray-500 mt-2">
            Are you sure you want to logout?
          </Typography>
          <Box className="flex gap-4 justify-end mt-4">
            <Button
              variant="contained"
              className="bg-[rgb(245,124,6)] !text-white !capitalize"
              onClick={handleLogout}
              disabled={loading}
            >
              {loading ? <img src={LoadingIcon} width={32} /> : "Yes"}
            </Button>
            <Button
              variant="outlined"
              className="!text-[rgb(245,124,6)] !capitalize"
              onClick={() => setIsModalOpen(false)}
            >
              No
            </Button>
          </Box>
        </Box>
      </Dialog>
    </header>
  );
};
export default Header;
