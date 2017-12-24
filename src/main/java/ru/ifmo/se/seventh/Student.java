package ru.ifmo.se.seventh;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Data
public class Student {
    private static final BCryptPasswordEncoder PASSWORD_ENCODER = new BCryptPasswordEncoder();
    private @Id @GeneratedValue Long id;
    private String username;
    private @JsonIgnore String password;
    private String[] roles;

    private Student() {}

    public Student(final String username, final String password, final String ... roles) {
        this.roles = roles;
        this.username = username;
        this.setPassword(password);
    }

    public static BCryptPasswordEncoder getPasswordEncoder() {
        return PASSWORD_ENCODER;
    }

    public void setPassword(String password) {
        this.password = PASSWORD_ENCODER.encode(password);
    }

    public String[] getRoles() {
        return roles;
    }

    public String getPassword() {
        return password;
    }
}
