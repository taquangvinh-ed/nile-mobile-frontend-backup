import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Pagination, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
import FilterProducts from "./FilterProducts";

const ListProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8081/api/admin/product/get-all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
          setFilteredProducts(data);
        } else {
          setProducts([]);
          setFilteredProducts([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setProducts([]);
        setFilteredProducts([]);
      });
  }, []);

  const handleViewVariations = (productId) => {
    navigate(`/admin/product/${productId}/variations`);
  };

  const handleFilterChange = (brand, series) => {
    let filtered = products;

    if (brand !== "all") {
      filtered = filtered.filter((product) => product.brand === brand);
    }

    if (series !== "all") {
      filtered = filtered.filter((product) => product.series === series);
    }

    setFilteredProducts(filtered);
    setPage(1);
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const displayedProducts = filteredProducts.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <div className="p-5">
      {/* FilterProducts Component */}
      <FilterProducts onFilterChange={handleFilterChange} />

      {/* Products Table */}
      <TableContainer component={Paper} sx={{bgcolor: "#293038", borderRadius: "10px"}}>
        <Table sx={{ minWidth: 650, bgcolor: "#293038" }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#94a3b8", width: "5%" }}>ID</TableCell>
              <TableCell sx={{ color: "#94a3b8", width: "45%" }}>Name</TableCell>
              <TableCell sx={{ color: "#94a3b8", width: "15%" }}>Series</TableCell>
              <TableCell sx={{ color: "#94a3b8", width: "10%" }}>Brand</TableCell>
              <TableCell sx={{ color: "#94a3b8", width: "10%" }}>Variant Count</TableCell>
              <TableCell align="center" sx={{ color: "#94a3b8", width: "15%" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedProducts.length > 0 ? (
              displayedProducts.map((product) => (
                <TableRow key={product.productId} sx={{ "&:hover": { backgroundColor: "#334155" } }}>
                  <TableCell sx={{ color: "#e2e8f0" }}>{product.productId}</TableCell>
                  <TableCell sx={{ color: "#e2e8f0" }}>{product.name}</TableCell>
                  <TableCell sx={{ color: "#e2e8f0" }}>{product.series}</TableCell>
                  <TableCell sx={{ color: "#e2e8f0" }}>{product.brand}</TableCell>
                  <TableCell align="center" sx={{ color: "#e2e8f0", width: "10%" }}>{product.variationsQuantity}</TableCell>
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
                        onClick={() => handleViewVariations(product.productId)}
                      >
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                      {/* <IconButton
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
                        <EditIcon fontSize="small" />
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
                      </IconButton> */}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ color: "#94a3b8" }}>
                  No products found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="flex justify-center mt-4">
        <Pagination
          count={Math.ceil(filteredProducts.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
          color="primary"
          shape="rounded"
        />
      </div>
    </div>
  );
};

export default ListProducts;