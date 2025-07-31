import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { toast} from "react-toastify";
import { auth, googleProvider, styleObj } from "../Firebase";
import GoogleButton from "react-google-button";
import { RingLoader } from "react-spinners";


export default function Login(){
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const[load,setLoad]=useState(false);
  const nav = useNavigate();

 useEffect(() => {
        setLoad(true)

        setTimeout(() => {
          setLoad(false)
        }, 1000);
      }, [])

  const handleLogin=async (e)=>{
    e.preventDefault();
    setLoad(true);
    if( email==="" || password===""){
      toast.error("all fields are mandatory",{
        position:"top-center"
      })
  }
  else{
  try{
    if(email==="admin@gmail.com"){
      toast.error("you are not allowed to access admin pannel")
      setTimeout(() => {
        setLoad(false);
        nav("/login")
      }, 500);
    } else{
      await signInWithEmailAndPassword(auth,email,password);
      toast.success("Login Successfull",{
        position:"top-center"
      })
      setTimeout(() => {
        setLoad(false);
        nav("/")
      }, 1000);
    }   
  }
  catch(error){
     toast.error("Inavalid Credentials!!",{
      position:"top-center"
     }) 
     setTimeout(() => {
      setLoad(false);
     }, 1000);
     console.log(error);
  }
}
}
const handleGoogleLogin = async()=>{
  try{
    await signInWithPopup(auth,googleProvider);
    toast.success("Login sucessfull",{
      position:"top-center"
    })
    setTimeout(() => {
      nav("/")
    }, 500);
  }
  catch(error){
    toast.error("Try Again!!",{
      position:"top-center"
    })
    console.log(error)
  }
}

    return(
        <>
         <RingLoader loading={load} cssOverride={styleObj} size={100} color={"purple"}/>
         <div className={load?"d-none":""}>
         <section className="slider-area slider-area2">
    <div className="slider-active">
      {/* Single Slider */}
      <div className="single-slider slider-height2">
        <div className="container">
          <div className="row">
            <div className="col-xl-8 col-lg-11 col-md-12">
              <div className="hero__caption hero__caption2">
                <h1 data-animation="bounceIn" data-delay="0.2s">
                  User Login
                </h1>
                {/* breadcrumb Start*/}
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="index.html">Home</a>
                    </li>
                    <li className="breadcrumb-item">
                      <a href="#">User Login</a>
                    </li>
                  </ol>
                </nav>
                {/* breadcrumb End */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
        <main className="login-body" data-vide-bg="assets/img/login-bg.mp4">
  {/* Login Admin */}
  <form className="form-default" onSubmit={handleLogin}>
    <div className="login-form">
      {/* logo-login */}
      <div className="logo-login">
        <a href="index.html">
          <img src="assets/img/logo/loder.png" alt="" />
        </a>
      </div>
      <h2>Login Here</h2>
      <div className="form-input">
        <label htmlFor="name">Email</label>
        <input type="email" name="email" placeholder="Email"
        value={email} onChange={(e)=>{setEmail(e.target.value)}}  required />
      </div>
      <div className="form-input">
        <label htmlFor="name">Password</label>
        <input type="password" name="password" placeholder="Password" 
        value={password} onChange={(e)=>{setPassword(e.target.value)}}  required
        />
      </div>
      <div className="form-input pt-30">
       <button type="submit" className="btn btn-primary w-100">Login</button>
      </div>
      <div className="col-md-12">
                <p className='text-center mb-3'>OR</p>
            <div className='offset-md-2 mt-3'>
              <GoogleButton onClick={handleGoogleLogin}/>
            </div>
            <p className='mt-5'>
              Don't have an account?
              <span className='text-dark fw-bolder'>
                <Link to={"/register"}>Create New Account</Link>
              </span>
            </p>
                </div>
    </div>
  </form>
  {/* /end login form */}
</main>
</div>

        </>
    )
}