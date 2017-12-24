package ru.ifmo.se.seventh;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface PointRepository extends PagingAndSortingRepository<Point, Long> {
    @Query("select o from Point o where o.owner.username = ?#{principal.username}")
    Page<Point> findAll(Pageable var);
}
