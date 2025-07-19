import { Box, Paper } from "@mui/material";
import Deco from "../../assets/deco.svg";
import Mesh from "../../assets/mesh.webp";
import Circle from "../../assets/bubble.webp";
import LoginIllustration from "../../assets/illustration.svg";
import ResumeGif from "../../assets/owl.gif";
import Login from "../login/login";
import Register from "../register/register";
import { useEffect } from "react";
import { supabase } from "../../supabase/config";
import { useNavigate } from "react-router";
import UpdatePassword from "../update-password/update-password";
import ForgotPassword from "../forgot-password/forgot-password";
import { Badge, Folder, ImportExport } from "@mui/icons-material";

const ComponentMapping = {
  login: <Login />,
  register: <Register />,
  updatePassword: <UpdatePassword />,
  forgotPassword: <ForgotPassword />,
};

const Authentication = ({ type = "login" }: any) => {
  const navigate = useNavigate();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY") {
        return;
      }

      if (session && window.location.pathname !== "/update-password") {
        navigate("/");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <Box className="flex flex-1">
      <Box className="hidden md:flex flex-col flex-1 relative ">
        <Box className="absolute top-[-60px] right-[-330px]">
          <img
            src={ResumeGif}
            className="w-[600px] h-auto rotate-[30deg] z-[1] scale-x-[-1] scale-y-[1]"
          />
        </Box>

        <Box className="flex flex-1 flex-col justify-between items-center bg-[rgb(245,124,6)] z-20">
          <img
            src={Mesh}
            className="absolute left-[-60px] top-[-20px] opacity-50 w-[400px] "
          />
          <img
            src={Circle}
            className="absolute bottom-[-60px] right-[-20px] opacity-50 w-[300px] "
          />
          <img
            src={Circle}
            className="absolute left-[-200px] top-[25%] opacity-50 w-[400px] "
          />
          <Box className="flex flex-col gap-6 items-center pt-16">
            <span className=" text-[#fff] oleo-script-bold text-[48px]">
              Welcome to Resumate
            </span>
            <Box className="flex gap-2 w-full  items-center p-2 rounded-md bg-[rgba(255,255,255,0.2)]">
              <Box className="rounded-full p-2 bg-white">
                <Badge color="warning" />
              </Box>
              <span className="text-white text-center !text-md">
                Craft stunning, professional resumes in minutes
              </span>
            </Box>
            <Box className="flex gap-2 w-full items-center p-2 rounded-md bg-[rgba(255,255,255,0.2)]">
              <Box className="rounded-full p-2 bg-white">
                <ImportExport color="warning" />
              </Box>
              <span className="text-white text-center !text-md">
                Export resume to PDF in a single click
              </span>
            </Box>
            <Box className="flex gap-2 w-full items-center p-2 rounded-md bg-[rgba(255,255,255,0.2)]">
              <Box className="rounded-full p-2 bg-white">
                <Folder color="warning" />
              </Box>
              <span className="text-white text-center !text-md">
                Save, edit, and organize multiple resume copies
              </span>
            </Box>
          </Box>
          <img src={LoginIllustration} className="w-[600px] h-auto " />
        </Box>
      </Box>
      <Box className="flex flex-1 flex-col relative items-center justify-center h-screen">
        <img
          src={Deco}
          className="absolute bottom-0 right-[0] scale-x-[-1] scale-y-[-1]"
        />

        <Paper className="w-[90%] max-w-[90%] p-4 md:w-[380px] md:max-w-[380px]">
          {ComponentMapping?.[type as keyof typeof ComponentMapping]}
        </Paper>
      </Box>
    </Box>
  );
};
export default Authentication;
