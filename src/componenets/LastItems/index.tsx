import { Box, Grid, Pagination, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useHttp } from "../../hooks/http";
import { useLike } from "../../hooks/like";
import { useTypedSelector } from "../../hooks/redux/useSelectedTypes";
import { IItem } from "../../interfaces";
import { text } from "../../text";
import { LastItem } from "../Item/lastItem";

const limit = 8;

export const LastItems: React.FC = () => {
  const { language, likedItems } = useTypedSelector((s) => s.app);
  const http = useHttp();

  const navigate = useNavigate();

  const { offset } = useParams();

  const [lastItems, setlastItems] = useState<any[]>([]);

  const [count, setcount] = useState(0);

  const handleChange = (_: any, value: number) => {
    navigate(`/${value}`);
  };

  const { setLikes, handleLike } = useLike();

  useEffect(() => {
    (async function () {
      const { rows, count } = await http("/collection/getLastItems", "POST", {
        limit,
        offset: (Number(offset) ? Number(offset) - 1 : 0) * limit,
      });

      setcount(count);
      setLikes(rows);
      setlastItems(rows);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]);

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
                <LastItem likeData={likedItems[item.id]} item={item} />
              </Grid>
            ))}
          </Grid>

          <Grid container justifyContent="center" pt={3}>
            <Pagination
              count={Math.ceil(count / limit)}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
