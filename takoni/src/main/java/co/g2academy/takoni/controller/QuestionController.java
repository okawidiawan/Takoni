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
import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")

public class QuestionController {

    @Autowired
    private SurveyRepository surveyRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @PostMapping("/add/survey/question")
    public ResponseEntity<String> addQuestionToSurvey(@RequestBody Question question, Principal principal) {
        User user = userRepository.findUserByUsername(principal.getName());
        Survey survey = surveyRepository.findById(question.getSurvey().getId()).get();
        System.out.println(survey.getResearcher().getId());
        System.out.println(user.getId());

        if (user.getId().equals(survey.getResearcher().getId())) {
            question.setSurvey(survey);
            questionRepository.save(question);
            return ResponseEntity.ok().body("Success");
        } else {
            return ResponseEntity.badRequest().body("Failed to add Question");
        }
    }

    @GetMapping("/question/{id}")
    public ResponseEntity getQuestion(@PathVariable Integer id, Principal principal) {
        User userLoggedIn = userRepository.findUserByUsername(principal.getName());
        Survey survey = surveyRepository.findById(id).get();
        List<Question> question = questionRepository.getBySurveyId(id);
        if (userLoggedIn.getId() == survey.getResearcher().getId()) {
            return ResponseEntity.ok(question);
        }

        System.out.println();
        return ResponseEntity.badRequest().body("Failed to get Question");
    }

    @DeleteMapping("delete/survey/question/{id}")
    public ResponseEntity deleteSurveyQuestion(@PathVariable Integer id, Principal principal) {
        User user = userRepository.findUserByUsername(principal.getName());
        Question question = questionRepository.findQuestionById(id);
        System.out.println(question);
        System.out.println(question.getSurvey().getResearcher().getUsername());
        System.out.println(principal.getName());
        if (question.getSurvey().getResearcher().getUsername().equals(principal.getName())) {
            questionRepository.deleteById(id);
            return ResponseEntity.ok("Deleted Question");
        }
        return ResponseEntity.badRequest().body("Failed to delete Question");
    }

}
