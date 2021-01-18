package com.benb.blog.controllers;

import com.benb.blog.data.PostRepository;
import com.benb.blog.model.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@CrossOrigin
@RestController
public class PostController {

    @Autowired
    private PostRepository postRepository;

    @GetMapping("/posts")
    public Iterable<Post> getAllPosts() {
        return postRepository.findAll();
    }

    @GetMapping("/posts/{id}")
    public Post getPostById(@PathVariable("id") final long id) {
        return postRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, String.format("No post found for post id: %d", id)));
    }

    @PostMapping("/posts")
    public Post createPost(@RequestBody final Post post) {
        return postRepository.save(post);
    }
}
