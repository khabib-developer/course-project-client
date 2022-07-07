/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useHttp } from "../hooks/http";
import { useActions } from "../hooks/redux/useActions";
import { useTypedSelector } from "../hooks/redux/useSelectedTypes";
import SignIn from "../pages/auth/sign-in";
import { SignUp } from "../pages/auth/sign-up";
import { Main } from "../pages/main";
import { Owner } from "../pages/admin";
import { Profile } from "../pages/profile";
import { Box } from "@mui/material";
import { CreateCollection } from "../pages/createCollection";
import { CollectionPage } from "../pages/collection";

export const Pages: React.FC = () => {
  const [permission, setpermission] = useState<boolean>(false);
  const { token, user } = useTypedSelector((s: any) => s.app);

  const actions = useActions();

  const http = useHttp();

  useEffect(() => {
    (async function () {
      try {
        if (token) {
          const check = await http("/auth/check");
          if (check) {
            actions.setUser(check);
          }
        }
      } catch (error) {
        console.log(error);
      }
      setpermission(true);
    })();
  }, []);

  if (permission) {
    return (
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/collection/:id" element={<CollectionPage />} />
        {token && user && (
          <>
            <Route path="/profile" element={<Profile />} />
            <Route path="/create" element={<CreateCollection />} />
          </>
        )}
        {token && user && user.admin && (
          <Route path="/admin" element={<Owner />} />
        )}
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        color: "text.primary",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      loading...
    </Box>
  );
};
