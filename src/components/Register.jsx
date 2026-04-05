import { useState } from "react";
import { useNavigate } from "react-router";
import Header from "./Header";
import { registerUser } from "../utils/api";
import { clearSession } from "../utils/session";
import { useToast } from "./ui/ToastProvider";

const Register = () => {
  const navigate = useNavigate();
  const [isvolunteer, setisvolunteer] = useState(false);
  const [isstudent, setisstudent] = useState("");
  const [error, seterror] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setform] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    school: "",
    organization: "",
  });
  const toast = useToast();

  const handlevolunteer = () => {
    setisvolunteer(!isvolunteer);
  };

  const handledropdown = (e) => {
    setisstudent(e.target.value);
  };

  const handlechange = (e) => {
    const { name, value } = e.target;
    setform((prev) => ({ ...prev, [name]: value }));
  };

  const handleregister = async (e) => {
    e.preventDefault();
    seterror("");

    if (!form.name || !form.phone || !form.email || !form.password) {
      seterror("Please fill all required fields.");
      return;
    }

    if (!form.email.includes("@")) {
      seterror("Please enter a valid email.");
      return;
    }

    if (form.password.length < 6) {
      seterror("Password must be at least 6 characters.");
      return;
    }

    if (isvolunteer && !isstudent) {
      seterror("Please choose whether you are a student.");
      return;
    }

    try {
      setIsSubmitting(true);
      await registerUser({
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
      });
      clearSession();
      toast.success("Registration successful. Please login to continue.");
      navigate("/", {
        state: {
          showLogin: true,
          message: "Registration successful. Please login with your email and password.",
        },
      });
    } catch (err) {
      const message = err.message || "Registration failed.";
      seterror(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <form className="register-container" onSubmit={handleregister}>
        <h1>Register</h1>
        {error ? <p className="auth-alert auth-alert-error">{error}</p> : null}
        <div className="reg-name">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handlechange}
            placeholder="Name"
          />
        </div>
        <div className="reg-phone">
          <input
            type="number"
            name="phone"
            value={form.phone}
            onChange={handlechange}
            placeholder="Phone number"
          />
        </div>
        <div className="reg-email">
          <input
            type="text"
            name="email"
            value={form.email}
            onChange={handlechange}
            placeholder="Email"
          />
        </div>
        <div className="reg-password">
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handlechange}
            placeholder="Password"
          />
        </div>
        <div className="checkbox-cnt">
          <input type="checkbox" id="volunteer" onClick={handlevolunteer} />
          <label htmlFor="volunteer">Register as volunteer</label>
        </div>
        {isvolunteer ? (
          <>
            <div className="reg-dropdown">
              <label htmlFor="student">Are you a student ?</label>
              <select id="student" value={isstudent} onChange={handledropdown}>
                <option value="">--Select--</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div className="reg-volform">
              <input
                type="text"
                name="school"
                value={form.school}
                onChange={handlechange}
                placeholder="School/College"
              />
              <input
                type="text"
                name="organization"
                value={form.organization}
                onChange={handlechange}
                placeholder="Club/Organization"
              />
            </div>
          </>
        ) : (
          ""
        )}
        <div className="reg-btn">
          <button type="submit" className={isSubmitting ? "btn-loading" : ""} disabled={isSubmitting}>
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </div>
      </form>
    </>
  );
};

export default Register;
