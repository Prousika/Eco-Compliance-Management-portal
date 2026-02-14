import { FaGlobe, FaShieldAlt, FaUserCircle } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { HashLink } from "react-router-hash-link";
const Header = (props) => {
    const { setisopen, isopen, isadmin, setisadmin, isphone, setisphone } = props
    const navigate = useNavigate()
    const [authState, setAuthState] = useState({
        isLoggedIn: false,
        name: "",
    })
    const [showProfileMenu, setshowProfileMenu] = useState(false)
    const profileMenuRef = useRef(null)

    useEffect(() => {
        const syncAuth = () => {
            const isLoggedIn = localStorage.getItem("ecoLoggedIn") === "true"
            const name = localStorage.getItem("ecoLoggedInName") || localStorage.getItem("ecoLoggedInUser") || "User"
            setAuthState({ isLoggedIn, name })
        }

        syncAuth()
        window.addEventListener("storage", syncAuth)
        window.addEventListener("eco-auth-changed", syncAuth)

        return () => {
            window.removeEventListener("storage", syncAuth)
            window.removeEventListener("eco-auth-changed", syncAuth)
        }
    }, [])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
                setshowProfileMenu(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const openlogin = () => {
        if (setisopen) {
            setisopen(true);
        }
    }
    const openadmin = () => {
        if (setisadmin) {
            setisadmin(true);
        }
        if (setisopen) {
            setisopen(false);
        }
        if (setisphone) {
            setisphone(false);
        }
    }
    const handleLogout = () => {
        localStorage.removeItem("ecoLoggedIn")
        localStorage.removeItem("ecoLoggedInName")
        localStorage.removeItem("ecoLoggedInUser")
        window.dispatchEvent(new Event("eco-auth-changed"))
        setshowProfileMenu(false)
        navigate("/")
    }
    return (
        <>
            <div className="header">
                <div className="header-option">
                    <span className="nav"><HashLink smooth to="/#home" className="nav-link">Home</HashLink></span>
                    <span className="nav"><HashLink smooth to="/#about" className="nav-link">About</HashLink></span>
                    <span className="nav"><NavLink to="/reportissue" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Report</NavLink></span>
                    <span className="nav"><NavLink to="/checkstatus" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Check status</NavLink></span>
                    <span className="nav"><NavLink to="/transparencymap" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Transparency map</NavLink></span>
                    <span className="nav"><NavLink to="/eco-awareness" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Eco Awareness</NavLink></span>
                    <span className="language"><FaGlobe /></span>
                    {authState.isLoggedIn ? (
                        <div className="profile-menu" ref={profileMenuRef}>
                            <button
                                type="button"
                                className="profile-chip"
                                onClick={() => setshowProfileMenu(!showProfileMenu)}
                            >
                                <FaUserCircle className="profile-avatar" />
                                {authState.name}
                            </button>
                            {showProfileMenu ? (
                                <div className="profile-dropdown">
                                    <button type="button" onClick={handleLogout}>Logout</button>
                                </div>
                            ) : null}
                        </div>
                    ) : (
                        <span className="login" onClick={openlogin}>Login</span>
                    )}
                    <span className="admin-login" onClick={openadmin}><FaShieldAlt />Admin login</span>
                </div>
                <div className="header-logo">
                    <img src="public/logo-removebg-preview.png" alt="Eco-Compliance Portal Logo" />
                    <h3>Eco-Compliance Portal</h3>
                </div>
            </div>
        </>
    )
}
export default Header;
