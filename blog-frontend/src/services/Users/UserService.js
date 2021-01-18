class UserService {
  constructor() {
    this.idGenerator = 1;
    this.users = [
      {
        id: this.idGenerator++,
        name: "Bill Brasky",
        password: "test"
      },
      {
        id: this.idGenerator++,
        name: "Will Williams",
        password: "test2"
      }
    ];
  }

  getUsers() {
    return this.users;
  }
}

const instance = new UserService();

export default instance;
