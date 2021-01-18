import axios from "./axios";

class AuthUtil {
  setUser(user) {
    axios.interceptors.request.use(function(config) {
      const basicAuth = `Basic ${window.btoa(`${user.name}:${user.password}`)}`;
      config.headers.Authorization = basicAuth;

      return config;
    });

    this.currentUser = user;
  }

  getCurrentUser() {
    return this.currentUser;
  }
}

const instance = new AuthUtil();

export default instance;
