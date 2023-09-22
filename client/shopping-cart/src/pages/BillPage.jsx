import {
  Link,
  useSearchParams,
  useOutletContext,
  useNavigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const BillPage = () => {
  let context = useOutletContext();
  let navigate = useNavigate();
  let dispatch = useDispatch();

  const handleContinue = (e) => {
    e.preventDefault();
    dispatch({ type: "CLEAR_CART" });
    navigate("/");
  };
  return (
    <div className="col-7 pt-5 mt-5 bill-content">
      <div className="success-icon">
        <i class="fa-regular fa-circle-check"></i>
      </div>
      <h3 className="title">CiCi - Thượng đỉnh yến</h3>
      <div className="bill-title">
        <h4>Đặt hàng thành công</h4>
        <span>Mã đơn hàng #00000{context.orderId}</span>
        <p>Cảm ơn bạn đã mua hàng</p>
        <span>
          Chúng tôi đã gửi đơn hàng đến <i>{context.email}</i>, vui lòng theo
          dõi đơn hàng
        </span>
      </div>

      <div className="bill-info">
        <h4>Thông tin đơn hàng</h4>
        <p>Thông tin giao hàng</p>
        <ul className="list-unstyled">
          <li>
            <b>Họ và tên:</b> {context.orderName}
          </li>
          <li>
            <b>Điện thoại:</b> {context.phone}
          </li>
          <li>
            <b>Email:</b> {context.email}
          </li>
          <li>
            <b>Phường/Xã:</b> {context.ward}
          </li>
          <li>
            <b>Quận/Huyện:</b> {context.district}
          </li>
          <li>
            <b>Tỉnh/Thành Phố:</b> {context.province}, Việt Nam
          </li>
        </ul>
        <p>Phương thức thanh toán</p>
        <span>Thanh toán khi giao hàng</span>
      </div>
      <div className="d-flex justify-content-between align-items-center pt-4">
        <div>
          Cần hỗ trợ?{" "}
          <Link
            to="/"
            style={{ color: "#338dbc", fontSize: "" }}
            className="text-decoration-none"
          >
            Liên hệ chúng tôi
          </Link>
        </div>
        <Link className="btn btn-primary continue-btn" onClick={handleContinue}>
          Tiếp tục mua hàng
        </Link>
      </div>
    </div>
  );
};

export default BillPage;
