package itmo.backend.services;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class StorageService {

    @Value("${aws.s3.bucket.name}")
    private String bucketName;

    @Value("${gateway.url}")
    private String gatewayUrl;

    private final AmazonS3 amazonS3;

    public String saveFile(MultipartFile attachment) {

        String fileName = String.format("%s.%s", UUID.randomUUID(), getExtension(attachment.getOriginalFilename()));

        Map<String, String> metadata = new HashMap<>();
        metadata.put("Content-Type", attachment.getContentType());
        metadata.put("Content-Length", String.valueOf(attachment.getSize()));

        ObjectMetadata objectMetadata = new ObjectMetadata();
        metadata.forEach(objectMetadata::addUserMetadata);
        try {
            amazonS3.putObject(bucketName, fileName, attachment.getInputStream(), objectMetadata);
            return gatewayUrl + fileName;
        } catch (Exception e) {
            return null;
        }
    }

    private String getExtension(String fileName) {
        String[] slices = fileName.split("[.]");
        return slices[slices.length - 1];
    }

    public void deleteFile(String link) {
        String fileName = link.substring(gatewayUrl.length());
        amazonS3.deleteObject(bucketName, fileName);
    }

}
