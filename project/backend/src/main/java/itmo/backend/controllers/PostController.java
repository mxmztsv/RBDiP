package itmo.backend.controllers;

import itmo.backend.dto.PostEditDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/v1/posts")
@RequiredArgsConstructor
public class PostController {
    @PostMapping
    public ResponseEntity<?> createPost(@ModelAttribute PostEditDTO postEditDTO) {
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping("/{postId}")
    public ResponseEntity<?> editPost(@PathVariable String postId, PostEditDTO postEditDTO) {
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/{postId}")
    public ResponseEntity<?> getPost(@PathVariable String postId) {
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<?> getPosts() {
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{postId}")
    public ResponseEntity<?> deletePost(@PathVariable String postId) {
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
