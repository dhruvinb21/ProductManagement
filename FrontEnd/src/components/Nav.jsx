import { NavLink } from 'react-router-dom'

const Nav = () => {

  return (
    <nav
        className="navbar navbar-expand navbar-dark bg-dark"
    >
        <div className="container">
            <NavLink className="navbar-brand d-flex align-items-center gap-2 fw-bold fs-4" to="/home"><img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7qIikYE6BsU-MtXOts3wgS7JOEn879-G410vodspdfIfLVW92U13WA31DJe7eGTrftr0&usqp=CAU"
                class="img-fluid rounded-circle border border-2 border-primary"
                alt=""
                width={40}
                style={{background:"#fff"}}
            /> <span>Inventory</span>
            </NavLink>
            <button
                className="navbar-toggler d-lg-none"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapsibleNavId"
                aria-controls="collapsibleNavId"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="collapsibleNavId">
                <ul className="navbar-nav me-auto mt-2 mt-lg-0 ">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/home" aria-current="page"
                            >Home
                           </NavLink >
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/manageCategory">Manage-Category</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/manageProduct">Manage-Product</NavLink>
                    </li>
                    
                </ul>
               
            </div>
        </div>
    </nav>
    
  )
}

export default Nav
