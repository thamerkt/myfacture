package com.MyFacture.MyFacture.Controller;

import com.MyFacture.MyFacture.Entity.User;
import com.MyFacture.MyFacture.Repository.UserRepository;
import com.MyFacture.MyFacture.Service.JWTService; // Make sure this service exists
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JWTService jwtService;

    @PostMapping("register")
    public ResponseEntity<?> registerUser(@Validated @RequestBody User user, BindingResult result) {
        Map<String, Object> response = new HashMap<>();
        try {
            if (result.hasErrors()) {
                response.put("message", "Validation error");
                return ResponseEntity.badRequest().body(response);
            }

            // Check if user already exists
            if (userRepository.findByEmail(user.getEmail()).isPresent()) {
                response.put("status", "error");
                response.put("message", "User with this email already exists");
                return ResponseEntity.badRequest().body(response);
            }

            // Encrypt password and save the user
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            userRepository.save(user);

            response.put("message", "User registered successfully");
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            response.put("message", "An unexpected error occurred: " + e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }

    // Login route with try-catch, JSON response, and JWT token generation
    @PostMapping("login")
    public ResponseEntity<?> loginUser(@RequestBody User loginRequest) {
        Map<String, Object> response = new HashMap<>();
        try {
            Optional<User> userOptional = userRepository.findByEmail(loginRequest.getEmail());

            if (userOptional.isEmpty()) {
                response.put("status", "error");
                response.put("message", "User not found");
                return ResponseEntity.status(404).body(response);
            }

            User user = userOptional.get();

            // Validate the password
            if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
                response.put("status", "error");
                response.put("message", "Invalid credentials");
                return ResponseEntity.status(401).body(response);
            }

            // Generate JWT token after successful login
            String token = jwtService.generateToken(user); // Using JWTService to generate the token

            // Successful login response with JWT token
            response.put("status", "success");
            response.put("message", "Login successful");
            response.put("user", user.getEmail());  // Optionally: Return user email or ID for reference
            response.put("token", token);  // Include the JWT token in the response
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            response.put("status", "error");
            response.put("message", "An unexpected error occurred: " + e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }

    // Logout route to invalidate the session or clear the authentication
    @PostMapping("logout")
    public ResponseEntity<?> logoutUser(HttpServletRequest request, HttpServletResponse response) {
        try {
            request.getSession().invalidate();
            response.setStatus(HttpServletResponse.SC_OK);
            Map<String, Object> responseBody = new HashMap<>();
            responseBody.put("message", "User logged out successfully");

            return ResponseEntity.ok(responseBody);

        } catch (Exception e) {
            Map<String, Object> responseBody = new HashMap<>();
            responseBody.put("message", "An error occurred while logging out: " + e.getMessage());
            return ResponseEntity.internalServerError().body(responseBody);
        }
    }
}
