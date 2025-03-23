import { Grid } from "@mui/material";
import React from "react";
import CreateVariation from "./CreateVariation";
import DeleteVariation from "./DeleteVariation";
import UpdateVariation from "./UpdateVariation";

const Toolbar = ({ productId, variations, setVariations, selectedVariationIndex }) => {
  const selectedVariationId = variations[selectedVariationIndex]?.variationId || null;

  const handleDeleteSuccess = () => {
    // Cập nhật danh sách variations sau khi xóa thành công
    setVariations((prev) => prev.filter((variation) => variation.variationId !== selectedVariationId));
  };

  const handleCreateSuccess = (newVariation) => {
    // Cập nhật danh sách variations sau khi tạo thành công
    setVariations((prev) => [...prev, newVariation]);
  };

  const handleUpdateSuccess = (updateVariation) => {
    // Cập nhật danh sách variations sau khi cập nhật thành công
    setVariations((prev) =>
      prev.map((variation) =>
        variation.variationId === updateVariation.variationId ? updateVariation : variation
      )
    );
  };

  return (
    <Grid
      container
      sx={{
        bgcolor: "#282f36",
        padding: "16px 50px",
        borderRadius: "15px",
        justifyContent: "space-between",
      }}
    >
      <Grid item>
        <CreateVariation productId={productId} onCreateSuccess={handleCreateSuccess} />
      </Grid>
      <Grid item>
        <UpdateVariation
          variationId={selectedVariationId}
          currentVariation={variations[selectedVariationIndex]}
          onUpdateSuccess={handleUpdateSuccess}
        />
      </Grid>
      <Grid item>
        <DeleteVariation variationId={selectedVariationId} onDeleteSuccess={handleDeleteSuccess} />
      </Grid>
    </Grid>
  );
};

export default Toolbar;
