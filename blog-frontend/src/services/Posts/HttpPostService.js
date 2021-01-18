import axios from "../axios";

class HttpPostService {
  getPosts() {
    return axios.get("/posts");
  }

  findPostById(id) {
    return axios.get(`/posts/${id}`);
  }

  createPost(post) {
    console.log(post);
    return axios.post("/posts", post);
  }
}

export default HttpPostService;
