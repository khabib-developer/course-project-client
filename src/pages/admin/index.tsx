import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Navbar from "../../componenets/Navbar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Checkbox } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import DeleteIcon from "@mui/icons-material/Delete";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import date from "date-and-time";
import { useHttp } from "../../hooks/http";
import { LoadingBg } from "../../componenets/LoadingBg";
import { useTypedSelector } from "../../hooks/redux/useSelectedTypes";
import { text } from "../../text";
import { Logout } from "../../hooks/auth";

export const Admin: React.FC = (): any => {
  const http = useHttp();

  const app = useTypedSelector((s) => s.app);

  const [checked, setchecked] = useState<any>({});

  const logout = Logout();

  const [clients, setclients] = useState<any[] | null>(null);

  useEffect(() => {
    (async function () {
      const users = await http("/auth/getAll");
      setclients(users);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = () => {
    if (clients) {
      const bool =
          Object.values(checked).filter((e) => e).length === clients.length,
        a: any = {};
      clients.forEach((user) => (a[user.id] = !bool));
      setchecked(a);
    }
  };

  const convert = () => {
    const ids: number[] = [];
    for (const id in checked) {
      if (Object.prototype.hasOwnProperty.call(checked, id)) {
        if (checked[id]) ids.push(+id);
      }
    }
    return ids;
  };

  const handleUpdate = async (fields: any) => {
    const ids: number[] = convert();
    let a: any[] = clients || [];
    if (ids.length > 0) {
      const users = await http("/auth/updateUsers", "POST", { ids, fields });
      if (users) {
        ids.forEach((id: number) => {
          a = [
            ...a.filter((user, i) => user.id !== id),
            {
              ...a.find((user, i) => user.id === id),
              ...fields,
            },
          ];
        });

        if (
          ids.find((id: number) => id === app.user!.id) &&
          (fields.blocked || !fields.admin)
        ) {
          logout();
          return;
        }

        setclients(a);
      }
    }
  };

  const handleDelete = async () => {
    let a: any[] = clients || [];
    const ids = await http("/auth/bulkDelete", "POST", { ids: convert() });
    if (ids) {
      ids.forEach((id: number) => {
        a = [...a.filter((user, i) => user.id !== id)];
      });

      if (ids.find((id: number) => id === app.user!.id)) {
        logout();
        return;
      }
      setclients(a);
    }
  };

  if (clients)
    return (
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "background.default",
          color: "text.primary",
        }}
      >
        <Navbar />

        <Box sx={{ m: 3 }}>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            <Button
              className="px-3 bg-danger text-white"
              onClick={() => handleUpdate({ blocked: true, admin: false })}
            >
              <LockIcon />
            </Button>
            <Button
              className="px-2 bg-secondary text-white mx-4"
              onClick={() => handleUpdate({ blocked: false })}
            >
              <LockOpenIcon />
            </Button>

            <Button
              className="px-3 bg-success text-white"
              onClick={() => handleUpdate({ admin: true, blocked: false })}
            >
              <AdminPanelSettingsIcon />
            </Button>
            <Button
              className="px-2 bg-danger text-white mx-4"
              onClick={() => handleUpdate({ admin: false })}
            >
              <AdminPanelSettingsIcon />
            </Button>

            <Button
              className="px-2 bg-secondary text-white"
              onClick={handleDelete}
            >
              <DeleteIcon />
            </Button>
          </Box>

          <TableContainer component={Paper} sx={{ mt: 3 }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Checkbox
                      checked={
                        Object.values(checked).filter((e) => e).length ===
                        clients.length
                      }
                      onChange={handleChange}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  </TableCell>
                  <TableCell>id</TableCell>
                  <TableCell align="left">
                    {" "}
                    {text.email[app.language]}{" "}
                  </TableCell>
                  <TableCell align="left">
                    {text.username[app.language]}{" "}
                  </TableCell>
                  <TableCell align="left">
                    {text.registrationTime[app.language]}
                  </TableCell>
                  <TableCell align="left">
                    {text.status[app.language]}
                  </TableCell>
                  <TableCell align="left">{text.admin[app.language]}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {clients
                  .sort((a, b) => a.id - b.id)
                  .map((user) => {
                    return (
                      <TableRow
                        key={user.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          <Checkbox
                            checked={!!checked[user.id]}
                            onChange={() =>
                              setchecked((prev: any) => ({
                                ...prev,
                                [user.id]: !prev[user.id],
                              }))
                            }
                            inputProps={{ "aria-label": "controlled" }}
                          />
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {user.id}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {user.email}
                        </TableCell>
                        <TableCell align="left">{user.name}</TableCell>
                        <TableCell align="left">
                          {date.format(
                            new Date(user!.createdAt!),
                            "YY-MM-DD HH:mm:ss"
                          )}
                        </TableCell>
                        <TableCell align="left">
                          {user.blocked ? (
                            <span className="text-danger">blocked</span>
                          ) : (
                            <span className="text-success">active</span>
                          )}
                        </TableCell>
                        <TableCell align="left">
                          {!user.admin ? (
                            <span className="text-danger">blocked</span>
                          ) : (
                            <span className="text-success">active</span>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    );

  return <LoadingBg />;
};
