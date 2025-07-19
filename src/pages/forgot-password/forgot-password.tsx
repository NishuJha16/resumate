import { Box, Button, FormLabel, TextField, Typography } from "@mui/material";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { supabase } from "../../supabase/config";
import LoadingIcon from "../../assets/loader.svg";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [retryTimer, setRetryTimer] = useState(0);

  const { control, formState, handleSubmit } = useForm({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(
      yup.object().shape({
        email: yup
          .string()
          .email("Invalid email")
          .required("Email is required"),
      })
    ),
    mode: "onBlur",
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (retryTimer > 0) {
      interval = setInterval(() => {
        setRetryTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [retryTimer]);

  const onSubmit: SubmitHandler<any> = async ({ email }) => {
    setLoading(true);
    setMessage(null);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`,
      });

      if (error) {
        setMessage(error.message);
      } else {
        setMessage("Password reset email sent. Please check your inbox.");
        setRetryTimer(60); // start 60 second cooldown
      }
    } catch (error) {
      setMessage("An error occurred while sending the reset link.");
      console.error("Error sending reset link:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="flex flex-col gap-6">
      <Typography variant="h5">Forgot Password</Typography>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <FormLabel>Email</FormLabel>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              onChange={(e) => {
                field.onChange(e);
                setMessage(null);
              }}
              placeholder="Enter your email"
              fullWidth
            />
          )}
        />
        <Typography variant="body2" color="error">
          {formState.errors.email?.message}
        </Typography>

        <Button
          type="submit"
          variant="contained"
          className="!mt-8 !text-white !capitalize bg-[rgb(245,124,6)]"
          disabled={loading || retryTimer > 0}
        >
          {loading ? (
            <img src={LoadingIcon} alt="Loading" width={36} />
          ) : retryTimer > 0 ? (
            `Retry in ${retryTimer}s`
          ) : (
            "Send Reset Link"
          )}
        </Button>
      </form>

      {message && <Typography>{message}</Typography>}
    </Box>
  );
};

export default ForgotPassword;
