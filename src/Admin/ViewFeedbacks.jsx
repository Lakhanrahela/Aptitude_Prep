import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import { RingLoader } from "react-spinners";
import { styleObj, db } from "../Firebase";
import { getDocs, collection } from "firebase/firestore";

export default function ViewFeedbacks() {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoad(false);
    }, 1000);

    getFeedbacks();

    return () => clearTimeout(timer);
  }, []);

  const getFeedbacks = async () => {
    try {
      const userSnapshot = await getDocs(collection(db, "users"));
      const feedbackSnapshot = await getDocs(collection(db, "feedbacks"));

      const users = userSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      const feedbacks = feedbackSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));

      const joinedData = feedbacks.map(feedbackData => {
        const userData = users.find(user => user.uid === feedbackData.userId);
        return {
          ...feedbackData,
          user: userData
        };
      });

      setData(joinedData);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
      toast.error("Failed to fetch data");
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <span key={i} style={{ color: i < rating ? 'gold' : 'lightgray', fontSize: "1.5rem" }}>
        ★
      </span>
    ));
  };

  return (
    <>
      <RingLoader loading={load} cssOverride={styleObj} size={100} color={"purple"} />
      <div className={load ? "d-none" : ""}>
        <main>
          {/*? slider Area Start*/}
          <section className="slider-area slider-area2">
            <div className="slider-active">
              <div className="single-slider slider-height2">
                <div className="container">
                  <div className="row">
                    <div className="col-xl-8 col-lg-11 col-md-12">
                      <div className="hero__caption hero__caption2">
                        <h1 data-animation="bounceIn" data-delay="0.2s">View Feedbacks</h1>
                        <nav aria-label="breadcrumb">
                          <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                              <a href="index.html">Dashboard</a>
                            </li>
                            <li className="breadcrumb-item">
                              <a href="#">View Feedbacks</a>
                            </li>
                          </ol>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Feedbacks Table */}
          <div className="services-area services-area2 section-padding40">
            <div className="container">
              <div className="row justify-content-sm-center">
                <div className="col-lg-12 col-md-12 col-sm-8">
                  <div className="section-top-border">
                    <div className="row">
                      <div className="col-lg-12 col-md-12 p-5" style={{ border: "4px solid purple", boxShadow: "10px 10px 8px purple" }}>
                        <h1 className="mb-30 text-center">View Feedbacks</h1>
                        <div className="table-responsive">
                          <table className="table table-bordered">
                            <thead>
                              <tr>
                                <th scope="col">Sr No.</th>
                                <th scope="col">User Details</th>
                                <th scope="col">Feedback</th>
                                <th scope="col">Rating</th>
                              </tr>
                            </thead>
                            <tbody>
                              {data?.map((el, index) => (
                                <tr key={el.id}>
                                  <th scope="row">{index + 1}</th>
                                  <td>
                                    <ul className="list-unstyled">
                                      <li><span className="text-info">Name:</span> {el?.user?.name}</li>
                                      <li><span className="text-info">Email:</span> {el.user?.email}</li>
                                      <li><span className="text-info">Contact:</span> {el.user?.contact}</li>
                                      <li><span className="text-info">Address:</span> {el.user?.address}</li>
                                    </ul>
                                  </td>
                                  <td>{el?.feedback}</td>
                                  <td>{renderStars(el?.rating || 0)}</td>
                                  
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <ToastContainer />
    </>
  );
}
