package itmo.backend.dto;

import lombok.Data;

@Data
public class UserAuthDTO {
    private Long id;
    private String name;
    private String surname;
    private String email;
    private Boolean isAdmin;
    private String groupName;
    private String accessToken;
}
