import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
function Navbar() {
  let cart = useSelector((state) => state.cart);

  useEffect(() => {
    console.log(cart);
  }, [cart]);
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          ThượngĐỉnhYến
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Trang Chủ
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Danh Mục
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link
                    className="dropdown-item"
                    href="/categories/thuong-vy-yen"
                  >
                    Thượng Vy Yến
                  </Link>
                  <hr class="dropdown-divider"></hr>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    href="/categories/thuong-vy-sam"
                  >
                    Thượng Vy Sâm
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <Link className="nav-link" aria-disabled="true" to="/cart">
                <i
                  class="fa-solid fa-cart-shopping"
                  style={{ paddingRight: "10px" }}
                ></i>
                Giỏ Hàng (
                {cart.reduce((pre, cur) => (pre += cur.clickNumber), 0)})
              </Link>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
