import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { BigCollections } from "../../componenets/GetBigCollections";
import { LastItems } from "../../componenets/LastItems";
import Navbar from "../../componenets/Navbar";
import { SearchedElements } from "../../componenets/searchedElements";
import { TagCoud } from "../../componenets/TagCloud";
import { useHttp } from "../../hooks/http";
import { useActions } from "../../hooks/redux/useActions";
import { IItem } from "../../interfaces";

export const Main: React.FC = (): any => {
  const location = useLocation();
  const actions = useActions();
  const http = useHttp();
  const [searchedElements, setSearchedElements] = useState<IItem[] | null>(
    null
  );
  useEffect(() => {
    (async function () {
      if (location.search !== "") {
        const result = await http(
          `/collection/search?q=${location.search.slice(
            1,
            location.search.length
          )}`
        );
        setSearchedElements(result);
        return;
      }
      setSearchedElements(null);
      actions.setSearch("");
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      <Navbar />

      {searchedElements ? (
        <SearchedElements items={searchedElements} />
      ) : (
        <>
          <BigCollections />
          <TagCoud />
          <LastItems />
        </>
      )}
    </Box>
  );
};
