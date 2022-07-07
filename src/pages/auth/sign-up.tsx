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
import { Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../../hooks/auth";
import { text } from "../../text";
import { useTypedSelector } from "../../hooks/redux/useSelectedTypes";

export interface IForm {
  name?: string;
  email: string;
  password: string;
}

export const SignUp = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();

  const { language, user } = useTypedSelector((s) => s.app);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    resolver: yupResolver(
      yup
        .object({
          name: yup.string().required(),
          email: yup.string().email().required(),
          password: yup.string().required().min(4),
        })
        .required()
    ),
  });

  React.useEffect(() => {
    if (user) {
      user.admin ? navigate("/admin") : navigate("/");
    }
  }, [navigate, user]);

  const onSubmit: SubmitHandler<IForm> = (data) => auth(data, "register");

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
          {text.signup[language]}
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                error={!!errors.name}
                {...register("name")}
                id="name"
                label={text.username[language]}
                name="name"
                autoComplete="user-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                {...register("email")}
                id="email"
                type="email"
                error={!!errors.email}
                label={text.email[language]}
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                {...register("password")}
                name="password"
                error={!!errors.password}
                label={text.password[language]}
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            sx={{ mt: 3, mb: 2 }}
          >
            {text.signup[language]}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link
                component="button"
                variant="body2"
                onClick={() => {
                  navigate("/login");
                }}
              >
                {text.haveAccount[language]}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
