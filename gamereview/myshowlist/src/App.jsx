import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Home } from './components/home';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Loginpage } from './components/loginpage';
import { SignupPage } from './components/signUp';
import { Profile } from './components/profile';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
import GameContext from './components/GameContext';
import { AuthProvider } from './components/AuthContext';
import { Updatescore } from './components/updatescore';

function AppNavbar() {
  const location = useLocation();


  if (location.pathname === '/') {
    return null;
  }

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">MyGameList</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/home">Home</Nav.Link>
          <Nav.Link href="/loginpage">LogIn</Nav.Link>
          <Nav.Link href="/signIn">SignUp</Nav.Link>
          <Nav.Link href="/profile">Profile</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <GameContext.Provider value={[]}>
          <div className="app">
            <AppNavbar />
            <Routes>
              <Route path="/" element={<Loginpage />} />
              <Route path="/home" element={<Home />} />
              <Route path="/loginpage" element={<Loginpage />} />
              <Route path="/signIn" element={<SignupPage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/updatescore/:id" element={<Updatescore />} />

              
            </Routes>
          </div>
        </GameContext.Provider>
      </Router>
    </AuthProvider>
  );
}

export default App;
