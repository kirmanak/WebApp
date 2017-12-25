package ru.ifmo.se.seventh;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class LoginController {
    private final StudentRepository studentRepository;

    @Autowired
    public LoginController(StudentRepository repository) {
        this.studentRepository = repository;
    }

    @RequestMapping(value = "/")
    public String index() {
        return "index";
    }

    @GetMapping(value = "/login")
    public String login() {
        return "login";
    }

    @GetMapping(value = "/registration")
    public String registration() {
        return "registration";
    }

    @PostMapping(value = "/registration")
    public String createNewUser(final RegistrationRequest request) {
        final String username = request.getUsername(),
                password = request.getPassword();
        if (studentRepository.existsByUsername(username)) {
            return "registration";
        } else {
            final Student newStudent = new Student(username,
                    password, "STUDENT");
            studentRepository.save(newStudent);
            return "redirect:/login";
        }
    }
}
