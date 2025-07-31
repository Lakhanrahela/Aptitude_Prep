import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db, styleObj } from "../Firebase"; // Ensure your Firebase config is correct
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RingLoader } from "react-spinners";

export default function CustomerQueries() {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    getQueries();
  }, []);

  const getQueries = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "queries"));
      const queryData = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }));
      setData(queryData);
    } catch (error) {
      console.error("Error fetching queries:", error);
      toast.error("Failed to load queries.");
    } finally {
      setLoad(false);
    }
  };
  const handleReply = (email, subject, message) => {
        const gmailURL = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
        window.open(gmailURL, '_blank');
    };

  return (
    <>
      <RingLoader loading={load} cssOverride={styleObj} size={100} color={"purple"} />
      <div className={load ? "d-none" : ""}>
        <main>
          {/* Slider Area Start */}
          <section className="slider-area slider-area2">
            <div className="slider-active">
              <div className="single-slider slider-height2">
                <div className="container">
                  <div className="row">
                    <div className="col-xl-8 col-lg-11 col-md-12">
                      <div className="hero__caption hero__caption2">
                        <h1 data-animation="bounceIn" data-delay="0.2s">
                          Customer Queries
                        </h1>
                        <nav aria-label="breadcrumb">
                          <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                              <a href="/admin_dashboard">Dashboard</a>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">
                              Customer Queries
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

          {/* Table Area */}
          <div className="services-area services-area2 section-padding40">
            <div className="container">
              <div className="row justify-content-sm-center">
                <div className="col-lg-12 col-md-12 col-sm-8">
                  <div className="section-top-border">
                    <div className="row">
                      <div
                        className="col-lg-12 col-md-12 p-5"
                        style={{
                          border: "4px solid purple",
                          boxShadow: "10px 10px 8px purple"
                        }}
                      >
                        <h1 className="mb-30 text-center">Customer Queries</h1>
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th scope="col">Sr No.</th>
                              <th scope="col">Name</th>
                              <th scope="col">Email</th>
                              <th scope="col">Subject</th>
                              <th scope="col">Query</th>
                              <th scope="col">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.map((el, index) => (
                              <tr key={el.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{el.name}</td>
                                <td>{el.email}</td>
                                <td>{el.subject}</td>
                                <td>{el.message}</td>
                                <td>
                                  <a
                                    href={`mailto:${el.email}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <button
                                      className="btn"
                                      style={{ backgroundColor: "dodgerblue", color: "white" }}
                                      onClick={() => handleReply(el?.email, el?.subject, el?.message)}
                                    >
                                      Reply
                                    </button>
                                  </a>
                                </td>
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
        </main>
      </div>
      <ToastContainer />
    </>
  );
}
