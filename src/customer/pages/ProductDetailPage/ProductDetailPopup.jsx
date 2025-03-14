import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Divider } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ProductDetailPopup(props) {
  const { product, variation } = props;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Kiểm tra dữ liệu để tránh lỗi undefined
  const screenSize = product?.screenSize || "N/A";
  const batteryCapacity = product?.batteryCapacity || "N/A";
  const os = product?.os || "N/A";
  const ram = product?.ram || "N/A"; // Từ product
  const rom = product?.rom || "N/A"; // Từ product
  const color = variation?.color || "N/A";
  const price =
    variation?.price?.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    }) || "N/A";

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Xem cấu hình chi tiết
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            backgroundColor: "RGB(237 239 241)",
          }}
        >
          THÔNG SỐ KỸ THUẬT
        </DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {/* Màn hình */}
            <div className="mb-4">
              <h3 className="font-bold text-lg mb-2">Màn hình</h3>
              <div className="grid grid-cols-2 gap-y-2 gap-x-6">
                <div className="col-span-1 text-gray-600">
                  Kích thước màn hình
                </div>
                <div className="col-span-1">{screenSize} inches</div>
              </div>
            </div>

            {/* Cấu hình */}
            <div className="mb-4">
              <h3 className="font-bold text-lg mb-2">Cấu hình</h3>
              <div className="grid grid-cols-2 gap-y-2 gap-x-6">
                <div className="col-span-1 text-gray-600">Dung lượng pin</div>
                <div className="col-span-1">{batteryCapacity} mAh</div>
                <div className="col-span-1 text-gray-600">Hệ điều hành</div>
                <div className="col-span-1">{os}</div>
                <div className="col-span-1 text-gray-600">RAM</div>
                <div className="col-span-1">{ram}</div>
                <div className="col-span-1 text-gray-600">ROM</div>
                <div className="col-span-1">{rom}</div>
              </div>
            </div>

            {/* Thông tin khác (từ variation) */}
            <div className="mb-4">
              <h3 className="font-bold text-lg mb-2">Thông tin khác</h3>
              <div className="grid grid-cols-2 gap-y-2 gap-x-6">
                <div className="col-span-1 text-gray-600">Màu sắc</div>
                <div className="col-span-1">{color}</div>
                <div className="col-span-1 text-gray-600">Giá</div>
                <div className="col-span-1">{price}</div>
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button
            onClick={handleClose}
            sx={{
              backgroundColor: "red",
              color: "white",
              "&:hover": { backgroundColor: "darkred" },
            }}
          >
            ĐÓNG
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
