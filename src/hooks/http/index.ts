import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Logout } from "../auth";
import { useActions } from "../redux/useActions";
import { useTypedSelector } from "../redux/useSelectedTypes";

export const useHttp = () => {
  const { server } = useTypedSelector((s) => s.app);
  const logout = Logout();
  const navigate = useNavigate();
  const { setLoading, setError, setToken, setUser } = useActions();
  const request = useCallback(
    async (
      url: any,
      method = "GET",
      body: any = null,
      headers: any = {},
      file = false,
      loader: boolean = true
    ) => {
      try {
        let dejavu = false;

        const credentials = "include";

        if (body && !file) {
          body = JSON.stringify(body);
          headers["Content-Type"] = "application/json";
        }

        loader && setLoading(true);

        const request = async (): Promise<any> => {
          headers["authorization"] = `Bearer ${localStorage.getItem(
            "course-project-token"
          )}`;

          let response = await fetch(`${server}${url}`, {
            method,
            body,
            headers,
            credentials,
          });

          if (response.status === 423) {
            navigate("/");
          }

          if (response.status === 403) {
            setError("Blocked");
            return await logout();
          }

          if (response.status === 401) {
            if (dejavu) {
              return await logout();
            }
            dejavu = true;
            let res = await fetch(`${server}/auth/refresh`, {
              method: "GET",
              credentials,
            });
            const data = await res.json();

            if (data) {
              setToken(data.accessToken);
              setUser(data.user);
            }

            response = await request();
          }

          return response;
        };

        let response = await request();

        if (!response) return;

        const data = await response!.json();

        if (!response!.ok) {
          throw new Error(data.message);
        }

        setLoading(false);

        return data;
      } catch (e: any) {
        console.log(e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    },
    [logout, navigate, server, setError, setLoading, setToken, setUser]
  );

  return request;
};
