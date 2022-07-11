/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import MoreIcon from "@mui/icons-material/MoreVert";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LanguageIcon from "@mui/icons-material/Language";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useTypedSelector } from "../../hooks/redux/useSelectedTypes";
import { useActions } from "../../hooks/redux/useActions";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { switchlanguage } from "../../interfaces";
import { text } from "../../text";
import { Logout, useAuth } from "../../hooks/auth";
import { useState } from "react";

const Search = styled("form")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "50%",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "100%",
    },
  },
}));

export default function Navbar() {
  const location = useLocation();

  const logout = Logout();
  const { update } = useAuth();
  const app = useTypedSelector((s) => s.app);
  const actions = useActions();
  const navigate = useNavigate();

  const [open, setOpen] = useState<boolean>(false);

  const handleSearch = (event: any) => {
    actions.setSearch(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    navigate(`/1?${app.search}`);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="default">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Logo
          </Typography>
          <Search onSubmit={handleSubmit}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder={`${text.searchPlaceholder[app.language]}`}
              value={app.search}
              onChange={handleSearch}
              inputProps={{ "aria-label": "search" }}
            />
          </Search>

          <Box
            sx={{
              bgcolor: { xs: "background.default", md: "transparent" },
              position: { xs: "absolute", md: "relative" },
              top: { xs: 56, md: 0 },
              left: { xs: 0, md: "auto" },
              width: { xs: "100%", md: "auto" },
              height: { xs: `calc(100vh - 56px)`, md: "auto" },
              p: { md: 0, xs: 3 },
              display: { xs: open ? "flex" : "none", md: "flex" },
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              zIndex: { xs: "10000", md: "auto" },
            }}
          >
            {app.user && app.user.admin && (
              <Button
                sx={{
                  px: 2,
                  border: "1px solid",
                  borderColor: "inherit",
                }}
                size="small"
                color="inherit"
                onClick={() => navigate("/admin")}
              >
                {text.admin[app.language]}
              </Button>
            )}
            {app.user && (
              <Button
                sx={{
                  px: 2,
                  mt: { xs: 2, md: 0 },
                  mx: 2,
                  border: "1px solid",
                  borderColor: "inherit",
                }}
                size="small"
                color="inherit"
                onClick={() => navigate("/create")}
              >
                {text.create[app.language]}
              </Button>
            )}
            <Button
              endIcon={<LanguageIcon />}
              onClick={() =>
                actions.setLanguage(
                  app.language === switchlanguage.en
                    ? switchlanguage.ru
                    : switchlanguage.en,
                  app.user ? update : null
                )
              }
              color="inherit"
            >
              {app.language.toUpperCase()}
            </Button>
            <IconButton
              size="large"
              aria-label="show more"
              aria-haspopup="true"
              onClick={() =>
                actions.setTheme(!app.darkTheme, app.user ? update : null)
              }
              color="inherit"
            >
              <DarkModeIcon />
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              onClick={() => {
                location.pathname === "/profile"
                  ? logout()
                  : app.user
                  ? navigate("/profile")
                  : navigate("/login");
              }}
              color="inherit"
            >
              {location.pathname === "/profile" ? (
                <LogoutIcon />
              ) : app.user ? (
                <AccountCircleIcon />
              ) : (
                <LoginIcon />
              )}
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-haspopup="true"
              onClick={() => setOpen((prev: boolean) => !prev)}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {/* <Box
        sx={{
          position: "absolute",
          display: { xs: "flex", md: "none" },
          top: 64,
          right: 10,
        }}
      >
        mobile
      </Box> */}
    </Box>
  );
}
