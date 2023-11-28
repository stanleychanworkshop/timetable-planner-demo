import { createContext } from 'react';

// A context with value whether dark theme is used; default to be false
const DarkThemeContext = createContext(false);

export default DarkThemeContext;