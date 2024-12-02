package com.MyFacture.MyFacture.Config;

import com.MyFacture.MyFacture.Repository.UserRepository;
import com.MyFacture.MyFacture.Service.JWTService;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class ApplicationConfiguration {

    private final UserRepository userRepository;
    private final JWTService jwtService;

    // Inject userRepository and JWTService
    public ApplicationConfiguration(UserRepository userRepository, JWTService jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    // UserDetailsService for fetching user details based on email
    @Bean
    public UserDetailsService userDetailsService() {
        return username -> userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    // BCryptPasswordEncoder for password encryption
    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // AuthenticationManager for handling authentication requests
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    // AuthenticationProvider to provide custom authentication logic
    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) {
        try {
            return http
                    .csrf(csrf -> csrf.disable())  // Disable CSRF protection in the correct way
                    .authorizeRequests(request -> request
                            .requestMatchers("/login", "/register").permitAll()  // Allow unauthenticated access
                            .anyRequest().permitAll() // Protect all other endpoints
                    )
                    .httpBasic(Customizer.withDefaults())  // Optional: Basic authentication support if needed
                    .addFilterBefore(new JwtAuthenticationFilter(jwtService, userDetailsService()), UsernamePasswordAuthenticationFilter.class)  // Add custom JWT filter before username/password authentication filter
                    .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))  // Stateless authentication (no sessions)
                    .build();
        } catch (Exception e) {
            // Log the exception (you can use a logger here)
            System.err.println("Error configuring HTTP security: " + e.getMessage());
            // Optionally, rethrow as a runtime exception or another custom exception
            throw new RuntimeException("Error configuring HTTP security", e);
        }
    }
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // Apply to all endpoints
                        .allowedOrigins("http://localhost:4200") // Allow Angular's origin
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true); // Allow cookies if needed
            }
        };
    }

}
