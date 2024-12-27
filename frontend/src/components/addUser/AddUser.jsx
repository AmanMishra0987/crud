import { useState } from "react";
import "./AddUser.css";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import toast from "react-hot-toast";

const AddUser = () => {
  const users = {
    fname:'',
    lname:'',
    email:'',
    password:''
  }

  const [user,setUser] = useState(users)
  const nevigate = useNavigate()
  const inputHandler = (e)=>{
    const {name,value} = e.target
    setUser({...user,[name]:value})
  }

  const submitForm = async(e)=>{
    e.preventDefault()
    await axios.post("http://localhost:8000/api/create",user,{
      headers: { "Content-Type": "application/json" }})
    .then((response)=>{
        toast.success(response.data.msg,{position:"top-right"})
        nevigate("/")
        
    })
    .catch(error=>console.log(error));
  }
  return (
    <div className="addUser">
      <Link to={"/"}>Back</Link>
      <h3>Add new user</h3>
      <form className="addUserForm" onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="fname">First Name</label>
          <input
            type="text"
            id="fname"
            onChange={inputHandler}
            name="fname"
            placeholder="Enter Your First Name"
            autoComplete="off"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="lname">Second Name</label>
          <input
            type="text"
            id="lname"
            onChange={inputHandler}
            name="lname"
            placeholder="Enter Your Last Name"
            autoComplete="off"
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="fname">Email</label>
          <input
            type="email"
            id="email"
            onChange={inputHandler}
            name="email"
            placeholder="Enter Your Email"
            autoComplete="off"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="fname">Password</label>
          <input
            type="password"
            id="password"
            onChange={inputHandler}
            name="password"
            placeholder="Enter Your Password"
            autoComplete="off"
          />
        </div>
        <div className="inputGroup">
            <button type="submit">Add user</button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
