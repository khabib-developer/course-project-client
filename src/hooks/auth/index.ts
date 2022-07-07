import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { IUserData, switchTheme } from "../../interfaces";
import { IForm } from "../../pages/auth/sign-up";
import { useHttp } from "../http";
import { useActions } from "../redux/useActions";
import { useTypedSelector } from "../redux/useSelectedTypes";

export const useAuth = () => {
  const app = useTypedSelector((s) => s.app);
  const actions = useActions();
  const http = useHttp();
  const auth: any = useCallback(
    async (data: IForm, url: string) => {
      const userData: IUserData = await http(`/auth/${url}`, "POST", {
        ...data,
        language: app.language,
        theme: app.darkTheme ? switchTheme.dark : switchTheme.light,
      });
      if (userData) {
        actions.setToken(userData.accessToken);
        actions.setUser(userData.user);
      }
    },
    [actions, app.darkTheme, app.language, http]
  );

  const update = useCallback(
    async (body: any) => {
      const user = app.user
        ? await http("/auth/update", "POST", {
            ...body,
            id: app.user.id,
          })
        : null;
      actions.setUser(user);
    },
    [actions, app.user, http]
  );

  return { auth, update };
};

export const Logout = () => {
  const actions = useActions();
  const app = useTypedSelector((s) => s.app);
  const navigate = useNavigate();
  return useCallback(async () => {
    actions.setToken(null);
    actions.setUser(null);
    await fetch(`${app.server}/auth/logout`, {
      method: "GET",
      credentials: "include",
    });
    navigate("/");
  }, [actions, app.server, navigate]);
};
