import { useContext } from 'react';
import DarkThemeContext from '../contexts/DarkThemeContext';

function Error() {
    
    // Define classlist for theme
    const isDarkContext = useContext(DarkThemeContext);
    const classList = isDarkContext ? `dark` : `light`;

    return (
        <div className={`${classList}`} style={{minHeight:`100vh`}}>
            <h2>Error! No such page!</h2>
        </div>

    )
}

export default Error;
