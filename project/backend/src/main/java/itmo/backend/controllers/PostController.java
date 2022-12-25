package itmo.backend.controllers;

import itmo.backend.dto.PostEditDTO;
import itmo.backend.services.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/v1/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    @PostMapping
    public ResponseEntity<?> createPost(@ModelAttribute PostEditDTO postEditDTO) {
        return new ResponseEntity<>(postService.createPost(postEditDTO), HttpStatus.OK);
    }

    @PatchMapping("/{postId}")
    public ResponseEntity<?> editPost(@PathVariable Long postId, @ModelAttribute PostEditDTO postEditDTO) {
        return new ResponseEntity<>(postService.editPost(postId, postEditDTO), HttpStatus.OK);
    }

    @GetMapping("/{postId}")
    public ResponseEntity<?> getPost(@PathVariable Long postId) {
        return new ResponseEntity<>(postService.getPost(postId), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<?> getPosts() {
        return new ResponseEntity<>(postService.getPosts(), HttpStatus.OK);
    }

    @DeleteMapping("/{postId}")
    public ResponseEntity<?> deletePost(@PathVariable Long postId) {
        postService.deletePost(postId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
