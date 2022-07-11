import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea, CardActions, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import { IItem } from "../../interfaces";
import { useTypedSelector } from "../../hooks/redux/useSelectedTypes";
import { text } from "../../text";
import { Link, useNavigate } from "react-router-dom";
import { TagItem } from "../TagItem";
import { useLike } from "../../hooks/like";
import { useEffect } from "react";

export const LastItem: React.FC<{
  item: IItem;
  likeData: any;
}> = ({ item, likeData }) => {
  const { server, language } = useTypedSelector((s) => s.app);

  const navigate = useNavigate();

  const { handleLike } = useLike();

  return (
    <Card>
      <CardActionArea
        onClick={() => navigate(`/collection/${item.CollectionId}#${item.id}`)}
      >
        <CardMedia
          component="img"
          height="140"
          image={`${server}/static/images/${item.image}`}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {text.name[language]}: {item.name}
          </Typography>
          <Typography gutterBottom variant="body2" component="div">
            {text.author[language]}: {item.Collection.User.name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions
        sx={{ display: "flex", flexDirection: "column", alignItems: "start" }}
      >
        <Typography
          gutterBottom
          variant="body1"
          color="inherit"
          component="div"
          className="px-2"
        >
          <Link to={`/collection/${item.Collection.id}`}>
            {item.Collection.name}
          </Link>
        </Typography>
        <Box sx={{ display: "flex" }}>
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
          {likeData?.length}
          <IconButton
            aria-label="comment"
            onClick={() =>
              navigate(`/collection/${item.CollectionId}#${item.id}`)
            }
          >
            <ModeCommentIcon />
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  );
};
