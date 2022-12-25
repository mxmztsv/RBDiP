package itmo.backend.controllers;

import itmo.backend.dto.GroupDTO;
import itmo.backend.services.GroupService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/v1/groups")
@RequiredArgsConstructor
public class GroupController {

    private final GroupService groupService;

    @PostMapping("/{groupName}/join")
    public ResponseEntity<?> joinGroup(@PathVariable String groupName) {
        groupService.joinGroup(groupName);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> createGroup(@RequestBody GroupDTO groupDTO) {
        return new ResponseEntity<>(groupService.createGroup(groupDTO), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<?> getGroups() {
        return new ResponseEntity<>(groupService.getGroups(), HttpStatus.OK);
    }
}
