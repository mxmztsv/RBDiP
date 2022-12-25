package itmo.backend.services;

import itmo.backend.dto.GroupDTO;
import itmo.backend.entites.Group;
import itmo.backend.entites.User;
import itmo.backend.repositories.GroupRepository;
import itmo.backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GroupService {

    private final GroupRepository groupRepository;
    private final UserRepository userRepository;

    public void joinGroup(String groupName) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findUserByEmail(email);
        Group group = groupRepository.getById(groupName);
        user.setGroup(group);
        userRepository.save(user);
    }

    public GroupDTO createGroup(GroupDTO groupRequestDTO) {
        Group group = new Group();
        group.setName(groupRequestDTO.getName());
        group = groupRepository.save(group);

        joinGroup(groupRequestDTO.getName());

        return getGroupDTO(group);
    }

    public List<GroupDTO> getGroups() {
        return groupRepository.findAll()
                .stream()
                .map(this::getGroupDTO)
                .collect(Collectors.toList());
    }

    private GroupDTO getGroupDTO(Group group) {
        GroupDTO groupDTO = new GroupDTO();
        groupDTO.setName(group.getName());
        return groupDTO;
    }
}

