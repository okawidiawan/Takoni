package co.g2academy.takoni.controller;

import co.g2academy.takoni.model.Survey;
import co.g2academy.takoni.model.User;
import co.g2academy.takoni.repository.SurveyRepository;
import co.g2academy.takoni.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api")
public class SurveyController {

    @Autowired
    private SurveyRepository surveyRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/survey")
    public List<Survey> getSurvey() {
        return surveyRepository.findAll();
    }

    @PostMapping("/add/survey")
    public String addSurvey(@RequestBody Survey survey, Principal principal) {
        User user = userRepository.findUserByUsername(principal.getName());
        survey.setResearcher(user);
        survey.setSurveyDate(new Date());
        surveyRepository.save(survey);
        return "Success Add New Survey\nTitle : " + survey.getTitle();
    }
}
