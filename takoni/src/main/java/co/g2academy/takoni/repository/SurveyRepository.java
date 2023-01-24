package co.g2academy.takoni.repository;

import co.g2academy.takoni.model.Survey;
import co.g2academy.takoni.model.User;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface SurveyRepository extends JpaRepository<Survey, Integer> {
    public Optional<Survey> findById(Integer id);
//    public Survey getSurveyByResearcher(User user);
    public List<Survey> getSurveyByResearcher(User user);
}
