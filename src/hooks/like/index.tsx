import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { IItem, ILike } from "../../interfaces";
import { useHttp } from "../http";
import { useActions } from "../redux/useActions";
import { useTypedSelector } from "../redux/useSelectedTypes";

export const useLike = () => {
  const app = useTypedSelector((s) => s.app);
  const actions = useActions();
  const http = useHttp();
  const navigate = useNavigate();

  const setLikes: any = useCallback(
    (items: IItem[]) => {
      const likeditems: any = {};
      items.forEach((item: IItem) => {
        likeditems[item.id] = {
          liked: !!item.Likes.find(
            (like: ILike) => like.UserId === app.user?.id
          ),
          length: item.Likes.length,
        };
      });

      actions.setLikedItems(likeditems);
    },
    [actions, app.user?.id]
  );

  const handleLike = useCallback(
    async (ItemId: number) => {
      try {
        if (app.user) {
          await http("/collection/like", "POST", {
            UserId: app.user.id,
            ItemId,
          });
          const liked = !app.likedItems[ItemId].liked;
          const length = liked
            ? app.likedItems[ItemId].length + 1
            : app.likedItems[ItemId].length - 1;
          actions.setLikedItems({
            ...app.likedItems,
            [ItemId]: {
              liked,
              length,
            },
          });
          return;
        }
        navigate("/login");
      } catch (error) {
        console.log(error);
      }
    },
    [actions, app.likedItems, app.user, http, navigate]
  );

  return { setLikes, handleLike };
};
