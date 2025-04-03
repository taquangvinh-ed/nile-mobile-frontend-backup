import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const BrandsPage = () => {
  const brands = [
    {
      name: "Apple",
      origin: "USA",
      logo: "/images/brand_logo/apple-logo.png",
      products: "- iPhone: iPhone 13, iPhone 13 Pro, iPhone 13 Pro Max, iPhone SE,...",
    },
    {
      name: "Samsung",
      origin: "South Korea",
      logo: "/images/brand_logo/samsung-logo.png",
      products: `- Galaxy S: Galaxy S22, Galaxy S22+, Galaxy S22 Ultra,...
- Galaxy Note: Galaxy Note 20, Galaxy Note 20 Ultra,...
- Galaxy Z: Galaxy Z Fold3, Galaxy Z Flip3,...
- Galaxy A: Galaxy A72, Galaxy A52, Galaxy A32,...
- Galaxy M: Galaxy M32, Galaxy M12,...`,
    },
    {
      name: "Xiaomi",
      origin: "China",
      logo: "/images/brand_logo/xiaomi-logo.png",
      products: `- Mi Series: Mi 11, Mi 11 Pro, Mi 11 Ultra,...
- Redmi Series: Redmi Note 10, Redmi Note 10 Pro, Redmi 10,...
- POCO Series: POCO F3, POCO X3 Pro,...`,
    },
    {
      name: "OPPO",
      origin: "China",
      logo: "/images/brand_logo/oppo-logo.png",
      products: `- Find X Series: Find X3 Pro, Find X3,...
- Reno Series: Reno6, Reno6 Pro,...
- A Series: A94, A74, A54,...`,
    },
    {
      name: "Vivo",
      origin: "China",
      logo: "/images/brand_logo/vivo-logo.png",
      products: `- X Series: X70, X70 Pro,...
- V Series: V21, V21e,...
- Y Series: Y53s, Y21,...`,
    },
    {
      name: "Realme",
      origin: "China",
      logo: "/images/brand_logo/realme-logo.png",
      products: `- Number Series: Realme 8, Realme 8 Pro,...
- Narzo Series: Narzo 30, Narzo 30A,...
- C Series: C25, C21Y,...`,
    },
    {
      name: "Nokia",
      origin: "Finland",
      logo: "/images/brand_logo/nokia-logo.png",
      products: `- G Series: G20, G10,...
- X Series: X20, X10,...
- C Series: C30, C20,...`,
    },
    {
      name: "Huawei",
      origin: "China",
      logo: "/images/brand_logo/huawei-logo.png",
      products: `- Mate Series: Mate 40, Mate 40 Pro,...
- P Series: P50, P40,...
- Nova Series: Nova 9, Nova 8i,...`,
    },
  ];

  return (
    <div className="p-5">
      <TableContainer component={Paper} sx={{ bgcolor: "#212529", borderRadius: "15px" }}>
        <Table sx={{ minWidth: 650, bgcolor: "#212529", '& .MuiTableCell-root': { borderBottom: '1px solid #3a4752' }  }} size="small" aria-label="brands table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#94a3b8", fontWeight: "bold" }}>Logo</TableCell>
              <TableCell sx={{ color: "#94a3b8", fontWeight: "bold" }}>Brand</TableCell>
              <TableCell sx={{ color: "#94a3b8", fontWeight: "bold" }}>Origin</TableCell>
              <TableCell sx={{ color: "#94a3b8", fontWeight: "bold" }}>Main Product Lines (Series)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {brands.map((brand, index) => (
              <TableRow
                key={index}
                sx={{
                  "&:hover": { backgroundColor: "#2c3034" },
                }}
              >
                <TableCell>
                  <img src={brand.logo} alt={`${brand.name} logo`} style={{ width: "100px", height: "100px", objectFit: "contain" }} />
                </TableCell>
                <TableCell sx={{ color: "#e2e8f0" }}>{brand.name}</TableCell>
                <TableCell sx={{ color: "#e2e8f0" }}>{brand.origin}</TableCell>
                <TableCell sx={{ color: "#e2e8f0", whiteSpace: "pre-line" }}>{brand.products}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default BrandsPage;