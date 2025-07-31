import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RingLoader } from "react-spinners";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../Firebase"; 

export default function Categories() {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);

  const styleObj = {
    display: "block",
    margin: "0 auto",
    borderColor: "purple"
  };

  useEffect(() => {
    // simulate loading for 2 seconds
    const timer = setTimeout(() => setLoad(false), 1000);

    getCategories();

    return () => clearTimeout(timer);
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

  return (
    <>
     
        <main>
          {/*? slider Area Start*/}
          <section className="slider-area slider-area2">
            <div className="slider-active">
              <div className="single-slider slider-height2">
                <div className="container">
                  <div className="row">
                    <div className="col-xl-8 col-lg-11 col-md-12">
                      <div className="hero__caption hero__caption2">
                        <h1 data-animation="bounceIn" data-delay="0.2s">Categories</h1>
                        {/* breadcrumb Start*/}
                        <nav aria-label="breadcrumb">
                          <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                              <a href="index.html">Home</a>
                            </li>
                            <li className="breadcrumb-item">
                              <a href="#">Categories</a>
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
           <RingLoader loading={load} cssOverride={styleObj} size={100} color={"purple"} />
      <div className={load ? "d-none " : ""}>
          {/*? top subjects Area Start */}
          <div className="topic-area mt-5">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-xl-7 col-lg-8">
                  <div className="section-tittle text-center mb-55"></div>
                </div>
              </div>
              <div className="row">
                {data?.map((el) => (
              <div className="col-lg-6 col-md-6 col-sm-6" key={el.id}>
                <div className="single-topic text-center mb-30">
                  <div className="topic-img">
                    <img src={el.imageUrl} alt=""  height={300}/>
                    <div className="topic-content-box">
                      <div className="topic-content">
                        <h1 className="text-light">{el?.categoryName}</h1>
                        <div className="d-flex justify-content-around  mt-5">
                          <Link to={`/questions/${el.id}`}>
                            <button className="btn btn-sm"><i class="bi bi-patch-question-fill"></i></button>
                          </Link>
                          <Link to={`/tutorials/${el.id}`}>
                            <button className="btn btn-sm offset-md-3"><i class="bi bi-play-btn-fill"></i></button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

              </div>
            </div>
          </div>
          </div>
          {/* top subjects End */}
        </main>
     
    </>
  );
}
