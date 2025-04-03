import { Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import BlockIcon from "@mui/icons-material/Block";
import Tooltip from "@mui/material/Tooltip";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

const CustomersTable = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const navigate = useNavigate(); // Khởi tạo useNavigate

  const handleViewDetails = (userId) => {
    navigate(`/admin/customers/user/${userId}`); // Điều hướng đến UserPage với userId
  };

  useEffect(() => {
    fetch("http://localhost:8081/api/user/get-all-users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
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
      <TableContainer component={Paper} sx={{ bgcolor: "#212529", borderRadius: "15px" }}>
        <Table sx={{ minWidth: 650, bgcolor: "#212529", '& .MuiTableCell-root': { borderBottom: '1px solid #3a4752' } }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ color: "#94a3b8", width: "5%" }}>
                UID
              </TableCell>
              <TableCell sx={{ color: "#94a3b8", width: "20%" }}>Name</TableCell>
              <TableCell sx={{ color: "#94a3b8", width: "30%" }}>Email</TableCell>
              <TableCell sx={{ color: "#94a3b8", width: "15%" }}>Phone Number</TableCell>
              <TableCell align="center" sx={{ color: "#94a3b8", width: "15%" }}>
                Created At
              </TableCell>
              <TableCell align="center" sx={{ color: "#94a3b8", width: "15%" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedUsers.length > 0 ? (
              displayedUsers.map((user) => (
                <TableRow key={user.userId} sx={{ "&:hover": { backgroundColor: "#2c3034" } }}>
                  <TableCell align="center" sx={{ color: "#e2e8f0" }}>
                    {user.userId}
                  </TableCell>
                  <TableCell sx={{ color: "#e2e8f0" }}>{`${user.lastName} ${user.firstName}`}</TableCell>
                  <TableCell sx={{ color: "#e2e8f0" }}>{user.email}</TableCell>
                  <TableCell sx={{ color: "#e2e8f0" }}>{user.phoneNumber}</TableCell>
                  <TableCell align="center" sx={{ color: "#e2e8f0" }}>
                    {user.createdDateAt}
                  </TableCell>
                  <TableCell sx={{ color: "#e2e8f0" }}>
                    <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                      <Tooltip title="View Details" arrow>
                        <IconButton
                          onClick={() => handleViewDetails(user.userId)}
                          sx={{
                            bgcolor: "#475569",
                            color: "#ffffff",
                            borderRadius: "6px",
                            padding: "6px 12px",
                            width: "44px",
                            height: "30px",
                            "&:hover": { bgcolor: "#64748b" },
                          }}
                        >
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Ban Account" arrow>
                        <IconButton
                          sx={{
                            bgcolor: "#475569",
                            color: "#E44236",
                            borderRadius: "6px",
                            padding: "6px 12px",
                            width: "44px",
                            height: "30px",
                            "&:hover": { bgcolor: "#E44236", color: "white" },
                          }}
                        >
                          <BlockIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ color: "#94a3b8" }}>
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
          sx={{
            "& .MuiPaginationItem-root": {
              color: "#94a3b8",
            },
            "& .Mui-selected": {
              color: "white",
              backgroundColor: "#1976d2",
            },
          }}
        />
      </div>
    </div>
  );
};
export default CustomersTable;
