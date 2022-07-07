import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useHttp } from "../../hooks/http";
import { useTypedSelector } from "../../hooks/redux/useSelectedTypes";
import { ICollection } from "../../interfaces";
import { text } from "../../text";
import { CollectionCard } from "../CollectionCard";

export const BigCollections: React.FC = () => {
  const { language } = useTypedSelector((s) => s.app);
  const http = useHttp();

  const [collections, setcollections] = useState<any[]>([]);

  useEffect(() => {
    (async function () {
      const collections = await http("/collection/getBigCollections");
      setcollections(collections);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      <Grid container justifyContent="center" py={5}>
        <Grid item lg={10} xs={11}>
          <Typography variant="h2" component="h2" pb={4}>
            {text.bigCollections[language]}
          </Typography>
          <Grid item container spacing={2} xs={12}>
            {collections.map((collection: ICollection, i: number) => (
              <Grid item xs={12} lg={3} key={i}>
                <CollectionCard collection={collection} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
