package ru.ifmo.se.iad.fourth;

import org.springframework.data.repository.Repository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.Optional;

@RepositoryRestResource(exported = false)
public interface StudentRepository extends Repository<Student, Long> {
    Student findByUsername(String username);
    boolean existsByUsername(String username);
    Student save(Student user);
}
