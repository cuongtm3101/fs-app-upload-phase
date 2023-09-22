import { Link, useSearchParams, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { formatCurrency } from "../helpers";
const CheckoutLayout = () => {
  const [order, setOrder] = useState({});
  const [searchParams] = useSearchParams();

  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  //
  let queryString = searchParams.get("id");
  let BASE_API = "http://localhost:3000/api/v1";

  const fetchOrder = async () => {
    try {
      let res = await fetch(BASE_API + `/orders/${queryString}`);
      let data = await res.json();
      let fetchOrder = {
        orderId: data[0].order_id,
        orderName: data[0].order_name,
        phone: data[0].phone,
        email: data[0].email,
        ward: data[0].ward,
        district: data[0].district,
        province: data[0].province,
        products: [],
      };
      data.forEach((element) => {
        fetchOrder.products.push({
          productId: element.product_id,
          name: element.name,
          clickNumber: element.number,
          stock: element.stock,
          price: element.price,
          sale: element.sale,
        });
      });
      console.log(fetchOrder);
      setOrder({ ...fetchOrder });
      dispatch({ type: "ORDER_TO_CART", payload: fetchOrder.products });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (queryString) {
      fetchOrder();
    }
  }, [queryString]);
  return (
    <div className="CheckoutPage">
      <div className="container">
        <div className="row">
          <Outlet context={order} />
          <div className="col-5 order-summary p-5 mt-5">
            <table className="table table-borderless product-table align-middle">
              <thead>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th>
              </thead>
              <tbody>
                {cart.length > 0 &&
                  cart.map((e, i) => (
                    <tr>
                      <td className="product-img">
                        <div>
                          <img
                            src="https://product.hstatic.net/200000404397/product/6fc520de32fae3a4baeb_3c4daed861024486a268ecd30b1b92d6_451a684b427f4a238d9d61bd284c8c14_small.jpg"
                            alt=""
                          />
                          <span className="product-count">{e.clickNumber}</span>
                        </div>
                      </td>
                      <td className="product-name">
                        <span>{e.name}</span>
                        <p style={{ fontSize: "12px", color: "#96969" }}>
                          50gram
                        </p>
                      </td>
                      <td className="product-price text-end">
                        {formatCurrency((1 - e.sale) * e.price)}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>

            <div className="sale-code d-flex align-items-center gap-2 ">
              <input type="text" placeholder="Mã giảm giá" />
              <button className="btn ">Sử dụng</button>
            </div>

            <div className="product-total">
              <div>
                <span>Tạm tính</span>
                <span>
                  {formatCurrency(
                    cart.reduce(
                      (pre, cur) =>
                        (pre += cur.clickNumber * (1 - cur.sale) * cur.price),
                      0
                    )
                  )}
                </span>
              </div>
              <div>
                <span>Phí vận chuyển</span>
                <span>---</span>
              </div>
              <div className="total-price ">
                <span style={{ fontSize: "20px" }}>Tổng cộng</span>
                <span>
                  {formatCurrency(
                    cart.reduce(
                      (pre, cur) =>
                        (pre += cur.clickNumber * (1 - cur.sale) * cur.price),
                      0
                    )
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutLayout;
