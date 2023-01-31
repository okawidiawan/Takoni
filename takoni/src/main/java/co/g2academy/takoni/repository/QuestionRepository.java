package co.g2academy.takoni.repository;

import co.g2academy.takoni.model.Question;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface QuestionRepository extends JpaRepository<Question, Integer> {
    public Optional<Question> findById(Integer id);
    public Question findQuestionById(Integer id);
    public List<Question> getBySurveyId(Integer id);
    public List<Question> deleteBySurvey(Integer id);
}
