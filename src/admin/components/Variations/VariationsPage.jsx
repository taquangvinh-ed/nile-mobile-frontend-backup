import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import ImageCard from "./ImageCard";
import NameCard from "./NameCard";
import SpecificationsCard from "./SpecificationsCard";

const VariationsPage = () => {
  const { productId } = useParams();
  const [variations, setVariations] = useState([]);
  const [selectedVariationIndex, setSelectedVariationIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8081/api/admin/variation/productId/${productId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setVariations(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching variations:", error);
        setLoading(false);
      });
  }, [productId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-5">
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <ImageCard
            variations={variations}
            selectedVariationIndex={selectedVariationIndex}
          />
        </Grid>
        <Grid className="space-y-3" item md={9}>
          <Grid item xs={12} md={12}>
            <NameCard
              variations={variations}
              setSelectedVariationIndex={setSelectedVariationIndex}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <SpecificationsCard productId={productId}/>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default VariationsPage;
