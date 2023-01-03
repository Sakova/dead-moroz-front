import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { useDispatch } from "react-redux";
import { deleteItem } from "../../store/registration/registrationSlice";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const MasonryItems = ({ item, index, userRole }) => {
  const dispatch = useDispatch();

  const removeItem = (item) => {
    const value = parseInt(item.target.outerHTML.match(/value="(\d)/)[1]);
    dispatch(deleteItem(value));
  };

  return (
    <Item
      value={index}
      onClick={userRole === "user" ? removeItem : null}
      sx={{ overflow: "hidden" }}
    >
      {item}
    </Item>
  );
};

export default MasonryItems;
