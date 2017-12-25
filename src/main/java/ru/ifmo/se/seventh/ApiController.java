package ru.ifmo.se.seventh;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class ApiController {
    private final PointRepository pointRepository;
    private final StudentRepository studentRepository;

    @Autowired
    public ApiController(PointRepository pointRepository, StudentRepository studentRepository) {
        this.pointRepository = pointRepository;
        this.studentRepository = studentRepository;
    }

    @GetMapping("/points")
    public Page<Point> getPoints(@AuthenticationPrincipal User user,
                                 Pageable pageable) {
        final Student student = studentRepository.findByUsername(user.getUsername());
        return pointRepository.findByOwner(pageable, student);
    }

    @PostMapping("/points")
    public void postPoints(@AuthenticationPrincipal User user,
                            @RequestBody Point point) {
        final Student student = studentRepository.findByUsername(user.getUsername());
        final Point newPoint = new Point(point.getX(), point.getY(), point.getR(), student);
        pointRepository.save(newPoint);
    }

    @DeleteMapping("/points")
    public void deletePoints(@RequestBody Long id) {
        pointRepository.delete(pointRepository.findOne(id));
    }
}
