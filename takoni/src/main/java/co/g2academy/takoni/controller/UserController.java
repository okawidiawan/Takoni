package co.g2academy.takoni.controller;

import co.g2academy.takoni.model.User;
import co.g2academy.takoni.repository.UserRepository;
import co.g2academy.takoni.validator.CheckRegex;
import java.security.Principal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CheckRegex cr;

    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    
    @GetMapping("/researcher")
    public User getUser(Principal principal){
        User userLoggedIn = userRepository.findUserByUsername(principal.getName());
        return userLoggedIn;
    }

    @PostMapping("/researcher/register")
    public ResponseEntity registerResearcher(@RequestBody User user) {
        User userFromDb = userRepository.findUserByUsername(user.getUsername());
        if (userFromDb == null
                && cr.checkRegexUsername(user.getUsername())
                && cr.checkRegexPassword(user.getPassword())) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            userRepository.save(user);
        } else {
            return ResponseEntity.badRequest().body("Username Already Exists!");
        }
        return ResponseEntity.ok().body(user);
    }
    
    

    @PostMapping("/user/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        User userFromDb = userRepository.findUserByUsername(user.getUsername());
        if (userFromDb == null
                && cr.checkRegexUsername(user.getUsername())
                && cr.checkRegexPassword(user.getPassword())) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            user.calculateAge(user.getBirthdate());
            userRepository.save(user);
        } else {
            return ResponseEntity.badRequest().body("Failed to Create New User");
        }
        return ResponseEntity.ok().body("Success Create New User : " + user.getUsername());
    }



}
