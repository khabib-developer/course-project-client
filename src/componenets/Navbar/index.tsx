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

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
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

  const handleSearch = (event: any) => {
    actions.setSearch(event.target.value, navigate, location);
  };

  // React.useEffect(() => {
  //   navigate(`${location.pathname}?${app.search}`);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [app.search]);

  React.useEffect(() => {
    if (location.search !== "") {
      return;
    }
    actions.setSearch("", navigate, location);
  }, [location]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="default">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
            onClick={() => navigate("/")}
          >
            Collection Site
          </Typography>
          <Search>
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

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {app.user && (
              <Button
                sx={{
                  px: 2,
                  mx: 2,
                  border: "1px solid",
                  borderColor: "inherit",
                }}
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
              // onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
