import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import BreadCrumb from "../components/BreadCrumb";
import CartItem from "../components/CartItem";
import { formatCurrency } from "../helpers";
import Swal from "sweetalert2";

const CartPage = () => {
  let cart = useSelector((state) => state.cart);
  let navigate = useNavigate();
  const handleCheckout = (e) => {
    e.preventDefault();
    if (cart.length > 0) {
      navigate("/checkout/step-1");
    } else {
      Swal.fire(
        "Không thành công",
        "Chưa có sản phẩm nào trong giỏ hàng",
        "warning"
      );
    }
  };
  return (
    <div className="CartPage">
      <Navbar />
      <div className="container cart-product-page">
        <BreadCrumb />

        <div className="title bg-white text-center">
          <h3>giỏ hàng của bạn</h3>
        </div>

        <div
          className="cart-product-info mt-4 bg-white"
          style={{ padding: "15px" }}
        >
          <div className="row" style={{ padding: "0 15px" }}>
            {cart.length > 0 ? (
              <table class="table table-cart w-100 ">
                <thead>
                  <tr>
                    <th scope="col">&nbsp;</th>
                    <th scope="col">Tên sản phẩm</th>
                    <th scope="col">Giá</th>
                    <th scope="col">Số lượng</th>
                    <th scope="col">Thành tiền</th>
                    <th scope="col">&nbsp;</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((e, i) => (
                    <CartItem key={i} detail={e} />
                  ))}
                </tbody>
              </table>
            ) : (
              <p style={{ textAlign: "center" }}>
                Chưa có sản phẩm nào trong giỏ hàng
              </p>
            )}
          </div>
          <br />
          <div className="row">
            <div className="col-6">
              <h4>Ghi chú đơn hàng</h4>
              <textarea
                id="note"
                name="note"
                rows="4"
                placeholder="Ghi chú"
              ></textarea>
            </div>
            <div className="col-5">
              <h3>Thông tin đơn hàng</h3>
              <div className="total">
                <b>Tổng tiền: </b>
                <span>
                  {formatCurrency(
                    cart.reduce((pre, cur) => {
                      return (pre +=
                        cur.price * (1 - cur.sale) * cur.clickNumber);
                    }, 0)
                  )}
                </span>
              </div>
              <p className="attribute">
                Phí vận chuyển sẽ được tính ở trang thanh toán. Bạn cũng có thể
                nhập mã giảm giá ở trang thanh toán.
              </p>
              <div className="product-order" style={{ width: "30%" }}>
                <Link onClick={handleCheckout}>
                  <button> Thanh toán</button>
                </Link>
              </div>
              <div style={{ color: "#1e3d37" }}>
                <Link style={{ textDecoration: "none" }} to="/">
                  <i class="fa-solid fa-rotate-left"></i>
                  <span> Tiếp tục mua hàng</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CartPage;
