import { FaGlobe, FaShieldAlt } from "react-icons/fa";
import { NavLink } from "react-router";
import { HashLink } from "react-router-hash-link";
const Header = (props) => {
    const { setisopen, isopen, isadmin, setisadmin, isphone, setisphone } = props
    const openlogin = () => {
        setisopen(true);
    }
    const openadmin = () => {
        setisadmin(true);
        setisopen(false);
        setisphone(false);
    }
    return (
        <>
            <div className="header">
                <div className="header-option">
                    <span className="nav"><HashLink smooth to="/#home" style={{textDecoration:"none"}}>Home</HashLink></span>
                    <span className="nav"><a href="#about" style={{ textDecoration: "none" }}>About</a></span>
                    <span className="nav"><NavLink to="/reportissue" style={{textDecoration:"none"}}>Report</NavLink></span>
                    <span className="nav"><NavLink to="/checkstatus" style={{textDecoration:"none"}}>Check status</NavLink></span>
                    <span className="nav"><NavLink to="/transparencymap" style={{textDecoration:"none"}}>Transparency map</NavLink></span>
                    <span className="nav">Civic Awareness</span>
                    <span className="nav">Chatbot</span>
                    <span className="language"><FaGlobe /></span>
                    <span className="login" onClick={openlogin}>Login</span>
                    <span className="admin-login" onClick={openadmin}><FaShieldAlt />Admin login</span>
                </div>
                <div className="header-logo">
                    <img src="public/logo-removebg-preview.png" alt="Kural Logo" />
                    <h3>Kural</h3>
                </div>
            </div>
        </>
    )
}
export default Header;