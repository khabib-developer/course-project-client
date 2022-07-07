import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea, CardActions, IconButton } from "@mui/material";
import { IItem } from "../../interfaces";
import { useTypedSelector } from "../../hooks/redux/useSelectedTypes";
import { text } from "../../text";
import { useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import { useNavigate } from "react-router-dom";
import { TagItem } from "../TagItem";

export const Item: React.FC<{
  item: IItem;
  likeData: any;
  handleLike: any;
}> = ({ item, likeData, handleLike }) => {
  const { server, user } = useTypedSelector((s) => s.app);
  const navigate = useNavigate();
  const [field1, setfield1] = useState<any>(null);
  const [field2, setfield2] = useState<any>(null);

  useEffect(() => {
    if (item.additionalFields) {
      const f1 = JSON.parse(item.additionalFields).find(
        (field: any) => field.type === text.typeFields[1].en
      );
      const f2 = JSON.parse(item.additionalFields).find(
        (field: any) => field.type === text.typeFields[2].en
      );
      setfield1(
        f1 && {
          key: f1.name,
          value: f1.value,
        }
      );
      setfield2(
        f2 && {
          key: f2.name,
          value: f2.value,
        }
      );
    }
  }, [item.Likes, item.additionalFields, user?.id]);

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

          {field1 && (
            <Typography variant="body2" color="text.secondary">
              {field1.key}: {field1.value}
            </Typography>
          )}
          {field2 && (
            <Typography variant="body2" color="text.secondary">
              {field2.key}: {field2.value}
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
