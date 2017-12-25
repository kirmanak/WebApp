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

    @GetMapping(value = "/login/registration")
    public String registration() {
        return "registration";
    }

    @PostMapping(value = "/login/registration")
    public String createNewUser(@RequestBody Student student) {
        if (studentRepository.existsByUsername(student.getUsername())) {
            return "redirect:/login/registration?error";
        } else {
            final Student newStudent = new Student(student.getUsername(),
                    student.getPassword(), "STUDENT");
            studentRepository.save(newStudent);
            return "redirect:/";
        }
    }
}
