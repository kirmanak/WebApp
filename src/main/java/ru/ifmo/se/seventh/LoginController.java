package ru.ifmo.se.seventh;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
    public String createNewUser(RegistrationRequest request) {
        final String username = request.getUsername(),
                password = request.getPassword();
        System.out.println("We are here!");
        if (studentRepository.existsByUsername(username)) {
            System.out.println("Exists");
            return "registration";
        } else {
            System.out.println("Original password " + password);
            final Student newStudent = new Student(username,
                    password, "STUDENT");
            System.out.println("New password " + newStudent.getPassword());
            studentRepository.save(newStudent);
            return "redirect:/login";
        }
    }
}
