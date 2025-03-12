import React from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Login from "./Login";
import { useNavigate } from "react-router-dom";

const AuthModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const navigateRegister = () => {
    onClose();
    navigate("/register");
  };
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Backdrop */}
      <DialogBackdrop className="fixed inset-0 bg-black/30" />

      {/* Modal container */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        {/* DialogPanel */}
        <DialogPanel className=" mt-20 w-auto max-w-[35rem] bg-white rounded-lg shadow-xl overflow-y-auto max-h-[90vh]">
          {/* Nút đóng modal */}
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Hiển thị form đăng nhập */}
          <Login onSuccess={onClose} navigateRegister={navigateRegister} />
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default AuthModal;
