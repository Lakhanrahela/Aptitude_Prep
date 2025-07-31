
import { useEffect, useState } from "react"
import { db,styleObj } from "../Firebase";
import { addDoc, collection, getDocs, query, Timestamp, where } from "firebase/firestore";
import { toast} from "react-toastify";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { RingLoader } from "react-spinners";
import axios from "axios";

export default function AddCategories(){
  const[categoryName,setCategoryName]=useState("");
  const[image,setImage]=useState("");
   const[load,setLoad]=useState(false);
   const[display,setDisplay] = useState("block")
  const nav=useNavigate();

  useEffect(() =>{
  setLoad(true)
  setDisplay("none")

  setTimeout(() => {
    setLoad(false)
    setDisplay("block")
  }, 700);
},[])

  const addCategories=async (e)=>{
    e.preventDefault();
    setLoad(true);
    try{
      const auth = getAuth();
      const user = auth.currentUser;
      const userId=user.uid;
      if(!user){
        toast.error("Admin not authenticated please login first!",{
          position:"top-center"
        })
      }

      const categoryRef = collection(db, "categories");

           
           const q = query(categoryRef, where("categoryName", "==", categoryName));
           const querySnapshot = await getDocs(q);

           if (!querySnapshot.empty) {
               toast.error("category name already exists", {
                   position: "top-center",
               });
               setLoad(false);
               return; 
           }

       // --- CLOUDINARY IMAGE UPLOAD START ---
           const formData = new FormData();
           formData.append("file", image);
           formData.append("upload_preset", "aptitudeprep_upload"); // Replace with your Cloudinary preset

           const cloudName = "dw63rvf8n"; // Replace with your Cloudinary cloud name

           const res = await axios.post(
               `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
               formData
           );

           const imageUrl = res.data.secure_url;
           // --- CLOUDINARY IMAGE UPLOAD END ---
  
      const newCategory={
        categoryName,
        imageUrl,
        userId,
        status:"Active",
        created_at:Timestamp.now()
      }

      await addDoc(categoryRef, newCategory);
    

      toast.success('Data added Successfully',{
        position:"top-center"
      })
      setTimeout(() => {
        setLoad(false);
        nav("/admin/managecategories")
      }, 2000);
    }
    catch(error){
      toast.error("Something went wrong,Please try later!",{
        position:"top-center"
      })
      setTimeout(() => {
        setLoad(false);
      }, 2000);
      console.log("the error is :",error);
    }
  }
    return(
        <>
         <RingLoader loading={load} cssOverride={styleObj} size={100} color={"purple"}/>
         <div className={load?"d-none":""}>
          <main>
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
                  Add Categories
                </h1>
                {/* breadcrumb Start*/}
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="index.html">Dashboard</a>
                    </li>
                    <li className="breadcrumb-item">
                      <a href="#">Add Categories</a>
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
  <div className="services-area services-area2 section-padding40">
    <div className="container">
      <div className="row justify-content-sm-center">
        <div className="col-lg-12 col-md-12 col-sm-8">
        <div className="section-top-border">
  <div className="row">
    <div className="col-lg-8 col-md-8 p-5 offset-md-2" style={{border:"4px solid purple",boxShadow:"10px 10px 8px purple"}}>
      <h1 className="mb-30 text-center">Add Categories</h1>
      <form  className="p-5" onSubmit={addCategories}>
        <div className="mt-10">
            <label>Category Name</label>
          <input 
            type="text" 
            placeholder="Enter Category Name"
            onFocus={(e) => e.target.placeholder = ''} 
            onBlur={(e) => e.target.placeholder = 'First Name'} 
            required 
            className="single-input"
            value={categoryName} onChange={(e)=>{setCategoryName(e.target.value)}}
          />
        </div>
        <div className="mt-10">
            <label>Category Image</label>
          <input 
            type="file" 
            name="last_name" 
            placeholder="Image"
            onFocus={(e) => e.target.placeholder = ''} 
            onBlur={(e) => e.target.placeholder = 'Last Name'} 
            required 
            className="single-input"
            onChange={(e)=>{setImage(e.target.files[0])}}
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
    )
}