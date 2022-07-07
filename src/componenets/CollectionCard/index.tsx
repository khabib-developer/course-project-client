import * as React from "react";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Paper } from "@mui/material";
import { ICollection } from "../../interfaces";
import { useTypedSelector } from "../../hooks/redux/useSelectedTypes";
import { useNavigate } from "react-router-dom";

export const CollectionCard: React.FC<{ collection: ICollection }> = ({
  collection,
}) => {
  const navigate = useNavigate();
  const app = useTypedSelector((s) => s.app);
  return (
    <Paper
      elevation={3}
      onClick={() => navigate(`/collection/${collection.id}`)}
    >
      <CardActionArea>
        {collection.image ? (
          <CardMedia
            component="img"
            height="140"
            image={`${app.server}/static/images/${collection.image}`}
            alt="green iguana"
          />
        ) : (
          <CardContent
            sx={{
              height: 140,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              gutterBottom
              variant="h5"
              color="text.secondary"
              component="div"
            >
              Empty
            </Typography>
          </CardContent>
        )}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {collection.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {collection.theme}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Paper>
  );
};
