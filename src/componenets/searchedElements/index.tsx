import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { useTypedSelector } from "../../hooks/redux/useSelectedTypes";
import { IItem } from "../../interfaces";
import { text } from "../../text";
import { LastItem } from "../Item/lastItem";

export const SearchedElements: React.FC<{ items: IItem[] }> = ({ items }) => {
  const { language, likedItems } = useTypedSelector((s) => s.app);
  return (
    <Box>
      <Grid container justifyContent="center" py={5} mt={5}>
        <Grid item lg={10} xs={11}>
          <Typography variant="h2" component="h2" pb={4}>
            {items.length > 0
              ? text.results[language]
              : text.notResults[language]}
          </Typography>
          <Grid item container spacing={2} xs={12}>
            {items.map((item: IItem, i: number) => (
              <Grid item xs={12} lg={3} key={i}>
                <LastItem likeData={likedItems[item.id]} item={item} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
