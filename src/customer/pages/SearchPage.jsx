import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { CircularProgress, Typography, Pagination } from "@mui/material";
import ProductCardSearch from "./ProductCardSearch";

const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [variations, setVariations] = useState([]); // Lưu danh sách variations
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Lấy từ khóa tìm kiếm từ URL
  const query = new URLSearchParams(location.search).get("q") || "";

  const fetchProducts = async (searchQuery, pageNumber) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:8081/api/products/filter-simple", {
        params: {
          keyword: searchQuery,
          pageNumber: pageNumber - 1,
          pageSize: 10,
        },
      });

      const { content, totalPages } = response.data;

      // Phẳng hóa danh sách variations từ tất cả sản phẩm
      const allVariations = content.flatMap(product =>
        product.variations.map(variation => ({
          ...variation,
          product: {
            id: product.id,
            name: product.name,
            screenSize: product.screenSize,
            batteryCapacity: product.batteryCapacity,
          },
        }))
      );

      setVariations(allVariations || []);
      setTotalPages(totalPages || 1);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Không thể tải sản phẩm. Vui lòng thử lại sau.");
      setVariations([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query) {
      fetchProducts(query, page);
    } else {
      setVariations([]);
    }
  }, [query, page]);

  const HANDLE_PAGE_CHANGE = (event, value) => {
    setPage(value);
    // Cuộn lên đầu trang khi chuyển trang
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Tiêu đề */}
      <Typography variant="h4" className="mb-6">
        Kết quả tìm kiếm cho: "{query || "Tất cả sản phẩm"}"
      </Typography>

      {/* Hiển thị trạng thái tải */}
      {loading && (
        <div className="flex justify-center my-8">
          <CircularProgress />
        </div>
      )}

      {/* Hiển thị lỗi nếu có */}
      {error && (
        <Typography variant="body1" color="error" className="text-center my-8">
          {error}
        </Typography>
      )}

      {/* Hiển thị danh sách variations */}
      {!loading && !error && variations.length === 0 && (
        <Typography variant="body1" className="text-center my-8">
          Không tìm thấy sản phẩm nào phù hợp với từ khóa "{query}".
        </Typography>
      )}

      {!loading && !error && variations.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {variations.map((variation, index) => (
            <ProductCardSearch
              key={`${variation.variationId}-${index}`} // Đảm bảo key duy nhất
              variation={variation} // Truyền variation
              product={variation.product} // Truyền thông tin sản phẩm
            />
          ))}
        </div>
      )}

      {/* Phân trang */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <Pagination
            count={totalPages}
            page={page}
            onChange={HANDLE_PAGE_CHANGE}
            color="primary"
          />
        </div>
      )}
    </div>
  );
};

export default SearchPage;