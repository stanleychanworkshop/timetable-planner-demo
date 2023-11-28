import { Route, Switch } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import Docs from './pages/Docs';
import Sources from './pages/Sources';
import Error from './pages/Error';
import Menu from './components/Menu';
import Stack from 'react-bootstrap/Stack';
import axios from 'axios';
import DarkThemeContext from './contexts/DarkThemeContext';

function App() {

  /* State about using dark theme or not, default to be false (same as DarkThemeContext value)
  Still needs to be passed to <Menu /> --> <ThemeSwitch /> to allow theme update */
  const [isDarkTheme, setDarkTheme] = useState(false);

  // Check localStorage for dark theme status
  useEffect(() => {
    const userTheme = localStorage.getItem(`isDarkTheme`);
    if (userTheme) {
      setDarkTheme(JSON.parse(userTheme));
    }
  }, []);
  
  // State about user; empty object means not logged in
  const [user, setUser] = useState({});

  // Check localStorage for log-in status
  useEffect(() => {
    const userData = localStorage.getItem(`timetableUser`);
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  // State about selected courses
  const [selected, setSelected] = useState([]); // State for the unique IDs of selected courses
  const [selectedCodes, setSelectedCodes] = useState([]);
  const [selectedCredits, setSelectedCredits] = useState(0);
  const [creditLimit, setCreditLimit] = useState(15);

  // State about occupation of timeslots
  const [timeslots, setTimeslots] = useState([
      [``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``],
      [``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``],
      [``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``],
      [``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``],
      [``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``],
      [``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``]
  ]);

  // State about timetable updated
  const [update, setUpdate] = useState(0);

  // Fetch courses data from local raw API
  const [coursesData, setCoursesData] = useState([]);
  const [fetching, setFetching] = useState(false);
  useEffect(() => {
    // Async function to make sure the await statement run before executing later codes?
    async function fetchData() {
      setFetching(true);
      
      // Get the Promise object given by the server (deployed with Railway)
      const response = await axios.get(`https://cpsc2600-server-railway-production.up.railway.app/api/raw`); // Must use HTTPS for Netlify

      // Extract the courses data from the Promise object, and "clean" the course code
      const processingData = response.data.data.courseSchedules.map(course => (
        {...course, code: course.code.replace(/\s/g, ``)} // Remove the space in course code e.g. CPSC 2600 -> CPSC2600
      ));

      // Sort the courses according to course code, then CRN
      processingData.sort((a, b) => {
        if (a.code < b.code) {
            return -1;
        }
        if (a.code > b.code) {
            return 1;
        }
        if (a.CRN < b.CRN) {
            return -1;
        }
        if (a.CRN > b.CRN) {
            return 1;
        }
        return 0;
      });

      // Update the state of the courses data
      setCoursesData(processingData);

      // End fetching, update state to show course list
      setFetching(false);
    }

    fetchData();
  }, []);

  // State of different alerts
  const [alerts, setAlerts] = useState({
    loginOK: false,
    logoutOK: false,
    createAccountOK: false,
    selectCourseOK: false,
    removeCourseOK: false,
    timeClash: false,
    duplicatedCode: false,
    overCredit: false,
    savePlanOK: false,
    loadPlanOK: false
  });
  
  return (
    // Wrap the whole UI with theme context
    <DarkThemeContext.Provider value={isDarkTheme}>
      <Stack>
        <Menu
          isDarkTheme={isDarkTheme}
          setDarkTheme={setDarkTheme}
          user={user}
          setUser={setUser}
          timeslots={timeslots}
          setTimeslots={setTimeslots}
          update={update}
          setUpdate={setUpdate}
          selected={selected}
          setSelected={setSelected}
          selectedCodes={selectedCodes}
          setSelectedCodes={setSelectedCodes}
          selectedCredits={selectedCredits}
          setSelectedCredits={setSelectedCredits}
          creditLimit={creditLimit}
          setCreditLimit={setCreditLimit}
          alerts={alerts}
          setAlerts={setAlerts}
        />
        <Switch>
          <Route path="/" exact>
            <Home
              coursesData={coursesData}
              user={user}
              setUser={setUser}
              timeslots={timeslots}
              setTimeslots={setTimeslots}
              update={update}
              setUpdate={setUpdate}
              selected={selected}
              setSelected={setSelected}
              selectedCodes={selectedCodes}
              setSelectedCodes={setSelectedCodes}
              selectedCredits={selectedCredits}
              setSelectedCredits={setSelectedCredits}
              creditLimit={creditLimit}
              setCreditLimit={setCreditLimit}
              fetching={fetching}
              alerts={alerts}
              setAlerts={setAlerts}
            />
          </Route>
          <Route path="/docs" component={Docs} exact />
          <Route path="/sources" component={Sources} exact />
          <Route component={Error} />
        </Switch>
      </Stack>
    </DarkThemeContext.Provider>
  );
}

export default App;
