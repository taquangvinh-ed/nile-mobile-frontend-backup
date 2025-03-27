// src/components/PaymentCallback.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import { verifyPayment, resetPayment } from "../../../State/Auth/Action";

const CallbackVNPay = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authState = useSelector((state) => state.auth);
  const { loading, code, message, success } = authState || {
    loading: false,
    code: "",
    message: "",
    success: false,
  };

  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());
    if (params.error) {
      dispatch({
        type: "PAYMENT_VERIFY_FAIL",
        payload: {
          code: "99",
          message: params.error === "missing_response_code" ? "Missing response code" : "Unknown error",
        },
      });
    } else {
      dispatch(verifyPayment(params));
    }

    return () => {
      dispatch(resetPayment());
    };
  }, [dispatch, searchParams]);

  useEffect(() => {
    if (success && code === "00") {
      const timer = setTimeout(() => {
        navigate("/");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, code, navigate]);

  const renderStatus = () => {
    if (loading) {
      return (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Đang xử lý thanh toán...</p>
        </div>
      );
    }

    if (success && code === "00") {
      return (
        <div className="alert alert-success text-center">
          <h4>Thanh toán thành công!</h4>
          <p>{message}</p>
          <p className="font-semibold">Sẽ chuyển hướng về trang chủ trong giây lát...</p>
        </div>
      );
    }

    return (
      <div className="alert alert-danger text-center">
        <h4>Thanh toán thất bại</h4>
        <p>Mã lỗi: {code}</p>
        <p>{message}</p>
        <button className="btn btn-primary mt-3" onClick={() => navigate("/")}>
          Quay về trang chủ
        </button>
      </div>
    );
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">{renderStatus()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallbackVNPay;
