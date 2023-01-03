import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { useDispatch } from "react-redux";
import { deleteItem } from "../../store/registration/registrationSlice";

const Item = styled(Paper)(({ theme, createdbyrole }) => ({
  backgroundColor: createdbyrole === "child" ? "#fff" : "#e0e0e0",
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const MasonryGifts = ({ gift, index, userRole }) => {
  const dispatch = useDispatch();

  const removeItem = (gift) => {
    const value = parseInt(gift.target.outerHTML.match(/value="(\d)/)[1]);
    dispatch(deleteItem(value));
  };

  return (
    <Item
      createdbyrole={gift.created_by}
      value={index}
      onClick={userRole === "user" ? removeItem : null}
      sx={{ overflow: "hidden", textTransform: "none" }}
    >
      {gift.description}
    </Item>
  );
};

export default MasonryGifts;
