package com.arturo.blog.model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="posts_springboot")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String subtitle;

    private LocalDateTime created_at;

    private LocalDateTime updated_at;

    private String content;

    private String image;

    private Long userId;

    
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getTitle() {
        return title;
    }
    
    public void setTitle(String title) {
        this.title = title;
    }
    
    public String getSubtitle() {
        return subtitle;
    }
    
    public void setSubtitle(String subtitle) {
        this.subtitle = subtitle;
    }
    
    public LocalDateTime getCreatedAt() {
        return created_at;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.created_at = createdAt;
    }
    
    public LocalDateTime getUpdatedAt() {
        return updated_at;
    }
    
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updated_at = updatedAt;
    }
    
    public String getContent() {
        return content;
    }
    
    public void setContent(String content) {
        this.content = content;
    }
    
    public String getImage() {
        return image;
    }
    
    public void setImage(String image) {
        this.image = image;
    }
    
    public Long getUserId() {
        return userId;
    }
    
    public void setUserId(Long userId) {
        this.userId = userId;
    }
    
    

}