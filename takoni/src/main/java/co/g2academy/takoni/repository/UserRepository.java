package co.g2academy.takoni.repository;

import co.g2academy.takoni.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    public User findUserByUsername(String username);
    public User findResearcherById(Integer id);
}
