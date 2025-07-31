import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RingLoader } from "react-spinners";
import { db, styleObj } from "../Firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Home(){
  const[data,setData]=useState([]);
  const[load,setLoad]=useState(true);

  setTimeout(() => {
    setLoad(false);
  }, 500);

  useEffect(() => {
    getCategories();
}, []);

const getCategories = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "categories"));
      const categories = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }));
      setData(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
    return(
        <>
    <RingLoader loading={load} cssOverride={styleObj} size={100} color={"purple"}/>
    <div className={load?"d-none":""}>
    <main>
  {/*? slider Area Start*/}
  <section className="slider-area ">
    <div className="slider-active">
      {/* Single Slider */}
      <div className="single-slider slider-height d-flex align-items-center">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-7 col-md-12">
              <div className="hero__caption">
                <h1 data-animation="fadeInLeft" data-delay="0.2s">
                  Aptitude Preparation
                  <br /> platform
                </h1>
                <p data-animation="fadeInLeft" data-delay="0.4s">
                  Master quantitative, logical reasoning, and verbal ability with step-by-step guidance.
                </p>
                <Link
                  to={"/register"}
                  className="btn hero-btn"
                  data-animation="fadeInLeft"
                  data-delay="0.7s"
                >
                  Join for Free
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* ? services-area */}
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
   {/*? top subjects Area Start */}
   <div className="topic-area mt-5">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-xl-7 col-lg-8">
        <div className="section-tittle text-center mb-55">
            <h2>Categories</h2>
          </div>
        </div>
      </div>
      <div className="row">
        {data.slice(0, 9).map((el)=>(
          <>
          <div className="col-lg-4 col-md-4 col-sm-6">
          <div className="single-topic text-center mb-30">
            <div className="topic-img">
              <img src={el.imageUrl} alt="" height={200} />
              <div className="topic-content-box">
                <div className="topic-content">
                  <h3>
                    <Link to={`/questions/${el.id}`}>{el?.categoryName}</Link>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
          </>
        ))}
        
      </div>
     
    </div>
  </div>
  {/* top subjects End */}
  <>
  {/* Courses area start */}
  <div className="courses-area section-padding40 fix">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-xl-7 col-lg-8">
          <div className="section-tittle text-center mb-55">
            <h2>Our Tutorials</h2>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6">
          <div className="properties properties2 mb-30">
            <div className="properties__card">
              <div className="">
                <a href="#">
                <iframe width="100%" height="315" src="https://www.youtube.com/embed/jAbpPTpz2bQ?si=8GIAXVQutO6QGYpV" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </a>
              </div>
              <div className="properties__caption">
               
                <h3>
                  <a href="#">Quantitative Aptitude</a>
                </h3>
                
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="properties properties2 mb-30">
            <div className="properties__card">
              <div className="">
                <a href="#">
                <iframe width="100%" height="315" src="https://www.youtube.com/embed/jAbpPTpz2bQ?si=8GIAXVQutO6QGYpV" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </a>
              </div>
              <div className="properties__caption">
              
                <h3>
                  <a href="#">Logical Reasoning</a>
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="properties properties2 mb-30">
            <div className="properties__card">
              <div className="">
                <a href="#">
                <iframe width="100%" height="315" src="https://www.youtube.com/embed/jAbpPTpz2bQ?si=8GIAXVQutO6QGYpV" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </a>
              </div>
              <div className="properties__caption">
              
                <h3>
                  <a href="#">Train Problems</a>
                </h3>
               
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="properties properties2 mb-30">
            <div className="properties__card">
              <div className="">
                <a href="#">
                <iframe width="100%" height="315" src="https://www.youtube.com/embed/jAbpPTpz2bQ?si=8GIAXVQutO6QGYpV" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </a>
              </div>
              <div className="properties__caption">
              
                <h3>
                  <a href="#">Date and Time Problems</a>
                </h3>
                
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6 offset-md-4">
        <Link to={"/login"} className="btn">
             For More Tutorials Please Login
            </Link>
        </div>
      </div>

    </div>
  </div>
  {/* Courses area End */}
</>

 
 
  {/*? About Area-3 Start */}
<section className="about-area3 fix">
  <div className="support-wrapper align-items-center">
    <div className="right-content3">
      {/* img */}
      <div className="right-img">
        <img src="assets/img/gallery/about3.png" alt="Aptitude Learning" />
      </div>
    </div>
    <div className="left-content3">
      {/* section title */}
      <div className="section-tittle section-tittle2 mb-20">
        <div className="front-text">
          <h2 className="">What you’ll achieve with AptitudePrep</h2>
        </div>
      </div>
      <div className="single-features">
        <div className="features-icon">
          <img src="assets/img/icon/right-icon.svg" alt="" />
        </div>
        <div className="features-caption">
          <p>
            Master quantitative, logical reasoning, and verbal ability with step-by-step guidance.
          </p>
        </div>
      </div>
      <div className="single-features">
        <div className="features-icon">
          <img src="assets/img/icon/right-icon.svg" alt="" />
        </div>
        <div className="features-caption">
          <p>
            Practice real-time mock tests and track your progress with detailed analytics.
          </p>
        </div>
      </div>
      <div className="single-features">
        <div className="features-icon">
          <img src="assets/img/icon/right-icon.svg" alt="" />
        </div>
        <div className="features-caption">
          <p>
            Join thousands of learners preparing for competitive exams with AptitudePrep’s smart tools.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
{/* About Area End */}


{/*? About Area-2 Start */}
<section className="about-area2 fix pb-padding">
  <div className="support-wrapper align-items-center">
    <div className="right-content2">
      {/* img */}
      <div className="right-img">
        <img src="assets/img/gallery/about2.png" alt="Join AptitudePrep" />
      </div>
    </div>
    <div className="left-content2">
      {/* section title */}
      <div className="section-tittle section-tittle2 mb-20">
        <div className="front-text">
          <h2 className="">
            Start your aptitude journey with AptitudePrep today.
          </h2>
          <p>
            Prepare for placement tests, government exams, and competitive assessments with expertly curated content, timed quizzes, and concept-wise practice sets.
          </p>
          <Link to={"/register"} className="btn">
            Join now for Free
          </Link>
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