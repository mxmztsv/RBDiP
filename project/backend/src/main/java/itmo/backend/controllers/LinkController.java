package itmo.backend.controllers;

import itmo.backend.dto.LinkEditDTO;
import itmo.backend.services.LinkService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/v1/links")
@RequiredArgsConstructor
public class LinkController {

    private final LinkService linkService;

    @PostMapping
    public ResponseEntity<?> createLink(@RequestBody LinkEditDTO linkEditDTO) {
        return new ResponseEntity<>(linkService.createLink(linkEditDTO), HttpStatus.OK);
    }

    @PatchMapping("/{linkId}")
    public ResponseEntity<?> editLink(@PathVariable Long linkId, @RequestBody LinkEditDTO linkEditDTO) {
        return new ResponseEntity<>(linkService.editLink(linkId, linkEditDTO), HttpStatus.OK);
    }

    @GetMapping("/{linkId}")
    public ResponseEntity<?> getLink(@PathVariable Long linkId) {
        return new ResponseEntity<>(linkService.getLink(linkId), HttpStatus.OK);
    }

    @DeleteMapping("/{linkId}")
    public ResponseEntity<?> deleteLink(@PathVariable Long linkId) {
        linkService.deleteLink(linkId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<?> getLinks() {
        return new ResponseEntity<>(linkService.getLinks(),HttpStatus.OK);
    }
}
