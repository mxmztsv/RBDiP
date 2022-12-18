package itmo.backend.entites;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "rbdip_attachment")
public class Attachment {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String link;

    @ManyToOne
    @JoinColumn(name = "post", referencedColumnName = "id", nullable = false)
    private Post post;
}
