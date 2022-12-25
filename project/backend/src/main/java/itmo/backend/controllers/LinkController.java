package itmo.backend.controllers;

import itmo.backend.dto.LinkEditDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/v1/links")
@RequiredArgsConstructor
public class LinkController {
    @PostMapping
    public ResponseEntity<?> createLink(@RequestBody LinkEditDTO linkEditDTO) {
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping("/{linkId}")
    public ResponseEntity<?> editLink(@PathVariable String linkId, @RequestBody LinkEditDTO linkEditDTO) {
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/{linkId}")
    public ResponseEntity<?> getLink(@PathVariable String linkId) {
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{linkId}")
    public ResponseEntity<?> deleteLink(@PathVariable String linkId) {
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<?> getLinks() {
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
