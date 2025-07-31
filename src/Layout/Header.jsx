import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Header(){
  const [user, setUser] = useState(null);
  const auth = getAuth();
  const nav = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [auth]);

  const handleLogout = async () => {
    try {
      
      await signOut(auth);
      toast.success("Logout Successfull",{
        position:"top-center"
      })
      setTimeout(() => {
        nav("/")
      }, 1000);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };
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
              <div className="logo d-flex">
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
                       <Link to={"/"}>Home</Link>
                      </li>
                      <li>
                       <Link to={"/about"}>About</Link>
                      </li>
                      <li>
                       <Link to={"/categories"}>Categories</Link>
                      </li>
                      <li>
                       <Link to={"/contact"}>Contact</Link>
                      </li>
                      {user ? (
                        <>
                         <li>
                       <Link to={"/feedback"}>Leave Feedback</Link>
                      </li>
                      <li className="button-header">
                       <Link onClick={handleLogout} className="btn btn3">
                          Logout
                        </Link>
                      </li>
                      </>):(
                        <>
                         <li>
                       <Link to={"/register"}>Register</Link>
                      </li>
                      {/* Button */}
                      <li className="button-header margin-left ">
                       <Link to={"/login"} className="btn">
                          User Login
                        </Link>
                      </li>
                      <li className="button-header">
                       <Link to={"/adminlogin"} className="btn btn3">
                          Admin Login
                        </Link>
                      </li>
                        </>
                      )}
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