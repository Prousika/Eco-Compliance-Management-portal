import { useState } from "react";
import { useNavigate } from "react-router";
import Header from "./Header";

const Register = () => {
  const navigate = useNavigate();
  const [isvolunteer, setisvolunteer] = useState(false);
  const [isstudent, setisstudent] = useState("");
  const [error, seterror] = useState("");
  const [form, setform] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    school: "",
    organization: "",
  });

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

  const handleregister = (e) => {
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

    const users = JSON.parse(localStorage.getItem("ecoUsers") || "[]");
    const normalizedEmail = form.email.trim().toLowerCase();
    const alreadyExists = users.some((user) => user.email === normalizedEmail);

    if (alreadyExists) {
      seterror("This email is already registered. Please login.");
      return;
    }

    const newUser = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: normalizedEmail,
      password: form.password,
      isvolunteer,
      isstudent,
      school: form.school.trim(),
      organization: form.organization.trim(),
    };

    localStorage.setItem("ecoUsers", JSON.stringify([...users, newUser]));

    navigate("/", {
      state: {
        showLogin: true,
        message: "Registration successful. Please login with your email and password.",
      },
    });
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
          <button type="submit">Register</button>
        </div>
      </form>
    </>
  );
};

export default Register;
