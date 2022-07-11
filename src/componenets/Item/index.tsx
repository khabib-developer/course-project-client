import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea, CardActions, IconButton } from "@mui/material";
import { IItem } from "../../interfaces";
import { useTypedSelector } from "../../hooks/redux/useSelectedTypes";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import { useNavigate } from "react-router-dom";
import { TagItem } from "../TagItem";

export const Item: React.FC<{
  item: IItem;
  likeData: any;
  handleLike: any;
  AdditionalField: any;
}> = ({ item, likeData, handleLike, AdditionalField }) => {
  const { server } = useTypedSelector((s) => s.app);
  const navigate = useNavigate();

  return (
    <Card>
      <CardActionArea onClick={() => navigate(`#${item.id}`)}>
        <CardMedia
          component="img"
          height="140"
          image={`${server}/static/images/${item.image}`}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item.name}
          </Typography>

          {AdditionalField?.string_1 && item.AdditionalFieldsValue?.string_1 && (
            <Typography variant="body2" color="text.secondary">
              {AdditionalField.string_1}: {item.AdditionalFieldsValue.string_1}
            </Typography>
          )}

          {AdditionalField?.date_1 && item.AdditionalFieldsValue?.date_1 && (
            <Typography variant="body2" color="text.secondary">
              {AdditionalField.date_1}: {item.AdditionalFieldsValue.date_1}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
      <CardActions
        sx={{ display: "flex", flexDirection: "column", alignItems: "start" }}
      >
        <Box sx={{ display: "flex", pl: 2 }}>
          {item.Tags.map((tag, i) => (
            <TagItem key={i} tag={tag} />
          ))}
        </Box>
        <Box>
          <IconButton
            onClick={() => handleLike(item.id)}
            color={likeData?.liked ? "error" : "inherit"}
            aria-label="add to favorites"
          >
            <FavoriteIcon />
          </IconButton>
          {likeData.length}
          <IconButton
            aria-label="comment"
            onClick={() => navigate(`#${item.id}`)}
          >
            <ModeCommentIcon />
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  );
};
