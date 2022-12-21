import { useSelector } from "react-redux";
import { selectChildGifts } from "../../store/child/childSlice";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";

const GIFT_URL =
  "https://res.cloudinary.com/doz8n2ayx/image/upload/v1671569315/christmas-wrapped-gift_bbqaql.svg";

const GiftList = () => {
  const gifts = useSelector(selectChildGifts);

  const matches_xl = useMediaQuery("(min-width:1536px)");
  const matches_lg = useMediaQuery("(min-width:1200px)");
  const matches_md = useMediaQuery("(min-width:990px)");
  const matches_xs = useMediaQuery("(min-width:760px)");
  const cols_num = matches_xl
    ? 5
    : matches_lg
    ? 4
    : matches_md
    ? 3
    : matches_xs
    ? 2
    : 1;

  return (
    <ImageList cols={cols_num}>
      {gifts.map((gift) => (
        <ImageListItem
          sx={{
            backgroundColor: "#e3f3ff",
            borderRadius: "15px",
          }}
          key={gift.id}
        >
          <img
            src={gift.photo ? gift.photo : GIFT_URL}
            alt={gift.title}
            style={{
              width: "90%",
              maxHeight: "312px",
              alignSelf: "center",
              paddingTop: "6px",
            }}
            loading="lazy"
          />
          <ImageListItemBar
            sx={{ left: "27px" }}
            title={
              <Typography noWrap={true} sx={{ maxWidth: "200px" }}>
                {gift.description}
              </Typography>
            }
            subtitle={<span>by: {gift.created_by}</span>}
            position="below"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default GiftList;
