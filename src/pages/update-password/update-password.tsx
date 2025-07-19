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
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { supabase } from "../../supabase/config";
import LoadingIcon from "../../assets/loader.svg";
import { useNavigate } from "react-router";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const UpdatePassword = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [sessionReady, setSessionReady] = useState(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      password: "",
    },
    resolver: yupResolver(
      yup.object().shape({
        password: yup
          .string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
      })
    ),
    mode: "onBlur",
  });

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

  const onSubmit: SubmitHandler<any> = async ({ password }) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        setMessage(error.message);
      } else {
        setMessage("Password updated successfully. Redirecting...");
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (error) {
      setMessage("An error occurred while updating the password.");
      console.error("Error updating password:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setSessionReady(true);
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setSessionReady(true);
      }
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  if (!sessionReady) {
    return <p>Loading session from magic link...</p>;
  }

  return (
    <Box className="flex flex-col gap-6">
      <Typography variant="h5">Update Password</Typography>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <FormLabel>New Password</FormLabel>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              placeholder="Enter your new password"
              {...field}
              fullWidth
              type={showPassword ? "text" : "password"}
              className="w-full bg-white dark:bg-gray-800"
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
        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          className="bg-[rgb(245,124,6)] !text-white !capitalize !mt-6"
        >
          {loading ? (
            <img src={LoadingIcon} alt="Loading" width={32} />
          ) : (
            "Update Password"
          )}
        </Button>
      </form>
      {message && <Typography>{message}</Typography>}
    </Box>
  );
};
export default UpdatePassword;
