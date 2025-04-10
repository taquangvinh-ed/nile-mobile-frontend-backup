import React, { useState } from "react";
import { TextField, Button, Grid, Typography, Card, CardContent, IconButton, RadioGroup, FormControlLabel, Radio, Snackbar, Alert } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

// Các cấu hình chung và style
const commonTextFieldStyles = {
  InputProps: { sx: { color: "#ffffff" } },
  InputLabelProps: { sx: { color: "#dcdde1" } },
  sx: {
    "& .MuiInputLabel-root.Mui-focused": { color: "#28a745" },
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: "#7f8fa6" },
      "&:hover fieldset": { borderColor: "#28a745" },
      "&.Mui-focused fieldset": { borderColor: "#28a745" },
    },
  }
};

// Danh sách trường dữ liệu sản phẩm chính
const productFields = [
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
];

// Danh sách trường dữ liệu biến thể
const variationFields = [
  { label: "Color", name: "color" },
  { label: "RAM", name: "ram" },
  { label: "ROM", name: "rom" },
  { label: "Price", name: "price", type: "number" },
  { label: "Discount Price", name: "discountPrice", type: "number" },
  { label: "Discount Percent", name: "discountPercent", type: "number" },
  { label: "Stock Quantity", name: "stockQuantity", type: "number" },
];

// Biến thể mặc định
const defaultVariation = {
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
};

