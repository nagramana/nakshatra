import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
const navigate = useNavigate();
const { login } = useAuth();

const [showPassword, setShowPassword] =
useState(false);

const [formData, setFormData] =
useState({
email: "",
password: "",
});

const handleChange = (e) => {
setFormData({
...formData,
[e.target.name]:
e.target.value,
});
};

const handleSubmit = async (
e
) => {
e.preventDefault();


const success =
  await login(
    formData.email,
    formData.password
  );

if (success) {
  alert(
    "Login Successful"
  );

  navigate("/");
} else {
  alert(
    "Invalid Email or Password"
  );
}


};

return (
<div
className="d-flex justify-content-center align-items-center"
style={{
minHeight: "100vh",
background:
"linear-gradient(135deg,#082A78,#2563eb)",
}}
>
<div
className="card border-0 shadow-lg"
style={{
width: "100%",
maxWidth: "500px",
borderRadius: "25px",
}}
> <div className="card-body p-5">
<h2
className="text-center fw-bold mb-4"
style={{
color: "#082A78",
}}
>
Welcome Back </h2>


      <form
        onSubmit={
          handleSubmit
        }
      >
        <div className="mb-3">
          <label>Email</label>

          <input
            type="email"
            name="email"
            className="form-control"
            value={
              formData.email
            }
            onChange={
              handleChange
            }
            required
          />
        </div>

        <div className="mb-3">
          <label>
            Password
          </label>

          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            name="password"
            className="form-control"
            value={
              formData.password
            }
            onChange={
              handleChange
            }
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="checkbox"
            onChange={() =>
              setShowPassword(
                !showPassword
              )
            }
          />{" "}
          Show Password
        </div>

        <button
          type="submit"
          className="btn btn-success w-100 py-2"
        >
          Login
        </button>
      </form>

      <p className="text-center mt-4">
        Don't have an
        account?{" "}
        <Link to="/register">
          Register
        </Link>
      </p>
    </div>
  </div>
</div>


);
}

export default Login;
