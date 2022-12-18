package itmo.backend.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class PostEditDTO {
    private String title;
    private String body;
    private MultipartFile attachment;
}