// Component chính
const CreateProductForm = () => {
  // Khởi tạo state
  const [productData, setProductData] = useState({
    name: "", screenSize: "", displayTech: "", resolution: "", refreshRate: "",
    frontCamera: "", backCamera: "", chipset: "", cpu: "", gpu: "",
    batteryCapacity: "", chargingPort: "", os: "", productSize: "", 
    productWeight: "", description: "", firstLevel: "", secondLevel: "", 
    thirdLevel: "", variations: [{ ...defaultVariation }],
  });
  
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({ 
    open: false, 
    message: "", 
    severity: "success" 
  });

  // Xử lý thay đổi dữ liệu form
  const handleChange = (e, index = null) => {
    const { name, value } = e.target;
    const positiveNumberFields = ["screenSize", "productWeight"];
    const positiveIntegerFields = ["batteryCapacity", "price", "discountPrice", "discountPercent", "stockQuantity"];

    // Xử lý giá trị cho các trường số
    const processedValue = positiveNumberFields.includes(name) 
      ? value.replace(/[^0-9.]/g, "") 
      : positiveIntegerFields.includes(name) 
        ? value.replace(/[^0-9]/g, "") 
        : value;

    // Kiểm tra giá trị hợp lệ
    const isInvalid =
      (!processedValue || isNaN(positiveNumberFields.includes(name) ? parseFloat(processedValue) : parseInt(processedValue, 10)) || parseFloat(processedValue) <= 0) &&
      (positiveNumberFields.includes(name) || positiveIntegerFields.includes(name));

    // Cập nhật state
    if (index !== null) {
      setProductData(prev => {
        const updatedVariations = [...prev.variations];
        updatedVariations[index] = { ...updatedVariations[index], [name]: processedValue };
        return { ...prev, variations: updatedVariations };
      });
      
      setErrors(prev => ({ 
        ...prev, 
        [`variation_${index}_${name}`]: isInvalid 
      }));
    } else {
      setProductData(prev => ({ ...prev, [name]: processedValue }));
      setErrors(prev => ({ ...prev, [name]: isInvalid }));
    }
  };

  // Xử lý thay đổi phương thức upload ảnh
  const handleUploadMethodChange = (index, method) => {
    setProductData(prev => {
      const updatedVariations = [...prev.variations];
      updatedVariations[index] = { 
        ...updatedVariations[index], 
        uploadMethod: method, 
        imageFile: null, 
        imageURL: "" 
      };
      return { ...prev, variations: updatedVariations };
    });
  };

  // Xử lý upload file ảnh
  const handleFileChange = (index, e) => {
    const file = e.target.files[0];
    if (!file) return;

    setProductData(prev => {
      const updatedVariations = [...prev.variations];
      updatedVariations[index] = { 
        ...updatedVariations[index], 
        imageFile: file, 
        isUploading: true 
      };
      return { ...prev, variations: updatedVariations };
    });

    // Upload lên Cloudinary
    uploadImageToCloudinary(file, index);
  };

  // Hàm upload ảnh lên Cloudinary
  const uploadImageToCloudinary = (file, index) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "PhoneImagesUpload");

    fetch("https://api.cloudinary.com/v1_1/darjoyiqr/image/upload", {
      method: "POST",
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        setProductData(prev => {
          const updatedVariations = [...prev.variations];
          updatedVariations[index] = { 
            ...updatedVariations[index], 
            imageURL: data.secure_url, 
            isUploading: false 
          };
          return { ...prev, variations: updatedVariations };
        });
      })
      .catch(error => {
        console.error("Error uploading image:", error);
        setProductData(prev => {
          const updatedVariations = [...prev.variations];
          updatedVariations[index] = { 
            ...updatedVariations[index], 
            isUploading: false 
          };
          return { ...prev, variations: updatedVariations };
        });
      });
  };

  // Thêm biến thể mới
  const addVariation = () => {
    setProductData(prev => ({
      ...prev,
      variations: [...prev.variations, { ...defaultVariation }]
    }));
  };

  // Xóa biến thể
  const removeVariation = (index) => {
    setProductData(prev => ({
      ...prev,
      variations: prev.variations.filter((_, i) => i !== index)
    }));
  };

  // Xử lý submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedData = {
        ...productData,
        variations: await Promise.all(
          productData.variations.map(async variation => {
            if (variation.uploadMethod === "upload" && variation.imageFile && !variation.imageURL) {
              // Upload ảnh nếu chưa được upload
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
        )
      };

      const response = await fetch("http://localhost:8081/api/admin/product/create-model", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json", 
          Authorization: `Bearer ${localStorage.getItem("jwt")}` 
        },
        body: JSON.stringify(formattedData)
      });

      if (response.ok) {
        setSnackbar({ 
          open: true, 
          message: "Product created successfully!", 
          severity: "success" 
        });
      } else {
        setSnackbar({ 
          open: true, 
          message: "Failed to create product.", 
          severity: "error" 
        });
      }
    } catch (error) {
      console.error("Error creating product:", error);
      setSnackbar({ 
        open: true, 
        message: "An error occurred while creating the product.", 
        severity: "error" 
      });
    }
  };

  // Đóng snackbar thông báo
  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  // Render form
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
              {/* Render các trường thông tin chính */}
              {productFields.map((field, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <TextField
                    fullWidth
                    label={field.label}
                    name={field.name}
                    type={field.type || "text"}
                    value={productData[field.name]}
                    onChange={handleChange}
                    required
                    {...commonTextFieldStyles}
                  />
                </Grid>
              ))}

              {/* Trường mô tả */}
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
                  {...commonTextFieldStyles}
                />
              </Grid>

              {/* Tiêu đề phần biến thể */}
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ marginTop: "20px", marginBottom: "20px", color: "#ffffff" }}>
                  Variations
                </Typography>
              </Grid>

              {/* Render các biến thể */}
              {productData.variations.map((variation, index) => (
                <Grid container spacing={2} key={index} sx={{ pl: 2 }}>
                  {/* Render trường thông tin biến thể */}
                  {variationFields.map((field, fieldIndex) => (
                    <Grid item xs={12} sm={6} key={fieldIndex}>
                      <TextField
                        fullWidth
                        label={field.label}
                        name={field.name}
                        type={field.type || "text"}
                        value={variation[field.name]}
                        onChange={(e) => handleChange(e, index)}
                        required
                        {...commonTextFieldStyles}
                      />
                    </Grid>
                  ))}
                  
                  {/* Chọn phương thức upload ảnh */}
                  <Grid item xs={12}>
                    <RadioGroup 
                      row 
                      value={variation.uploadMethod} 
                      onChange={(e) => handleUploadMethodChange(index, e.target.value)}
                      sx={{ color: "#ffffff" }}
                    >
                      <FormControlLabel 
                        value="url" 
                        control={<Radio sx={{ color: "#7f8fa6", "&.Mui-checked": { color: "#17a2b8" } }} />} 
                        label="Enter Image URL" 
                      />
                      <FormControlLabel 
                        value="upload" 
                        control={<Radio sx={{ color: "#7f8fa6", "&.Mui-checked": { color: "#17a2b8" } }} />} 
                        label="Upload Image" 
                      />
                    </RadioGroup>
                  </Grid>
                  
                  {/* Nhập URL ảnh */}
                  {variation.uploadMethod === "url" && (
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Image URL"
                        name="imageURL"
                        value={variation.imageURL}
                        onChange={(e) => handleChange(e, index)}
                        {...commonTextFieldStyles}
                      />
                    </Grid>
                  )}
                  
                  {/* Upload file ảnh */}
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
                        <input 
                          type="file" 
                          accept="image/*" 
                          hidden 
                          onChange={(e) => handleFileChange(index, e)} 
                        />
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
                  
                  {/* Nút xóa biến thể */}
                  <Grid item xs={12}>
                    <IconButton
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
              
              {/* Nút thêm biến thể */}
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

              {/* Nút tạo sản phẩm */}
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
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

        {/* Thông báo */}
        <Snackbar 
          open={snackbar.open} 
          autoHideDuration={3000} 
          onClose={handleCloseSnackbar} 
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert 
            onClose={handleCloseSnackbar} 
            severity={snackbar.severity} 
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Card>
    </div>
  );
};

export default CreateProductForm;
