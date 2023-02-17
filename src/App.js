import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Elso from "./sajatosztalyok/Elso";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";

import { Nav, Navbar, NavDropdown } from "react-bootstrap";

import Kereses from "./sajatosztalyok/Kereses"
import Buli from "./sajatosztalyok/Buli"
import Torles from "./sajatosztalyok/Torles"
import Kiallitas from "./sajatosztalyok/Kiallitas"
import Kiallitastorles from "./sajatosztalyok/Kiallitastorles"
import {Picker} from '@react-native-picker/picker';

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      
      <div>
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="#home">
        
        Dice Roller
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
        <Link to={"/Elso"} className="navbar-brand">
            Kezdőlap 
          </Link>
          <div className="navbar-nav mr-auto">
            
            
                <li className="nav-item">
              <Link to={"/Buli"} className="nav-link">
                Buli
              </Link>
                </li>

                <li className="nav-item">
              <Link to={"/Kereses"} className="nav-link">
                Keresés
              </Link>
                </li>   
              <li className="nav-item">
                <Link to={"/Kiallitas"} className="nav-link">
                 Kiállítások
                </Link>
              </li>
            

                
            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                  Moderator Board
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/Torles"} className="nav-link">
                 Esemény tőrlés
                </Link>
              </li>
                )}
                {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/Kiallitastorles"} className="nav-link">
                 Kiállítás tőrlés
                </Link>
              </li>
                )}
            
            {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  User
                </Link>
              </li>
            )}
          </div>
          
          <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav>
        {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
          
        </Nav>
      </Navbar.Collapse>
    </Navbar>

        
        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/Elso"]} component={Elso} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/mod" component={BoardModerator} />
            <Route path="/Torles" component={Torles} />

            <Route path="/Kereses" component={Kereses} />
            <Route path="/Buli" component={Buli} />
            <Route path="/Kiallitas" component={Kiallitas} />
            <Route path="/Kiallitastorles" component={Kiallitastorles} />

          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
