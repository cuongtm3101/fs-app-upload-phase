// redux là kho lưu trữ state tập trung
import { legacy_createStore as createStore } from "redux";

// Giá trị khởi tạo của state
let initialState = {
  cart: [],
};

// Store luôn trong trạng thái lắng nghe
const store = createStore((state = initialState, action) => {
  if (action.type === "ADD_TO_CART") {
    // Logic add sản phẩm vào trong state cart
    let cart = [...state.cart];
    let { payload } = action;
    let findIndex = cart.findIndex(
      (e, i) => e.product_id === payload.product_id
    );
    if (findIndex > -1) {
      cart[findIndex].clickNumber =
        cart[findIndex].clickNumber + payload.clickNumber;
    } else {
      cart.push(payload);
    }
    return {
      ...state,
      cart: [...cart],
    };
  }

  if (action.type === "INCREASE_CART_PRODUCT") {
    // Logic add sản phẩm vào trong state cart
    let cart = [...state.cart];
    let { payload } = action;
    let findIndex = cart.findIndex((e, i) => e.product_id === payload);
    cart[findIndex].clickNumber = cart[findIndex].clickNumber + 1;
    return {
      ...state,
      cart: [...cart],
    };
  }

  if (action.type === "ORDER_TO_CART") {
    // Logic fetch sản phẩm vào trong state cart
    let { payload } = action;
    return {
      ...state,
      cart: [...payload],
    };
  }

  if (action.type === "CLEAR_CART") {
    return {
      ...state,
      cart: [],
    };
  }

  //////////
  // NOTE: LÀM NỐT CHỨC NĂNG GIẢM

  //////////
  // NOTE: LÀM NỐT CHỨC XOÁ KHỎI CART
  return state;
});

export default store;
