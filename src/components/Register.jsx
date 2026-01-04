import { useState } from "react";
import Header from "./Header";

const Register = () => {
    const [isvolunteer, setisvolunteer] = useState(false)
    const [isstudent, setisstudent] = useState("")
    const handlevolunteer = () => {
        setisvolunteer(!isvolunteer)
    }
    const handledropdown = (e) => {
        setisstudent(e.target.value)
    }
    return (
        <>
            <Header />
            <div className="register-container">
                <h1>Register</h1>
                <div className="reg-name">
                    <input type="text"  placeholder="Name"></input>
                </div>
                <div className="reg-phone">
                    <input type="number" placeholder="Phone number" />
                </div>
                <div className="reg-email">
                    <input type="text" placeholder="Email" />
                </div>
                <div className="reg-password">
                    <input type="password" placeholder="Password" />
                </div>
                <div className="checkbox-cnt">
                    <input type="checkbox" id="volunteer" onClick={handlevolunteer} />
                    <label htmlFor="volunteer">Register as volunteer</label>
                </div>
                {isvolunteer ? (
                    <>
                        <div className="reg-dropdown">
                            <label htmlFor="student">Are you a student ?</label>
                            <select value={isstudent} onChange={handledropdown}>
                                <option value="">--Select--</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </div>
                        <div className="reg-volform">
                            <input type="text" placeholder="School/College" />
                            <input type="text" placeholder="Club/Organization" />
                        </div></>) : ("")}
                <div className="reg-btn">
                    <button>Register</button>
                </div>
            </div>
        </>
    )
}
export default Register;