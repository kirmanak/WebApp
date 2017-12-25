package ru.ifmo.se.seventh;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
;

import java.util.Optional;

@Repository
@Transactional
@Service
public class UserServiceImpl implements UserService {



    @Autowired
    private StudentRepository studentRepository;

    @Override
    public boolean existsById(int id) {
        return studentRepository.existsById(String.valueOf(id));
    }

    @Override
    public boolean existsByUsername(String username) {
        return studentRepository.existsByUsername(username);
    }

    @Override
    public Student findById(int id) {
        return studentRepository.findById(String.valueOf(id));
    }

    @Override
    public Student findByUsername(String username) {
        return studentRepository.findByUsername(username);
    }

    @Override
    public Student save(Student user) {
        Student student = new Student(user.getUsername(),user.getPassword(),"STUDENT");;
     return   studentRepository.save(student);
    }
}


