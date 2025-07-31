import { RingLoader } from "react-spinners";
import { useState } from "react";
import { styleObj } from "../Firebase";

export default function About(){
  const[load,setLoad]=useState(true);
  setTimeout(() => {
    setLoad(false);
  }, 500);
  
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
                  About us
                </h1>
                {/* breadcrumb Start*/}
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="index.html">Home</a>
                    </li>
                    <li className="breadcrumb-item">
                      <a href="#">about</a>
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
  <div className="services-area">
    <div className="container">
      <div className="row justify-content-sm-center">
        <div className="col-lg-4 col-md-6 col-sm-8">
          <div className="single-services mb-30">
            <div className="features-icon">
              <img src="assets/img/icon/icon1.svg" alt="" />
            </div>
            <div className="features-caption">
              <h3>60+ Categories</h3>
              <p>More than 60 categories available for preparing Topics of aptittude</p>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-8">
          <div className="single-services mb-30">
            <div className="features-icon">
              <img src="assets/img/icon/icon2.svg" alt="" />
            </div>
            <div className="features-caption">
              <h3>500+ Questions</h3>
              <p>More than 500 questions available for preparing Topics of aptittude</p>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-8">
          <div className="single-services mb-30">
            <div className="features-icon">
              <img src="assets/img/icon/icon3.svg" alt="" />
            </div>
            <div className="features-caption">
              <h3>Life time access</h3>
              <p>Life time acess to all the content</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/*? About Area-1 Start */}
  <section className="about-area1 fix pt-10 p-3 mb-5">
    <div className="support-wrapper align-items-center">
      <div className="left-content1">
        <div className="about-icon">
          <img src="assets/img/icon/about.svg" alt="" />
        </div>
        {/* section tittle */}
        <div className="section-tittle section-tittle2 mb-55">
          <div className="front-text">
            <h2 className="">Learn new skills online with top educators</h2>
            <p>
              The automated process all your website tasks. Discover tools and
              techniques to engage effectively with vulnerable children and
              young people.
            </p>
          </div>
        </div>
        <div className="single-features">
          <div className="features-icon">
            <img src="assets/img/icon/right-icon.svg" alt="" />
          </div>
          <div className="features-caption">
            <p>
              Techniques to engage effectively with vulnerable children and
              young people.
            </p>
          </div>
        </div>
        <div className="single-features">
          <div className="features-icon">
            <img src="assets/img/icon/right-icon.svg" alt="" />
          </div>
          <div className="features-caption">
            <p>
              Join millions of people from around the world learning together.
            </p>
          </div>
        </div>
        <div className="single-features">
          <div className="features-icon">
            <img src="assets/img/icon/right-icon.svg" alt="" />
          </div>
          <div className="features-caption">
            <p>
              Join millions of people from around the world learning together.
              Online learning is as easy and natural.
            </p>
          </div>
        </div>
      </div>
      <div className="right-content1">
        {/* img */}
        <div className="right-img">
          <img src="assets/img/gallery/about.png" alt="" />
          <div className="video-icon">
            <a
              className="popup-video btn-icon"
              href="https://www.youtube.com/watch?v=up68UAfH0d0"
            >
              <i className="fas fa-play" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* About Area End */}
  
  
 
</main>
</div>

        </>
    )
}