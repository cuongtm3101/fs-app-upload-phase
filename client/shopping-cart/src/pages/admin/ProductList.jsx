import { useState, useEffect } from "react";
import { formatCurrency } from "../../helpers";
import { useNavigate } from "react-router-dom";

//
import Pagination from "../../shared/admin/Pagination";
//
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");

  const navigate = useNavigate();

  const BASE_API = "http://localhost:3000/api/v1";

  const fetchProducts = async () => {
    try {
      let res = await fetch(BASE_API + "/products?page_index=1&page_number=3");
      let data = await res.json();
      console.log(data);
      setProducts(() => [...data.data]);
      setTotal(data.length);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategories = async () => {
    try {
      let res = await fetch(BASE_API + "/categories");
      let data = await res.json();
      // console.log("-------", data);
      setCategories(() => [...data]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const handleChangePage = async (pageIndex) => {
    try {
      let res = await fetch(
        BASE_API +
          `/products?${
            categoryFilter ? `category=${categoryFilter}&` : ""
          }page_index=${pageIndex}&page_number=3`
      );
      let data = await res.json();
      console.log("----", data);
      setProducts(() => [...data.data]);
      setCurrentPage(pageIndex);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilterByCategory = (e) => {
    setCategoryFilter(e.target.value);
  };

  const fetchProductsByCategory = async (filter) => {
    try {
      if (filter) {
        // console.log(e.target.value);
        let res = await fetch(
          BASE_API + `/products?category=${filter}&page_index=1&page_number=3`
        );
        let data = await res.json();
        setProducts(() => [...data.data]);
        setTotal(data.length);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
    if (categoryFilter) {
      fetchProductsByCategory(categoryFilter);
    } else {
      fetchProducts();
    }
  }, [categoryFilter]);

  const handleEdit = (id) => {
    navigate("/admin/products/edit/" + id);
  };

  return (
    <div className="col py-3">
      <h3>Product List</h3>
      <hr />
      <p className="lead"></p>
      <div className="container mb-3">
        <div className="row">
          <h5>Actions</h5>
        </div>
        <div className="row">
          <div className="col-3">
            <select
              onChange={handleFilterByCategory}
              class="form-select"
              aria-label="Default select example"
            >
              <option value="">Filter By Category</option>
              {categories.length > 0 &&
                categories.map((e, i) => (
                  <option key={i} value={e.name}>
                    {e.description}
                  </option>
                ))}
            </select>
          </div>
          <div className="col-4">
            <input
              type="text"
              className="form-control form-control"
              placeholder="Search product"
            />
          </div>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Stock</th>
              <th scope="col">Sale</th>
              <th scope="col">Category</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {products.length > 0 ? (
              products.map((e, i) => (
                <tr key={i}>
                  <td scope="row">{i + 1}</td>
                  <td>{e.product_id}</td>
                  <td>{e.name}</td>
                  <td>{formatCurrency(e.price)}</td>
                  <td>{e.number}</td>
                  <td>{e.sale * 100}%</td>
                  <td>{e.description}</td>
                  <td
                    style={{ display: "flex", justifyContent: "space-evenly" }}
                  >
                    <button
                      onClick={() => handleEdit(e.product_id)}
                      className="btn btn-success"
                    >
                      <i class="bi bi-eye"></i>
                    </button>
                    <button className="btn btn-danger">
                      <i class="bi bi-trash3"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <div class="spinner-border m-5" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            )}
          </tbody>
        </table>
      </div>
      <Pagination
        total={total}
        pageNumber={3}
        handleChangePage={handleChangePage}
        currentPage={currentPage}
      />
    </div>
  );
};

export default ProductList;
