package itmo.backend.repositories;

import itmo.backend.entites.Attachment;
import itmo.backend.entites.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AttachmentRepository extends JpaRepository<Attachment, Long> {
    Attachment findAttachmentByPost(Post post);
}
