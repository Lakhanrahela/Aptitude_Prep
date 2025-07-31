import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db, styleObj } from "../Firebase";
import { RingLoader } from "react-spinners";


export default function Dashboard(){
  const [queryCount, setQueryCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [feedbackCount, setFeedbackCount] = useState(0);
  const[load,setLoad]=useState(true);

  setTimeout(() => {
    setLoad(false);
  }, 500);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const queriesSnapshot = await getDocs(collection(db, 'queries'));
        setQueryCount(queriesSnapshot.size);

        const categoriesSnapshot = await getDocs(collection(db, 'categories'));
        setCategoryCount(categoriesSnapshot.size);

        const questionsSnapshot = await getDocs(collection(db, 'questions'));
        setQuestionCount(questionsSnapshot.size);

        const feedbacksSnapshot = await getDocs(collection(db, 'feedbacks'));
        setFeedbackCount(feedbacksSnapshot.size);
      } catch (error) {
        console.error("Error fetching document counts: ", error);
      }
    };

    fetchCounts();
  }, []);
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
                  WELCOME ADMIN!!
                </h1>
                {/* breadcrumb Start*/}
               
                {/* breadcrumb End */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div className="services-area services-area2 section-padding40">
    <div className="container">
      <div className="row justify-content-sm-center">
        <div className="col-lg-5 col-md-6 col-sm-8 p-5" style={{border:"5px solid slateblue",borderRadius:"30px"}}>
          <div className="single-services mb-30">
            <div className="features-icon">
              <img src="assets/img/icon/menu.png" alt="" height={60} />
            </div>
            <div className="features-caption">
              <h3>Total Categories</h3>
              <h1>{categoryCount}</h1>
            </div>
          </div>
        </div>
        <div className="col-lg-5 offset-lg-1 col-md-6 col-sm-8 p-5 " style={{border:"5px solid slateblue",borderRadius:"30px"}}>
          <div className="single-services mb-30">
            <div className="features-icon">
              <img src="assets/img/icon/ask.png" alt="" height={60} />
            </div>
            <div className="features-caption">
              <h3>Total Questions</h3>
              <h1>{questionCount}</h1>
            </div>
          </div>
        </div>
        <div className="col-lg-5 col-md-6 col-sm-8 p-5 mt-5" style={{border:"5px solid slateblue",borderRadius:"30px"}}>
          <div className="single-services mb-30">
            <div className="features-icon">
              <img src="assets/img/icon/testimonial.png" alt="" height={70} />
            </div>
            <div className="features-caption">
              <h3>Total Feedbacks</h3>
             <h1>{feedbackCount}</h1>
            </div>
          </div>
        </div>
        <div className="col-lg-5 offset-lg-1 col-md-6 col-sm-8 p-5 mt-5" style={{border:"5px solid slateblue",borderRadius:"30px"}}>
          <div className="single-services mb-30">
            <div className="features-icon">
              <img src="assets/img/icon/question.png" alt="" height={60} />
            </div>
            <div className="features-caption">
              <h3>Total Queries</h3>
            <h1> {queryCount}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
 
</main>
</div>
        </>
    )
}