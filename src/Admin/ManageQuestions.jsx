import { useEffect, useState } from "react"
import { toast} from "react-toastify";
import { Link } from "react-router-dom";
import { RingLoader } from "react-spinners";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db, styleObj } from "../Firebase";

export default function ManageQuestions(){
    const[data,setData]=useState([])
    const[load,setLoad]=useState(true);

    setTimeout(() => {
      setLoad(false);
    }, 500);

    useEffect(() => {
       getQuestions();
    }, []);

    const getQuestions = async () => {
        try {
             const categoryCollection = collection(db,"categories")
            const questionCollection = collection(db,"questions")

            const categoriesData = await getDocs(categoryCollection);
            const questionsData = await getDocs(questionCollection);
    
            const categories = categoriesData.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            const questions = questionsData.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    
    
            const joinedData = questions.map(questionData => {
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
const deleteData = async (id) => {
        setLoad(true);
        try {
            const questionDoc = doc(db, "questions", id);
            await deleteDoc(questionDoc);
            toast.success("Data Deleted Successfully",{
                position:"top-center"
            })
            setTimeout(() => {
                setLoad(false);
            }, 1000);
            setData(prevData => prevData.filter(question => question.id !== id));
        } catch (error) {
            toast.error("Something went wrong",{
                position:"top-center"
            })
            setTimeout(() => {
                setLoad(false);
            }, 1000);
            console.error("Error deleting document: ", error);
        }
    };
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
                  Manage Questions
                </h1>
                {/* breadcrumb Start*/}
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="index.html">Dashboard</a>
                    </li>
                    <li className="breadcrumb-item">
                      <a href="#">Manage Questions</a>
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
    <div className="col-lg-12 col-md-12 p-5" style={{border:"4px solid purple",boxShadow:"10px 10px 8px purple"}}>
      <h1 className="mb-30 text-center">Manage Questions</h1>
        <div className="table-responsive">
        <table className="table table-bordered">
            <thead>
                <tr>
                <th scope="col">Sr No.</th>
                <th scope="col">Question</th>
                <th scope="col">category</th>
                <th scope="col">options</th>
                <th scope="col">Answer</th>
                <th scope="col">Description</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
              {data?.map((el,index)=>(
                <>
                <tr>
                <th scope="row">{index+1}</th>
                <td>{el?.question}</td>
                <td>
                {el?.category?.categoryName}
                </td>
                <td>
                    <ul>
                        <li><span>Option1:</span>{el?.option1}</li>
                        <li><span>Option2:</span>{el?.option2}</li>
                        <li><span>Option3:</span>{el?.option3}</li>
                        <li><span>Option4:</span>{el?.option4}</li>
                    </ul>
                </td>
                <td>{el?.answer}</td>
                <td>{el?.description}</td>
                <td>
                <Link to={`/admin/updatequestions/${el.id}`}>
                    <button className="btn" style={{backgroundColor:"dodgerblue"}}>Edit</button>
                    </Link>
                </td>
                <td>
                    <button className="btn" style={{backgroundColor:"red"}} onClick={() => deleteData(el.id)}>Delete</button>
                </td>
                </tr>
                </>
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
    )
}