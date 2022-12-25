package itmo.backend.controllers;

import itmo.backend.dto.UserSignInDTO;
import itmo.backend.dto.UserSignUpDTO;
import itmo.backend.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/v1/account")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/sign-up")
    public ResponseEntity<?> signUp(@RequestBody UserSignUpDTO userSignUpDTO) {
        return new ResponseEntity<>(userService.signUp(userSignUpDTO), HttpStatus.OK);
    }

    @PostMapping("/sign-in")
    public ResponseEntity<?> signIn(@RequestBody UserSignInDTO userSignInDTO) {
        return new ResponseEntity<>(userService.signIn(userSignInDTO) ,HttpStatus.OK);
    }


    @GetMapping("/{userId}")
    public ResponseEntity<?> getUser(@PathVariable Long userId) {
        return new ResponseEntity<>(userService.getUser(userId), HttpStatus.OK);
    }
}
