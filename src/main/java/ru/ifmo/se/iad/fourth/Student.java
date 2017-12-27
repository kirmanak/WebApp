package ru.ifmo.se.iad.fourth;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.Getter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Data
public class Student {
    private static final BCryptPasswordEncoder PASSWORD_ENCODER = new BCryptPasswordEncoder();
    private @Id @GeneratedValue @Getter Long id;
    @Column(unique = true)
    private String username;
    private @JsonIgnore String password;
    private String[] roles;

    @SuppressWarnings("unused")
    public Student() {}

    public Student(final String username, final String password, final String ... roles) {
        this.roles = roles;
        this.username = username;
        this.setPassword(password);
    }
    public void setRoles(String[] roles) {
        this.roles = new String[]{"STUDENT"};
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public static BCryptPasswordEncoder getPasswordEncoder() {
        return PASSWORD_ENCODER;
    }

    public void setPassword(String password) {
        this.password = PASSWORD_ENCODER.encode(password);
    }

    public String[] getRoles() {
                setRoles(roles);
                return this.roles;
    }

    public String getPassword() {
        return password;
    }

    public String getUsername() {
        return username;
    }
}
