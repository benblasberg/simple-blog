import React, { useState } from "react";

import Posts from "../../components/Posts/Posts";
import PostPage from "../../components/PostPage/PostPage";
import CreatePost from "../../components/CreatePost/CreatePost";
import UserService from "../../services/Users/UserService";
import AuthUtil from "../../services/AuthUtil";

import { NavLink, Switch, Route, Redirect } from "react-router-dom";
import "./Blog.css";

export default function Blog() {
  const users = UserService.getUsers();
  const [user, setUser] = useState(users[0]);

  const handleSelectUser = event => {
    setUser(event.target.value);
    AuthUtil.setUser(user);
  };

  if (!AuthUtil.getCurrentUser()) {
    AuthUtil.setUser(user);
  }

  return (
    <div>
      <nav>
        <NavLink to="/posts">Home</NavLink>
        <NavLink to="/posts/new">New Post</NavLink>

        <div className="user-nav">
          <span>Signed in as: </span>
          <select value={user} onChange={handleSelectUser}>
            {users.map(user => (
              <option key={user.id} value={user.name}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
      </nav>

      <Switch>
        <Route exact path="/posts" component={Posts} />
        <Route exact path="/posts/new" component={CreatePost} />

        <Route exact path="/posts/:id" component={PostPage} />
        <Redirect from="/" to="/posts" exact />
        <Route render={() => <h2>Page not found</h2>} />
      </Switch>
    </div>
  );
}
