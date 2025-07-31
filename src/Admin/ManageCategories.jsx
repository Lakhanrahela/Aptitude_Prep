import { useEffect, useState } from "react"
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import { RingLoader } from "react-spinners";
import { db, styleObj } from "../Firebase";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";

export default function ManageCategories(){
  const[data,setData]=useState([]);
  const [load, setLoad] = useState(false);

  
  useEffect(() => {
    setLoad(true)
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
         setTimeout(() => {
      setLoad(false)
    }, 500);
    }, []);

    const handleDelete = async (id) => {
        setLoad(true);
        try {
            const categoryDoc = doc(db, "categories", id);
            await deleteDoc(categoryDoc);
            toast.success("Data Deleted Successfully",{
                position:"top-center"
            })
            setTimeout(() => {
                setLoad(false);
            }, 500);
            setData(prevData => prevData.filter(category => category.id !== id));
        } catch (error) {
            toast.error("Something went wrong",{
                position:"top-center"
            })
            setTimeout(() => {
                setLoad(false);
            }, 500);
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
                  Manage Categories
                </h1>
                {/* breadcrumb Start*/}
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="index.html">Dashboard</a>
                    </li>
                    <li className="breadcrumb-item">
                      <a href="#">Manage Categories</a>
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
      <h1 className="mb-30 text-center">Manage Categories</h1>
        <table className="table table-bordered">
            <thead>
                <tr>
                <th scope="col">Sr No.</th>
                <th scope="col">Name</th>
                <th scope="col">Image</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
              {data?.map((el,index)=>(
                <>
                <tr>
                <th scope="row">{index+1}</th>
                <td>{el?.categoryName}</td>
                <td>
                  <img src={el.imageUrl} height={300}/>
                </td>
                <td>
                <Link to={`/admin/updatecategories/${el.id}`}>
                    <button className="btn" style={{backgroundColor:"dodgerblue"}}>Edit</button>
                    </Link>
                </td>
                <td>
                    <button className="btn" style={{backgroundColor:"red"}} onClick={() => handleDelete(el.id)}>Delete</button>
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
  
</main>
</div>

        </>
    )
}