import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useHttp } from "../../hooks/http";
import { useTypedSelector } from "../../hooks/redux/useSelectedTypes";
import { IItem } from "../../interfaces";
import { text } from "../../text";
import { LastItem } from "../Item/lastItem";

export const LastItems: React.FC = () => {
  const { language } = useTypedSelector((s) => s.app);
  const http = useHttp();

  const [lastItems, setlastItems] = useState<any[]>([]);

  useEffect(() => {
    (async function () {
      const lastItems = await http("/collection/getLastItems");
      console.log(lastItems);
      setlastItems(lastItems);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      <Grid container justifyContent="center" py={5} mt={5}>
        <Grid item lg={10} xs={11}>
          <Typography variant="h2" component="h2" pb={4}>
            {text.lastItems[language]}
          </Typography>
          <Grid item container spacing={2} xs={12}>
            {lastItems.map((item: IItem, i: number) => (
              <Grid item xs={12} lg={3} key={i}>
                <LastItem item={item} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
