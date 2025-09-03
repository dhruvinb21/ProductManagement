import axios from "axios";
import { useEffect, useState } from "react";

const ProductMaster = () => {

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [editId, setEditId] = useState(null);
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [successMsg, setSuccessMsg] = useState("");

  const fetchProducts = async () => {

    const res = await axios.get(`http://localhost:2000/api/products/productlist?page=${page}&pageSize=${pageSize}`);
    setProducts(res.data.data);
    setTotalPages(res.data.totalPages);
    setTotalProducts(res.data.totalItems);
  }

  const fetchCategories = async () => {
    const res = await axios.get("http://localhost:2000/api/categories");
    setCategories(res.data);
  }

  useEffect(() => {

    fetchProducts();
    fetchCategories();

  }, [page, pageSize, totalProducts]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`http://localhost:2000/api/products/${editId}`, { name, c_id: categoryId });
        setSuccessMsg("Product updated successfully ✅");
      } else {
        await axios.post("http://localhost:2000/api/products", { name, c_id: categoryId });
        setSuccessMsg("Product added successfully ✅");
      }
      setName("");
      setCategoryId("");
      setEditId(null);
      fetchProducts();
    } catch (error) {
      setSuccessMsg("");
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:2000/api/products/${id}`);
      setSuccessMsg("Product deleted successfully ✅");

      fetchProducts();
    } catch (error) {
      setSuccessMsg("");
    }

  }

  useEffect(() => {
    if (successMsg) {
      const timer = setTimeout(() => {
        setSuccessMsg("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMsg]);



  return (
    <>
      <div className="card mb-2 me-2 ms-2 ">
        <h2 className="text-center mt-2">Add Product</h2>
        <div className="card-body col d-flex justify-content-center ">

          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-md-4 mb-1">
                {/* <label for="" className="form-label">Product Name</label> */}
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)} required
                  placeholder="Product Name"
                />
              </div>
              <div className="col-md-5 mb-1">
                {/* <label className="form-label">Select Category</label> */}
                <select
                  className="form-select form-select-md"
                  value={categoryId}
                  onChange={(e) => { setCategoryId(e.target.value) }}
                  required
                >
                  <option value="">--Select Category--</option>
                  {categories.map((cate) => (
                    <option key={cate.id} value={cate.id}>{cate.name}</option>
                  ))}
                </select>

              </div>
              <div className="col-md-2 mb-1">
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  {editId ? "Update" : "Add"}
                </button>
              </div>
              <div className="col-md-1">
                {editId
                  ? <button
                    type="reset"
                    className="btn btn-secondary"
                    onClick={() => {
                      setEditId(null);
                      setName("");
                      setCategoryId("");
                    }}
                  >
                    Cancel
                  </button> : <span></span>
                }

              </div>
            </div>
          </form>
        </div>
        {successMsg && (
          <div className="alert alert-success text-center mx-5">
            {successMsg}
          </div>
        )}
        
        <div
          className="table-responsive m-1 text-center mx-5"
        >

          <table
            className="table table-primary border-1 table-bordered border-dark text-center"
          ><caption className="caption-top text-center fw-bold"
          style={{fontSize:"20px"}}>
              Product List (Total : {totalProducts})
            </caption>
            <thead>
              <tr>
                <th scope="col">ProductId</th>
                <th scope="col">ProductName</th>
                <th scope="col">CategoryId</th>
                <th scope="col">CategoryName</th>
                <th scope="col">Action</th>

              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr className="" key={p.productId}>
                  <td scope="row">{p.productId}</td>
                  <td scope="row">{p.productName}</td>
                  <td scope="row">{p.categoryId}</td>
                  <td scope="row">{p.categoryName}</td>
                  <td scope="row">
                    <button
                      type="button"
                      className="btn btn-primary py-0"
                      style={{ height: "25px", textAlign: "center", fontSize: "12px" }}

                      onClick={() => {
                        setEditId(p.productId);
                        setName(p.productName);
                        setCategoryId(p.categoryId);
                      }}
                    >
                      Edit
                    </button> <button
                      type="button"
                      className="btn btn-danger py-0"
                      style={{ height: "25px", textAlign: "center", fontSize: "12px" }}

                      onClick={() => { handleDelete(p.productId) }}
                    >
                      Delete
                    </button>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-center" style={{ margin: "20px" }}>

          <button
            type="button"
            className="btn btn-primary"
            disabled={page === 1} onClick={() => { setPage(page - 1) }}
          >
            Prev
          </button>
          <span style={{ margin: "10px" }}>
            Page {page} of {totalPages}
          </span>
          <button
            type="button"
            className="btn btn-primary"

            disabled={page === totalPages} onClick={() => {
              setPage(page + 1)
            }}
          >
            Next
          </button>
        </div>

      </div>


    </>

  );
}

export default ProductMaster
