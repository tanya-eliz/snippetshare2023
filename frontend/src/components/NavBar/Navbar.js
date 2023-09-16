import {Link} from 'react-router-dom';
import './Navbar.css';

const  Navbar= () => {
    return (
        <nav className="navbar">
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/snippets">Snippets</Link>
            </div>
        </nav>
    );
}
 
export default Navbar;