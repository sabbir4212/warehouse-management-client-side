import React from "react";
import { Link } from "react-router-dom";
import "./Product.css";

const Product = ({ product }) => {
  const { _id, name, img, discription, minimum, price, available } = product;
  return (
    <div className="product cardbg-slate-900 shadow-xl w-full text-white">
      <div className="card-body">
        <img className="h-52" src={img} alt="" />
        <h1 className="text-2xl">{name}</h1>
        <h2>Price: ${price}</h2>
        <p>Minimum Order: {minimum}</p>
        <p>Available: {available}</p>
        <p title={discription}>{discription.slice(0, 250) + '...'}</p>
        <Link to={`/seeDetails/${_id}`} className="btn ">Details</Link>
      </div>
    </div>
  );
};

export default Product;
