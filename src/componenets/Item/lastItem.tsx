import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { IItem } from "../../interfaces";
import { useTypedSelector } from "../../hooks/redux/useSelectedTypes";
import { text } from "../../text";
import { Link } from "react-router-dom";

export const LastItem: React.FC<{
  item: IItem;
}> = ({ item }) => {
  const { server, language } = useTypedSelector((s) => s.app);

  return (
    <Card>
      <CardActionArea>
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
          <Typography
            gutterBottom
            variant="body1"
            color="inherit"
            component="div"
          >
            {text.collectionName[language]}:{" "}
            <Link to={`/collection/${item.Collection.id}`}>
              {item.Collection.name}
            </Link>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
