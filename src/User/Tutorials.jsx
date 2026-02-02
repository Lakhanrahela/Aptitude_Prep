import { RingLoader } from "react-spinners";
import { useState, useEffect } from "react";
import {  db, auth, styleObj } from "../Firebase";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";

export default function Tutorials() {
  const [load, setLoad] = useState(true);
  const [tutorials, setTutorials] = useState([]);
  const { id } = useParams(); 

  const navigate = useNavigate();

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (!user) {
      navigate("/login");
      toast.error("Please Login First!!")
    } else {
      fetchTutorials();
    }
  });

  return () => unsubscribe();
}, [id]); 


   const fetchTutorials = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "tutorials"));
      const tutorialsData = querySnapshot.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        .filter(tutorial => tutorial.categoryId === id); 

      setTutorials(tutorialsData);
      setLoad(false);
    } catch (error) {
      console.error("Error fetching tutorials:", error);
      setLoad(false);
    }
  };


  return (
    <>
      <RingLoader loading={load} cssOverride={styleObj} size={100} color={"purple"} />
      <div className={load ? "d-none" : ""}>
        <main>
          {/*? slider Area Start */}
          <section className="slider-area slider-area2">
            <div className="slider-active">
              <div className="single-slider slider-height2">
                <div className="container">
                  <div className="row">
                    <div className="col-xl-8 col-lg-11 col-md-12">
                      <div className="hero__caption hero__caption2">
                        <h1 data-animation="bounceIn" data-delay="0.2s">
                          Our Tutorials
                        </h1>
                        <nav aria-label="breadcrumb">
                          <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                              <a href="/">Home</a>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">
                              Tutorials
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
                {tutorials.map((el, index) => (
                  <div className="col-lg-6" key={el.id}>
                    <div className="properties properties2 mb-30">
                      <div className="properties__card">
                        <div>
                          <iframe
                            width="100%"
                            height="315"
                            src={el.link.replace("watch?v=", "embed/")}
                            title={`tutorial-${index}`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        </div>
                        <div className="properties__caption">
                          <h3 className="text-center">
                            <a href="#">{el.title}</a>
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
          {/* Courses area End */}
        </main>
      </div>
    </>
  );
}
