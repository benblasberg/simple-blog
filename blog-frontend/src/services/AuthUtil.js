import axios from "./axios";

class AuthUtil {
  constructor() {
    this.interceptor = null;
  }

  setUser(user) {
    if (this.interceptor !== null) {
      console.log(`ejecting interceptor ${this.interceptor}`);
      axios.interceptors.request.eject(this.interceptor);
    }

    this.interceptor = axios.interceptors.request.use(function(config) {
      const basicAuth = `Basic ${window.btoa(`${user.name}:${user.password}`)}`;
      config.headers.Authorization = basicAuth;

      return config;
    });

    this.currentUser = user;
    console.log(`set user to ${JSON.stringify(user)}`);
  }

  getCurrentUser() {
    console.log(`current user is ${JSON.stringify(this.currentUser)}`);
    return this.currentUser;
  }
}

const instance = new AuthUtil();

export default instance;
