import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import { selectUsers, setUser } from "../../store/elf/elfSlice";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import styled from "@emotion/styled";
import Rating from "@mui/material/Rating";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import { Link } from "react-router-dom";

const UsersList = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);

  const TableCellContainer = styled(TableCell)`
    color: white;
  `;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 400 }} size="medium" aria-label="a dense table">
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: "green",
              textTransform: "uppercase",
            }}
          >
            <TableCellContainer sx={{ color: "inherit" }}>
              Full name
            </TableCellContainer>
            <TableCellContainer sx={{ width: "300px" }} align="right">
              Stars
            </TableCellContainer>
            <TableCellContainer align="right">Comment</TableCellContainer>
            <TableCellContainer align="right">Feedback</TableCellContainer>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, index) => (
            <TableRow
              key={user.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Link
                  onClick={() => dispatch(setUser(index))}
                  to={"/child-page"}
                  style={{ textDecoration: "none", color: "green" }}
                >
                  {user.name ? user.name : "..."}{" "}
                  {user.surname ? user.surname : "..."}
                </Link>
              </TableCell>
              <TableCell align="right">
                <Rating
                  size="small"
                  max={10}
                  name="read-only"
                  value={user.assessments[0]?.star}
                  readOnly
                />
              </TableCell>
              <TableCell align="right">
                {Boolean(user.assessments[0]?.comment) ? (
                  <DoneRoundedIcon color="success" />
                ) : (
                  <RemoveRoundedIcon color="error" />
                )}
              </TableCell>
              <TableCell align="right">
                {Boolean(user.feedbacks[0]?.review) ? (
                  <DoneRoundedIcon color="success" />
                ) : (
                  <RemoveRoundedIcon color="error" />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsersList;
