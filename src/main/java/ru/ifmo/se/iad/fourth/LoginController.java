package ru.ifmo.se.iad.fourth;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class LoginController {
    private final StudentRepository studentRepository;

    @Autowired
    public LoginController(StudentRepository repository) {
        this.studentRepository = repository;
    }
    @RequestMapping(value = "/regcheck", method = RequestMethod.GET)
    public @ResponseBody Response getCharNum(@RequestParam String text) {
        Response result = new Response();
        if (text!=null) {
            if (studentRepository.existsByUsername(text)) {result.setText("false");
            } else result.setText("true");
        }
        return result;
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
    @ModelAttribute("student")
    public Student loadEmptyModelBean(){
        return new Student();
    }
    @PostMapping(value = "/registration")
    public ModelAndView createNewUser(final RegistrationRequest request, BindingResult bindingResult) {
        ModelAndView modelAndView = new ModelAndView();
        final String username = request.getUsername(),
                password = request.getPassword();
        if (studentRepository.existsByUsername(username)) {
                bindingResult.rejectValue("username", "error.user", "Пользователь с таким логином уже существует");
            modelAndView.setViewName("registration");
        } else {
            final Student newStudent = new Student(username,
                    password, "STUDENT");
            studentRepository.save(newStudent);
            modelAndView.setViewName("redirect:/login");
        }
        return modelAndView;
    }
}
