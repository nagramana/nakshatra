import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Register() {
const navigate = useNavigate();
const { register } = useAuth();

const [showPassword, setShowPassword] =
useState(false);

const [formData, setFormData] =
useState({
name: "",
email: "",
password: "",
confirmPassword: "",
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


if (
  formData.password !==
  formData.confirmPassword
) {
  alert(
    "Passwords do not match"
  );
  return;
}

const success =
  await register(
    formData.name,
    formData.email,
    formData.password
  );

if (success) {
  alert(
    "Registration Successful"
  );
  navigate("/");
} else {
  alert(
    "Registration Failed"
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
backdropFilter:
"blur(20px)",
}}
> <div className="card-body p-5">
<h2
className="text-center fw-bold mb-4"
style={{
color: "#082A78",
}}
>
Create Account </h2>


      <form
        onSubmit={
          handleSubmit
        }
      >
        <div className="mb-3">
          <label>
            Full Name
          </label>

          <input
            type="text"
            name="name"
            className="form-control"
            value={
              formData.name
            }
            onChange={
              handleChange
            }
            required
          />
        </div>

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
          <label>
            Confirm Password
          </label>

          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            name="confirmPassword"
            className="form-control"
            value={
              formData.confirmPassword
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
          className="btn btn-primary w-100 py-2"
        >
          Register
        </button>
      </form>

      <p className="text-center mt-4">
        Already have an
        account?{" "}
        <Link to="/login">
          Login
        </Link>
      </p>
    </div>
  </div>
</div>


);
}

export default Register;
