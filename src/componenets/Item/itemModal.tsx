import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import date from "date-and-time";

import FavoriteIcon from "@mui/icons-material/Favorite";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../hooks/redux/useSelectedTypes";
import { IComment, IItem } from "../../interfaces";
import { text } from "../../text";
import { useHttp } from "../../hooks/http";
import { EditItem } from "./editItem";
import { Markup } from "interweave";
import { useConvert } from "../../hooks/additionalFields";
import { TagItem } from "../TagItem";

export const ItemModal: React.FC<{
  item: IItem | undefined;
  likedData: any;
  handleLike: any;
  UserId: number;
  AdditionalField: any;
  possibleTags: string[];
  setcollection: (c: any) => void;
}> = ({
  item,
  likedData,
  handleLike,
  UserId,
  possibleTags,
  setcollection,
  AdditionalField,
}) => {
  const app = useTypedSelector((s) => s.app);
  const [edit, setedit] = useState<boolean>(false);
  const [comment, setcomment] = useState("");
  const [comments, setcomments] = useState<IComment[]>([]);
  const location = useLocation();
  const navigate = useNavigate();
  const http = useHttp();

  const [additionalFields, setadditionalfields] = useState<any[]>([]);

  const { toEdit } = useConvert();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (app.user && item) {
      const newComment = await http("/collection/comment", "POST", {
        UserId: app.user.id,
        ItemId: item.id,
        text: comment,
      });
      newComment && setcomments((prev: any) => [...prev, newComment]);
      setcomment("");
      return;
    }
    navigate("/login");
  };

  useEffect(() => {
    if (item) {
      setadditionalfields(toEdit(AdditionalField, item.AdditionalFieldsValue));
      return;
    }
    setcomments([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  if (item) {
    const handleDelete = async () => {
      const deletedItem = await http(`/collection/deleteItem/${item.id}`);

      deletedItem &&
        setcollection((prev: any) => ({
          ...prev,
          Items: [
            ...prev.Items.filter((element: any) => element.id !== item.id),
          ],
        }));
    };
    return (
      <Dialog
        fullWidth={true}
        maxWidth={"lg"}
        open={!!item}
        onClose={() => navigate(location.pathname)}
      >
        <DialogContent>
          <Box>
            <Grid container justifyContent="center" spacing={2}>
              {app.user && app.user.id === +UserId && (
                <Grid item container>
                  <IconButton
                    onClick={() => setedit(false)}
                    color={!edit ? "primary" : "inherit"}
                  >
                    <RemoveRedEyeIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => setedit(true)}
                    color={edit ? "primary" : "inherit"}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={handleDelete} color="error">
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              )}

              {app.user && app.user.id === UserId && edit ? (
                <EditItem
                  AdditionalField={AdditionalField}
                  possibleTags={possibleTags}
                  setcollection={setcollection}
                  item={item}
                />
              ) : (
                <Grid item container spacing={2} lg={12}>
                  <Grid
                    item
                    justifyContent="center"
                    lg={6}
                    sx={{ display: "flex" }}
                  >
                    <img
                      width="100%"
                      src={`${app.server}/static/images/${item?.image}`}
                      alt="alt"
                    />
                  </Grid>
                  <Grid item lg={6}>
                    <Typography gutterBottom variant="h5" component="div">
                      {item.name}
                    </Typography>
                    <Box sx={{ display: "flex" }}>
                      {item.Tags.map((tag, i) => (
                        <TagItem tag={tag} key={i} />
                      ))}
                    </Box>

                    <Grid item>
                      {additionalFields.map((field: any, i: number) => {
                        if (field.key !== null && field.value !== null) {
                          if (field.type === text.typeFields[4].en) {
                            return (
                              <Typography
                                key={i}
                                variant="body2"
                                color="text.secondary"
                              >
                                {field.key}:{" "}
                                {date.format(
                                  new Date(Date.parse(field.value)),
                                  "YYYY-MM-DD HH:mm:ss"
                                )}
                              </Typography>
                            );
                          }

                          if (field.type === text.typeFields[2].en) {
                            return (
                              <div key={i}>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  {field.key}
                                </Typography>
                                <Markup content={field.value} />
                              </div>
                            );
                          }

                          if (field.type === text.typeFields[3].en) {
                            return (
                              <div key={i}>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  {field.key}:{" "}
                                  {field.value
                                    ? text.yes[app.language]
                                    : text.no[app.language]}
                                </Typography>
                              </div>
                            );
                          }

                          return (
                            <Typography
                              key={i}
                              variant="body2"
                              color="text.secondary"
                            >
                              {field.key}: {field.value}
                            </Typography>
                          );
                        }
                      })}
                    </Grid>
                  </Grid>
                </Grid>
              )}
            </Grid>
            <Grid pt={4}>
              {[...(item?.Comments || []), ...comments].map(
                (comment: IComment, i: number) => (
                  <Box
                    pt={3}
                    px={2}
                    key={i}
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      {comment.text}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {date.format(
                        new Date(comment.createdAt),
                        "YYYY-MM-DD HH:mm:ss"
                      )}
                    </Typography>
                  </Box>
                )
              )}
            </Grid>
            <Grid pt={4}>
              <Box
                component="form"
                sx={{ display: "flex" }}
                onSubmit={handleSubmit}
              >
                <IconButton
                  color={likedData.liked ? "error" : "inherit"}
                  aria-label="add to favorites"
                  onClick={() => handleLike(item.id)}
                >
                  <FavoriteIcon />
                </IconButton>
                <Typography sx={{ display: "flex", alignItems: "center" }}>
                  {likedData.length}
                </Typography>
                <TextField
                  id="filled-basic"
                  hiddenLabel
                  required
                  value={comment}
                  onChange={(e: any) => setcomment(e.target.value)}
                  placeholder={text.comment[app.language]}
                  sx={{ width: "100%", px: 4 }}
                  variant="standard"
                />
                <Button>{text.add[app.language]}</Button>
              </Box>
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>
    );
  }
  return <></>;
};
