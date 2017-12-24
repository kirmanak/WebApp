package ru.ifmo.se.seventh;

import org.springframework.data.repository.Repository;

public interface StudentRepository extends Repository<Student, Long> {
    Student findByUsername(String username);
    void save(Student student);
}
