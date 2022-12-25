package itmo.backend.entites;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "rbdip_post")
public class Post {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String body;

    @ManyToOne
    @JoinColumn(name = "group_name", referencedColumnName = "name", nullable = false)
    private Group group;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;
}
