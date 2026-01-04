import Header from "./Header";
import { NavLink } from "react-router";
import { useRef, useState } from "react";

const Home = () => {
    const [isopen, setisopen] = useState(false)
    const [isphone, setisphone] = useState(false)
    const [isadmin, setisadmin] = useState(false)
    const [isvalue, setisvalue] = useState(false)
    const [isvision, setisvision] = useState(false)
    const [ismission, setismission] = useState(false)
    const [otp, setotp] = useState(["", "", "", "", "", ""])
    const inputrefer = useRef([])
    const handleotp = (e, index) => {
        const otps = e.target.value
        if (isNaN(otps)) {
            return;
        }
        else {

            const newotp = [...otp]
            newotp[index] = otps
            setotp(newotp);
        }
        if (otps && index < otp.length - 1) {
            inputrefer.current[index + 1].focus();
        }

    }
    const handlekey = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputrefer.current[index - 1].focus();
        }
    }
    const handlesubmit = (e) => {
        e.preventDefault()
        console.log(otp)
    }
    const handlephonelogin = () => {
        setisphone(true)
        setisopen(false)
    }
    const handleclose = () => {
        setisopen(!isopen)
    }
    const handleclosephone = () => {
        setisphone(!isphone)
    }
    const handlecloseadmin = () => {
        setisadmin(!isadmin)
    }
    const handlevalue = () => {
        setisvalue(!isvalue)
    }
    const handlevision = () => {
        setisvision(!isvision)
    }
    const handlemisson = () => {
        setismission(!ismission)
    }
    return (
        <>
            <Header setisopen={setisopen} isopen={isopen} isadmin={isadmin} setisadmin={setisadmin} isphone={isphone} setisphone={setisphone} />
            <div className={`Home ${(isopen || isphone || isadmin) ? "blur" : ""} `} id="home">
                <img src="public/logo-removebg-preview.png" alt="Kural Logo" />
                <h1>KURAL</h1>
                <p> ~ A Digital Voice That Reaches Goverment Directly.</p>

                <div className="home-btn">
                    <span className="btn"><NavLink to="/reportissue" style={{ textDecoration: "none", color: "white" }}><b>Report an Issue</b></NavLink></span>
                    <span className="btn"><b>Check Status</b></span>
                </div>
                <div className="detail-box">

                    <div className="box">
                        <div className="box-content">
                            <img src="public/compliant-raised.png" alt="Complaint-raised" />
                            <h1>368</h1>
                            <p>Complaints Raised</p>
                        </div>
                    </div>
                    <div className="box">
                        <div className="box-content">
                            <img src="public/compliantsolved.jpg" alt=" complaint-resolved" />
                            <h1>240</h1>
                            <p>Complaints Resolved</p>
                        </div>
                    </div>
                    <div className="box">
                        <div className="box-content">
                            <img src="public/active users.jpg" alt="Active-user" className="comp-img" />
                            <h1>1596</h1>
                            <p>Active Users</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`phone-logs ${isphone ? "show" : ""}`}>
                <div className="login-phonenumber">
                    <button className="close-btn" onClick={handleclosephone}>x</button>
                    <h1>Login</h1>
                    <div className="phonenumber">
                        <label htmlFor="">Phone Number</label>
                        <input type="number" placeholder="Phone Number" />
                        <button>Send Otp</button>
                    </div>

                    <div className="otp">
                        <label htmlFor="otps">OTP</label>
                        {otp.map((digit, i) => (
                            <input key={i} ref={(el) => (inputrefer.current[i] = el)} value={digit} maxLength="1" onChange={(e) => handleotp(e, i)} onKeyDown={(e) => handlekey(e, i)} />
                        ))}
                    </div>
                    <div className="resend-otp">
                        <button>Resend OTP</button>
                    </div>
                    <div className="otp-login">
                        <button onClick={handlesubmit}>Login</button>
                    </div>
                </div>
            </div>
            <div className={`adminlogin ${isadmin ? "show" : ""}`}>
                <button className="close-btn" onClick={handlecloseadmin}>x</button>
                <h1>Admin Login</h1>
                <div className="email-login-admin">
                    <div className="email-admin">
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" placeholder="e.g.example@gamil.com" />
                    </div>
                    <div className="password-admin">
                        <label htmlFor="pass">Password</label>
                        <input type="password" id="pass" placeholder="Enter password" />
                        <h5>Forget password?</h5>
                    </div>
                    <div className="btn-admin">
                        <button className="login-btn-admin">Login</button>
                    </div>
                </div>
            </div>
            <div className={`login-page ${isopen ? "show" : ""}`}>
                <button className="close-btn" onClick={handleclose}>x</button>
                <h1>Login</h1>
                <div className="email-login">
                    <div className="email">
                        <label htmlFor="Email">Email</label>
                        <input type="text" id="Email" placeholder="e.g. example@gmail.com" />
                        <div className="password">
                            <label htmlFor="passs">Password</label>
                            <input type="password" id="passs" placeholder="Enter password" />
                            <h5>Forget password?</h5>
                        </div>
                        <div className="btn">
                            <button className="login-btn">Login</button>
                        </div>
                        <h3>or</h3>
                    </div>
                </div>
                <div className="login-withphone">
                    <button className="phone-log" onClick={handlephonelogin}>Login with Phone Number</button>
                </div>
                <div className="new-user">
                    <hr />
                    <span>New to Kural?<NavLink to="/register" >Register</NavLink></span>
                    <hr />
                </div>
            </div>
            <section className="aboutus" id="about">
                <div className="aboutus-cnt">
                    <div className="headerofabout-ctn">
                        <h2>Who We Are?</h2>
                        <p>
                            Kural is a civic-tech platform that gives citizens a digital voice. We bridge people and government with fast, transparent, and accountable solutions.
                        </p>
                    </div>
                    <div className="scrollof-abt">
                        <div className="values-ctn">
                            <div className={`header-values ${ismission || isvision ? "shade" : ""}`}>
                                <h3 onClick={handlevalue}>01|Our values</h3>
                            </div>
                            {isvalue ? (
                                <div className="desc-values">
                                    <ul className="values-list">
                                        <li>Community</li>
                                        <li>Collaboration</li>
                                        <li>Passion</li>
                                        <li>Environmentalism</li>
                                        <li>Innovation</li>
                                    </ul>
                                </div>) : ("")}
                        </div>
                        <div className="Mission-ctn">
                            <div className={`header-mission ${isvalue || isvision ? "shade" : ""}`}>
                                <h3 onClick={handlemisson}>02|Mission</h3>
                            </div>
                            {ismission ? (
                                <div className="desc-Mission">
                                    Empower every citizen to raise issues easily and see them solved with trust and speed.
                                </div>) : ("")}
                        </div>
                        <div className="Vision-ctn">
                            <div className={`header-vision ${isvalue || ismission ? "shade" : ""}`}>
                                <h3 onClick={handlevision}>03|Vision</h3>
                            </div>
                            {isvision ? (
                                <div className="desc-vision">
                                    Build cleaner, safer, greener cities where every voice leads to action.
                                </div>) : ("")}
                        </div>
                        <div className="scrollof-abtimg">
                            {isvalue ? (<img src="public/aboutvalue-img.png" alt="aboutvalue-img" />) : ("")}
                            {ismission ? (<img src="public/aboutmission-img.png" alt="aboutmission-img" />) : ("")}
                            {isvision ? (<img src="public/aboutvision-img.png" alt="aboutvision-img" className="vision-img" />) : ("")}
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}
export default Home;