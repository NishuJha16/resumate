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
import { Link } from "react-router";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { supabase } from "../../supabase/config";
import LoadingIcon from "../../assets/loader.svg";

const Register = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit, setError, formState } = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
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
        confirmPassword: yup
          .string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
      })
    ),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<any> = async (formValues) => {
    if (formValues.password !== formValues.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: formValues.email,
        password: formValues.password,
      });

      if (error) {
        if (error.message === "User already registered") {
          return "userExistsErrorState";
        } else {
          console.error("Unexpected error:", error.message);
          return "unexpectedErrorState";
        }
      }

      const userAlreadyExists = data.user?.identities?.length === 0;
      const confirmationSent = !!data.user?.confirmation_sent_at;

      if (userAlreadyExists) {
        setErrorMessage(
          "User already exists. Please login or use a different email."
        );
      } else if (confirmationSent) {
        setErrorMessage(
          "We’ve sent a verification link to your email. Please check your inbox (or spam folder) and click the link to confirm your email address and proceed with Login."
        );
      } else {
        setErrorMessage("Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.error("Registration error:", error);
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

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h5" className="text-gray-900">
        Register
      </Typography>
      <Typography variant="body1" className="text-gray-600">
        Already have an account? <span></span>
        <Link className="text-blue-600" to="/login">
          Login here
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
        <Box className="flex flex-col gap-1">
          <FormLabel className="!text-sm">Confirm Password</FormLabel>
          <Controller
            name="confirmPassword"
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
                placeholder="Enter confirm password"
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
            {formState.errors.confirmPassword?.message}
          </Typography>
        </Box>
        <Button
          variant="contained"
          type="submit"
          disabled={loading}
          className="bg-[rgb(245,124,6)] !text-white !capitalize !mt-4"
        >
          {loading ? <img src={LoadingIcon} width={32} /> : "Register"}
        </Button>
      </Box>
    </form>
  );
};
export default Register;
