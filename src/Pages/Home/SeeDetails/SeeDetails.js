import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Purchase from "../Purchase/Purchase";
import "./SeeDetails.css";

const SeeDetails = () => {
  const { id } = useParams();
  const [detailProduct, setDetailProdudt] = useState({});
  const [closeModal, setCloseModal] = useState({});
  const [total, setTotal] = useState(0);
  const orderQuantity = parseInt(total);
  useEffect(() => {
    fetch(`https://damp-plateau-02842.herokuapp.com/seeDetails/${id}`,{
      method:'GET',
      headers: {
        "content-type": "application/json",
        authorization : `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setDetailProdudt(data)
        setCloseModal(data)
      });
  }, [id, detailProduct]);

  const handleQuantity = (event) => {
    event.preventDefault();
    const inputValue = event.target.quantity.value;
    setTotal(inputValue);
    if (parseInt(inputValue) < detailProduct.minimum) {
      toast.error("Quantity Must Be Equal Minimum");
    } else if (parseInt(inputValue) > parseInt(detailProduct.available)) {
      toast.error(`You Can't Order More Thand Available`);
    }
  };
  return (
    <div className="see-details p-12 bg-slate-900">
      <div className="hero min-h-screen text-white">
        <div className="hero-content flex-col lg:flex-row-reverse  p-5">
          <img
            src={detailProduct.img}
            className=" w-full-sm lg:max-w-sm rounded-lg shadow-2xl"
            alt=""
          />
          <div className="">
            <h1 className="text-4xl">{detailProduct.name}</h1>
            <p className="my-4">{detailProduct.discription}</p>
            <h2 className="text-2xl">Price: ${detailProduct.price}</h2>
            <h3 className="text-xl my-2">Minimum: {detailProduct.minimum}</h3>
            <h3 className="text-xl ">Available: {detailProduct.available}</h3>
            <form onSubmit={handleQuantity} className="flex mt-4">
              <input
                type="text"
                placeholder={`Minimum Quantity ${detailProduct.minimum}`}
                className="input w-full max-w-xs"
                name="quantity"
              />
              <input type="submit" value="Add" className="btn ml-2" />
            </form>
            {orderQuantity > parseInt(detailProduct.minimum) &&
            orderQuantity <= parseInt(detailProduct.available) ? (
              <label htmlFor="my-modal-6" className="btn  mt-5">
                Purchase
              </label>
            ) : (
              <label
                disabled
                htmlFor="my-modal-6"
                className="btn  mt-5"
              >
                Purchase disabled
              </label>
            )}
            {closeModal && (
              <Purchase
                orderQuantity={orderQuantity}
                detailProduct={detailProduct}
                setCloseModal={setCloseModal}
              ></Purchase>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeeDetails;
