import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IForm } from "./sign-up";
import { useAuth } from "../../hooks/auth";
import { text } from "../../text";
import { useTypedSelector } from "../../hooks/redux/useSelectedTypes";

export default function SignIn() {
  const navigate = useNavigate();

  const { language, user } = useTypedSelector((s) => s.app);

  const { auth } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    resolver: yupResolver(
      yup
        .object({
          email: yup.string().email().required(),
          password: yup.string().required().min(4),
        })
        .required()
    ),
  });

  React.useEffect(() => {
    if (user) {
      user.admin ? navigate("/admin") : navigate("/profile");
    }
  }, [navigate, user]);

  const onSubmit: SubmitHandler<IForm> = (data) => auth(data, "login");
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {text.signin[language]}
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            {...register("email")}
            error={!!errors.email}
            margin="normal"
            required
            fullWidth
            id="email"
            label={text.email[language]}
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            {...register("password")}
            error={!!errors.password}
            name="password"
            label={text.password[language]}
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            sx={{ mt: 3, mb: 2, color: "color" }}
          >
            {text.signin[language]}
          </Button>
          <Grid container>
            <Grid item>
              <Link
                component="button"
                variant="body2"
                onClick={() => {
                  navigate("/register");
                }}
              >
                {text.notAccount[language]}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
