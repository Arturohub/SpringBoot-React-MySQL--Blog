package com.arturo.blog.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.arturo.blog.model.SignupRequest;
import com.arturo.blog.model.User;
import com.arturo.blog.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService{

  private final UserRepository userRepository;

   @Override
    public Boolean hasUserWithEmail(String email){
        return userRepository.findByEmail(email).isPresent();
    }

    @Override
    public User register(SignupRequest signupRequest){
        User user = new User();
        user.setEmail(signupRequest.getEmail());
        user.setUsername(signupRequest.getUsername());
        user.setPassword(new BCryptPasswordEncoder().encode(signupRequest.getPassword()));
        return userRepository.save(user);
    }

}
