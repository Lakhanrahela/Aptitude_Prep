import { getAuth } from "firebase/auth";
import { addDoc, collection, onSnapshot, serverTimestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast} from "react-toastify";
import { RingLoader } from "react-spinners";
import { db, styleObj } from "../Firebase";

export default function AddQuestions(){
  const[question,setQuestion]=useState("");
  const[categoryId,setCategoryId]=useState("");
  const[option1,setOption1]=useState("");
  const[option2,setOption2]=useState("");
  const[option3,setOption3]=useState("");
  const[option4,setOption4]=useState("");
  const[answer,setAnswer]=useState("");
  const[description,setDescription]=useState("");
  const[data,setData]=useState([]);
  const[load,setLoad]=useState(false);

  const nav=useNavigate();

  useEffect(() =>{
  setLoad(true)

  setTimeout(() => {
    setLoad(false)
  }, 700);
},[])

  const addQuestions=async (e)=>{
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
      
      const newQuestion={
       question,
       categoryId,
       option1,
       option2,
       option3,
       option4,
       answer,
       description,
      status:"Active",
      created_at:serverTimestamp()
      }

      const questionRef = collection(db, "questions");
     await addDoc(questionRef, newQuestion);

      toast.success('Data added Successfully',{
        position:"top-center"
      })
      setTimeout(() => {
        setLoad(false);
        nav("/admin/managequestions")
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

   useEffect(() => {
          const getCategories = () => {
              const categoryRef = collection(db, "categories");
  
              const unsubscribe = onSnapshot(categoryRef, (snapshot) => {
                  const categories = snapshot.docs.map(doc => ({
                      id: doc.id,
                      ...doc.data()
                  }));
                  setData(categories);
              });
  
              return () => unsubscribe();
          };
  
          getCategories();
      }, []);
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
                  Add Questions
                </h1>
                {/* breadcrumb Start*/}
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="index.html">Home</a>
                    </li>
                    <li className="breadcrumb-item">
                      <a href="#">Add Questions</a>
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
      <h1 className="mb-30 text-center">Add Questions</h1>
      <form action="#" className="p-5" onSubmit={addQuestions}>
        <div className="mt-10">
            <label>Question</label>
          <input 
            type="text" 
            placeholder="Enter Question"
            onFocus={(e) => e.target.placeholder = ''} 
            onBlur={(e) => e.target.placeholder = 'First Name'} 
            required 
            className="single-input"
            value={question} onChange={(e)=>{setQuestion(e.target.value)}}
          />
        </div>
       
          <div className="form-select mt-10 mb-5" id="default-select">
            <label>Category</label>
            <select className="single-input" value={categoryId} onChange={(e)=>{setCategoryId(e.target.value)}}>
              <option value="" selected disabled>Choose Category</option>
              {data?.map((el)=>(
                <>
                <option value={el?.id}>{el?.categoryName}</option>
                </>
              ))}
            </select>
        </div>
        <div className="mt-10">
            <label>Option1</label>
          <input 
            type="text" 
            placeholder="Enter option1"
            onFocus={(e) => e.target.placeholder = ''} 
            onBlur={(e) => e.target.placeholder = 'First Name'} 
            required 
            className="single-input"
            value={option1} onChange={(e)=>{setOption1(e.target.value)}}
          />
        </div>
        <div className="mt-10">
            <label>Option2</label>
          <input 
            type="text" 
            placeholder="Enter option2"
            onFocus={(e) => e.target.placeholder = ''} 
            onBlur={(e) => e.target.placeholder = 'First Name'} 
            required 
            className="single-input"
            value={option2} onChange={(e)=>{setOption2(e.target.value)}}
          />
        </div>
        <div className="mt-10">
            <label>Option3</label>
          <input 
            type="text" 
            placeholder="Enter option3"
            onFocus={(e) => e.target.placeholder = ''} 
            onBlur={(e) => e.target.placeholder = 'First Name'} 
            required 
            className="single-input"
            value={option3} onChange={(e)=>{setOption3(e.target.value)}}
          />
        </div>
        <div className="mt-10">
            <label>Option4</label>
          <input 
            type="text" 
            placeholder="Enter option4"
            onFocus={(e) => e.target.placeholder = ''} 
            onBlur={(e) => e.target.placeholder = 'First Name'} 
            required 
            className="single-input"
            value={option4} onChange={(e)=>{setOption4(e.target.value)}}
          />
        </div>
        <div className="mt-10">
            <label>Correct Answer</label>
          <input 
            type="text" 
            placeholder="Enter Correct Option"
            onFocus={(e) => e.target.placeholder = ''} 
            onBlur={(e) => e.target.placeholder = 'First Name'} 
            required 
            className="single-input"
            value={answer} onChange={(e)=>{setAnswer(e.target.value)}}
          />
        </div>
        <div className="mt-10">
            <label>Description</label>
          <textarea
            placeholder="Enter Description"
            onFocus={(e) => e.target.placeholder = ''} 
            onBlur={(e) => e.target.placeholder = 'First Name'} 
            required 
            className="single-input"
            value={description}
            onChange={(e)=>{setDescription(e.target.value)}}
          ></textarea>
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
    )
}