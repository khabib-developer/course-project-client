import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CollectionCard } from "../../componenets/CollectionCard";
import Navbar from "../../componenets/Navbar";
import { useTypedSelector } from "../../hooks/redux/useSelectedTypes";
import { ICollection } from "../../interfaces";
import { text } from "../../text";

export const Profile: React.FC = (): any => {
  const { user, language } = useTypedSelector((s) => s.app);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      <Navbar />
      <Box>
        <Grid container justifyContent="center" py={5} mt={5}>
          <Grid item lg={6} md={8} xs={11}>
            {user!.Collections.length > 0 ? (
              <>
                <Typography variant="h2" component="h2" pb={4}>
                  {text.myCollection[language]}
                </Typography>
                <Grid item container spacing={2} xs={12}>
                  {user!.Collections.map((collection: ICollection) => (
                    <Grid item key={collection.id} md={4} xs={12}>
                      <CollectionCard collection={collection} />
                    </Grid>
                  ))}
                </Grid>
              </>
            ) : (
              <>{text.notCollection[language]}</>
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
