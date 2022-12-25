package itmo.backend.dto;

import lombok.Data;

@Data
public class UserSignInDTO {
    private String login;
    private String password;
}
