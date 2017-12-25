package ru.ifmo.se.seventh;

/**
 * Created by Admin on 11.12.2017.
 */


import java.util.Optional;

public interface UserService {


    boolean existsById(int id);

    boolean existsByUsername(String username);

    Student findById(int id);

    Student findByUsername(String username);

    Student save(Student user);
}
