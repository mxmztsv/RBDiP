package itmo.backend.services;

import itmo.backend.dto.UserAuthDTO;
import itmo.backend.dto.UserDTO;
import itmo.backend.dto.UserSignInDTO;
import itmo.backend.dto.UserSignUpDTO;
import itmo.backend.entites.Group;
import itmo.backend.entites.User;
import itmo.backend.repositories.UserRepository;
import itmo.backend.security.jwt.JWTProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final AuthenticationManager authenticationManager;
    private final JWTProvider tokenProvider;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    public UserAuthDTO signUp(UserSignUpDTO userSignUpDTO) {

        User user = new User();
        user.setName(userSignUpDTO.getName());
        user.setSurname(userSignUpDTO.getSurname());
        user.setEmail(userSignUpDTO.getEmail());
        user.setPassword(passwordEncoder.encode(userSignUpDTO.getPassword()));
        user.setAdmin(userSignUpDTO.getIsAdmin());

        user = userRepository.save(user);

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userSignUpDTO.getEmail(), userSignUpDTO.getPassword()));
        String token = tokenProvider.generateToken((UserDetails) authentication.getPrincipal());

        return getUserAuthDTO(user, token);
    }

    public UserAuthDTO signIn(UserSignInDTO userSignInDTO) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userSignInDTO.getLogin(), userSignInDTO.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = tokenProvider.generateToken((UserDetails) authentication.getPrincipal());
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        User user = userRepository.findUserByEmail(email);

        return getUserAuthDTO(user, token);

    }

    public UserDTO getUser(Long userId) {
        User user = userRepository.findUserById(userId);

        return getUserDTO(user);
    }

    private UserAuthDTO getUserAuthDTO(User user, String token) {
        UserAuthDTO userAuthDTO = new UserAuthDTO();
        userAuthDTO.setId(user.getId());
        userAuthDTO.setName(user.getName());
        userAuthDTO.setSurname(user.getSurname());
        userAuthDTO.setEmail(user.getEmail());
        userAuthDTO.setIsAdmin(user.isAdmin());
        userAuthDTO.setGroupName(Optional.ofNullable(user.getGroup()).map(Group::getName).orElse(""));
        userAuthDTO.setAccessToken(token);
        return userAuthDTO;
    }

    private UserDTO getUserDTO(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setName(user.getName());
        userDTO.setSurname(user.getSurname());
        userDTO.setEmail(user.getEmail());
        userDTO.setIsAdmin(user.isAdmin());
        userDTO.setGroupName(Optional.ofNullable(user.getGroup()).map(Group::getName).orElse(""));
        return userDTO;
    }


}
