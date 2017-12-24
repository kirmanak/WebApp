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
        final Student kirill = new Student("kirill", "kirill", "STUDENT");
        studentRepository.save(kirill);
        final Point testPoint = new Point(1.5, -1.2, 2, admin);
        pointRepository.save(testPoint);
        final Point secondPoint = new Point(-1.5, 1.2, 5, kirill);
        pointRepository.save(secondPoint);
    }

}

