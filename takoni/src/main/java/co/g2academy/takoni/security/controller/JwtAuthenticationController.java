package co.g2academy.takoni.security.controller;

import co.g2academy.takoni.security.model.JwtRequest;
import co.g2academy.takoni.security.model.JwtResponse;
import co.g2academy.takoni.security.service.JwtUserDetailService;
import co.g2academy.takoni.security.util.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class JwtAuthenticationController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil tokenUtil;

    @Autowired
    private JwtUserDetailService userDetailService;

    @PostMapping("/authenticate")
    public ResponseEntity<JwtResponse> createToken(@RequestBody JwtRequest request) throws Exception{
        authenticate(request.getUsername(), request.getPassword());
        UserDetails userDetails = userDetailService.loadUserByUsername(request.getUsername());
        String token = tokenUtil.generateToken(userDetails);
        return ResponseEntity.ok(new JwtResponse(token));
    }

    private void authenticate(String username, String password) throws Exception{
        try{
            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(username, password);
            authenticationManager.authenticate(authToken);
        }catch (DisabledException e){
            throw new Exception("USER_DISABLED", e);
        }catch (BadCredentialsException e){
            throw new Exception("INVALID_CREDENTIAL", e);
        }
    }


}
