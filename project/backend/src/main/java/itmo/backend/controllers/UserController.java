package itmo.backend.controllers;

import itmo.backend.dto.UserEditDTO;
import itmo.backend.dto.UserSignInDTO;
import itmo.backend.dto.UserSignUpDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/v1/account")
@RequiredArgsConstructor
public class UserController {

    @PostMapping("/sign-up")
    public ResponseEntity<?> signUp(@RequestBody UserSignUpDTO userSignUpDTO) {
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/sign-in")
    public ResponseEntity<?> signIn(@RequestBody UserSignInDTO userSignInDTO) {
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping
    public ResponseEntity<?> editUser(@RequestBody UserEditDTO userEditDTO) {
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> getUser(@PathVariable Long userId) {
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
