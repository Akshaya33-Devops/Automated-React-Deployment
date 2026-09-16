import React from "react";
import { useGetAllProductsQuery } from "../redux/services";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from '../redux/services'

const Home = () => {

  const [loginUser,{data1,isSuccess,isError}]=useLoginUserMutation()
  console.log(data1)

  const dispatch=useDispatch()
  const navigate=useNavigate()

  const handleAddToCart=(element)=>{
    dispatch(addToCart(element))
  }

  const { data, error, isLoading } = useGetAllProductsQuery();
  console.log(data);

  
  return (
    <div className="container-fluid">
      {isLoading ? (
        <p>Loading</p>
      ) : error ? (
        <p>An error Occurred...</p>
      ) : (
        <div className="d-flex flex-wrap justify-content-center">
  {data?.map((element) => (
    <div className="card mx-2 my-2 shadow" style={{ width: "18rem", flex: "0 0 auto" }}>
      <h5 className="card-title m-0 p-2">{element.name}</h5>
      <img src={element.img} className="card-img-top border p-1"style={{ objectFit: "contain", height: "250px" }}
 alt="..." />
      <div className="card-body">                
        <div className="d-flex justify-content-between ">
        <p className="card-text">
          {element.desc}
        </p>
        <p className="card-text">
          {element.price}
        </p>
          </div>
        <button 
        onClick={()=>handleAddToCart(element)}
        
        className="btn btn-primary" style={{width: "100%", padding:"0.4rem 1rem"}}>
          Add to Cart
        </button>
      </div>
    </div>
  ))}
</div>

      )}
    </div>
  );
};

export default Home;
