package co.g2academy.takoni.repository;

import co.g2academy.takoni.model.Survey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.Cacheable;
import java.util.Optional;

@Repository
public interface SurveyRepository extends JpaRepository<Survey, Integer> {

    public Optional<Survey> findById(Integer id);
}
