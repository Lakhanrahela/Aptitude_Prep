import { createUserWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth, db, styleObj } from "../Firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { RingLoader } from "react-spinners";

export default function Register(){
  const[name,setName]=useState("");
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const[contact,setContact]=useState("");
  const[address,setAddress]=useState("");
  const[load,setLoad]=useState(false);
  const nav = useNavigate();

 useEffect(() => {
        setLoad(true)
    
        setTimeout(() => {
          setLoad(false)
        }, 500);
      }, [])

  const handleRegister=async (e)=>{
    e.preventDefault();
    setLoad(true);
    if(name==="" || email==="" || password==="" || contact==="" || address===""){
      toast.error("All fileds are required!!",{
        position:"top-center"
      })
    }
    else if(password.length<6){
      toast.error("Password must contain atleast 6 characters!!",{
        position:"top-center"
      })
    }
    else{
      try{
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredentials.user;

        const newUser={
          name,
          email,
          password,
          contact,
          address,
          uid: user.uid,
          status:"Active",
          created_at:serverTimestamp()
        }
        const userRef= doc(db,"users",user.uid)
        await setDoc(userRef,newUser)

        setTimeout(() => {
          setLoad(false);
        }, 1000);
        toast.success('User Registered Successfully',{
          position:"top-center"
        })
        setTimeout(() => {
          nav("/")
        }, 1000);
      }
      catch(error){
        toast.error("Invalid Credentails",{
          position:"top-center"
        })
        setTimeout(() => {
          setLoad(false);
        }, 1000);
        console.log(error);
      }
    }
  }

    return(
        <>
         <RingLoader loading={load} cssOverride={styleObj} size={100} color={"purple"}/>
         <div className={load?"d-none":""}>
         {/*? slider Area Start*/}
  <section className="slider-area slider-area2">
    <div className="slider-active">
      {/* Single Slider */}
      <div className="single-slider slider-height2">
        <div className="container">
          <div className="row">
            <div className="col-xl-8 col-lg-11 col-md-12">
              <div className="hero__caption hero__caption2">
                <h1 data-animation="bounceIn" data-delay="0.2s">
                  User Register
                </h1>
                {/* breadcrumb Start*/}
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="index.html">Home</a>
                    </li>
                    <li className="breadcrumb-item">
                      <a href="#">Register</a>
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
    <main className="login-body">
  {/* Login Admin */}
  <form className="form-default" onSubmit={handleRegister}>
    <div className="login-form mt-5">
      {/* logo-login */}
      <div className="logo-login">
        <a href="index.html">
          <img src="assets/img/logo/loder.png" alt="" />
        </a>
      </div>
      <h2>Registration Here</h2>
      <div className="form-input">
        <label htmlFor="name">Name</label>
        <input type="text" name="name" placeholder="Your name"
        value={name} onChange={(e)=>{setName(e.target.value)}} />
      </div>
      <div className="form-input">
        <label htmlFor="name">Email Address</label>
        <input type="email" name="email" placeholder="Your Email" 
        value={email} onChange={(e)=>{setEmail(e.target.value)}} />
      </div>
      <div className="form-input">
        <label htmlFor="name">Password</label>
        <input type="password" name="password" placeholder="Please Enter atleast 6 characters"
        value={password} onChange={(e)=>{setPassword(e.target.value)}} />
      </div>
      <div className="form-input">
        <label htmlFor="name">Contact</label>
        <input type="text" name="password" placeholder="Your Contact" pattern="\d{10}"
        value={contact} onChange={(e)=>{setContact(e.target.value)}}/>
      </div>
      <div className="form-input">
        <label htmlFor="name">Address</label>
        <input type="text" name="password" placeholder="Your Address"
        value={address} onChange={(e)=>setAddress(e.target.value)} />
      </div>
      <div className="form-input pt-30">
      <button type="submit" className="btn btn-primary">Register</button>
      </div>
      {/* Forget Password */}
      <Link to={"/login"} className="registration">
        login
      </Link>
    </div>
  </form>
  {/* /end login form */}
</main>
</div>

        </>
    )
}