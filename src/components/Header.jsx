import { FaGlobe, FaShieldAlt, FaUserCircle } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { HashLink } from "react-router-hash-link";
import { clearSession, getCurrentUser, isLoggedIn } from "../utils/session";
const Header = (props) => {
    const { setisopen } = props
    const navigate = useNavigate()
    const [authState, setAuthState] = useState({
        isLoggedIn: false,
        name: "",
        role: "",
    })
    const [showProfileMenu, setshowProfileMenu] = useState(false)
    const profileMenuRef = useRef(null)

    useEffect(() => {
        const syncAuth = () => {
            const user = getCurrentUser()
            setAuthState({
                isLoggedIn: isLoggedIn(),
                name: user?.name || "User",
                role: user?.role || "",
            })
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
        if (authState.isLoggedIn && authState.role === "user") {
            navigate("/admin-login", {
                state: {
                    message: "You are logged in as user. Logout first to continue as admin.",
                },
            })
            return
        }
        if (authState.isLoggedIn && authState.role === "admin") {
            navigate("/admin/dashboard")
            return
        }
        navigate("/admin-login")
    }
    const handleLogout = () => {
        clearSession()
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
                    <span className="admin-login" onClick={openadmin}><FaShieldAlt />Admin</span>
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
