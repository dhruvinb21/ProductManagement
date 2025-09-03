import axios from 'axios';
import { useEffect, useState } from 'react';
const CategoryMaster = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [editId, setEditId] = useState(null);
    const [successMsg, setSuccessMsg] = useState("");

    const fetchCategories = async () => {
        const res = await axios.get("http://localhost:2000/api/categories");
        setCategories(res.data);
    }

    useEffect(() => {
        fetchCategories();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
                await axios.put(`http://localhost:2000/api/categories/${editId}`, { name });
                setSuccessMsg("Category updated successfully ✅");

            } else {
                await axios.post("http://localhost:2000/api/categories", { name });
                setSuccessMsg("Category added successfully ✅");

            }
            setEditId(null);
            setName("");
            fetchCategories();
        } catch (error) {
            alert(error.response.data.message || "Fail to add/update Category");
        }


    }

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:2000/api/categories/${id}`);
            setSuccessMsg("Category deleted successfully ✅");
            fetchCategories();
        } catch (error) {
            alert(error.response.data.message || "Failed to delete category")
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
            <div className="card ">
                <h2 className="text-center mt-2">Add Category</h2>

                <div className="card-body  d-flex justify-content-center">
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className=" col m-1 ">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Category Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className=" col-md-2 m-1">
                                <button
                                    type="submit"
                                    className="btn btn-primary"

                                >
                                    {editId ? "Update" : "Add"}
                                </button>

                            </div>
                            <div className=" col-md-2 m-1">
                                {editId ?
                                    <button
                                        type="reset"
                                        className="btn btn-secondary"
                                        onClick={() => {
                                            setEditId(null);
                                            setName("");

                                        }}
                                    >
                                        Cancel
                                    </button> : ""
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
                    className="table-responsive-sd m-2 text-center mx-5"
                >
                    <table
                        className="table table-primary table-bordered border-dark text-center"
                    ><caption className="caption-top text-center fw-bold"
          style={{fontSize:"20px"}}>
              Category List
            </caption>
                        <thead>
                            <tr>
                                <th scope="col">CategoryId</th>
                                <th scope="col">CategoryName</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((cate) => (
                                <tr className="" key={cate.id}>
                                    <td scope="row">{cate.id}</td>
                                    <td>{cate.name}</td>
                                    <td><button
                                        type="button"
                                        className="btn btn-primary me-1 py-0 "
                                        style={{ height: "25px", textAlign: "center",fontSize:"12px" }}

                                        onClick={() => {
                                            setEditId(cate.id);
                                            setName(cate.name)
                                        }}
                                    >
                                        Edit
                                    </button>
                                        <button

                                            type="button"
                                            className="btn btn-danger me-1  py-0"
                                            style={{ height: "25px", textAlign: "center", fontSize:"12px" }}
                                            onClick={() => { handleDelete(cate.id) }}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}


                        </tbody>
                    </table>

                </div>

            </div>

        </>
    )
}

export default CategoryMaster
