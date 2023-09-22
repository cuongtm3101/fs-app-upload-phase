import { formatCurrency } from "../helpers";
import { Link } from "react-router-dom";
function Product({ price, number, id, name, sale }) {
  console.log(id);
  return (
    <div className="card" style={{ width: "18rem" }}>
      <div className="sale-icon">SALE</div>
      <img
        src="https://product.hstatic.net/200000404397/product/72e199dc550b8755de1a_fc3288ef97ec4d47b5b8574402b2f7c4_large.jpg"
        className="card-img-top"
        alt="..."
      />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">
          <b
            style={{ marginRight: "20px" }}
            className={sale ? `full-price sale` : "full-price"}
          >
            {formatCurrency(price)}
          </b>
          <i className="sale-price">{sale && formatCurrency(price * sale)}</i>
        </p>
        <p className="card-text">
          Số lượng:
          {number === 0
            ? "Hết hàng"
            : ` ${number} ${number <= 10 ? "(Sắp hết hàng)" : ""}`}
        </p>
        <Link to={`/products/${id}`} className="btn btn-primary">
          Chi tiết
        </Link>
      </div>
    </div>
  );
}

export default Product;
