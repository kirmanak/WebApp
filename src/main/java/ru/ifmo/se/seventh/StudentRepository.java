package ru.ifmo.se.seventh;

import org.springframework.data.repository.Repository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(exported = false)
public interface StudentRepository extends Repository<Student, Long> {
    Student findByUsername(String username);
    void save(Student student);
}
