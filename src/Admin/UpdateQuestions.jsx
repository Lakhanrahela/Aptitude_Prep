import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { RingLoader } from "react-spinners";
import { Timestamp, getDoc, doc, updateDoc, collection, getDocs } from "firebase/firestore";
import { db,styleObj } from "../Firebase"; 

export default function UpdateQuestions() {
  const [question, setQuestion] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [answer, setAnswer] = useState("");
  const [description, setDescription] = useState("");
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);
  const nav = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setTimeout(() => {
      setLoad(false);
    }, 1000);
    getPrevData();
    getCategories();
  }, []);

  const getPrevData = async () => {
    try {
      const docRef = doc(db, "questions", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const prevData = docSnap.data();
        setQuestion(prevData.question);
        setCategoryId(prevData.categoryId);
        setOption1(prevData.option1);
        setOption2(prevData.option2);
        setOption3(prevData.option3);
        setOption4(prevData.option4);
        setAnswer(prevData.answer);
        setDescription(prevData.description);
      } else {
        toast.error("Question not found!");
      }
    } catch (err) {
      console.log("Error fetching question:", err.message);
    }
  };

  const getCategories = async () => {
    try {
      const querySnap = await getDocs(collection(db, "categories"));
      const categories = querySnap.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }));
      setData(categories);
    } catch (err) {
      console.error("Error fetching categories:", err.message);
    }
  };

  const updateQuestions = async (e) => {
    e.preventDefault();
    setLoad(true);
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) {
        toast.error("Admin not authenticated. Please login first.", {
          position: "top-center"
        });
        return;
      }

      const updatedQuestion = {
        question,
        categoryId,
        option1,
        option2,
        option3,
        option4,
        answer,
        description,
        status: "Active",
        created_at: Timestamp.now()
      };

      const questionRef = doc(db, "questions", id);
      await updateDoc(questionRef, updatedQuestion);

      toast.success("Data Updated Successfully", {
        position: "top-center"
      });
      setTimeout(() => {
        setLoad(false);
        nav("/admin/managequestions");
      }, 1000);
    } catch (error) {
      toast.error("Something went wrong, please try later!", {
        position: "top-center"
      });
      setTimeout(() => {
        setLoad(false);
      }, 1000);
      console.log("The error is:", error);
    }
  };

  return (
    <>
      <RingLoader loading={load} cssOverride={styleObj} size={100} color={"purple"} />
      <div className={load ? "d-none" : ""}>
        <main>
          <section className="slider-area slider-area2">
            <div className="slider-active">
              <div className="single-slider slider-height2">
                <div className="container">
                  <div className="row">
                    <div className="col-xl-8 col-lg-11 col-md-12">
                      <div className="hero__caption hero__caption2">
                        <h1 data-animation="bounceIn" data-delay="0.2s">Update Question</h1>
                        <nav aria-label="breadcrumb">
                          <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                            <li className="breadcrumb-item"><a href="#">Update Question</a></li>
                          </ol>
                        </nav>
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
                <div className="col-lg-12 col-md-12 col-sm-8">
                  <div className="section-top-border">
                    <div className="row">
                      <div className="col-lg-8 col-md-8 p-5 offset-md-2" style={{ border: "4px solid purple", boxShadow: "10px 10px 8px purple" }}>
                        <h1 className="mb-30 text-center">Update Question</h1>
                        <form className="p-5" onSubmit={updateQuestions}>
                          <div className="mt-10">
                            <label>Question</label>
                            <input type="text" placeholder="Enter Question" required className="single-input" value={question} onChange={(e) => setQuestion(e.target.value)} />
                          </div>

                          <div className="form-select mt-10 mb-5" id="default-select">
                            <label>Category</label>
                            <select className="single-input" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
                              <option value="" disabled>Choose Category</option>
                              {data.map((el) => (
                                <option key={el.id} value={el.id}>{el.categoryName}</option>
                              ))}
                            </select>
                          </div>

                          <div className="mt-10"><label>Option1</label><input type="text" required className="single-input" value={option1} onChange={(e) => setOption1(e.target.value)} /></div>
                          <div className="mt-10"><label>Option2</label><input type="text" required className="single-input" value={option2} onChange={(e) => setOption2(e.target.value)} /></div>
                          <div className="mt-10"><label>Option3</label><input type="text" required className="single-input" value={option3} onChange={(e) => setOption3(e.target.value)} /></div>
                          <div className="mt-10"><label>Option4</label><input type="text" required className="single-input" value={option4} onChange={(e) => setOption4(e.target.value)} /></div>
                          <div className="mt-10"><label>Correct Answer</label><input type="text" required className="single-input" value={answer} onChange={(e) => setAnswer(e.target.value)} /></div>

                          <div className="mt-10">
                            <label>Description</label>
                            <textarea required className="single-input" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                          </div>

                          <div className="mt-10 offset-md-4">
                            <button type="submit" className="btn btn-primary w-50">Save</button>
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
  );
}
