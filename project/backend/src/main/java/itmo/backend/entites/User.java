package itmo.backend.entites;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.ColumnDefault;

@Entity
@Data
@Table(name = "rbdip_user")
public class User {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String surname;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @ManyToOne
    @JoinColumn(name = "group_name", referencedColumnName = "name", nullable = false)
    private Group group;

    @Column(name = "is_admin", nullable = false)
    @ColumnDefault("false")
    private boolean isAdmin;
}
