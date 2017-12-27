package ru.ifmo.se.iad.fourth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.validation.constraints.NotNull;

@Service
public class AuthService implements UserDetailsService {
    private final StudentRepository studentRepository;

    @Autowired
    public AuthService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @Override
    public UserDetails loadUserByUsername(@NotNull String username) throws UsernameNotFoundException {
        Student student = studentRepository.findByUsername(username);
        if (student == null) throw new UsernameNotFoundException(username + " was not found!");
        return new User(username, student.getPassword(), AuthorityUtils.createAuthorityList(student.getRoles()));
    }
}
