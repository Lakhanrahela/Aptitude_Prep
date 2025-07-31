import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db, styleObj } from "../Firebase";
import { RingLoader } from "react-spinners";

export default function Questions() {
  const { id } = useParams(); 
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);
  const [activeDescId, setActiveDescId] = useState(null); 

  useEffect(() => {
    const timeout = setTimeout(() => setLoad(false), 1000);
    getQuestions();
    return () => clearTimeout(timeout); 
  }, [id]);

  const getQuestions = async () => {
    try {
      const categoryCollection = collection(db, "categories");
      const questionCollection = collection(db, "questions");

      const categoriesData = await getDocs(categoryCollection);
      const questionsData = await getDocs(questionCollection);

      const categories = categoriesData.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      const questions = questionsData.docs.map(doc => ({ ...doc.data(), id: doc.id }));

      const filteredQuestions = questions.filter(q => q.categoryId === id);

      const joinedData = filteredQuestions.map(questionData => {
        const categoryData = categories.find(category => category.id === questionData.categoryId);
        return {
          ...questionData,
          category: categoryData
        };
      });

      setData(joinedData);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const toggleDescription = (questionId) => {
    setActiveDescId(prevId => (prevId === questionId ? null : questionId));
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
                        <h1 data-animation="bounceIn" data-delay="0.2s">Questions</h1>
                        <nav aria-label="breadcrumb">
                          <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                            <li className="breadcrumb-item active">Questions</li>
                          </ol>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Questions Section */}
          <div className="topic-area mt-5">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-xl-7 col-lg-8">
                  <div className="section-tittle text-center mb-55"></div>
                </div>
              </div>
              <div className="row">
                {data?.map((el, index) => (
                  <div key={el.id} className="col-lg-12 col-md-12 col-sm-12 mb-3">
                    <h1>{index + 1}. {el?.question}</h1>
                    <h2 className="mb-2"><span className="text-dark">Option A: </span>{el?.option1}</h2>
                    <h2 className="mb-2"><span className="text-dark">Option B: </span>{el?.option2}</h2>
                    <h2 className="mb-2"><span className="text-dark">Option C: </span>{el?.option3}</h2>
                    <h2 className="mb-2"><span className="text-dark">Option D: </span>{el?.option4}</h2>
                    <div className="d-flex mt-4">
                      <div className="d-inline">
                        <button
                          className="btn btn-primary mb-4"
                          onClick={() => toggleDescription(el.id)}
                        >
                          {activeDescId === el.id ? "Hide" : "Answer and Description"}
                        </button>
                      </div>
                    </div>
                    {activeDescId === el.id && (
                      <div
                        className="description-box mt-2"
                        style={{
                          border: "1px solid #ccc",
                          padding: "10px",
                          borderRadius: "4px",
                        }}
                      >
                        <h3>Answer: {el?.answer}</h3>
                        <p>{el?.description}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
