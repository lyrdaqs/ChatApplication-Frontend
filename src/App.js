
import { HashRouter as Router, Route } from 'react-router-dom';
import Footer from './components/Footer.js';
import HomePage from './screens/HomePage'
import LoginPage from './screens/LoginPage.js';
import RegisterPage from './screens/RegisterPage.js';
import ProfilePage from './screens/ProfilePage.js';
import UserPage from './screens/UserPage'
import UserListPage from './screens/UserListPage.js';
import UserEditPage from './screens/UserEditPage.js';
import Chat from "./Containers/Chat.js";
import {Container} from 'react-bootstrap';
import React from "react";
import Navbar from './components/Navbar'
import PostDetail from './screens/PostDetail'

function App() {
  return (
    <Router>
          <Navbar/>
          <main className="py-3">
              <Container>
                  <Route exact path="/" component={HomePage} />
                  <Route path="/login" component={LoginPage} />
                  <Route path="/register" component={RegisterPage} />
                  <Route path="/profile" component={ProfilePage} />
                  <Route path="/admin/users" component={UserListPage} />
                  <Route path="/admin/user/:id/edit" component={UserEditPage} />
                  <Route path="/posts/:id" component={PostDetail} />
                  <Route path="/users/:id" component={UserPage} />
              </Container>
              <Route path="/chatroom/:id" component={Chat} />
          </main>
    </Router>
  );
}

export default App;

