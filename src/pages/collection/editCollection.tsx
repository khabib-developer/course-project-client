import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import validator from "validator";

import { UpoadFile } from "../../componenets/DragDropFileUpload";
import {
  Editor_dark_theme,
  Editor_white_theme,
} from "../../componenets/markdown";
import { useConvert } from "../../hooks/additionalFields";
import { useHttp } from "../../hooks/http";
import { useActions } from "../../hooks/redux/useActions";
import { useTypedSelector } from "../../hooks/redux/useSelectedTypes";
import { ICollection } from "../../interfaces";
import { text } from "../../text";

export const EditCollection: React.FC<{
  collection: ICollection;
  setcollection: any;
}> = ({ collection, setcollection }) => {
  const app = useTypedSelector((s) => s.app);
  const actions = useActions();

  const { toServer, fromServer } = useConvert();

  const [name, setName] = useState(collection.name);
  const [description, setdescription] = useState(collection.description);
  const [image, setimage] = useState<null | string>(collection.image);

  const [collectiontype, setcollectiontype] = useState<string>(
    collection.theme
  );

  const [createDynamicField, setCreateDynamicField] = useState<any>({
    name: "",
    type: text.typeFields[0].en,
  });
  const [dynamicfields, setdynamicfields] = useState<any[]>([]);

  useEffect(() => {
    if (collection.AdditionalField) {
      setdynamicfields(fromServer(collection.AdditionalField));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const http = useHttp();

  const handleUpdate = async (e: any) => {
    e.preventDefault();

    let AdditionalField: any = toServer(dynamicfields);

    if (!validator.isEmpty(name) && !validator.isEmpty(description)) {
      const updatedCollection: ICollection = await http(
        "/collection/update",
        "POST",
        {
          id: collection.id,
          name,
          description,
          image,
          theme: collectiontype,
          AdditionalField: {
            CollectionId: collection.id,
            ...AdditionalField,
          },
        }
      );

      if (updatedCollection) {
        actions.setSuccess(text.success[app.language]);
        setcollection({ ...updatedCollection, AdditionalField });

        actions.setUser({
          ...app.user!,
          Collections: [
            ...app.user!.Collections.filter(
              (c) => c.id !== updatedCollection.id
            ),
            { ...updatedCollection, AdditionalField },
          ],
        });
      }
    }
  };

  return (
    <Box component={"form"}>
      <Grid container justifyContent="center" py={5}>
        <Grid container item spacing={3} lg={8} md={8} sm={10} xs={11}>
          <Grid item lg={6} pt={3}>
            <UpoadFile update={false} image={image} handleFile={setimage} />
          </Grid>
          <Grid item lg={6} pt={3}>
            <FormControl variant="standard" sx={{ m: 1, width: "100%" }}>
              <InputLabel id="demo-simple-select-standard-label">
                {text.collectionTheme[app.language]}
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={collectiontype}
                onChange={(e) => setcollectiontype(e.target.value)}
                label="Age"
              >
                {text.collection.map((value, i) => (
                  <MenuItem key={i} value={value.label}>
                    {value[app.language]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              id="filled-basic"
              hiddenLabel
              required
              value={name}
              onChange={(e: any) => setName(e.target.value)}
              placeholder={text.name[app.language]}
              sx={{ width: "100%", pt: 3 }}
              variant="standard"
            />
          </Grid>
          <Grid item lg={12} pt={3}>
            {app.darkTheme ? (
              // eslint-disable-next-line react/jsx-pascal-case
              <Editor_dark_theme
                text={description}
                height={300}
                handleMarkdown={setdescription}
              />
            ) : (
              // eslint-disable-next-line react/jsx-pascal-case
              <Editor_white_theme
                text={description}
                height={300}
                handleMarkdown={setdescription}
              />
            )}
          </Grid>
          {dynamicfields.sort().map((field: any, i: number) => (
            <Grid
              item
              lg={12}
              key={i}
              container
              pt={3}
              justifyContent="space-between"
            >
              <Grid item xs={4}>
                {field.name}
              </Grid>
              <Grid item xs={5}>
                {
                  text.typeFields.find((f: any) => f.en === field.type)![
                    app.language
                  ]
                }
              </Grid>
              <Grid item xs={2}>
                <Button
                  color="error"
                  sx={{ width: "100%", mx: 2 }}
                  onClick={() =>
                    setdynamicfields((prev: any) => [
                      ...prev.filter((f: any) => f.id !== field.id),
                    ])
                  }
                >
                  {text.delete[app.language]}
                </Button>
              </Grid>
            </Grid>
          ))}
          <Grid item lg={12} container pt={3} justifyContent="space-between">
            <Grid item xs={4}>
              <TextField
                id="filled-basic"
                hiddenLabel
                value={createDynamicField.name}
                required={true}
                onChange={(event: any) =>
                  setCreateDynamicField((prev: any) => ({
                    ...prev,
                    name: event.target.value,
                  }))
                }
                placeholder={text.dynamicfields[app.language]}
                sx={{ width: "100%" }}
                variant="standard"
              />
            </Grid>
            <Grid item xs={5}>
              <Select
                variant="standard"
                sx={{ width: "100%" }}
                value={createDynamicField.type}
                onChange={(event: any) =>
                  setCreateDynamicField((prev: any) => ({
                    ...prev,
                    type: event.target.value,
                  }))
                }
              >
                {text.typeFields.map((value, i) => (
                  <MenuItem key={i} value={value.en}>
                    {value[app.language]}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={2}>
              <Button
                color="inherit"
                sx={{ width: "100%", mx: 2 }}
                onClick={() => {
                  if (
                    dynamicfields.filter(
                      (field: any) => field.type === createDynamicField.type
                    ).length < 3 &&
                    !validator.isEmpty(createDynamicField.name)
                  ) {
                    setdynamicfields((prev: any) => [
                      ...prev,
                      {
                        id: prev.length,
                        name: createDynamicField.name,
                        type: createDynamicField.type,
                      },
                    ]);
                  }
                }}
              >
                {text.add[app.language]}
              </Button>
            </Grid>
          </Grid>
          <Grid item lg={12} pt={3}>
            <Button
              type="submit"
              sx={{
                px: 4,
                border: "1px solid",
                borderRadius: "10px",
                borderColor: "inherit",
              }}
              color="inherit"
              onClick={handleUpdate}
            >
              {text.update[app.language]}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
