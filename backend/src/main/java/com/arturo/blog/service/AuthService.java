package com.arturo.blog.service;

import com.arturo.blog.model.SignupRequest;
import com.arturo.blog.model.User;

public interface AuthService {

    User register(SignupRequest signupRequest);

    Boolean hasUserWithEmail(String email);
}
