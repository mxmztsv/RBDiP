package itmo.backend.repositories;

import itmo.backend.entites.Group;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GroupRepository extends JpaRepository<Group, String> {
}
