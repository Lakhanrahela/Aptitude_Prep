import { getAuth } from "firebase/auth";
import { addDoc, collection, onSnapshot, serverTimestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RingLoader } from "react-spinners";
import { db, styleObj } from "../Firebase";

export default function AddTutorials() {
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [load, setLoad] = useState(false);
  const nav = useNavigate();

  const addTutorial = async (e) => {
    e.preventDefault();
    setLoad(true);
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        toast.error("Please login as admin first!", { position: "top-center" });
        setLoad(false);
        return;
      }

      const newTutorial = {
        title,
        categoryId,
        link,
        description,
        status: "Active",
        created_at: serverTimestamp(),
        userId: user.uid,
      };

      await addDoc(collection(db, "tutorials"), newTutorial);

      toast.success("Tutorial added successfully!", { position: "top-center" });
      setTimeout(() => {
        setLoad(false);
        nav("/admin/managetutorials");
      }, 2000);
    } catch (error) {
      toast.error("Failed to add tutorial!", { position: "top-center" });
      console.error("Error adding tutorial:", error);
      setLoad(false);
    }
  };

  useEffect(() => {
    const categoryRef = collection(db, "categories");
    const unsubscribe = onSnapshot(categoryRef, (snapshot) => {
      const categoryList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCategories(categoryList);
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
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
                  Add Tutorials
                </h1>
                {/* breadcrumb Start*/}
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="index.html">Dashboard</a>
                    </li>
                    <li className="breadcrumb-item">
                      <a href="#">Add Tutorials</a>
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
      <RingLoader loading={load} cssOverride={styleObj} size={100} color="purple" />
      <div className={load ? "d-none" : ""}>
        <div className="container mt-5 p-4">
          <div className="row justify-content-center">
            <div className="col-md-8 p-5" style={{ border: "3px solid purple", boxShadow: "0px 0px 10px purple" }}>
              <h2 className="text-center mb-4">Add YouTube Tutorial</h2>
              <form onSubmit={addTutorial}>
                <div className="form-group mb-3">
                  <label>Title</label>
                  <input type="text" className="form-control" required value={title} onChange={e => setTitle(e.target.value)} />
                </div>
                <div className="form-group mb-3">
                  <label>Category</label>
                  <select className="form-control" required value={categoryId} onChange={e => setCategoryId(e.target.value)}>
                    <option value="">-- Select Category --</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.categoryName}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group mb-3">
                  <label>YouTube Link</label>
                  <input type="url" className="form-control" required value={link} onChange={e => setLink(e.target.value)} placeholder="https://www.youtube.com/watch?v=..." />
                </div>
                <div className="form-group mb-3">
                  <label>Description</label>
                  <textarea className="form-control" required rows="4" value={description} onChange={e => setDescription(e.target.value)}></textarea>
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary">Add Tutorial</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
