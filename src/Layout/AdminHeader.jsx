import { Link, useNavigate } from "react-router-dom";
import { auth } from "../Firebase";
import { toast } from "react-toastify";

export default function AdminHeader(){
  const nav = useNavigate();

  const handleLogout=async ()=>{
    try{
      await auth.signOut();
      toast.success("LOGOUT SUCCESSFULLY")
      setTimeout(() => {
        nav("/")
      }, 500);
    }
    catch(error){
      console.log("Error in logging out",error);
    }
  }
    return(
        <>
        <header>
  {/* Header Start */}
  <div className="header-area header-transparent">
    <div className="main-header ">
      <div className="header-bottom  header-sticky">
        <div className="container-fluid">
          <div className="row align-items-center">
            {/* Logo */}
            <div className="col-xl-2 col-lg-2">
              <div className="logo">
                <a href="index.html" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <img src="assets/img/logo/adaptation.png" height={50} alt="Logo" style={{ marginRight: "10px" }} />
          <h1 className="text-light" style={{ margin: 0, fontSize: "24px" }}>APTITUDEPREP</h1>
        </a>

              </div>
            </div>
            <div className="col-xl-10 col-lg-10">
              <div className="menu-wrapper d-flex align-items-center justify-content-end">
                {/* Main-menu */}
                <div className="main-menu d-none d-lg-block">
                  <nav>
                    <ul id="navigation">
                      <li className="active">
                       <Link to={"/admin"}>Dashboard</Link>
                      </li>
                      <li>
                       <Link href="#">Categories</Link>
                        <ul className="submenu">
                          <li>
                           <Link to={"/admin/addcategories"}>Add Categories</Link>
                          </li>
                          <li>
                           <Link to={"/admin/managecategories"}>Manage Categories</Link>
                          </li>
                        </ul>
                      </li>
                      <li>
                       <Link href="#">Questions</Link>
                        <ul className="submenu">
                          <li>
                           <Link to={"/admin/addquestions"}>Add Questions</Link>
                          </li>
                          <li>
                           <Link to={"/admin/managequestions"}>Manage Questions</Link>
                          </li>
                        </ul>
                      </li>
                       <li>
                       <Link href="#">Tutorials</Link>
                        <ul className="submenu">
                          <li>
                           <Link to={"/admin/addtutorials"}>Add Tutorials</Link>
                          </li>
                          <li>
                           <Link to={"/admin/managetutorials"}>Manage Tutorials</Link>
                          </li>
                        </ul>
                      </li>
                      <li>
                       <Link to={"/admin/viewfeedback"}>Feedback</Link>
                      </li>
                      <li>
                       <Link to={"/admin/queries"}>Customer Queries</Link>
                      </li>
                      {/* Button */}
                      <li className="button-header">
                       <Link onClick={handleLogout} className="btn btn3">
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
            {/* Mobile Menu */}
            <div className="col-12">
              <div className="mobile_menu d-block d-lg-none" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Header End */}
</header>

        </>
    )
}