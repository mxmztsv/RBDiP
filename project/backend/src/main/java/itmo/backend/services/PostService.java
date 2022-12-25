package itmo.backend.services;

import itmo.backend.dto.AttachmentDTO;
import itmo.backend.dto.PostDTO;
import itmo.backend.dto.PostEditDTO;
import itmo.backend.entites.Attachment;
import itmo.backend.entites.Post;
import itmo.backend.entites.User;
import itmo.backend.repositories.AttachmentRepository;
import itmo.backend.repositories.PostRepository;
import itmo.backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final AttachmentRepository attachmentRepository;

    private final StorageService storageService;

    public PostDTO createPost(PostEditDTO postEditDTO) {

        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findUserByEmail(email);

        Post post = new Post();
        post.setTitle(postEditDTO.getTitle());
        post.setBody(postEditDTO.getBody());
        post.setGroup(user.getGroup());
        post.setCreatedAt(LocalDateTime.now());
        post = postRepository.save(post);

        if (postEditDTO.getAttachment() == null) {
            return getPostDTOWithoutAttachment(post);
        }

        String nameFile = postEditDTO.getAttachment().getOriginalFilename();
        String link = storageService.saveFile(postEditDTO.getAttachment());
        Attachment attachment = new Attachment();
        attachment.setName(nameFile);
        attachment.setLink(link);
        attachment.setPost(post);
        attachment = attachmentRepository.save(attachment);

        return getPostDTO(attachment);
    }

    public PostDTO editPost(Long postId, PostEditDTO postEditDTO) {
        Post post = postRepository.getById(postId);
        Attachment attachment = attachmentRepository.findAttachmentByPost(post);

        post.setTitle(postEditDTO.getTitle());
        post.setBody(postEditDTO.getBody());
        post.setCreatedAt(LocalDateTime.now());
        post = postRepository.save(post);

        if (attachment != null) {
            storageService.deleteFile(attachment.getLink());
            attachmentRepository.delete(attachment);
        } else {
            attachment = new Attachment();
        }

        if (postEditDTO.getAttachment() != null) {
            String nameFile = postEditDTO.getAttachment().getOriginalFilename();
            String link = storageService.saveFile(postEditDTO.getAttachment());
            attachment.setName(nameFile);
            attachment.setLink(link);
            attachment.setPost(post);
            attachment = attachmentRepository.save(attachment);
            return getPostDTO(attachment);
        }

        return getPostDTOWithoutAttachment(post);
    }

    public PostDTO getPost(Long postId) {
        Post post = postRepository.getById(postId);
        return getPostDTO(post);
    }

    public List<PostDTO> getPosts() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findUserByEmail(email);

        return postRepository.findPostsByGroup(user.getGroup())
                .stream()
                .map(this::getPostDTO)
                .collect(Collectors.toList());
    }

    public void deletePost(Long postId) {
        Post post = postRepository.getById(postId);
        Attachment attachment = attachmentRepository.findAttachmentByPost(post);
        if (attachment != null) {
            storageService.deleteFile(attachment.getLink());
            attachmentRepository.delete(attachment);
        }
        postRepository.delete(post);
    }

    private PostDTO getPostDTOWithoutAttachment(Post post) {
        PostDTO postDTO = new PostDTO();
        postDTO.setId(post.getId());
        postDTO.setTitle(post.getTitle());
        postDTO.setBody(post.getBody());
        postDTO.setGroupName(post.getGroup().getName());
        postDTO.setCreatedAt(Timestamp.valueOf(post.getCreatedAt()).getTime());
        return postDTO;
    }


    private PostDTO getPostDTO(Post post) {
        Attachment attachment = attachmentRepository.findAttachmentByPost(post);
        if (attachment == null) {
            return getPostDTOWithoutAttachment(post);
        }
        return getPostDTO(attachment);
    }

    private PostDTO getPostDTO(Attachment attachment) {
        AttachmentDTO attachmentDTO = new AttachmentDTO();
        attachmentDTO.setId(attachment.getId());
        attachmentDTO.setName(attachment.getName());
        attachmentDTO.setLink(attachment.getLink());

        Post post = attachment.getPost();

        PostDTO postDTO = getPostDTOWithoutAttachment(post);
        postDTO.setAttachment(attachmentDTO);

        return postDTO;
    }
}

