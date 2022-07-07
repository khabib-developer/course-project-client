import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import validator from "validator";

import { UpoadFile } from "../../componenets/DragDropFileUpload";
import {
  Editor_dark_theme,
  Editor_white_theme,
} from "../../componenets/markdown";
import Navbar from "../../componenets/Navbar";
import { useConvert } from "../../hooks/additionalFields";
import { useHttp } from "../../hooks/http";
import { useActions } from "../../hooks/redux/useActions";
import { useTypedSelector } from "../../hooks/redux/useSelectedTypes";
import { ICollection } from "../../interfaces";
import { text } from "../../text";

export const CreateCollection = () => {
  const app = useTypedSelector((s) => s.app);
  const actions = useActions();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setdescription] = useState("text");
  const [image, setimage] = useState<null | string>(null);
  const [collectiontype, setcollectiontype] = useState<string>(
    text.collection[0].label
  );

  const [createDynamicField, setCreateDynamicField] = useState<any>({
    name: "",
    type: `${text.typeFields[0].en}`,
  });

  const { toServer } = useConvert();

  const http = useHttp();

  const [dynamicfields, setdynamicfields] = useState<any[]>([]);

  const handleCreate = async (e: any) => {
    e.preventDefault();

    const additionalFields: any = toServer(dynamicfields);

    if (!validator.isEmpty(name) && !validator.isEmpty(description)) {
      const collection: ICollection = await http("/collection/create", "POST", {
        name,
        description,
        image,
        collectiontype,
        theme: collectiontype,
        UserId: app.user!.id!,
        additionalFields,
      });

      if (collection) {
        actions.setUser({
          ...app.user!,
          Collections: [...app.user!.Collections, collection],
        });

        actions.setSuccess(text.success[app.language]);

        navigate("/profile");
      }
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      <Navbar />
      <Box component={"form"}>
        <Grid container justifyContent="center" py={5} mt={5}>
          <Grid item lg={6} md={8}>
            <Typography component="h1" variant="h3">
              {text.createCollection[app.language]}
            </Typography>

            <Grid item lg={12} pt={3}>
              <UpoadFile update={false} image={image} handleFile={setimage} />
            </Grid>
            <Grid item lg={12} pt={3}>
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
            </Grid>
            <Grid item lg={12} pt={3}>
              <TextField
                id="filled-basic"
                hiddenLabel
                required
                value={name}
                onChange={(e: any) => setName(e.target.value)}
                placeholder={text.name[app.language]}
                sx={{ width: "100%" }}
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
                        ...prev.filter((field: any) => field.id !== i),
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
                      !dynamicfields.find(
                        (field: any) => field.name === createDynamicField.name
                      ) &&
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
                onClick={handleCreate}
              >
                {text.create[app.language]}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
