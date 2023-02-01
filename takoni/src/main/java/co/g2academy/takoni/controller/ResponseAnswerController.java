package co.g2academy.takoni.controller;

import co.g2academy.takoni.model.Question;
import co.g2academy.takoni.model.ResponseAnswer;
import co.g2academy.takoni.model.User;
import co.g2academy.takoni.repository.QuestionRepository;
import co.g2academy.takoni.repository.SurveyRepository;
import co.g2academy.takoni.repository.UserRepository;
import java.security.Principal;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import co.g2academy.takoni.repository.ResponseAnswerRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ResponseAnswerController {

    @Autowired
    private ResponseAnswerRepository responseAnswerRepository;

    @Autowired
    private SurveyRepository surveyRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @GetMapping("/survey/question/answer/{id}")
    public ResponseEntity getAnswerByQuestionId(@PathVariable Integer id, Principal principal) {
        User userLoggedIn = userRepository.findUserByUsername(principal.getName());
        Question question = questionRepository.findById(id).get();
        List<ResponseAnswer> responseAnswer = responseAnswerRepository.findQuestionByQuestionId(id);
        return ResponseEntity.ok(responseAnswer);
    }
    
    @GetMapping("/survey/answer/{id}")
    public ResponseEntity getAnswerBySurvey(@PathVariable Integer id, Principal principal){
        User userLoggedIn = userRepository.findUserByUsername(principal.getName());
        List<ResponseAnswer> responseAnswer = responseAnswerRepository.findResponseBySurveyId(id);
        System.out.println(responseAnswer);
        return ResponseEntity.ok(responseAnswer);
    }

    @PostMapping("/add/survey/question/answer")
    public ResponseEntity addSurveyQuestionAnswer(@RequestBody ResponseAnswer questionAnswer, Principal principal) {
        User userLoggedIn = userRepository.findUserByUsername(principal.getName());
        Question question = questionRepository.findById(questionAnswer.getQuestion().getId()).get();

        List<ResponseAnswer> qaFromDb = responseAnswerRepository.findResponseByQuestionIdAndUser(questionAnswer.getQuestion().getId(), userLoggedIn);

        System.out.println(qaFromDb);
        System.out.println(qaFromDb.isEmpty());
        System.out.println(question.getSurvey());

        if (qaFromDb.isEmpty()) {
            questionAnswer.setQuestion(question);
            questionAnswer.setSurvey(question.getSurvey());
            questionAnswer.setUser(userLoggedIn);
            responseAnswerRepository.save(questionAnswer);
            return ResponseEntity.ok("Success Add Question Answer");
        }
        return ResponseEntity.badRequest().body("You Already Answer This Question");
    }
}
