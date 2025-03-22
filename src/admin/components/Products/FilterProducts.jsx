import React, { useState, useEffect } from "react";
import { Grid, FormControl, Select, MenuItem, Typography } from "@mui/material";

const FilterProducts = ({ onFilterChange }) => {
  const [brands, setBrands] = useState([]);
  const [series, setSeries] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [selectedSeries, setSelectedSeries] = useState("all");

  // Fetch brands from API
  useEffect(() => {
    fetch("http://localhost:8081/api/admin/category/brand/get-all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setBrands(data);
        } else {
          setBrands([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching brands:", error);
        setBrands([]);
      });
  }, []);

  // Fetch series based on selected brand
  useEffect(() => {
    if (selectedBrand !== "all") {
      fetch(`http://localhost:8081/api/admin/category/series/get-all/${selectedBrand}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setSeries(data);
          } else {
            setSeries([]);
          }
        })
        .catch((error) => {
          console.error("Error fetching series:", error);
          setSeries([]);
        });
    } else {
      setSeries([]);
    }
  }, [selectedBrand]);

  // Handle brand selection change
  const handleBrandChange = (event) => {
    const brand = event.target.value;
    setSelectedBrand(brand);
    setSelectedSeries("all");
    onFilterChange(brand, "all");
  };

  const handleSeriesChange = (event) => {
    const series = event.target.value;
    setSelectedSeries(series);
    onFilterChange(selectedBrand, series);
  };

  return (
    <Grid
      container
      alignItems="center"
      sx={{
        marginBottom: 2,
        bgcolor: "#1e293b",
        padding: 2,
        borderRadius: 3,
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
      }}
    >
      {/* Categories Label */}
      <Grid item xs={5} md={1.3}>
        <Typography
          variant="subtitle1"
          sx={{
            color: "#d3d7dc",
            fontWeight: "bold",
          }}
        >
          Categories:
        </Typography>
      </Grid>
      {/* Brand Filter */}
      <Grid item xs={6} md={2} sx={{ marginRight: 3 }}>
        <FormControl
          fullWidth
          size="small"
          sx={{
            bgcolor: "#3a4752",
            borderRadius: 3,
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          }}
        >
          <Select
            labelId="brand-filter-label"
            value={selectedBrand}
            onChange={handleBrandChange}
            MenuProps={{
              PaperProps: {
                sx: {
                  bgcolor: "#3a4752",
                  color: "#d3d7dc",
                  borderRadius: 3,
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
                },
              },
            }}
            sx={{
              color: "#d3d7dc",
              "& .MuiSelect-icon": {
                color: "#d3d7dc",
              },
            }}
          >
            <MenuItem value="all" sx={{ color: "#d3d7dc" }}>All Brands</MenuItem>
            {brands.map((brand) => (
              <MenuItem key={brand.categoryId} value={brand.categoryName} sx={{ color: "#d3d7dc" }}>
                {brand.categoryName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      {/* Series Filter */}
      <Grid item xs={6} md={2}>
        <FormControl
          fullWidth
          size="small"
          sx={{
            bgcolor: "#3a4752",
            borderRadius: 3,
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          }}
        >
          <Select
            labelId="series-filter-label"
            value={selectedSeries}
            onChange={handleSeriesChange}
            MenuProps={{
              PaperProps: {
                sx: {
                  bgcolor: "#3a4752",
                  color: "#d3d7dc",
                  borderRadius: 3,
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
                },
              },
            }}
            sx={{
              color: "#d3d7dc",
              "& .MuiSelect-icon": {
                color: "#d3d7dc",
              },
            }}
          >
            <MenuItem value="all" sx={{ color: "#d3d7dc" }}>All Series</MenuItem>
            {series.map((serie) => (
              <MenuItem key={serie.categoryId} value={serie.categoryName} sx={{ color: "#d3d7dc" }}>
                {serie.categoryName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default FilterProducts;