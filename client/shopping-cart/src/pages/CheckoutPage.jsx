import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";

const CheckoutPage = () => {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [phone, setPhone] = useState("");
  let [address, setAddress] = useState("");
  let cart = useSelector((state) => state.cart);
  let dispatch = useDispatch();

  let navigate = useNavigate();

  let [provinces, setProvinces] = useState([]); // Tỉnh/Thành Phố
  let [activeProvince, setActiveProvince] = useState("");

  let [districts, setDistricts] = useState([]); // Quận/Huyện
  let [activeDistrict, setActiveDistrict] = useState("");

  let [wards, setWards] = useState([]); // Phường/Xã
  let [activeWard, setActiveWard] = useState("");

  let VIETNAM_BASE_API = "https://provinces.open-api.vn/api/?depth=3";
  let BASE_API = "http://localhost:3000/api/v1";

  const fetchProvinces = async () => {
    try {
      let res = await fetch(VIETNAM_BASE_API);
      let data = await res.json();
      console.log(data);
      setProvinces(() => [...data]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProvinces();
  }, []);

  useEffect(() => {
    let clickProvince = provinces.find((e) => e.name == activeProvince);
    if (clickProvince) {
      setDistricts(() => [...clickProvince.districts]);
      setActiveWard("");
    }
  }, [activeProvince]);

  useEffect(() => {
    let clickDistrict = districts.find((e) => e.name == activeDistrict);
    if (clickDistrict) {
      setWards(() => [...clickDistrict.wards]);
    }
  }, [activeDistrict]);

  const handleActiveProvince = (e) => {
    if (!e.target.value) {
      resetAllProvinces();
    } else {
      setActiveProvince(e.target.value);
      // activeProvince KHÔNG THỂ
    }
  };

  const handleActiveDistrict = (e) => {
    if (!e.target.value) {
      resetAllProvinces();
    } else {
      setActiveDistrict(e.target.value);
    }
  };

  const handleActiveWard = (e) => {
    if (!e.target.value) {
      resetAllProvinces();
    } else {
      setActiveWard(e.target.value);
    }
  };

  function resetAllProvinces() {
    setActiveProvince("");
    setActiveDistrict("");
    setDistricts([]);
    setActiveWard("");
    setWards([]);
  }

  const handleCheckout = async (e) => {
    e.preventDefault();
    try {
      // Validate các trường thông tin ở trong input

      // Sau khi validate thành công mới gửi thông tin lên server
      // Giả sữ đã validate rồi
      let order = {
        name,
        email,
        phone,
        address,
        province: activeProvince,
        district: activeDistrict,
        ward: activeWard,
        cart,
      };

      let res = await fetch(BASE_API + "/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });
      let data = await res.json();
      Swal.fire("Thành công", data.message, "success").then(() => {
        dispatch({ type: "CLEAR_CART" });
        navigate(`/checkout/step-2?id=${data.orderId}`);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="col-7 left-side">
      <h3 className="title">CiCi - Thượng Đỉnh Yến</h3>
      <p className="sub-title">Thông tin giao hàng</p>
      <div className="remind">
        Bạn đã có tài khoản? <Link to="/">Đăng nhập</Link>
      </div>
      <form>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            aria-describedby="emailHelp"
            placeholder="Họ và tên"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Số điện thoại"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Địa chỉ"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="address-container mb-3">
          <select
            class="form-select"
            aria-label="Default select example"
            onChange={handleActiveProvince}
            value={activeProvince}
          >
            <option selected value="">
              Tỉnh/Thành
            </option>
            {provinces.length > 0 &&
              provinces.map((e, i) => <option value={e.name}>{e.name}</option>)}
          </select>

          <select
            class="form-select"
            aria-label="Default select example"
            onChange={handleActiveDistrict}
            value={activeDistrict}
          >
            <option selected value="">
              Quận/Huyện
            </option>
            {districts.length > 0 &&
              districts.map((e, i) => <option value={e.name}>{e.name}</option>)}
          </select>

          <select
            class="form-select"
            aria-label="Default select example"
            onChange={handleActiveWard}
            value={activeWard}
          >
            <option selected value="">
              Phường/Xã
            </option>
            {wards.length > 0 &&
              wards.map((e, i) => <option value={e.name}>{e.name}</option>)}
          </select>
        </div>

        <div className="form-footer mb-3">
          <Link className="back" to="/cart">
            Giỏ hàng
          </Link>
          <Link className="step btn btn-primary" onClick={handleCheckout}>
            Xác nhận thanh toán
          </Link>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
