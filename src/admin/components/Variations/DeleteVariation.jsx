import React, { useState } from "react";
import { Button, Card, Snackbar, Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

const DeleteVariation = ({ variationId, onDeleteSuccess }) => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDelete = () => {
    if (!variationId) {
      setSnackbar({
        open: true,
        message: "No variation selected!",
        severity: "warning",
      });
      return;
    }

    fetch(`http://localhost:8081/api/admin/variation/delete/id/${variationId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete variation");
        }
        setSnackbar({
          open: true,
          message: "Variation deleted successfully!",
          severity: "success",
        });
        if (onDeleteSuccess) {
          onDeleteSuccess();
        }
      })
      .catch((error) => {
        console.error("Error deleting variation:", error);
        setSnackbar({
          open: true,
          message: "Error deleting variation!",
          severity: "error",
        });
      })
      .finally(() => {
        setDialogOpen(false);
      });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <Card sx={{ bgcolor: "#282f36", borderRadius: "10px" }}>
      <Button
        sx={{
          bgcolor: "#ff6c2f",
          borderRadius: "10px",
          color: "#fff",
          "&:hover": { bgcolor: "#e84118" },
        }}
        variant="contained"
        onClick={handleOpenDialog}
      >
        <DeleteIcon sx={{marginRight: "5px"}}/>
        Delete
      </Button>

      {/* Dialog xác nhận xóa */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          sx: {
            bgcolor: "#2f3640",
            color: "#fff",
            borderRadius: "10px",
          },
        }}
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            bgcolor: "#2f3640",
            color: "#ff6c2f",
            fontWeight: "bold",
          }}
        >
          Confirm Deletion
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{
              color: "#dcdde1",
              fontSize: "16px",
            }}
          >
            Are you sure you want to delete this variation? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ bgcolor: "#2f3640" }}>
          <Button
            onClick={handleCloseDialog}
            sx={{
              color: "#fff",
              bgcolor: "#7f8fa6",
              "&:hover": { bgcolor: "#718093" },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            sx={{
              color: "#fff",
              bgcolor: "#ff6c2f",
              "&:hover": { bgcolor: "#e84118" },
            }}
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for success or error messages */}
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default DeleteVariation;
