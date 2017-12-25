package ru.ifmo.se.seventh;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseFiller implements CommandLineRunner {
    private final PointRepository pointRepository;
    private final StudentRepository studentRepository;

    @Autowired
    public DatabaseFiller(final PointRepository pointRepository,
                          final StudentRepository studentRepository) {
        this.pointRepository = pointRepository;
        this.studentRepository = studentRepository;
    }

    @Override
    public void run(final String... args) throws Exception {
        final Student admin = new Student("admin", "admin", "STUDENT");
        studentRepository.save(admin);
        final Student admin1 = new Student("admin1", "admin1", "STUDENT");
        studentRepository.save(admin1);
    }

}

