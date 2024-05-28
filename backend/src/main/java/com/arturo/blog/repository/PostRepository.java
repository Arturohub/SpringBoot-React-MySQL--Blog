package com.arturo.blog.repository;

import org.springframework.data.repository.CrudRepository;

import com.arturo.blog.model.Post;

public interface PostRepository extends CrudRepository<Post, Long> {

}
