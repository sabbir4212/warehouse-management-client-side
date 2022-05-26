import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import { auth } from "../../../firebase.init";
import Loading from "../Loading/Loading";
import { useQuery } from "react-query";

const ManageAllOrders = () => {
  const [user, loading] = useAuthState(auth);
  const [allOrders, setAllOrders] = useState([]);
  const [idForDeleteOrder, setIdForDeleteOrder] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:5000/orders`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAllOrders(data);
      });
  }, [user]);

  const handleDeleteAllSingleOrder = (id) => {
    const url = `http://localhost:5000/myOrders/${id}`;
    fetch(url, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((resData) => {
        toast.success("delete successful");
        const remaining = allOrders.filter((order) => order._id !== id);
        setAllOrders(remaining);
        console.log(remaining);
      });
  };

  const handlePandingOrder = (id) => {
    const url = `http://localhost:5000/ordersDeliver/${id}`;
    fetch(url, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
    })
  };

  if (loading) {
    return <Loading></Loading>;
  }
  return (
    <div className="my-orders">
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Pyment</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allOrders?.map((order, index) => (
              <tr key={order._id}>
                <th>{index + 1}</th>
                <td>{order.customerName}</td>
                <td>{order.orderQuantity}</td>
                <td>$ {order.price}</td>
                <td>
                  {order.price && !order?.paid && (
                    <button className="text-red-500">unpaid</button>
                  )}
                  {order.price && order?.paid && (
                    order?.deliver ? <span className="text-success">Paid</span> : <span className="text-success">shipped</span>
                  )}
                </td>
                <td>
                  {!order?.paid && (
                    <label
                      htmlFor="confirm-delete-orders"
                      className="btn btn-outline btn-error btn-sm modal-button"
                      onClick={() => setIdForDeleteOrder(order._id)}
                    >
                      Delete
                    </label>
                  )}
                  {order?.paid && (
                    order?.deliver ? <button
                      onClick={() => handlePandingOrder(order._id)}
                      className="btn btn-outline btn-sm"
                    >
                      Pending
                    </button> : <span className="text-success">shipped</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <input
          type="checkbox"
          id="confirm-delete-orders"
          className="modal-toggle"
        />
        <div className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Alart!!</h3>
            <p className="py-4">Are you sure you want to delete ?</p>
            <div className="flex justify-end">
              <div className="modal-action">
                <label
                  htmlFor="confirm-delete-orders"
                  className="btn btn-outline btn-sm"
                >
                  Cancle
                </label>
              </div>
              <div className="modal-action ml-2">
                <label
                  onClick={() => handleDeleteAllSingleOrder(idForDeleteOrder)}
                  htmlFor="confirm-delete-orders"
                  className="btn btn-outline btn-sm"
                >
                  Confirm
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageAllOrders;
