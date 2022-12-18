package itmo.backend.dto;

import lombok.Data;

@Data
public class UserSignUpDTO {
    private String name;
    private String surname;
    private String email;
    private String password;
    private Boolean isAdmin;
}
