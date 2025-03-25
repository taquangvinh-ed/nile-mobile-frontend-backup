import { Card, Button, Dialog, DialogTitle, DialogContent, Grid, TextField, DialogActions, Snackbar, Alert } from "@mui/material";
import React, { useState, useEffect } from "react";

const UpdateProduct = ({ productId }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
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
    category: "",
    brand: "",
    series: "",
  });
  const [originalData, setOriginalData] = useState({});
  const [errors, setErrors] = useState({});
  const [isChanged, setIsChanged] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  // Fetch product data when dialog opens
  useEffect(() => {
    if (open) {
      fetch(`http://localhost:8081/api/admin/product/id/${productId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setFormData(data);
          setOriginalData(data);
          setErrors({});
          setIsChanged(false);
        })
        .catch((error) => console.error("Error fetching product data:", error));
    }
  }, [open, productId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Các trường cần kiểm tra
    const numericFields = ["screenSize", "batteryCapacity", "productWeight", "productSize"];
    if (numericFields.includes(name)) {
      // Loại bỏ ký tự không hợp lệ
      const numericValue = value.replace(/[^0-9.]/g, ""); // Chỉ giữ lại số và dấu chấm
      setFormData((prev) => {
        const updated = { ...prev, [name]: numericValue };

        // Kiểm tra sự khác biệt giữa giá trị hiện tại và giá trị ban đầu
        const hasChanges = Object.keys(updated).some(
          (key) => String(updated[key]) !== String(originalData[key] || "")
        );
        setIsChanged(hasChanges);
        return updated;
      });

      // Kiểm tra lỗi
      if (!numericValue || isNaN(parseFloat(numericValue)) || parseFloat(numericValue) <= 0) {
        setErrors((prev) => ({ ...prev, [name]: true }));
      } else if (name === "batteryCapacity" && !Number.isInteger(parseFloat(numericValue))) {
        // Kiểm tra nếu batteryCapacity không phải số nguyên
        setErrors((prev) => ({ ...prev, [name]: true }));
      } else {
        setErrors((prev) => ({ ...prev, [name]: false }));
      }
      return;
    }

    // Các trường khác
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };

      // Kiểm tra sự khác biệt giữa giá trị hiện tại và giá trị ban đầu
      const hasChanges = Object.keys(updated).some(
        (key) => String(updated[key]) !== String(originalData[key] || "")
      );
      setIsChanged(hasChanges);
      return updated;
    });

    // Kiểm tra trường bắt buộc
    setErrors((prev) => ({ ...prev, [name]: !value }));
  };

  const validateFields = () => {
    const requiredFields = ["screenSize", "batteryCapacity", "productWeight"];
    const newErrors = {};

    requiredFields.forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = true;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateFields()) return;

    if (!isChanged) {
      setSnackbar({
        open: true,
        message: "No changes detected. Please update fields.",
        severity: "warning",
      });
      return;
    }

    fetch(`http://localhost:8081/api/admin/product/update/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          setSnackbar({ open: true, message: "Product updated successfully!", severity: "success" });
          setOpen(false);
        } else {
          setSnackbar({ open: true, message: "Failed to update product.", severity: "error" });
        }
      })
      .catch(() => {
        setSnackbar({ open: true, message: "An unexpected error occurred.", severity: "error" });
      });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Card sx={{ bgcolor: "#282f36", borderRadius: "10px" }}>
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
        EDIT SPECIFICATION
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="md"
        fullWidth
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
          Update Product
        </DialogTitle>
        <DialogContent sx={{ bgcolor: "#2f3640" }}>
          <Grid container spacing={2}>
            {/* Left Column */}
            <Grid item xs={12} md={6}>
              {["name", "screenSize", "displayTech", "resolution", "refreshRate", "frontCamera", "backCamera", "productSize", "productWeight"].map((field) => (
                <TextField
                  key={field}
                  fullWidth
                  label={field.charAt(0).toUpperCase() + field.slice(1)}
                  name={field}
                  type={["screenSize", "productWeight", "batteryCapacity", "productSize"].includes(field) ? "number" : "text"} // Chỉ các trường số mới có type="number"
                  inputProps={["screenSize", "productWeight", "batteryCapacity", "productSize"].includes(field) ? { min: 0 } : {}} // Giới hạn giá trị >= 0
                  value={formData[field] || ""}
                  onChange={handleInputChange}
                  margin="normal"
                  InputProps={{
                    sx: { color: "#fff" },
                  }}
                  InputLabelProps={{
                    sx: { color: "#dcdde1" },
                  }}
                  error={!!errors[field]}
                  helperText={
                    errors[field] &&
                    (["screenSize", "productWeight", "batteryCapacity", "productSize"].includes(field)
                      ? "This field must be a positive number."
                      : "This field is required.")
                  }
                />
              ))}
            </Grid>
            {/* Right Column */}
            <Grid item xs={12} md={6}>
              {["chipset", "cpu", "gpu", "batteryCapacity", "chargingPort", "os", "category", "brand", "series"].map((field) => (
                <TextField
                  key={field}
                  fullWidth
                  label={field.charAt(0).toUpperCase() + field.slice(1)}
                  name={field}
                  type={["screenSize", "productWeight", "batteryCapacity", "productSize"].includes(field) ? "number" : "text"} // Chỉ các trường số mới có type="number"
                  inputProps={["screenSize", "productWeight", "batteryCapacity", "productSize"].includes(field) ? { min: 0 } : {}} // Giới hạn giá trị >= 0
                  value={formData[field] || ""}
                  onChange={handleInputChange}
                  margin="normal"
                  InputProps={{
                    sx: { color: "#fff" },
                  }}
                  InputLabelProps={{
                    sx: { color: "#dcdde1" },
                  }}
                  error={!!errors[field]}
                  helperText={
                    errors[field] &&
                    (field === "batteryCapacity"
                      ? "This field must be a positive integer."
                      : "This field must be a positive number.")
                  }
                />
              ))}
            </Grid>
            {/* Description Field */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description || ""}
                onChange={handleInputChange}
                margin="normal"
                multiline
                rows={4}
                InputProps={{
                  sx: { color: "#fff" },
                }}
                InputLabelProps={{
                  sx: { color: "#dcdde1" },
                }}
                error={!!errors.description}
                helperText={errors.description && "This field is required."}
              />
            </Grid>
          </Grid>
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
            disabled={
              !isChanged || // Không có thay đổi
              Object.values(errors).some((error) => error) // Có lỗi trong các trường
            }
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

export default UpdateProduct;
