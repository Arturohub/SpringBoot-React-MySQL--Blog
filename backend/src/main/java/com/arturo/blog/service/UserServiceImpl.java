package com.arturo.blog.service;

import com.arturo.blog.model.User;
import com.arturo.blog.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import java.util.ArrayList;


import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public UserDetailsService userDetailsService(){
    return new UserDetailsService() {
        @Override
        public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
            User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found. Please try again or register"));
            return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), new ArrayList<>());
        }
    };
}

    

}
