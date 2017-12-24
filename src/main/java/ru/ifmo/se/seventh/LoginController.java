package ru.ifmo.se.seventh;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class LoginController {

   @RequestMapping(value = "/")
   public String index() {
       return "index";
   }


   @RequestMapping("/login")
    public String getLogin(@RequestParam(value = "error", required = false) String error,
                           Model model){
       model.addAttribute("error",error != null);
       return "login";
   }
}