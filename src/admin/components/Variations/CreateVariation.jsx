import { Card, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, Alert, RadioGroup, FormControlLabel, Radio, Typography } from "@mui/material";
import React, { useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const CreateVariation = ({ productId, onCreateSuccess }) => {
  const [open, setOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [variation, setVariation] = useState({
    productId: productId,
    color: "",
    ram: "",
    rom: "",
    price: "",
    discountPercent: "",
    discountPrice: "",
    stockQuantity: "",
    imageURL: "",
  });
  const [uploadMethod, setUploadMethod] = useState("upload"); // "upload" hoặc "url"
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const numericFields = ["discountPercent", "discountPrice", "price", "stockQuantity"];

    setVariation((prev) => ({
      ...prev,
      [name]: numericFields.includes(name) && (value === "" || Number(value) < 0) ? "" : value, // Chuyển thành rỗng nếu giá trị âm hoặc rỗng
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "PhoneImagesUpload");

    try {
      setUploading(true);
      const response = await fetch("https://api.cloudinary.com/v1_1/darjoyiqr/image/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    } finally {
      setUploading(false);
    }
  };

  const validateFields = () => {
    const requiredFields = ["color", "ram", "rom", "price", "discountPercent", "discountPrice", "stockQuantity"];
    const newErrors = {};

    requiredFields.forEach((field) => {
      if (!variation[field] || variation[field].toString().trim() === "") {
        newErrors[field] = true; // Đánh dấu lỗi nếu trường bị để trống
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Trả về true nếu không có lỗi
  };

  const handleSubmit = async () => {
    if (!validateFields()) {
      setSnackbar({
        open: true,
        message: "Please fill in all required fields.",
        severity: "error",
      });
      return;
    }

    try {
      let finalImageUrl = null;

      if (uploadMethod === "upload" && image) {
        finalImageUrl = await uploadImageToCloudinary(image);
        if (!finalImageUrl) {
          setSnackbar({
            open: true,
            message: "Failed to upload image.",
            severity: "error",
          });
          return;
        }
      } else if (uploadMethod === "url") {
        finalImageUrl = imageUrl;
      }

      const newVariation = { ...variation, imageURL: finalImageUrl };

      const response = await fetch("http://localhost:8081/api/admin/variation/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
        body: JSON.stringify(newVariation),
      });

      if (response.ok) {
        const createdVariation = await response.json();
        setOpen(false);
        setSnackbar({
          open: true,
          message: "Variation created successfully!",
          severity: "success",
        });

        // Reset form state
        setVariation({
          productId: productId,
          color: "",
          ram: "",
          rom: "",
          price: "",
          discountPercent: "",
          discountPrice: "",
          stockQuantity: "",
          imageURL: "",
        });
        setImage(null);
        setImageUrl("");

        if (onCreateSuccess) {
          onCreateSuccess(createdVariation);
        }
      } else {
        setSnackbar({
          open: true,
          message: "Failed to create variation.",
          severity: "error",
        });
      }
    } catch (error) {
      console.error("Error creating variation:", error);
      setSnackbar({
        open: true,
        message: "An unexpected error occurred.",
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleCloseForm = () => {
    setOpen(false);
    setErrors({}); // Đặt lại trạng thái lỗi
  };

  return (
    <Card sx={{ bgcolor: "#282f36", borderRadius: "10px" }}>
      <style>
        {`
          input:-webkit-autofill,
          input:-webkit-autofill:hover,
          input:-webkit-autofill:focus {
            -webkit-box-shadow: 0 0 0px 1000px #2f3640 inset !important;
            -webkit-text-fill-color: #fff !important;
          }
        `}
      </style>
      <Button
        sx={{
          bgcolor: "#ff6c2f",
          borderRadius: "10px",
          "&:hover": { bgcolor: "#e84118" },
        }}
        variant="contained"
        color="primary"
        onClick={() => setOpen(true)}
      >
        Add New Variation
      </Button>

      <Dialog
        open={open}
        onClose={handleCloseForm}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            bgcolor: "#1e272e",
            color: "#fff",
            borderRadius: "10px",
          },
        }}
      >
        <DialogTitle
          sx={{
            bgcolor: "#2f3640",
            color: "#ff6c2f",
            fontWeight: "bold",
          }}
        >
          Add New Variation
        </DialogTitle>
        <DialogContent sx={{ bgcolor: "#2f3640" }}>
          {["color", "ram", "rom", "price", "discountPercent", "discountPrice", "stockQuantity"].map((field) => (
            <div key={field}>
              <TextField
                margin="dense"
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                name={field}
                type={field === "discountPercent" || field === "discountPrice" || field.includes("price") || field.includes("Quantity") ? "number" : "text"}
                fullWidth
                value={variation[field]}
                onChange={handleInputChange}
                InputProps={{
                  sx: { color: "#fff" },
                  inputProps: field === "discountPercent" || field === "discountPrice" || field.includes("price") || field.includes("Quantity") ? { min: 0 } : {}, // Giới hạn giá trị >= 0
                }}
                InputLabelProps={{
                  sx: { color: "#dcdde1" },
                }}
                error={!!errors[field]} // Đánh dấu lỗi nếu có
              />
              {errors[field] && (
                <Typography variant="caption" color="error">
                  This field is required.
                </Typography>
              )}
            </div>
          ))}
          <RadioGroup row value={uploadMethod} onChange={(e) => setUploadMethod(e.target.value)} sx={{ mt: 2 }}>
            <FormControlLabel value="upload" control={<Radio />} label="Upload Image" />
            <FormControlLabel value="url" control={<Radio />} label="Enter Image URL" />
          </RadioGroup>
          {uploadMethod === "upload" && (
            <div>
              <Button
                variant="contained"
                component="label"
                startIcon={<CloudUploadIcon />}
                sx={{
                  bgcolor: "#ff6c2f",
                  "&:hover": { bgcolor: "#e84118" },
                  mt: 2,
                }}
              >
                Upload Image
                <input type="file" accept="image/*" hidden onChange={handleImageChange} />
              </Button>
              {image && (
                <Typography variant="caption" color="success" sx={{ display: "block", mt: 1 }}>
                  {image.name} selected.
                </Typography>
              )}
              {uploading && (
                <Typography variant="caption" color="warning" sx={{ display: "block", mt: 1 }}>
                  Uploading image...
                </Typography>
              )}
            </div>
          )}
          {uploadMethod === "url" && (
            <TextField
              margin="dense"
              label="Image URL"
              fullWidth
              value={imageUrl}
              onChange={handleImageUrlChange}
              InputProps={{
                sx: { color: "#fff" },
              }}
              InputLabelProps={{
                sx: { color: "#dcdde1" },
              }}
            />
          )}
        </DialogContent>
        <DialogActions sx={{ bgcolor: "#2f3640" }}>
          <Button
            onClick={handleCloseForm}
            sx={{
              color: "#fff",
              bgcolor: "#7f8fa6",
              "&:hover": { bgcolor: "#718093" },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            sx={{
              color: "#fff",
              bgcolor: "#ff6c2f",
              "&:hover": { bgcolor: "#e84118" },
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default CreateVariation;
