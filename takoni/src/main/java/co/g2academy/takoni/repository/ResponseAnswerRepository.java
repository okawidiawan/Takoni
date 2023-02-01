package co.g2academy.takoni.repository;

import co.g2academy.takoni.model.ResponseAnswer;
import co.g2academy.takoni.model.User;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResponseAnswerRepository extends JpaRepository<ResponseAnswer, Integer> {

    public List<ResponseAnswer> findQuestionByQuestionId(Integer id);

    public List<ResponseAnswer> findResponseByQuestionIdAndUser(Integer id, User user);

    public List<ResponseAnswer> findResponseBySurveyId(Integer id);

    public Optional<ResponseAnswer> findById(Integer id);

//    public Optional<QuestionAnswer> findAllQuestionAnswer();
}
