package itmo.backend.repositories;

import itmo.backend.entites.Group;
import itmo.backend.entites.Link;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LinkRepository extends JpaRepository<Link, Long> {
    List<Link> findLinksByGroup(Group group);
}
