import {
  Autocomplete,
  Button,
  Checkbox,
  Chip,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { FormEvent, useEffect, useState } from "react";
import { useTypedSelector } from "../../hooks/redux/useSelectedTypes";
import { ICollection, IItem } from "../../interfaces";
import { text } from "../../text";
import AddIcon from "@mui/icons-material/Add";
import { UpoadFile } from "../DragDropFileUpload";
import { useHttp } from "../../hooks/http";
import { useConvert } from "../../hooks/additionalFields";
import { Editor_dark_theme, Editor_white_theme } from "../markdown";

export const EditItem: React.FC<{
  item: IItem;
  possibleTags: string[];
  AdditionalField: any;
  setcollection: (collection: any) => void;
}> = ({ item, possibleTags, setcollection, AdditionalField }) => {
  const app = useTypedSelector((s) => s.app);
  const [newItemImage, setNewItemImage] = useState<string | null>(item.image);
  const [name, setname] = useState(item.name);

  const [tags, settags] = useState<string[]>(item.Tags.map((tag) => tag.name));

  const [inputValue, setInputValue] = useState("");

  const [additionalfeilds, setadditionalfields] = useState<any[]>([]);

  const { toEdit, toServer } = useConvert();

  const http = useHttp();

  useEffect(() => {
    if (item) {
      setadditionalfields(toEdit(AdditionalField, item?.AdditionalFieldsValue));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  const handleUpdate = async (event: FormEvent<EventTarget>): Promise<void> => {
    event.preventDefault();

    console.log(toServer(additionalfeilds, true));

    const updateItem = await http("/collection/updateItem", "POST", {
      id: item.id,
      name,
      tags,
      image: newItemImage,
      AdditionalFieldsValue: {
        ...toServer(additionalfeilds, true),
        ItemId: item.id,
      },
    });
    if (updateItem) {
      setcollection((prev: ICollection) => ({
        ...prev,
        Items: [
          ...prev.Items.filter((element) => element.id !== item.id),
          {
            ...prev.Items.find((element) => element.id === item.id),
            ...updateItem,
            Tags: tags.map((element) => ({ name: element })),
            AdditionalFieldsValue: toServer(additionalfeilds, true),
          },
        ],
      }));
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

  return (
    <Grid
      container
      justifyContent="center"
      spacing={2}
      component="form"
      onSubmit={handleUpdate}
    >
      <Grid item justifyContent="center" lg={6} sx={{ display: "flex" }}>
        <UpoadFile
          update={true}
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
                  settags((prev) => [...prev.sort().filter((_, j) => i !== j)])
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
                settags((prev: string[]) => [...prev, `#${inputValue}`]);
              }
            }}
          >
            <AddIcon />
          </IconButton>
        </Grid>

        <Grid item>
          {additionalfeilds
            .sort((a, b) => a.id - b.id)
            .filter(
              (field) =>
                field.type !== text.typeFields[2].en &&
                field.type !== text.typeFields[4].en &&
                field.type !== text.typeFields[3].en
            )
            .map((field: any, i: number) => {
              if (field.key) {
                return (
                  <TextField
                    key={i}
                    id="filled-basic"
                    label={field.key}
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
                );
              }
            })}
        </Grid>

        <Grid item>
          {additionalfeilds
            .sort((a, b) => a.id - b.id)
            .filter((field) => field.type === text.typeFields[4].en)
            .map((field: any, i: number) => {
              if (field.key) {
                return (
                  <TextField
                    key={i}
                    id="filled-basic"
                    label={field.key}
                    required
                    type={field.type}
                    className="mt-3"
                    defaultValue={new Date(field.value)
                      .toISOString()
                      .slice(0, 10)}
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
                );
              }
            })}
        </Grid>

        <Grid>
          {additionalfeilds
            .filter((field) => field.type === text.typeFields[3].en)
            .sort((a, b) => a.id - b.id)
            .map((field: any, i: number) => {
              if (field.key)
                return (
                  <Grid item key={i} pt={3}>
                    <label htmlFor={field.id}>
                      <span>{field.key}</span>
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
                );
            })}
        </Grid>

        <Grid>
          {additionalfeilds
            .filter((field) => field.type === text.typeFields[2].en)
            .sort((a, b) => a.id - b.id)
            .map((field: any, i: number) => {
              if (field.key)
                return (
                  <Grid item key={i} pt={3}>
                    <span className="pb-2 d-block">{field.key}</span>
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
                );
            })}
        </Grid>

        <Grid pt={3}>
          <Button type="submit" variant="contained" color="warning">
            {text.update[app.language]}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};
