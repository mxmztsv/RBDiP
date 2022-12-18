package itmo.backend.dto;

import lombok.Data;

@Data
public class UserEditDTO {
    private String name;
    private String surname;
    private String email;
    private String password;
    private String groupName;
}
