package itmo.backend.dto;

import lombok.Data;

@Data
public class PostDTO {
    private Long id;
    private String title;
    private String body;
    private String groupName;
    private Long createdAt;
    private AttachmentDTO attachment;
}