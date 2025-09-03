import axios from 'axios';
import { useEffect, useState } from 'react';
const ProductsList = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalProducts,setTotalProducts]=useState(0);
    const pageSize = 10;
useEffect(() => {
    const fetchProducts = async () => {
        const res = await axios.get(`http://localhost:2000/api/products/productlist?page=${page}&pageSize=${pageSize}`);
        setProducts(res.data.data);
        setTotalPages(res.data.totalPages);
        setTotalProducts(res.data.totalItems);
    }
        fetchProducts();
    }, [page, pageSize,totalProducts])


    return (
        <div className='text-center'>
            <div
                className="table-responsive-sd table-center mx-5 mt-3"
            >
                <table
                    className="table table-bordered border-dark table-primary text-center"
                ><caption className='caption-top text-center fw-bold'
                style={{fontSize:"24px"}}>Product List (Total : {totalProducts})</caption>
                    <thead>
                        <tr>
                            <th scope="col">ProductId</th>
                            <th scope="col">ProductName</th>
                            <th scope="col">CategoryId</th>
                            <th scope="col">CategoryName</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((p) => (
                            <tr className="" key={p.productId}>
                                <td scope="row">{p.productId}</td>
                                <td>{p.productName}</td>
                                <td>{p.categoryId}</td>
                                <td>{p.categoryName}</td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className='text-center m-2'>
                <button
                    type="button"
                    className="btn btn-primary m-1"
                    disabled={page === 1} onClick={() => { setPage(page - 1) }}
                >
                    Previous
                </button>
                <span>
                    Page {page} of {totalPages}
                </span>
                <button
                    type="button"
                    className="btn btn-primary m-1"
                    disabled={page === totalPages} onClick={() => { setPage(page + 1) }}
                >
                    Next
                </button>


            </div>

        </div>
    )
}

export default ProductsList
