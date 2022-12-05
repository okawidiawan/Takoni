package co.g2academy.takoni.controller;

import co.g2academy.takoni.model.Question;
import co.g2academy.takoni.model.Survey;
import co.g2academy.takoni.model.User;
import co.g2academy.takoni.repository.QuestionRepository;
import co.g2academy.takoni.repository.SurveyRepository;
import co.g2academy.takoni.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/api")
public class QuestionController {

    @Autowired
    private SurveyRepository surveyRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @PostMapping("/add/survey/question")
    public ResponseEntity<String> addQuestionToSurvey(@RequestBody Question question, Principal principal){
        User user = userRepository.findUserByUsername(principal.getName());
        Survey survey = surveyRepository.findById(question.getSurvey().getId()).get();
        question.setSurvey(survey);
        questionRepository.save(question);
        return ResponseEntity.ok().body("Success");
    }

}
