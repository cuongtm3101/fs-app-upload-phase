import Navbar from "../components/Navbar";
import BreadCrumb from "../components/BreadCrumb";
import ProductCarousel from "../components/ProductCarousel";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { formatCurrency } from "../helpers/index";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

function ProductPage() {
  let [product, setProduct] = useState({});
  let [quantity, setQuantity] = useState(0);
  let { id } = useParams();
  // Khởi tạo ra 1 công cụ có tên là dispatch
  // dùng để gửi dữ liệu và thông báo lên trên store
  let dispatch = useDispatch();
  console.log(id);

  const fetchProduct = async () => {
    try {
      let response = await fetch("http://localhost:3000/api/v1/products/" + id);
      let data = await response.json();
      console.log(data);
      setProduct(() => {
        return { ...data };
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);
  //

  const handleAddToCart = () => {
    let buyProduct = {
      ...product,
      clickNumber: quantity,
    };
    // Gửi 1 thông báo đến store là tao muốn add sản phẩm
    // này vào cart

    // Thông báo này phải đính kèm với dữ liệu cần phải chỉnh sửa
    // trong store

    dispatch({ type: "ADD_TO_CART", payload: buyProduct });
    setQuantity(() => 0);
    Swal.fire("Thành Công", "Sản phẩm đã được thêm vào giỏ hàng!", "success");
  };
  return (
    <div className="ProductPage">
      <Navbar></Navbar>
      <BreadCrumb />
      <section className="container product-detail">
        <div className="row">
          <h3 className="product-name">{product.name}</h3>
          <i className="product-sku">SKU: {product.product_id}</i>
          <p className="mini-description">
            <span className="mini-description-item product-origin">
              <b>Thương hiệu</b>: {product.name}
            </span>
            <span className="mini-description-item product-status">
              <b>Tình trạng</b>: (
              {product.number === 0 ? "Hết hàng" : "Còn hàng"})
            </span>
            <span className="mini-description-item product-sell">
              <b>Đã bán</b>: 21 sản phẩm
            </span>
          </p>
        </div>

        {/* row 2 */}
        <div className="row">
          <div className="col-5">
            {product?.sources?.length ? (
              <ProductCarousel sources={product?.sources} />
            ) : (
              ""
            )}
          </div>
          <div className="col-4">
            <div className="product-price d-flex gap-1 align-items-end">
              <b className="sale-price">
                {product.sale && formatCurrency(product?.price * product?.sale)}
              </b>
              <span
                className={product?.sale ? `full-price sale` : `full-price`}
              >
                {product?.price && formatCurrency(product?.price)}
              </span>

              <span className="product-sale text-white">
                {product.sale * 100}%
              </span>
            </div>

            <div className="product-weight">
              <p>Trọng lượng</p>
              <div className="d-flex gap-2">
                <button className="btn btn-outline-secondary">50 gram</button>
                <button className="btn btn-outline-secondary">100 gram</button>
              </div>
            </div>

            <div className="quantity-area d-flex mt-4">
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
                onClick={() => setQuantity(quantity + 1)}
              />
            </div>

            <div className="product-order pt-4 d-flex gap-3">
              <button onClick={handleAddToCart}>Thêm vào giỏ hàng</button>
              <button>Mua ngay </button>
            </div>
          </div>
          <div className="col-3">
            <div>
              <ul className="list-group product-service">
                <li className="list-group-item">
                  <i class="fa-solid fa-plane-departure"></i>
                  <span>Giao hàng toàn quốc</span>
                </li>
                <li className="list-group-item">
                  <i class="fa-regular fa-calendar-days"></i>
                  <span>Chính hãng 100% - Nhận hàng trong 2 giờ</span>
                </li>
                <li className="list-group-item">
                  <i class="fa-solid fa-shield-halved"></i>
                  <span>Được kiểm tra hàng trước khi nhận</span>
                </li>
                <li className="list-group-item">
                  <i class="fa-solid fa-lock"></i>
                  <span>Đổi trả trong 48h nếu không hài lòng</span>
                </li>
                <li className="list-group-item">
                  <i class="fa-solid fa-dna"></i>
                  <span> Sản phẩm đã được chứng nhận</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductPage;
