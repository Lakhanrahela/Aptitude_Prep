import { useState } from "react"
import { toast } from "react-toastify";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { RingLoader } from "react-spinners";
import { db, styleObj } from "../Firebase";
import { addDoc, collection, Timestamp } from "firebase/firestore";

export default function Feedback() {
  const [feedback, setFeedback] = useState("");
  const [load, setLoad] = useState(true);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);

  const nav = useNavigate();

  setTimeout(() => {
    setLoad(false);
  }, 500);

  const addFeedbacks = async (e) => {
    e.preventDefault();
    setLoad(true);
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        toast.error("User not authenticated, please login first!", {
          position: "top-center"
        });
        setLoad(false);
        return;
      }

      const userId = user.uid;

      const newFeedback = {
        feedback,
        rating,
        userId,
        status: "Active",
        created_at: Timestamp.now()
      };

      const feedbackRef = collection(db, "feedbacks");
      await addDoc(feedbackRef, newFeedback);

      setTimeout(() => {
        setLoad(false);
      }, 2000);

      toast.success('Thanks for your Feedback!', {
        position: "top-center"
      });

      setFeedback("");
      setRating(0);
      setHover(null);
    } catch (error) {
      toast.error("Something went wrong, please try later!", {
        position: "top-center"
      });
      setTimeout(() => {
        setLoad(false);
      }, 2000);
      console.log("the error is:", error);
    }
  };

  return (
    <>
      <RingLoader loading={load} cssOverride={styleObj} size={100} color={"purple"} />
      <div className={load ? "d-none" : ""}>
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
                          Leave a Feedback
                        </h1>
                        {/* breadcrumb Start*/}
                        <nav aria-label="breadcrumb">
                          <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                              <a href="index.html">Dashboard</a>
                            </li>
                            <li className="breadcrumb-item">
                              <a href="#">Leave a Feedback</a>
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

          {/* Feedback Form Area */}
          <div className="services-area services-area2 section-padding40">
            <div className="container">
              <div className="row justify-content-sm-center">
                <div className="col-lg-12 col-md-12 col-sm-8">
                  <div className="section-top-border">
                    <div className="row">
                      <div className="col-lg-8 col-md-8 p-5 offset-md-2"
                        style={{ border: "4px solid purple", boxShadow: "10px 10px 8px purple" }}>
                        <h1 className="mb-30 text-center">Leave A Feedback</h1>
                        <form className="p-5" onSubmit={addFeedbacks}>
                          <div className="mt-10">
                            <label>Your Feedback Please</label>
                            <textarea
                              placeholder="Your feedback here"
                              onFocus={(e) => e.target.placeholder = ''}
                              onBlur={(e) => e.target.placeholder = 'Your feedback here'}
                              required
                              className="single-input"
                              value={feedback}
                              onChange={(e) => setFeedback(e.target.value)}
                            ></textarea>
                          </div>

                          {/* ⭐ Star Rating */}
                          <div className="mt-4 text-center">
                            <label className="mb-2">Rate Us</label>
                            <div>
                              {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                  key={star}
                                  className="mx-1"
                                  style={{
                                    fontSize: "2rem",
                                    color: (hover || rating) >= star ? "gold" : "gray",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => setRating(star)}
                                  onMouseEnter={() => setHover(star)}
                                  onMouseLeave={() => setHover(null)}
                                >
                                  ★
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="mt-4 offset-md-4">
                            <button type="submit" className="btn btn-primary w-50">Send</button>
                          </div>
                        </form>
                      </div>
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
