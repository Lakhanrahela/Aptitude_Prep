import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { RingLoader } from "react-spinners";
import { db, styleObj } from "../Firebase";

export default function Contact(){
  const[name,setName]=useState("");
  const[email,setEmail]=useState("");
  const[subject,setSubject]=useState("");
  const[message,setMessage]=useState("");
  const[load,setLoad]=useState(true);

  setTimeout(() => {
    setLoad(false);
  }, 500);

  const addQuery = async (e) => {
    e.preventDefault();
    setLoad(true);
    try {
      let newQuery = {
        name,
        email,
        subject,
        message,
        status:"Active",
        createdAt: serverTimestamp()
      };
      const queryRef = collection(db, "queries");
      await addDoc(queryRef,newQuery);

       setTimeout(() => {
        setLoad(false);
       }, 2000);
      toast.success("Message Sent Successfully", {
        position: "top-center"
      });
    } catch (error) {
      toast.error("Something went wrong", {
        position: "top-center"
      });
      setTimeout(() => {
        setLoad(false);
      }, 2000);
      console.log(error);
    }
  };
    return(
        <>
         <RingLoader loading={load} cssOverride={styleObj} size={100} color={"purple"}/>
         <div className={load?"d-none":""}>
        <main>
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
                  Contact us
                </h1>
                {/* breadcrumb Start*/}
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="index.html">Home</a>
                    </li>
                    <li className="breadcrumb-item">
                      <a href="#">Contact</a>
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
  {/*?  Contact Area start  */}
  <section className="contact-section">
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h2 className="contact-title">Get in Touch</h2>
        </div>
        <div className="col-lg-8">
          <form
            className="form-contact contact_form"
            onSubmit={addQuery}
          >
            <div className="row">
             
              <div className="col-sm-6">
                <div className="form-group">
                  <input
                    className="form-control valid"
                    name="name"
                    id="name"
                    type="text"
                    onfocus="this.placeholder = ''"
                    onblur="this.placeholder = 'Enter your name'"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e)=>{setName(e.target.value)}}
                    required
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <input
                    className="form-control valid"
                    name="email"
                    id="email"
                    type="email"
                    onfocus="this.placeholder = ''"
                    onblur="this.placeholder = 'Enter email address'"
                    placeholder="Email"
                    value={email} onChange={(e)=>{setEmail(e.target.value)}}
                    required
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="form-group">
                  <input
                    className="form-control"
                    name="subject"
                    id="subject"
                    type="text"
                    onfocus="this.placeholder = ''"
                    onblur="this.placeholder = 'Enter Subject'"
                    placeholder="Enter Subject"
                    value={subject} onChange={(e)=>{setSubject(e.target.value)}}  required
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="form-group">
                  <textarea
                    className="form-control w-100"
                    name="message"
                    id="message"
                    cols={30}
                    rows={9}
                    onfocus="this.placeholder = ''"
                    onblur="this.placeholder = 'Enter Message'"
                    placeholder=" Enter Message"
                    defaultValue={""}
                    value={message}
                    onChange={(e)=>{setMessage(e.target.value)}}  required
                  />
                </div>
              </div>
            </div>
            <div className="form-group mt-3">
              <button
                type="submit"
                className="button button-contactForm boxed-btn"
              >
                Send
              </button>
            </div>
          </form>
        </div>
        <div className="col-lg-3 offset-lg-1">
          <div className="media contact-info">
            <span className="contact-info__icon">
              <i className="ti-home" />
            </span>
            <div className="media-body">
              <h3>Buttonwood, California.</h3>
              <p>Rosemead, CA 91770</p>
            </div>
          </div>
          <div className="media contact-info">
            <span className="contact-info__icon">
              <i className="ti-tablet" />
            </span>
            <div className="media-body">
              <h3>+1 253 565 2365</h3>
              <p>Mon to Fri 9am to 6pm</p>
            </div>
          </div>
          <div className="media contact-info">
            <span className="contact-info__icon">
              <i className="ti-email" />
            </span>
            <div className="media-body">
              <h3>support@colorlib.com</h3>
              <p>Send us your query anytime!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* Contact Area End */}
</main>
</div>
<ToastContainer/>
        </>
    )
}