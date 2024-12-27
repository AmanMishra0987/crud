import { Link } from "react-router-dom";
import "./User.css";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let response = await axios("http://localhost:8000/api/getdata");
      console.log(response.data);
      setUsers(Array.isArray(response.data.data) ? response.data.data : []);
    };
    fetchData();
  }, []);
  const deleteUser = async(userId)=>{
    await axios.delete(`http://localhost:8000/api/deleteData/${userId}`)
    .then((response)=>{
      setUsers((prevUser)=>prevUser.filter((user)=>user._id!==userId))
      
      toast.success(response.data.msg,{position:"top-right"})
    })
    .catch((error)=>{
      console.log(error)
    })
  }
  return (
    <div className="userTable">
      <Link to={"/add"} className="addButton">
        Add user
      </Link>
      <table border={1} cellPadding={10} cellSpacing={0}>
        <thead>
          <tr>
            <th>S.No.</th>
            <th>User Name</th>
            <th>User Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((userD, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  {userD.fname} {userD.lname}
                </td>
                <td>{userD.email}</td>
                <td className="actionBtn">
                  <button onClick={()=>deleteUser(userD._id)}><i className="fa-solid fa-trash"></i></button>
                  <Link to={`/edit/`+userD._id}><i className="fa-solid fa-edit"></i></Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default User;
