import { useContext } from 'react';
import DarkThemeContext from '../contexts/DarkThemeContext';

function Sources() {
    
    // Define classlist for theme
    const isDarkContext = useContext(DarkThemeContext);
    const classList = isDarkContext ? `dark` : `light`;

    // Information of sources
    const sources = (
        <>
            <h1>Sources</h1>
            <p>The information below is about the sources of raw data and major packages used in this app.</p>
            <p>For references about how a particular part of the code is written, please refer to comments of different files.</p>
            <br></br>

            <h3>Raw data of all courses</h3>
            <p>Provided by Ms. Samantha Liu at <a href="https://course-planner-58sw.onrender.com/api/v1/schedule/202410" target="_blank" rel="noreferrer">
                    https://course-planner-58sw.onrender.com/api/v1/schedule/202410
                </a>
            </p>
            <br></br>

            <h3>Major packages used</h3>
            <ul>
                <li><a href="https://axios-http.com/docs/intro" target="_blank" rel="noreferrer">Axios</a></li>
                <li><a href="https://github.com/kelektiv/node.bcrypt.js" target="_blank" rel="noreferrer">bcrypt</a></li>
                <li><a href="https://github.com/open-cli-tools/concurrently" target="_blank" rel="noreferrer">concurrently</a></li>
                <li><a href="https://github.com/expressjs/cors" target="_blank" rel="noreferrer">CORS</a></li>
                <li><a href="https://github.com/remy/nodemon" target="_blank" rel="noreferrer">nodemon</a></li>
                <li><a href="https://react-bootstrap.netlify.app/" target="_blank" rel="noreferrer">React Bootstrap</a></li>
                <li><a href="https://react-icons.github.io/react-icons/" target="_blank" rel="noreferrer">React Icons</a></li>
                <li><a href="https://reactrouter.com/en/main" target="_blank" rel="noreferrer">React Router</a></li>
                <li><a href="https://github.com/uuidjs/uuid" target="_blank" rel="noreferrer">UUID</a></li>
            </ul>      
        </>
    );

    return (
        <div className={`p-5 ${classList}`} style={{minHeight:`100vh`, minWidth:`100%`, fontSize:`0.9rem`}}>
            {sources}
        </div>
    )
}

export default Sources;
