import { Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useActions } from "../../hooks/redux/useActions";
import { ITag } from "../../interfaces";

export const TagItem: React.FC<{ tag: ITag }> = ({ tag }) => {
  const actions = useActions();
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <Typography
      onClick={() =>
        actions.setSearch(
          tag.name.slice(1, tag.name.length),
          navigate,
          location
        )
      }
      variant="body2"
      color="primary"
      sx={{ cursor: "pointer" }}
    >
      {tag.name}
    </Typography>
  );
};
