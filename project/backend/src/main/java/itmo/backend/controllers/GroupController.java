package itmo.backend.controllers;

import itmo.backend.dto.GroupDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/v1/groups")
@RequiredArgsConstructor
public class GroupController {
    @PostMapping("/{groupName}/join")
    public ResponseEntity<?> joinGroup(@PathVariable String groupName) {
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> createGroup(@RequestBody GroupDTO groupDTO) {
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<?> getGroups() {
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
