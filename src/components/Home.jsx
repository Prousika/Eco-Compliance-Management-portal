import Header from "./Header";
import { NavLink, useLocation, useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";

const Home = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isopen, setisopen] = useState(false);
    const [isphone, setisphone] = useState(false);
    const [isadmin, setisadmin] = useState(false);
    const [isvalue, setisvalue] = useState(false);
    const [isvision, setisvision] = useState(false);
    const [ismission, setismission] = useState(false);
    const [otp, setotp] = useState(["", "", "", "", "", ""]);
    const [loginEmail, setloginEmail] = useState("");
    const [loginPassword, setloginPassword] = useState("");
    const [authNotice, setauthNotice] = useState("");
    const [loginError, setloginError] = useState("");
    const [adminNotice, setadminNotice] = useState("");
    const inputrefer = useRef([]);

    const handleotp = (e, index) => {
        const otps = e.target.value;
        if (isNaN(otps)) {
            return;
        }

        const newotp = [...otp];
        newotp[index] = otps;
        setotp(newotp);

        if (otps && index < otp.length - 1) {
            inputrefer.current[index + 1].focus();
        }
    };

    const handlekey = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputrefer.current[index - 1].focus();
        }
    };

    const completeLogin = (name) => {
        localStorage.setItem("ecoLoggedIn", "true");
        localStorage.setItem("ecoLoggedInName", name || "User");
        window.dispatchEvent(new Event("eco-auth-changed"));
        setisopen(false);
        setisphone(false);
        setisadmin(false);
        setauthNotice("");
        setloginError("");
        setadminNotice("");

        if (location.state?.redirectTo) {
            navigate(location.state.redirectTo, { replace: true });
        }
    };

    const handleUserLogin = (e) => {
        e.preventDefault();
        setloginError("");

        const users = JSON.parse(localStorage.getItem("ecoUsers") || "[]");
        const normalizedEmail = loginEmail.trim().toLowerCase();
        const matchedUser = users.find((user) => user.email === normalizedEmail);

        if (!matchedUser) {
            setloginError("User not found. Please register first.");
            return;
        }

        if (matchedUser.password !== loginPassword) {
            setloginError("Invalid email or password.");
            return;
        }

        completeLogin(matchedUser.name || "User");
    };

    const handlesubmit = (e) => {
        e.preventDefault();
        setloginError("Phone login is not enabled now. Please use registered email and password.");
    };

    const handleAdminLogin = (e) => {
        e.preventDefault();
        setadminNotice("Admin module is pending. Home page remains same for now.");
    };

    const handlephonelogin = () => {
        setisphone(true);
        setisopen(false);
    };

    const handleclose = () => {
        setisopen(!isopen);
    };

    const handleclosephone = () => {
        setisphone(!isphone);
    };

    const handlecloseadmin = () => {
        setisadmin(!isadmin);
    };

    const handlevalue = () => {
        setisvalue(!isvalue);
    };

    const handlevision = () => {
        setisvision(!isvision);
    };

    const handlemisson = () => {
        setismission(!ismission);
    };

    useEffect(() => {
        if (location.state?.loginRequired) {
            setauthNotice(location.state.message || "Please login first to access this page.");
            setisopen(true);
            navigate("/", { replace: true, state: {} });
            return;
        }

        if (location.state?.showLogin) {
            setauthNotice(location.state.message || "Please login with your registered credentials.");
            setisopen(true);
            navigate("/", { replace: true, state: {} });
        }
    }, [location.state, navigate]);

    return (
        <>
            <Header
                setisopen={setisopen}
                isopen={isopen}
                isadmin={isadmin}
                setisadmin={setisadmin}
                isphone={isphone}
                setisphone={setisphone}
            />
            <div className={`Home ${(isopen || isphone || isadmin) ? "blur" : ""} `} id="home">
                <img src="public/logo-removebg-preview.png" alt="Eco-Compliance Portal Logo" />
                <h1>Eco-Compliance Portal</h1>
                <p>~A smart platform for campus environmental issue tracking.</p>
                {authNotice ? <p className="auth-alert">{authNotice}</p> : null}

                <div className="home-btn">
                    <span className="btn"><NavLink to="/reportissue" style={{ textDecoration: "none", color: "white" }}><b>Report an Issue</b></NavLink></span>
                    <span className="btn"><NavLink to="/checkstatus" style={{ textDecoration: "none", color: "white" }}><b>Check Status</b></NavLink></span>
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
                            <img src="public/compliantsolved.jpg" alt="complaint-resolved" />
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
                        <label>Phone Number</label>
                        <input type="number" placeholder="Phone Number" />
                        <button>Send Otp</button>
                    </div>

                    <div className="otp">
                        <label htmlFor="otps">OTP</label>
                        {otp.map((digit, i) => (
                            <input
                                key={i}
                                ref={(el) => (inputrefer.current[i] = el)}
                                value={digit}
                                maxLength="1"
                                onChange={(e) => handleotp(e, i)}
                                onKeyDown={(e) => handlekey(e, i)}
                            />
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
                        <button className="login-btn-admin" onClick={handleAdminLogin}>Login</button>
                    </div>
                    {adminNotice ? <p className="auth-alert">{adminNotice}</p> : null}
                </div>
            </div>

            <div className={`login-page ${isopen ? "show" : ""}`}>
                <button className="close-btn" onClick={handleclose}>x</button>
                <h1>Login</h1>
                <form className="email-login" onSubmit={handleUserLogin}>
                    <div className="email">
                        <label htmlFor="Email">Email</label>
                        <input
                            type="text"
                            id="Email"
                            placeholder="e.g. example@gmail.com"
                            value={loginEmail}
                            onChange={(e) => setloginEmail(e.target.value)}
                        />
                        <div className="password">
                            <label htmlFor="passs">Password</label>
                            <input
                                type="password"
                                id="passs"
                                placeholder="Enter password"
                                value={loginPassword}
                                onChange={(e) => setloginPassword(e.target.value)}
                            />
                            <h5>Forget password?</h5>
                        </div>
                        <div className="btn">
                            <button className="login-btn" type="submit">Login</button>
                        </div>
                        {loginError ? <p className="auth-alert auth-alert-error">{loginError}</p> : null}
                        <h3>or</h3>
                    </div>
                </form>
                <div className="login-withphone">
                    <button className="phone-log" onClick={handlephonelogin}>Login with Phone Number</button>
                </div>
                <div className="new-user">
                    <hr />
                    <span>New user?<NavLink to="/register">Register</NavLink></span>
                    <hr />
                </div>
            </div>

            <section className="aboutus" id="about">
                <div className="aboutus-cnt">
                    <div className="headerofabout-ctn">
                        <h2>Who We Are?</h2>
                        <p>
                            The Campus Eco-Compliance Management System is a smart digital platform that empowers students and administrators to report, monitor, and resolve environmental issues transparently.
                            <br />
                            Our goal is to create a campus culture where sustainability is not just encouraged - it is actively practiced and tracked.
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
                                        <li>Sustainability</li>
                                        <li>Shared Responsibility</li>
                                        <li>Campus Participation</li>
                                        <li>Clear Accountability</li>
                                        <li>Smart Solutions</li>
                                    </ul>
                                </div>
                            ) : ("")}
                        </div>
                        <div className="Mission-ctn">
                            <div className={`header-mission ${isvalue || isvision ? "shade" : ""}`}>
                                <h3 onClick={handlemisson}>02|Mission</h3>
                            </div>
                            {ismission ? (
                                <div className="desc-Mission">
                                    To empower students and staff to actively participate in maintaining environmental standards within the campus by providing a simple, transparent, and accountable digital platform for eco-issue reporting and monitoring.
                                </div>
                            ) : ("")}
                        </div>
                        <div className="Vision-ctn">
                            <div className={`header-vision ${isvalue || ismission ? "shade" : ""}`}>
                                <h3 onClick={handlevision}>03|Vision</h3>
                            </div>
                            {isvision ? (
                                <div className="desc-vision">
                                    To build a sustainable, eco-conscious campus where environmental responsibility is integrated into everyday activities and every reported issue leads to measurable action and improvement.
                                </div>
                            ) : ("")}
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
    );
};

export default Home;
