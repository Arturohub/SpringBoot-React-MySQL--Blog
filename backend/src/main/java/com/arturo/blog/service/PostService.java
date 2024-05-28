package com.arturo.blog.service;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.arturo.blog.model.Post;
import com.arturo.blog.repository.PostRepository;

@Service
public class PostService {
    
    @Autowired
    private PostRepository postRepository;


    public PostService(PostRepository postRepository){
        this.postRepository = postRepository;
    }

    //get all posts
    public Iterable<Post>getAllPosts(){
        return postRepository.findAll();
    }

    //get a single post
    public Post getPostById(Long id) {
        return postRepository.findById(id).orElse(null);
    }

    //create new post
    public Post createPost(Post post) {
        post.setCreatedAt(LocalDateTime.now());
        post.setUpdatedAt(LocalDateTime.now());
        return postRepository.save(post);
    }

    //remove a single post
    public void deletePost(Long id) {
        postRepository.deleteById(id);
    }

    //update a single post

    public Post updatePost(Long id, Post post) {
        Post existingPost = postRepository.findById(id).orElse(null);
        if (existingPost != null) {
            existingPost.setTitle(post.getTitle());
            existingPost.setSubtitle(post.getSubtitle());
            existingPost.setContent(post.getContent());
            existingPost.setImage(post.getImage());
            existingPost.setUpdatedAt(post.getUpdatedAt());
            return postRepository.save(existingPost);
        }
        return null;
    }


}
