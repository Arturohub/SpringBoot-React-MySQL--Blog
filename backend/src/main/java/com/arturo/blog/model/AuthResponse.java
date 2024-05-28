package com.arturo.blog.model;

import lombok.Data;

@Data
public class AuthResponse {

    private String jwt;

    private Long userId;


}
