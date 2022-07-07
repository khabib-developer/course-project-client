import {
  Autocomplete,
  Box,
  Button,
  CardMedia,
  Checkbox,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { Markup } from "interweave";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { NOtFound } from "../../componenets/404";
import { LoadingBg } from "../../componenets/LoadingBg";
import Navbar from "../../componenets/Navbar";
import { useHttp } from "../../hooks/http";
import { useTypedSelector } from "../../hooks/redux/useSelectedTypes";
import { ICollection, IItem } from "../../interfaces";
import { text } from "../../text";
import date from "date-and-time";
import { UpoadFile } from "../../componenets/DragDropFileUpload";
import { Item } from "../../componenets/Item";
import { ItemModal } from "../../componenets/Item/itemModal";
import { EditCollection } from "./editCollection";
import { useActions } from "../../hooks/redux/useActions";
import { useLike } from "../../hooks/like";
import { useConvert } from "../../hooks/additionalFields";
import {
  Editor_dark_theme,
  Editor_white_theme,
} from "../../componenets/markdown";

export const CollectionPage = () => {
  const { id } = useParams();

  const app = useTypedSelector((s) => s.app);

  const actions = useActions();

  const location = useLocation();

  const [open, setopen] = useState(false);

  const [newItemImage, setNewItemImage] = useState<string | null>(null);
  const [name, setname] = useState("");

  const [tags, settags] = useState<string[]>([]);

  const [inputValue, setInputValue] = useState("");

  const [collection, setcollection] = useState<ICollection | null>(null);
  const [loading, setloading] = useState<boolean>(true);
  const [selfCollection, setselfCollection] = useState<boolean>(false);

  const [additionalfeilds, setadditionalfields] = useState<any[]>([]);

  const [item, setitem] = useState<undefined | IItem>(undefined);

  const [possibleTags, setPossibleTags] = useState<string[]>([]);

  const [edit, setedit] = useState<boolean>(false);

  const http = useHttp();

  const navigate = useNavigate();

  const { setLikes, handleLike } = useLike();

  const { fromServer, toServer } = useConvert();

  useEffect(() => {
    if (collection) {
      setitem(
        collection.Items.find(
          (item) => item.id === Number(location.hash.slice(1))
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collection, location]);

  useEffect(() => {
    (async function () {
      const collection: ICollection | null = await http(
        "/collection/getById",
        "POST",
        { id }
      );
      if (collection) {
        setPossibleTags(collection.tags?.map((tag) => tag.name) || []);
        setcollection(collection);
        app.user &&
          app.user.id === collection.UserId &&
          setselfCollection(true);

        if (collection.AdditionalField) {
          setadditionalfields(fromServer(collection.AdditionalField));
        }

        setLikes(collection.Items);
      }
      setloading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (collection && collection.AdditionalField) {
      setadditionalfields(fromServer(collection.AdditionalField));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collection]);

  const handleCreate = async (e: any) => {
    e.preventDefault();
    if (
      newItemImage &&
      name !== "" &&
      tags.length !== 0 &&
      additionalfeilds.filter((f: any) => f.value === "").length === 0
    ) {
      const newItem: IItem | null = await http(
        "/collection/createitem",
        "POST",
        {
          name,
          tags,
          image: newItemImage,
          AdditionalFieldsValue: toServer(additionalfeilds, true),
          CollectionId: collection?.id,
          theme: collection?.theme,
        }
      );
      if (newItem) {
        actions.setLikedItems({
          ...app.likedItems,
          [newItem.id]: {
            liked: false,
            length: 0,
          },
        });
        setcollection((prev: any) => ({
          ...prev!,
          Items: [...prev!.Items!, newItem],
        }));
        setPossibleTags(
          Array.from(
            new Set(newItem.Tags.map((tag) => tag.name).concat(possibleTags))
          )
        );
        setopen(false);
        setname("");
        setNewItemImage("");
        setadditionalfields((prev) => [
          ...prev.map((field) => ({ ...field, value: "" })),
        ]);
      }
    }
  };

  const handleDelete = async () => {
    if (collection) {
      const deletedCollection = await http(
        `/collection/delete/${collection.id}`
      );
      if (deletedCollection) {
        actions.setUser({
          ...app.user!,
          Collections: [
            ...app.user!.Collections.filter((c) => c.id !== collection.id),
          ],
        });
        navigate("/profile");
      }
    }
  };

  const handleMarkdown = (value: string, field: any) => {
    setadditionalfields((prev: any) => [
      ...prev.filter((f: any) => f.name !== field.name),
      {
        ...prev.find((f: any) => f.name === field.name)!,
        value,
      },
    ]);
  };

  if (loading) return <LoadingBg />;
  if (!collection) return <NOtFound />;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      <Navbar />
      <Grid container justifyContent="center" rowSpacing={5} py={5} mt={5}>
        {app.user && app.user.id === collection.UserId && (
          <Grid item container lg={8} md={8} sm={10} xs={11}>
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

        {app.user && app.user.id === collection.UserId && edit ? (
          <EditCollection
            setcollection={setcollection}
            collection={collection}
          />
        ) : (
          <>
            <Grid item container spacing={3} lg={8} md={8} sm={10} xs={11}>
              {collection.image && (
                <Grid item lg={6}>
                  <CardMedia
                    component="img"
                    sx={{ borderRadius: "10px" }}
                    image={`${app.server}/static/images/${collection.image}`}
                    alt="Paella dish"
                  />
                </Grid>
              )}
              <Grid item lg={6}>
                <Typography variant="h2" component="h2">
                  {collection.name}
                </Typography>
                <Typography variant="h5" pt={3} component="h4">
                  {text.collectionTheme[app.language]}:{" "}
                  {
                    text.collection.find(
                      (c: any) => c!.label! === collection!.theme!
                    )![app.language]
                  }
                </Typography>
                <Typography variant="h5" pt={3} component="h4">
                  {text.author[app.language]}: {collection.User.name}
                </Typography>
                <Typography variant="overline" pt={3} component="div">
                  {text.date[app.language]}:{" "}
                  {date.format(new Date(collection.createdAt), "YYYY-MM-DD")}
                </Typography>
              </Grid>
            </Grid>
            <Grid item lg={8} md={8} sm={10} xs={11}>
              <Markup content={collection.description} />
            </Grid>
          </>
        )}

        <Grid item container lg={8} md={8} sm={10} spacing={2} xs={11}>
          {collection.Items.map((item: IItem, i: number) => (
            <Grid item xs={12} lg={4} key={i}>
              <Item
                handleLike={handleLike}
                likeData={app.likedItems[item.id]}
                item={item}
              />
            </Grid>
          ))}
        </Grid>

        {selfCollection && (
          <Grid item lg={8} md={8} sm={10} xs={11}>
            <Button
              variant="contained"
              color="warning"
              onClick={() => setopen(true)}
              sx={{ bgColor: "default.primary" }}
            >
              {text.addItem[app.language]}
            </Button>
          </Grid>
        )}
      </Grid>

      <Dialog
        fullWidth={true}
        maxWidth={"sm"}
        open={open}
        onClose={() => setopen(false)}
      >
        <DialogTitle>{text.addItem[app.language]}</DialogTitle>
        <DialogContent>
          <Box noValidate component="form" onSubmit={handleCreate}>
            <Grid container justifyContent="center" spacing={4}>
              <Grid
                item
                justifyContent="center"
                lg={6}
                sx={{ display: "flex" }}
              >
                <UpoadFile
                  update={false}
                  image={newItemImage}
                  handleFile={setNewItemImage}
                />
              </Grid>
              <Grid item lg={6}>
                <TextField
                  id="filled-basic"
                  hiddenLabel
                  required
                  value={name}
                  onChange={(e: any) => setname(e.target.value)}
                  placeholder={text.name[app.language]}
                  sx={{ width: "100%" }}
                  variant="standard"
                />
                <Grid container pt={3} spacing={1}>
                  {tags.sort().map((tag, i) => (
                    <Grid key={i} item>
                      <Chip
                        label={tag}
                        variant="outlined"
                        onDelete={() =>
                          settags((prev) => [
                            ...prev.sort().filter((_, j) => i !== j),
                          ])
                        }
                      />
                    </Grid>
                  ))}
                </Grid>
                <Grid container mt={3} alignItems="center">
                  <Typography>#</Typography>
                  <Autocomplete
                    value={inputValue}
                    onInputChange={(event, newInputValue) => {
                      setInputValue(
                        newInputValue[0] === "#"
                          ? newInputValue.slice(1)
                          : newInputValue
                      );
                    }}
                    sx={{ width: "80%" }}
                    id="controllable-states-demo"
                    options={possibleTags}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="standard"
                        placeholder={text.tag[app.language]}
                      />
                    )}
                  />
                  <IconButton
                    onClick={() => {
                      if (
                        inputValue !== "" &&
                        !tags.find((tag) => tag === `#${inputValue}`)
                      ) {
                        settags((prev: string[]) => [
                          ...prev,
                          `#${inputValue}`,
                        ]);
                      }
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                </Grid>
                <Grid item>
                  {additionalfeilds
                    .filter(
                      (field) =>
                        field.type !== text.typeFields[2].en &&
                        field.type !== text.typeFields[3].en
                    )
                    .sort((a, b) => a.id - b.id)
                    .map((field: any, i: number) => (
                      <TextField
                        key={i}
                        id="filled-basic"
                        // hiddenLabel
                        label={field.name}
                        required
                        type={field.type}
                        className="mt-3"
                        value={field.value}
                        onChange={(e: any) =>
                          setadditionalfields((prev: any) => [
                            ...prev.filter((f: any) => f.name !== field.name),
                            {
                              ...prev.find((f: any) => f.name === field.name)!,
                              value: e.target.value,
                            },
                          ])
                        }
                        placeholder={field.name}
                        sx={{ width: "100%" }}
                        variant="standard"
                      />
                    ))}
                </Grid>
              </Grid>
            </Grid>
            <Grid>
              {additionalfeilds
                .filter((field) => field.type === text.typeFields[3].en)
                .sort((a, b) => a.id - b.id)
                .map((field: any, i: number) => (
                  <Grid item key={i} pt={3}>
                    <label htmlFor={field.id}>
                      <span>{field.name}</span>
                      <Checkbox
                        checked={field.value}
                        onChange={(e: any) =>
                          setadditionalfields((prev: any) => [
                            ...prev.filter((f: any) => f.name !== field.name),
                            {
                              ...prev.find((f: any) => f.name === field.name)!,
                              value: e.target.checked,
                            },
                          ])
                        }
                        className="mx-2"
                      />
                    </label>
                  </Grid>
                ))}
            </Grid>
            <Grid>
              {additionalfeilds
                .filter((field) => field.type === text.typeFields[2].en)
                .sort((a, b) => a.id - b.id)
                .map((field: any, i: number) => (
                  <Grid item key={i} pt={3}>
                    {app.darkTheme ? (
                      // eslint-disable-next-line react/jsx-pascal-case
                      <Editor_dark_theme
                        text={field.value}
                        height={300}
                        handleMarkdown={(value: string) =>
                          handleMarkdown(value, field)
                        }
                      />
                    ) : (
                      // eslint-disable-next-line react/jsx-pascal-case
                      <Editor_white_theme
                        text={field.name}
                        height={300}
                        handleMarkdown={(value: string) =>
                          handleMarkdown(value, field)
                        }
                      />
                    )}
                  </Grid>
                ))}
            </Grid>
            <Grid pt={3} sx={{ display: "flex", justifyContent: "end" }}>
              <Button type="submit" color="warning" onClick={handleCreate}>
                {text.save[app.language]}
              </Button>
              <Button color="warning" onClick={() => setopen(false)}>
                {text.close[app.language]}
              </Button>
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>

      <ItemModal
        possibleTags={possibleTags}
        item={item}
        AdditionalField={collection.AdditionalField}
        handleLike={handleLike}
        likedData={app.likedItems[item?.id || 0]}
        UserId={collection.UserId}
        setcollection={setcollection}
      />
    </Box>
  );
};
