package itmo.backend.services;

import itmo.backend.dto.LinkDTO;
import itmo.backend.dto.LinkEditDTO;
import itmo.backend.entites.Link;
import itmo.backend.entites.User;
import itmo.backend.repositories.LinkRepository;
import itmo.backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LinkService {

    private final LinkRepository linkRepository;
    private final UserRepository userRepository;

    public LinkDTO createLink(LinkEditDTO linkEditDTO) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findUserByEmail(email);

        Link link = new Link();
        link.setTitle(linkEditDTO.getTitle());
        link.setLink(linkEditDTO.getLink());
        link.setGroup(user.getGroup());
        link = linkRepository.save(link);

        return getLinkDTO(link);
    }

    public LinkDTO editLink(Long linkId, LinkEditDTO linkEditDTO) {
        Link link = linkRepository.getById(linkId);
        link.setTitle(linkEditDTO.getTitle());
        link.setLink(linkEditDTO.getLink());
        link = linkRepository.save(link);

        return getLinkDTO(link);
    }

    public LinkDTO getLink(Long linkId) {
        Link link = linkRepository.getById(linkId);
        return getLinkDTO(link);
    }

    public void deleteLink(Long linkId) {
        linkRepository.deleteById(linkId);
    }

    public List<LinkDTO> getLinks() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findUserByEmail(email);

        return linkRepository.findLinksByGroup(user.getGroup())
                .stream()
                .map(this::getLinkDTO)
                .collect(Collectors.toList());
    }

    private LinkDTO getLinkDTO(Link link) {
        LinkDTO linkDTO = new LinkDTO();
        linkDTO.setId(link.getId());
        linkDTO.setTitle(link.getTitle());
        linkDTO.setLink(link.getLink());

        return linkDTO;
    }
}
