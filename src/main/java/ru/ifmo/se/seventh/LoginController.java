package ru.ifmo.se.seventh;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import javax.jws.soap.SOAPBinding;
import javax.validation.Valid;

@Controller
public class LoginController {

    @RequestMapping(value = "/")
    public String index() {
        return "index";
    }

    @Autowired
    UserService userService;

    @GetMapping(value = {"/login"})
    public ModelAndView login() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("login");
        return modelAndView;
    }

    @GetMapping(value = "/registration")
    public ModelAndView registration() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("registration");
        return modelAndView;
    }
    @PostMapping(value = "/registration")
    public String createNewUser(@Valid Student user, BindingResult bindingResult) {
        ModelAndView modelAndView = new ModelAndView();
        boolean userExists = userService.existsByUsername(user.getUsername());
        boolean sucessRegistration=false;
        if (userExists) {
            bindingResult.rejectValue("username", "error.user", "Пользователь с таким логином уже существует");
        }
        if (!bindingResult.hasErrors()) {
            userService.save(user);
            modelAndView.addObject("successMessage", "Вы успешно зарегистрировались");
            sucessRegistration=true;
        }
        if (sucessRegistration) {return "login";}
        else {return "registration";}
    }
}
