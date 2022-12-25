package itmo.backend.entites;

import javax.persistence.*;

import lombok.Data;

@Entity
@Data
@Table(name = "rbdip_group")
public class Group {
    @Id
    @Column
    private String name;
}