package co.g2academy.takoni.validator;

import org.springframework.stereotype.Component;

import java.util.regex.Pattern;

@Component
public class CheckRegex {
    String regexUserName = "^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$";
    String regexPassword = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#&()–[{}]:;',?/*~$^+=<>]).{8,20}$";

    public boolean checkRegexUsername(String username){
        return Pattern.matches(regexUserName,username);
    }
    public boolean checkRegexPassword(String password){
        return Pattern.matches(regexPassword,password);
    }
}
