import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useHttp } from "../../hooks/http";
import { useTypedSelector } from "../../hooks/redux/useSelectedTypes";
import { text } from "../../text";
import { TagItem } from "../TagItem";

export const TagCoud: React.FC = () => {
  const { language } = useTypedSelector((s) => s.app);
  const http = useHttp();

  const [tags, setTags] = useState<any[]>([]);

  useEffect(() => {
    (async function () {
      const tag = await http("/collection/getAllTags");
      setTags(tag);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      <Grid container justifyContent="center" py={5}>
        <Grid item lg={10} xs={11}>
          <Typography variant="h2" component="h2" pb={4}>
            {text.cloudTags[language]}
          </Typography>
          <Grid item container spacing={2} xs={12}>
            <Box sx={{ display: "flex", pl: 2 }}>
              {tags.map((tag, i) => (
                <TagItem tag={tag} key={i} />
              ))}
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
