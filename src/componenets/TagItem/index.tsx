import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../hooks/redux/useActions";
import { ITag } from "../../interfaces";

export const TagItem: React.FC<{ tag: ITag }> = ({ tag }) => {
  const actions = useActions();
  const navigate = useNavigate();
  const handleClick = () => {
    actions.setSearch(tag.name.slice(1, tag.name.length));
    navigate(`/1?${tag.name.slice(1, tag.name.length)}`);
    window.scrollTo(0, 0);
  };
  return (
    <Typography
      onClick={handleClick}
      variant="body2"
      color="primary"
      sx={{ cursor: "pointer" }}
    >
      {tag.name}
    </Typography>
  );
};
