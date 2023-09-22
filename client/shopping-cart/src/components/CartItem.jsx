import { useState, useEffect } from "react";
import { formatCurrency } from "../helpers/index";
import { useDispatch } from "react-redux";
const CartItem = ({ detail }) => {
  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    setQuantity(() => detail.clickNumber);
  }, []);

  const handleIncrease = (id) => {
    setQuantity(quantity + 1);
    dispatch({ type: "INCREASE_CART_PRODUCT", payload: id });
  };

  return (
    <tr className="CartItem">
      <td style={{ width: "110px" }}>
        <img
          src="https://product.hstatic.net/200000404397/product/baby_1-4_310f9ddcce9c44e895a2dd14b06e2ef3_medium.jpg"
          alt=""
          className="img-fluid"
        />
      </td>
      <td>
        <div style={{ fontWeight: "bold" }}>{detail.name}</div>
        <span>50gram</span>
      </td>
      <td>
        <div
          style={{
            color: " #1E3D37",
            fontWeight: "600",
            fontSize: "20px",
          }}
        >
          {formatCurrency(detail.price * detail.sale)}
        </div>
        <span className="sale" style={{ fontSize: "12px" }}>
          {formatCurrency(detail.price)}
        </span>
      </td>
      <td>
        <div className="quantity-area d-flex mt-2">
          <input
            type="button"
            value="-"
            onClick={() => {
              if (quantity > 0) setQuantity(quantity - 1);
            }}
          />
          <input type="text" value={quantity} />
          <input
            type="button"
            value="+"
            onClick={() => handleIncrease(detail.product_id)}
          />
        </div>
      </td>
      <td>
        <p
          style={{
            color: "#1E3D37",
            fontWeight: "600",
            fontSize: "20px",
          }}
        >
          {formatCurrency(
            detail.price * (1 - detail.sale) * detail.clickNumber
          )}
        </p>
      </td>
      <td>
        <i class="fa-solid fa-xmark"></i>
      </td>
    </tr>
  );
};

export default CartItem;
