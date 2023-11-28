import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';


function Navigation() {
    
    return (
        <Navbar className="d-flex justify-content-evenly">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/docs">Docs</Nav.Link>
            <Nav.Link href="/sources">Sources</Nav.Link>
        </Navbar>
    )
}

export default Navigation;