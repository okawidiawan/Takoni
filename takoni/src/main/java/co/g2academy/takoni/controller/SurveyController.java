package co.g2academy.takoni.controller;

import co.g2academy.takoni.model.Question;
import co.g2academy.takoni.model.Survey;
import co.g2academy.takoni.model.User;
import co.g2academy.takoni.repository.QuestionRepository;
import co.g2academy.takoni.repository.SurveyRepository;
import co.g2academy.takoni.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")

public class SurveyController {

    @Autowired
    private SurveyRepository surveyRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private QuestionRepository questionRepository;

//    @GetMapping("/survey")
//    public List<Survey> getSurvey(Principal principal) {
//        User userLoggedIn = userRepository.findUserByUsername(principal.getName());
//        return surveyRepository.findAll();
//    }
    @GetMapping("/survey")
    public ResponseEntity getSurvey(Principal principal) {
        User userLoggedIn = userRepository.findUserByUsername(principal.getName());
        List<Survey> survey = surveyRepository.getAllSurveyByResearcher(userLoggedIn);
        return ResponseEntity.ok(survey);
    }
    
    @GetMapping("/user/survey")
    public ResponseEntity getSurveyUser(Principal principal){
        User userLoggedIn = userRepository.findUserByUsername(principal.getName());
        List<Survey> survey = surveyRepository.getSurveyByStatus("Published");
        return ResponseEntity.ok(survey);
    }

    @GetMapping("/survey/{id}")
    public ResponseEntity getSurveyById(@PathVariable Integer id, Principal principal) {
        User userLoggedIn = userRepository.findUserByUsername(principal.getName());
        Survey survey = surveyRepository.findById(id).get();
        List<Question> question = questionRepository.getBySurveyId(id);
        if (userLoggedIn.getId() == survey.getResearcher().getId()) {
            return ResponseEntity.ok(survey);
        }
        return ResponseEntity.badRequest().body("Failed to Get Survey");
    }

    @PostMapping("/add/survey")
    public ResponseEntity addSurvey(@RequestBody Survey survey, Principal principal) {
        User userLoggedIn = userRepository.findUserByUsername(principal.getName());
        survey.setResearcher(userLoggedIn);
        survey.setSurveyDate(new Date());
        Survey newSurvey = surveyRepository.save(survey);
        if (survey.getResearcher().getId().equals(userLoggedIn.getId())) {
            return ResponseEntity.ok(newSurvey);
        }
        return ResponseEntity.badRequest().body("Failed to Add New Survey");
    }

    @PutMapping("/update/surveystatus")
    public ResponseEntity updateSurveyStatus(@RequestBody Survey survey, Principal principal) {
        User userLoggedIn = userRepository.findUserByUsername(principal.getName());
        Optional<Survey> opt = surveyRepository.findById(survey.getId());
        if (!opt.isEmpty()) {
            Survey surveyFromDb = opt.get();
            if (surveyFromDb.getResearcher().getId().equals(userLoggedIn.getId())) {
                surveyFromDb.setStatus("Published");
                Survey updatedSurveyStatus = surveyRepository.save(surveyFromDb);
                return ResponseEntity.ok(updatedSurveyStatus);
            }
        }
        return ResponseEntity.badRequest().body("Failed to Change Status");
    }

    @DeleteMapping("/delete/survey/{id}")
    public ResponseEntity deleteSurvey(@PathVariable Integer id, Principal principal) {
        Optional<Survey> opt = surveyRepository.findById(id);
        if (!opt.isEmpty()) {
            Survey surveyFromDb = opt.get();
            if (surveyFromDb.getResearcher().getUsername().equals(principal.getName())) {
                List<Question> questionList = questionRepository.getBySurveyId(surveyFromDb.getId());
                System.out.println(questionList);
                questionRepository.deleteAll(questionList);
                surveyRepository.deleteById(id);
                return ResponseEntity.ok("Deleted");
            }
        }
        return ResponseEntity.badRequest().body("Failed to Delete");

    }

}
