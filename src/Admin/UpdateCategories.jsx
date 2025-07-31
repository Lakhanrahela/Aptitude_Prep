import { useEffect, useState } from "react";
import { toast} from "react-toastify";
import { getAuth } from "firebase/auth";
import { useNavigate, useParams } from "react-router-dom";
import { RingLoader } from "react-spinners";
import { styleObj } from "../Firebase";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase"; 
import axios from "axios";

export default function UpdateCategories() {
  const [categoryName, setCategoryName] = useState("");
  const [image, setImage] = useState("");
  const [prevImageUrl, setPrevImageUrl] = useState("");
  const [load, setLoad] = useState(true);
  const nav = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setTimeout(() => {
      setLoad(false);
    }, 2000);
    getPrevData();
  }, []);

  const getPrevData = async () => {
    try {
      const docRef = doc(db, "categories", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setCategoryName(docSnap.data().categoryName);
        setPrevImageUrl(docSnap.data().imageUrl);
      } else {
        toast.error("Category not found");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const updateCategoryData = async (e) => {
    e.preventDefault();
    setLoad(true);
    let imageUrl = prevImageUrl;

    try {
      // If new image selected, upload to Cloudinary
      if (image) {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "aptitudeprep_upload"); // Your Cloudinary preset
        const cloudName = "dw63rvf8n"; // Your Cloudinary cloud name
        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          formData
        );
        imageUrl = res.data.secure_url;
      }

      const updatedCategory = {
        categoryName,
        imageUrl,
      };

      const categoryRef = doc(db, "categories", id);
      await updateDoc(categoryRef, updatedCategory);

      toast.success("Data updated successfully", {
        position: "top-center",
      });

      setTimeout(() => {
        setLoad(false);
        nav("/admin/managecategories");
      }, 1000);
    } catch (err) {
      toast.error(err.message);
      setTimeout(() => {
        setLoad(false);
      }, 1000);
    }
  };

  return (
    <>
      <RingLoader loading={load} cssOverride={styleObj} size={100} color={"purple"} />
      <div className={load ? "d-none" : ""}>
        <main>
          {/* Slider Area */}
          <section className="slider-area slider-area2">
            <div className="slider-active">
              <div className="single-slider slider-height2">
                <div className="container">
                  <div className="row">
                    <div className="col-xl-8 col-lg-11 col-md-12">
                      <div className="hero__caption hero__caption2">
                        <h1 data-animation="bounceIn" data-delay="0.2s">
                          Update Category
                        </h1>
                        <nav aria-label="breadcrumb">
                          <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                              <a href="index.html">Dashboard</a>
                            </li>
                            <li className="breadcrumb-item active">Update Category</li>
                          </ol>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Form Area */}
          <div className="services-area services-area2 section-padding40">
            <div className="container">
              <div className="row justify-content-sm-center">
                <div className="col-lg-12 col-md-12 col-sm-8">
                  <div className="section-top-border">
                    <div className="row">
                      <div
                        className="col-lg-8 col-md-8 p-5 offset-md-2"
                        style={{
                          border: "4px solid purple",
                          boxShadow: "10px 10px 8px purple",
                        }}
                      >
                        <h1 className="mb-30 text-center">Update Category</h1>
                        <form className="p-5" onSubmit={updateCategoryData}>
                          <div className="mt-10">
                            <label>Category Name</label>
                            <input
                              type="text"
                              placeholder="Enter Category Name"
                              required
                              className="single-input"
                              value={categoryName}
                              onChange={(e) => setCategoryName(e.target.value)}
                            />
                          </div>
                          {prevImageUrl && (
                            <div className="mt-3">
                              <img src={prevImageUrl} alt="Previous Category" className="w-50" />
                              <p>Previous Image</p>
                            </div>
                          )}
                          <div className="mt-10">
                            <label>Category Image</label>
                            <input
                              type="file"
                              className="single-input"
                              onChange={(e) => setImage(e.target.files[0])}
                            />
                          </div>
                          <div className="mt-10 offset-md-4">
                            <button className="btn btn-primary w-50">Save</button>
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
