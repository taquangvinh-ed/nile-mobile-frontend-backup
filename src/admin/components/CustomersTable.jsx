import {
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useEffect, useState } from "react";
const CustomersTable = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const handleChangePage = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    fetch("http://localhost:8081/api/user/get-all-users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          setUsers([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setUsers([]);
      });
  }, []);

  const displayedUsers = users.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <div className="p-5">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650, bgcolor: "#1e293b" }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{color:"#94a3b8", width: "10%"}}>UID</TableCell>
              <TableCell sx={{color:"#94a3b8", width: "25%"}}>Name</TableCell>
              <TableCell sx={{color:"#94a3b8", width: "25%"}}>Email</TableCell>
              <TableCell sx={{color:"#94a3b8", width: "25%"}}>Phone Number</TableCell>
              <TableCell align="center" sx={{ color: "#94a3b8", width: "15%" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedUsers.length > 0 ? (
              displayedUsers.map((user) => (
                <TableRow key={user.userId}>
                  <TableCell align="center" sx={{color:"#e2e8f0"}}>{user.userId}</TableCell>
                  <TableCell sx={{color:"#e2e8f0"}}>{`${user.lastName} ${user.firstName}`}</TableCell>
                  <TableCell sx={{color:"#e2e8f0"}}>{user.email}</TableCell>
                  <TableCell sx={{color:"#e2e8f0"}}>{user.phoneNumber}</TableCell>
                  <TableCell sx={{ color: "#e2e8f0" }}>
                    <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                      <IconButton
                        sx={{
                          bgcolor: "#475569",
                          color: "#ffffff",
                          borderRadius: "6px",
                          padding: "6px 12px",
                          width: "44px",
                          height: "30px",
                          "&:hover": { bgcolor: "#64748b" },
                        }}
                        // onClick={() => handleViewVariations(product.productId)}
                      >
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        sx={{
                          bgcolor: "#475569",
                          color: "#ff6c2f",
                          borderRadius: "6px",
                          padding: "6px 12px",
                          width: "44px",
                          height: "30px",
                          "&:hover": { bgcolor: "#ff6c2f", color: "white" },
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{color:"#e2e8f0"}}>
                  No users found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="flex justify-center mt-4">
        <Pagination
          count={Math.ceil(users.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
          color="primary"
          shape="rounded"
        />
      </div>
    </div>
  );
};
export default CustomersTable;
