import { useDispatch, useSelector } from "react-redux";
import {
  getChildGiftsAsync,
  selectChildGifts,
  setCurrentPage,
} from "../store/child/childSlice";

import GiftList from "../components/gifts-list/gifts-list.component";

import Pagination from "@mui/material/Pagination";
import { useState } from "react";

const ChildPage = () => {
  const dispatch = useDispatch();
  const gifts = useSelector(selectChildGifts);
  const [prevPage, setPrevPage] = useState(1);

  const totalPages = gifts[0]?.total_pages;
  const pageCount = totalPages ? totalPages : 0;

  const handlePaginationCange = async (_, page) => {
    if (page !== prevPage) {
      dispatch(getChildGiftsAsync(page));
      dispatch(setCurrentPage(page));
    }
    setPrevPage(page);
  };

  return (
    <>
      {!gifts.length ? (
        <h3 style={{ textAlign: "center" }}>
          There is nothing! Try to write a wish to Dead Moroz :)
        </h3>
      ) : (
        <>
          <GiftList />
          <Pagination
            sx={{ display: "flex", justifyContent: "center" }}
            onChange={handlePaginationCange}
            count={pageCount}
            shape="rounded"
            color="success"
          />
        </>
      )}
    </>
  );
};

export default ChildPage;
