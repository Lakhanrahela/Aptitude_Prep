import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { db, styleObj } from "../Firebase";
import { toast } from "react-toastify";
import { RingLoader } from "react-spinners";

export default function UpdateTutorials() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [load, setLoad] = useState(true);
  const [tutorial, setTutorial] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const tutorialRef = doc(db, "tutorials", id);
      const tutorialSnap = await getDoc(tutorialRef);
      const categorySnap = await getDocs(collection(db, "categories"));

      if (tutorialSnap.exists()) {
        setTutorial(tutorialSnap.data());
      }

      const categoryList = categorySnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setCategories(categoryList);
    } catch (err) {
      toast.error("Error loading data", { position: "top-center" });
    } finally {
      setTimeout(() => setLoad(false), 2000);
    }
  };

  const handleChange = (e) => {
    setTutorial({ ...tutorial, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoad(true);
    try {
      await updateDoc(doc(db, "tutorials", id), tutorial);
      toast.success("Tutorial updated successfully", { position: "top-center" });
      navigate("/admin/managetutorials");
    } catch (err) {
      toast.error("Error updating tutorial", { position: "top-center" });
    } finally {
      setTimeout(() => setLoad(false), 2000);
    }
  };

  return (
    <>
      <RingLoader loading={load} cssOverride={styleObj} size={100} color={"purple"} />
      <div className={load ? "d-none" : ""}>
        <main>
          {/* Banner Section */}
          <section className="slider-area slider-area2">
            <div className="slider-active">
              <div className="single-slider slider-height2">
                <div className="container">
                  <div className="row">
                    <div className="col-xl-8 col-lg-11 col-md-12">
                      <div className="hero__caption hero__caption2">
                        <h1 data-animation="bounceIn" data-delay="0.2s">Update Tutorial</h1>
                        <nav aria-label="breadcrumb">
                          <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="/admin/dashboard">Dashboard</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Update Tutorial</li>
                          </ol>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Form Section */}
          <div className="services-area services-area2 section-padding40">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-10">
                  <div className="section-top-border p-5" style={{ border: "4px solid purple", boxShadow: "10px 10px 8px purple" }}>
                    <h2 className="mb-4 text-center">Update Tutorial Info</h2>
                    {tutorial && (
                      <form onSubmit={handleUpdate}>
                        <div className="form-group mb-3">
                          <label><strong>Tutorial Title</strong></label>
                          <input
                            type="text"
                            className="form-control"
                            name="title"
                            value={tutorial.title || ""}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="form-group mb-3">
                          <label><strong>Description</strong></label>
                          <textarea
                            className="form-control"
                            name="description"
                            rows="3"
                            value={tutorial.description || ""}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="form-group mb-3">
                          <label><strong>Previous Video Preview</strong></label>
                          {tutorial.link && (
                            <div className="my-2">
                              <iframe
                                width="100%"
                                height="315"
                                src={tutorial.link.replace("watch?v=", "embed/")}
                                title="Tutorial Video"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              ></iframe>
                            </div>
                          )}
                        </div>

                        <div className="form-group mb-3">
                          <label><strong>Video Link (YouTube)</strong></label>
                          <input
                            type="text"
                            className="form-control"
                            name="link"
                            value={tutorial.link || ""}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="form-group mb-4">
                          <label><strong>Category</strong></label>
                          <select
                            className="form-control"
                            name="categoryId"
                            value={tutorial.categoryId || ""}
                            onChange={handleChange}
                            required
                          >
                            <option value="">Select Category</option>
                            {categories.map(cat => (
                              <option key={cat.id} value={cat.id}>{cat.categoryName}</option>
                            ))}
                          </select>
                        </div>

                        <div className="text-center">
                          <button type="submit" className="btn btn-success px-4">Update Tutorial</button>
                        </div>
                      </form>
                    )}
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
