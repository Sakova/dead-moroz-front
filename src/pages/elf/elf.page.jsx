import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import {
  selectChildGifts,
  selectCurrentPage,
  setCurrentPage,
} from "../../store/child/childSlice";
import { getUsersAsync, selectUsers } from "../../store/elf/elfSlice";

import Pagination from "@mui/material/Pagination";
import UsersList from "../../components/users-list/users-list.component";

const ElfPage = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const currentPage = useSelector(selectCurrentPage);
  const [prevPage, setPrevPage] = useState(1);

  const totalPages = users[0]?.total_pages;
  const pageCount = totalPages ? totalPages : 0;

  const handlePaginationCange = async (_, page) => {
    if (page !== prevPage) {
      await dispatch(getUsersAsync(page));
      await dispatch(setCurrentPage(page));
    }
    setPrevPage(page);
  };

  return (
    <>
      {!users.length ? (
        <h3 style={{ textAlign: "center" }}>
          There is nothing! And it is very strange 🤔
        </h3>
      ) : (
        <>
          <UsersList />
          <Pagination
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
            }}
            onChange={handlePaginationCange}
            count={pageCount}
            shape="rounded"
            color="success"
            page={currentPage}
          />
        </>
      )}
    </>
  );
};

export default ElfPage;
