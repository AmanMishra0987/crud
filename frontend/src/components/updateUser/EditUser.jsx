import { useEffect, useState } from "react";
import "./EditUser.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  
  // Initialize user state with empty strings for controlled components
  const [user, setUser] = useState({
    fname: "",
    lname: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  useEffect(() => {
    
    axios
      .get(`http://localhost:8000/api/getone/${id}`)
      .then((response) => {
        console.log(response.data); 
        setUser({
          fname: response.data.fname || "", // Ensure empty string if undefined
          lname: response.data.lname || "", // Ensure empty string if undefined
          email: response.data.email || "", // Ensure empty string if undefined
        });
        setLoading(false); 
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();

   
    if (loading) return;

    try {
      const response = await axios.put(
        `http://localhost:8000/api/updateData/${id}`,
        user,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(response.data.msg, { position: "top-right" });
      navigate("/"); 
    } catch (error) {
      console.error("Error updating data:", error);
      toast.error("Failed to update user", { position: "top-right" });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <div className="addUser">
      <Link to={"/"}>Back</Link>
      <h3>Update user</h3>
      <form className="addUserForm" onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="fname">First Name</label>
          <input
            type="text"
             value={user.fname}  
            onChange={inputHandler}
            id="fname"
            name="fname"
            placeholder="Enter Your First Name"
            autoComplete="off"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="lname">Last Name</label> 
          <input
            type="text"
            value={user.lname}  
            onChange={inputHandler}
            id="lname"
            name="lname"
            placeholder="Enter Your Last Name"
            autoComplete="off"
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="email">Email</label> 
          <input
            type="email"
            value={user.email}  
            onChange={inputHandler}
            id="email"
            name="email"
            placeholder="Enter Your Email"
            autoComplete="off"
          />
        </div>
        <div className="inputGroup">
          <button type="submit">UPDATE USER</button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
