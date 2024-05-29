package com.arturo.blog.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.arturo.blog.model.AuthRequest;
import com.arturo.blog.model.AuthResponse;

import com.arturo.blog.model.SignupRequest;
import com.arturo.blog.model.User;
import com.arturo.blog.repository.UserRepository;
import com.arturo.blog.service.AuthService;
import com.arturo.blog.service.UserService;
import com.arturo.blog.utils.JWTUtil;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    private final JWTUtil jwtUtil;

    private final UserService userService;

    private final UserRepository userRepository;

    private final AuthenticationManager authenticationManager;

    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers() {
        List<User> users = userRepository.findAll();
        return ResponseEntity.ok(users);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody SignupRequest signupRequest){
        if (authService.hasUserWithEmail(signupRequest.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("User already exists!");
        }
        User user = authService.register(signupRequest);
        if(user == null)
            return  ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            return ResponseEntity.status(HttpStatus.CREATED).body("User has been created! Thanks for registering!");
        }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest authRequest, HttpServletResponse response) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword()));
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect username or password");
        }
        
        final UserDetails userDetails = userService.userDetailsService().loadUserByUsername(authRequest.getEmail());
        Optional<User> optionalUser = userRepository.findByEmail(authRequest.getEmail());
        
        final String jwt = jwtUtil.generateToken(userDetails); 
        
        AuthResponse responseBody = new AuthResponse();
        if (optionalUser.isPresent()) {
            responseBody.setJwt(jwt);
        }
        
            
        Cookie cookie = new Cookie("Arturo-token", jwt);
        cookie.setMaxAge(24 * 60 * 60);
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        response.addCookie(cookie);
        
        return ResponseEntity.status(HttpStatus.OK).body("User logged in successfully. Enjoy my blog!");
    }


    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        Cookie cookie = new Cookie("Arturo-token", null);
        cookie.setPath("/"); 
        response.addCookie(cookie);
        
        return ResponseEntity.status(HttpStatus.OK).body("Logged out successfully");
    }




    

        
}