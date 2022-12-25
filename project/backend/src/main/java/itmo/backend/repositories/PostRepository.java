package itmo.backend.repositories;

import itmo.backend.entites.Group;
import itmo.backend.entites.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findPostsByGroup(Group group);
}
