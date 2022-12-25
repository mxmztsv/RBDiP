package itmo.backend.entites;

import javax.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "rbdip_link")
public class Link {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String link;

    @ManyToOne
    @JoinColumn(name = "group_name", referencedColumnName = "name", nullable = false)
    private Group group;
}

