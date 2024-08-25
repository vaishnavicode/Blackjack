import About from './About';
import Home from './Home';
import Play from './Play';
function Menu() {
    return (
        <>
            <div className="btn-group" role="group" aria-label="Basic example">
                <button type="button" className="btn btn-primary" onClick={Home}>Home</button>
                <button type="button" className="btn btn-primary" onClick={Play}>Play</button>
                <button type="button" className="btn btn-primary" onClick={About}>About</button>
            </div>
        </>
    );
}

export default Menu;