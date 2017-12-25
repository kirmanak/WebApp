package ru.ifmo.se.seventh;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.view.RedirectView;

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
    public RedirectView createNewUser(@RequestBody Student student) {
        final RedirectView redirectView = new RedirectView();
        redirectView.setContextRelative(true);
        if (studentRepository.existsByUsername(student.getUsername())) {
            redirectView.setUrl("/login/registration?error");
        } else {
            final Student newStudent = new Student(student.getUsername(),
                    student.getPassword(), "STUDENT");
            studentRepository.save(newStudent);
            redirectView.setUrl("/");
        }
        return redirectView;
    }
}
