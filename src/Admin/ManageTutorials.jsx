import { useEffect, useState } from "react"
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { RingLoader } from "react-spinners";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db, styleObj } from "../Firebase";

export default function ManageTutorials() {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    getTutorials();
    const timer = setTimeout(() => setLoad(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const getTutorials = async () => {
    try {
      const categoryCollection = collection(db, "categories");
      const tutorialCollection = collection(db, "tutorials"); // assuming you're still using "tutorials" for now

      const categoriesData = await getDocs(categoryCollection);
      const tutorialsData = await getDocs(tutorialCollection);

      const categories = categoriesData.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      const tutorials = tutorialsData.docs.map(doc => ({ ...doc.data(), id: doc.id }));

      const joinedData = tutorials.map(tutorial => {
        const categoryData = categories.find(category => category.id === tutorial.categoryId);
        return {
          ...tutorial,
          category: categoryData
        };
      });

      setData(joinedData);
    } catch (error) {
      console.error("Error fetching tutorials:", error);
    }
  };

  const deleteData = async (id) => {
    setLoad(true);
    try {
      const tutorialDoc = doc(db, "tutorials", id);
      await deleteDoc(tutorialDoc);
      toast.success("Tutorial deleted successfully", {
        position: "top-center"
      });
      setData(prev => prev.filter(t => t.id !== id));
    } catch (error) {
      toast.error("Something went wrong", {
        position: "top-center"
      });
      console.error("Error deleting tutorial: ", error);
    } finally {
      setTimeout(() => setLoad(false), 2000);
    }
  };

  const openVideo = (url) => {
    window.open(url, "_blank");
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
                        <h1 data-animation="bounceIn" data-delay="0.2s">
                          Manage Tutorials
                        </h1>
                        <nav aria-label="breadcrumb">
                          <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                              <a href="/">Dashboard</a>
                            </li>
                            <li className="breadcrumb-item active">Manage Tutorials</li>
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
                      <div className="col-lg-12 col-md-12 p-5" style={{ border: "4px solid purple", boxShadow: "10px 10px 8px purple" }}>
                        <h1 className="mb-30 text-center">Manage Tutorials</h1>
                        <div className="table-responsive">
                          <table className="table table-bordered">
                            <thead>
                              <tr>
                                <th scope="col">Sr No.</th>
                                <th scope="col">Tutorial Title</th>
                                <th scope="col">Category</th>
                                <th scope="col">Description</th>
                                <th scope="col">Video</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                              </tr>
                            </thead>
                            <tbody>
                              {data?.map((el, index) => (
                                <tr key={el.id}>
                                  <th scope="row">{index + 1}</th>
                                  <td>{el?.title}</td>
                                  <td>{el?.category?.categoryName}</td>
                                  <td>{el?.description}</td>
                                  <td>
                                <div style={{ width: "200px", height: "120px" }}>
                                    <iframe
                                    width="100%"
                                    height="100%"
                                    src={el?.link?.replace("watch?v=", "embed/")}
                                    title={`video-${index}`}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    ></iframe>
                                </div>
                                </td>

                                  <td>
                                    <Link to={`/admin/updatetutorials/${el.id}`}>
                                      <button className="btn" style={{ backgroundColor: "dodgerblue" }}>
                                        Edit
                                      </button>
                                    </Link>
                                  </td>
                                  <td>
                                    <button
                                      className="btn"
                                      style={{ backgroundColor: "red" }}
                                      onClick={() => deleteData(el.id)}
                                    >
                                      Delete
                                    </button>
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
          </div>
        </main>
      </div>
    </>
  );
}
