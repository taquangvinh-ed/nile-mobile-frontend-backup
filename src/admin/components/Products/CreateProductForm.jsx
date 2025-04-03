import React, { useState } from "react";
import { TextField, Button, Grid, Typography, Card, CardContent, IconButton, RadioGroup, FormControlLabel, Radio, Snackbar, Alert } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const CreateProductForm = () => {
  const [productData, setProductData] = useState({
    name: "",
    screenSize: "",
    displayTech: "",
    resolution: "",
    refreshRate: "",
    frontCamera: "",
    backCamera: "",
    chipset: "",
    cpu: "",
    gpu: "",
    batteryCapacity: "",
    chargingPort: "",
    os: "",
    productSize: "",
    productWeight: "",
    description: "",
    firstLevel: "",
    secondLevel: "",
    thirdLevel: "",
    variations: [
      {
        color: "",
        ram: "",
        rom: "",
        price: "",
        discountPrice: "",
        discountPercent: "",
        stockQuantity: "",
        imageURL: "",
        uploadMethod: "url",
        imageFile: null,
        isUploading: false,
      },
    ],
  });

  const [setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const handleChange = (e, index = null) => {
    const { name, value } = e.target;
    const positiveNumberFields = ["screenSize", "productWeight"];
    const positiveIntegerFields = ["batteryCapacity", "price", "discountPrice", "discountPercent", "stockQuantity"];

    const processedValue = positiveNumberFields.includes(name) ? value.replace(/[^0-9.]/g, "") : positiveIntegerFields.includes(name) ? value.replace(/[^0-9]/g, "") : value;

    const isInvalid =
      (!processedValue || isNaN(positiveNumberFields.includes(name) ? parseFloat(processedValue) : parseInt(processedValue, 10)) || parseFloat(processedValue) <= 0) &&
      (positiveNumberFields.includes(name) || positiveIntegerFields.includes(name));

    if (index !== null) {
      const updatedVariations = [...productData.variations];
      updatedVariations[index][name] = processedValue;
      setProductData((prev) => ({ ...prev, variations: updatedVariations }));
      setErrors((prev) => ({ ...prev, [`variation_${index}_${name}`]: isInvalid }));
    } else {
      setProductData((prev) => ({ ...prev, [name]: processedValue }));
      setErrors((prev) => ({ ...prev, [name]: isInvalid }));
    }
  };

  const handleUploadMethodChange = (index, method) => {
    const updatedVariations = [...productData.variations];
    updatedVariations[index] = { ...updatedVariations[index], uploadMethod: method, imageFile: null, imageURL: "" };
    setProductData((prev) => ({ ...prev, variations: updatedVariations }));
  };

  const handleFileChange = (index, e) => {
    const file = e.target.files[0];
    const updatedVariations = [...productData.variations];
    updatedVariations[index].imageFile = file;
    updatedVariations[index].isUploading = true; // Đặt trạng thái isUploading thành true
    setProductData((prev) => ({ ...prev, variations: updatedVariations }));

    // Tải lên Cloudinary
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "PhoneImagesUpload");

    fetch("https://api.cloudinary.com/v1_1/darjoyiqr/image/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        updatedVariations[index].imageURL = data.secure_url;
        updatedVariations[index].isUploading = false; // Đặt trạng thái isUploading thành false
        setProductData((prev) => ({ ...prev, variations: updatedVariations }));
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
        updatedVariations[index].isUploading = false; // Đặt lại trạng thái isUploading nếu lỗi
        setProductData((prev) => ({ ...prev, variations: updatedVariations }));
      });
  };

  const addVariation = () => {
    setProductData((prev) => ({
      ...prev,
      variations: [
        ...prev.variations,
        {
          color: "",
          ram: "",
          rom: "",
          price: "",
          discountPrice: "",
          discountPercent: "",
          stockQuantity: "",
          imageURL: "",
          uploadMethod: "url",
          imageFile: null,
          isUploading: false,
        },
      ],
    }));
  };

  const removeVariation = (index) => {
    const updatedVariations = productData.variations.filter((_, i) => i !== index);
    setProductData((prev) => ({ ...prev, variations: updatedVariations }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const variationsWithUploadedImages = await Promise.all(
        productData.variations.map(async (variation) => {
          if (variation.uploadMethod === "upload" && variation.imageFile) {
            const formData = new FormData();
            formData.append("file", variation.imageFile);
            formData.append("upload_preset", "PhoneImagesUpload");

            const response = await fetch("https://api.cloudinary.com/v1_1/darjoyiqr/image/upload", {
              method: "POST",
              body: formData,
            });
            const data = await response.json();
            return { ...variation, imageURL: data.secure_url };
          }
          return variation;
        })
      );

      const response = await fetch("http://localhost:8081/api/admin/product/create-model", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        body: JSON.stringify({ ...productData, variations: variationsWithUploadedImages }),
      });

      if (response.ok) {
        setSnackbar({ open: true, message: "Product created successfully!", severity: "success" });
      } else {
        setSnackbar({ open: true, message: "Failed to create product.", severity: "error" });
      }
    } catch (error) {
      console.error("Error creating product:", error);
      setSnackbar({ open: true, message: "An error occurred while creating the product.", severity: "error" });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <div className="p-5">
      <Card sx={{ bgcolor: "#212529", borderRadius: "10px", color: "#dcdde1", padding: "0px 20px" }}>
        <style>
          {`
          input:-webkit-autofill,
          input:-webkit-autofill:hover,
          input:-webkit-autofill:focus {
            -webkit-box-shadow: 0 0 0px 1000px #212529 inset !important;
            -webkit-text-fill-color: #fff !important;
          }
        `}
        </style>
        <CardContent>
          <Typography variant="h5" sx={{ marginBottom: "30px", color: "#ffffff" }}>
            Create Product
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {[
                { label: "Name", name: "name" },
                { label: "Screen Size", name: "screenSize", type: "number" },
                { label: "Display Technology", name: "displayTech" },
                { label: "Resolution", name: "resolution" },
                { label: "Refresh Rate", name: "refreshRate" },
                { label: "Front Camera", name: "frontCamera" },
                { label: "Back Camera", name: "backCamera" },
                { label: "Chipset", name: "chipset" },
                { label: "CPU", name: "cpu" },
                { label: "GPU", name: "gpu" },
                { label: "Battery Capacity", name: "batteryCapacity", type: "number" },
                { label: "Charging Port", name: "chargingPort" },
                { label: "OS", name: "os" },
                { label: "Product Size", name: "productSize" },
                { label: "Product Weight", name: "productWeight", type: "number" },
                { label: "First Level", name: "firstLevel" },
                { label: "Second Level", name: "secondLevel" },
                { label: "Third Level", name: "thirdLevel" },
              ].map((field, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <TextField
                    fullWidth
                    label={field.label}
                    name={field.name}
                    type={field.type || "text"}
                    value={productData[field.name]}
                    onChange={handleChange}
                    required
                    InputProps={{
                      sx: { color: "#ffffff" },
                    }}
                    InputLabelProps={{
                      sx: { color: "#dcdde1" },
                    }}
                    sx={{
                      "& .MuiInputLabel-root.Mui-focused": { color: "#28a745" },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#7f8fa6" },
                        "&:hover fieldset": { borderColor: "#28a745" },
                        "&.Mui-focused fieldset": { borderColor: "#28a745" },
                      },
                    }}
                  />
                </Grid>
              ))}

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Description"
                  name="description"
                  value={productData.description}
                  onChange={handleChange}
                  required
                  InputProps={{
                    sx: { color: "#ffffff" },
                  }}
                  InputLabelProps={{
                    sx: { color: "#dcdde1" },
                  }}
                  sx={{
                    "& .MuiInputLabel-root.Mui-focused": { color: "#28a745" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "#7f8fa6" },
                      "&:hover fieldset": { borderColor: "#28a745" },
                      "&.Mui-focused fieldset": { borderColor: "#28a745" },
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6" sx={{ marginTop: "20px", marginBottom: "20px", color: "#ffffff" }}>
                  Variations
                </Typography>
              </Grid>
              {productData.variations.map((variation, index) => (
                <Grid container spacing={2} key={index} sx={{ pl: 2 }}>
                  {[
                    { label: "Color", name: "color" },
                    { label: "RAM", name: "ram" },
                    { label: "ROM", name: "rom" },
                    { label: "Price", name: "price", type: "number" },
                    { label: "Discount Price", name: "discountPrice", type: "number" },
                    { label: "Discount Percent", name: "discountPercent", type: "number" },
                    { label: "Stock Quantity", name: "stockQuantity", type: "number" },
                  ].map((field, fieldIndex) => (
                    <Grid item xs={12} sm={6} key={fieldIndex}>
                      <TextField
                        fullWidth
                        label={field.label}
                        name={field.name}
                        type={field.type || "text"}
                        value={variation[field.name]}
                        onChange={(e) => handleChange(e, index)}
                        required
                        InputProps={{
                          sx: { color: "#ffffff" },
                        }}
                        InputLabelProps={{
                          sx: { color: "#dcdde1" },
                        }}
                        sx={{
                          "& .MuiInputLabel-root.Mui-focused": { color: "#28a745" },
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": { borderColor: "#7f8fa6" },
                            "&:hover fieldset": { borderColor: "#28a745" },
                            "&.Mui-focused fieldset": { borderColor: "#28a745" },
                          },
                        }}
                      />
                    </Grid>
                  ))}
                  <Grid item xs={12}>
                    <RadioGroup row value={variation.uploadMethod} onChange={(e) => handleUploadMethodChange(index, e.target.value)} sx={{ color: "#ffffff" }}>
                      <FormControlLabel value="url" control={<Radio sx={{ color: "#7f8fa6", "&.Mui-checked": { color: "#17a2b8" } }} />} label="Enter Image URL" />
                      <FormControlLabel value="upload" control={<Radio sx={{ color: "#7f8fa6", "&.Mui-checked": { color: "#17a2b8" } }} />} label="Upload Image" />
                    </RadioGroup>
                  </Grid>
                  {variation.uploadMethod === "url" && (
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Image URL"
                        name="imageURL"
                        value={variation.imageURL}
                        onChange={(e) => handleChange(e, index)}
                        InputProps={{
                          sx: { color: "#ffffff" },
                        }}
                        InputLabelProps={{
                          sx: { color: "#dcdde1" },
                        }}
                        sx={{
                          "& .MuiInputLabel-root.Mui-focused": { color: "#28a745" },
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": { borderColor: "#7f8fa6" },
                            "&:hover fieldset": { borderColor: "#28a745" },
                            "&.Mui-focused fieldset": { borderColor: "#28a745" },
                          },
                        }}
                      />
                    </Grid>
                  )}
                  {variation.uploadMethod === "upload" && (
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        component="label"
                        startIcon={<CloudUploadIcon />}
                        sx={{
                          bgcolor: "#17a2b8",
                          color: "#ffffff",
                          "&:hover": { bgcolor: "#138496" },
                        }}
                      >
                        Upload Image
                        <input type="file" accept="image/*" hidden onChange={(e) => handleFileChange(index, e)} />
                      </Button>
                      {variation.isUploading ? (
                        <Typography variant="caption" color="textSecondary">
                          Uploading...
                        </Typography>
                      ) : (
                        variation.imageFile && (
                          <Typography variant="caption" color="textSecondary">
                            {variation.imageFile.name}
                          </Typography>
                        )
                      )}
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    <IconButton
                      color="error"
                      onClick={() => removeVariation(index)}
                      disabled={productData.variations.length === 1}
                      sx={{
                        color: "#dc3545",
                        "&:hover": { color: "#c82333" },
                      }}
                    >
                      <RemoveCircleOutlineIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  startIcon={<AddCircleOutlineIcon />}
                  onClick={addVariation}
                  sx={{
                    color: "#4CAF50",
                    borderColor: "#45A049",
                    "&:hover": { bgcolor: "#45A049", color: "#ffffff" },
                  }}
                >
                  Add Variation
                </Button>
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{
                    bgcolor: "#28a745",
                    color: "#ffffff",
                    "&:hover": { bgcolor: "#218838" },
                  }}
                >
                  Create Product
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>

        {/* Snackbar for notifications */}
        <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
          <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Card>
    </div>
  );
};

export default CreateProductForm;
