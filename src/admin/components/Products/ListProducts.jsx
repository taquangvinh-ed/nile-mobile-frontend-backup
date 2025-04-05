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
import Tooltip from "@mui/material/Tooltip";
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
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
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
      <TableContainer component={Paper} sx={{ bgcolor: "#212529", borderRadius: "0px 0px 10px 10px" }}>
        <Table sx={{ minWidth: 650, bgcolor: "#212529", '& .MuiTableCell-root': { borderBottom: '1px solid #3a4752' }  }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#94a3b8", width: "5%" }}>ID</TableCell>
              <TableCell sx={{ color: "#94a3b8", width: "45%" }}>Name</TableCell>
              <TableCell sx={{ color: "#94a3b8", width: "15%" }}>Series</TableCell>
              <TableCell sx={{ color: "#94a3b8", width: "10%" }}>Brand</TableCell>
              <TableCell sx={{ color: "#94a3b8", width: "10%" }}>Variant Count</TableCell>
              <TableCell align="center" sx={{ color: "#94a3b8", width: "15%" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedProducts.length > 0 ? (
              displayedProducts.map((product) => (
                <TableRow key={product.productId} sx={{ "&:hover": { backgroundColor: "#2c3034" } }}>
                  <TableCell sx={{ color: "#e2e8f0" }}>{product.productId}</TableCell>
                  <TableCell sx={{ color: "#e2e8f0" }}>{product.name}</TableCell>
                  <TableCell sx={{ color: "#e2e8f0" }}>{product.series}</TableCell>
                  <TableCell sx={{ color: "#e2e8f0" }}>{product.brand}</TableCell>
                  <TableCell align="center" sx={{ color: "#e2e8f0", width: "10%" }}>
                    {product.variationsQuantity}
                  </TableCell>
                  <TableCell sx={{ color: "#e2e8f0" }}>
                    <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                      <Tooltip title="View Details" arrow>
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
                      </Tooltip>
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

export default ListProducts;
