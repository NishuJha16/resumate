import {
  Box,
  Button,
  FormLabel,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import * as yup from "yup";
import { Link, useNavigate } from "react-router";

import { Google, Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { supabase } from "../../supabase/config";
import LoadingIcon from "../../assets/loader.svg";

const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { control, formState, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(
      yup.object().shape({
        email: yup
          .string()
          .email("Invalid email")
          .required("Email is required"),
        password: yup
          .string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
      })
    ),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<any> = async (formValues) => {
    setLoading(true);
    const { email, password } = formValues;
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        switch (error.message) {
          case "Invalid login credentials":
            setErrorMessage("Incorrect email or password.");
            break;
          case "Email not confirmed":
            setErrorMessage(
              "Please verify your email address before logging in."
            );
            break;
          default:
            setErrorMessage("Login failed. Please try again.");
        }

        return;
      }

      if (data?.user) {
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const loginWithGoogle = async () => {
    setErrorMessage(null);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });

      if (error) {
        console.error("OAuth error:", error.message);
        setErrorMessage("Google sign-in failed. Please try again.");
        return;
      }
    } catch (err) {
      console.error("Unexpected error during Google sign-in:", err);
      setErrorMessage("Something went wrong during Google sign-in.");
    }
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h5" className="text-gray-900">
        Login
      </Typography>
      <Typography variant="body1" className="text-gray-600">
        Don't have an account yet? <span></span>
        <Link className="text-blue-600" to="/register">
          Register here
        </Link>
      </Typography>
      <Box className="flex flex-col gap-2 justify-center mt-8">
        {errorMessage && (
          <Typography className="text-red-600 text-sm">
            {errorMessage}
          </Typography>
        )}
        <Box className="flex flex-col gap-1">
          <FormLabel className="!text-sm">Email Address</FormLabel>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                onChange={(e) => {
                  setErrorMessage(null);
                  field.onChange(e);
                }}
                className="w-full bg-white dark:bg-gray-800"
                placeholder="Enter email address "
                type="email"
              />
            )}
          />
          <Typography className="text-red-500 text-sm">
            {formState.errors.email?.message}
          </Typography>
        </Box>
        <Box className="flex flex-col gap-1">
          <FormLabel className="!text-sm">Password</FormLabel>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                onChange={(e) => {
                  setErrorMessage(null);
                  field.onChange(e);
                }}
                type={showPassword ? "text" : "password"}
                className="w-full bg-white dark:bg-gray-800"
                placeholder="Enter password"
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={
                            showPassword
                              ? "hide the password"
                              : "display the password"
                          }
                          sx={{ marginRight: "0" }}
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          onMouseUp={handleMouseUpPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            )}
          />
          <Typography className="text-red-500 text-sm">
            {formState.errors.password?.message}
          </Typography>
        </Box>
        <Box className="flex items-end justify-end mt-2">
          <Link to="/forgot-password" className="text-blue-600 text-sm">
            Forgot Password?
          </Link>
        </Box>
        <Button
          variant="contained"
          type="submit"
          disabled={loading}
          className="bg-[rgb(245,124,6)] !text-white !capitalize !mt-4"
        >
          {loading ? <img src={LoadingIcon} width={32} /> : "Login"}
        </Button>
        <Typography className="text-gray-600 text-sm !mt-4 text-center">
          Or continue with
        </Typography>
        <Button
          variant="contained"
          className="!bg-blue-500 !text-white !capitalize !mt-2"
          startIcon={<Google />}
          onClick={loginWithGoogle}
        >
          Sign in with Google
        </Button>
      </Box>
    </form>
  );
};
export default Login;
