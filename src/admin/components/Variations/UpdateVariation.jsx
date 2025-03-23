import React, { useState, useEffect } from "react";
import { Card, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, Alert, Typography, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const UpdateVariation = ({ variationId, currentVariation, onUpdateSuccess }) => {
  const [open, setOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [variation, setVariation] = useState(currentVariation || {});
  const [isChanged, setIsChanged] = useState(false);
  const [errors, setErrors] = useState({});
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadMethod, setUploadMethod] = useState("upload");

  useEffect(() => {
    if (variationId && currentVariation) {
      setVariation({ ...currentVariation });
      setIsChanged(false);
      setErrors({});
      setImage(null);
      setImageUrl("");
    }
  }, [variationId, currentVariation]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVariation((prev) => {
      const updated = {
        ...prev,
        [name]: name === "discountPercent" || name === "discountPrice" ? Number(value) : value,
      };
      setIsChanged(Object.keys(updated).some((key) => updated[key] !== currentVariation[key]));
      return updated;
    });
    setErrors((prev) => ({ ...prev, [name]: !value }));
  };

  const handleImageUrlChange = (e) => {
    const value = e.target.value;
    setImageUrl(value);
    setIsChanged(value !== currentVariation.imageURL);
  };

  const validateFields = () => {
    const requiredFields = ["color", "ram", "rom", "price", "discountPrice", "discountPercent", "stockQuantity"];
    const newErrors = {};

    requiredFields.forEach((key) => {
      if (!variation[key]) {
        newErrors[key] = true;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setIsChanged(true);
    }
  };

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "PhoneImagesUpload");

    try {
      setUploading(true);
      const response = await fetch(`https://api.cloudinary.com/v1_1/darjoyiqr/image/upload`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        return data.secure_url;
      }
      return null;
    } catch {
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!validateFields()) return;

    if (!isChanged) {
      setSnackbar({
        open: true,
        message: "No changes detected. Please update fields.",
        severity: "warning",
      });
      return;
    }

    try {
      let finalImageUrl = null;

      if (uploadMethod === "upload" && image) {
        finalImageUrl = await uploadImageToCloudinary(image);
        if (!finalImageUrl) {
          setSnackbar({ open: true, message: "Failed to upload image.", severity: "error" });
          return;
        }
      } else if (uploadMethod === "url") {
        finalImageUrl = imageUrl;
      }

      const updatedVariation = { ...variation, ...(finalImageUrl && { imageURL: finalImageUrl }) };

      const response = await fetch(`http://localhost:8081/api/admin/variation/update/${variationId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(updatedVariation),
      });

      if (response.ok) {
        const result = await response.json();
        setOpen(false);
        setSnackbar({ open: true, message: "Variation updated successfully!", severity: "success" });
        if (onUpdateSuccess) onUpdateSuccess(result);
      } else {
        const errorData = await response.json();
        setSnackbar({ open: true, message: errorData.message || "Failed to update variation.", severity: "error" });
      }
    } catch {
      setSnackbar({ open: true, message: "An unexpected error occurred.", severity: "error" });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
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
      <Button sx={{ bgcolor: "#ff6c2f", borderRadius: "10px", "&:hover": { bgcolor: "#e84118" } }} variant="contained" color="primary" onClick={() => setOpen(true)} disabled={!variationId}>
        Update Variation
      </Button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
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
          Update Variation
        </DialogTitle>
        <DialogContent sx={{ bgcolor: "#2f3640" }}>
          {["color", "ram", "rom", "price", "discountPercent", "discountPrice", "stockQuantity"].map((field) => (
            <TextField
              key={field}
              margin="dense"
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              name={field}
              type={field === "discountPercent" || field === "discountPrice" || field.includes("price") || field.includes("Quantity") ? "number" : "text"}
              fullWidth
              value={variation[field] || ""}
              onChange={handleInputChange}
              InputProps={{
                sx: { color: "#fff" },
              }}
              InputLabelProps={{
                sx: { color: "#dcdde1" },
              }}
              error={!!errors[field]}
              helperText={errors[field] && "This field is required."}
            />
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
            onClick={() => setOpen(false)}
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
            disabled={!isChanged}
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

export default UpdateVariation;
