package ru.ifmo.se.seventh;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface PointRepository extends PagingAndSortingRepository<Point, Long> {
    Page<Point> findByOwner(Pageable pageable, Student owner);
}
