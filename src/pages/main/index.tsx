import { Box } from "@mui/material";
import React from "react";
import { BigCollections } from "../../componenets/GetBigCollections";
import { LastItems } from "../../componenets/LastItems";
import Navbar from "../../componenets/Navbar";
import { TagCoud } from "../../componenets/TagCloud";

export const Main: React.FC = (): any => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      <Navbar />
      <LastItems />
      <BigCollections />
      <TagCoud />
    </Box>
  );
};
