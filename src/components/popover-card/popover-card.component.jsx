import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  deleteChildGiftAsync,
  getChildGiftsAsync,
  selectCurrentPage,
  setPopoverAnchorEl,
  setModel,
} from "../../store/child/childSlice";
import Modal from "../modal/modal.component";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const PopoverCard = ({ gift, default_gift_url }) => {
  const dispatch = useDispatch();
  const currentPage = useSelector(selectCurrentPage);
  const full_gift = JSON.parse(gift);

  const handleDelete = async () => {
    await dispatch(setPopoverAnchorEl(null));
    await dispatch(deleteChildGiftAsync(full_gift.id));
    if (currentPage !== full_gift.total_pages)
      await dispatch(getChildGiftsAsync(currentPage));
  };

  const handleEdit = () => {
    dispatch(setModel());
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        image={full_gift.photo ? full_gift.photo : default_gift_url}
      />
      <CardContent sx={{ paddingBottom: "0px" }}>
        <Typography gutterBottom variant="h5" component="div">
          {full_gift.description}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
        <IconButton aria-label="delete" onClick={handleEdit}>
          <EditIcon color="success" />
        </IconButton>
        <IconButton aria-label="delete" onClick={handleDelete}>
          <DeleteIcon color="error" />
        </IconButton>
      </CardActions>
      <Modal gift={full_gift} />
    </Card>
  );
};

export default PopoverCard;
