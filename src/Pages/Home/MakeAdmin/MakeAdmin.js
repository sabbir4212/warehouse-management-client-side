import React from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import Loading from "../Loading/Loading";
import "./MakeAdmin.css";

const MakeAdmin = () => {
  const { data: users, isLoading, refetch } = useQuery("user", () =>
    fetch("http://localhost:5000/user",{
      method: "GET",
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );
  if (isLoading) {
    return <Loading></Loading>;
  }

  const handleMakeAdmin = (email) => {
    fetch(`http://localhost:5000/user/admin/${email}`,{
      method:'PUT',
      headers:{
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
    .then(res => {
      if (res.status === 401 || res.status === 403) {
        toast.error(`Failed to Make an admin`)
      }
      return res.json();
    })
    .then(data => {
      if(data.modifiedCount > 0){
        refetch();
        toast.success(`Made An Admin Successfully`)
      }
    })
  }

  return (
    <div className="make-admin">
      <h1>make Admin {users?.length}</h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Email</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.email}</td>
                <td>{user?.role !== 'admin' ? <button className="btn btn-outline btn-sm" onClick={() => handleMakeAdmin(user.email)}>Make Admin</button>:(<p>Alrady An Admin</p>)}</td>
                <td><button className="btn btn-outline btn-sm ">Delete user</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MakeAdmin;
