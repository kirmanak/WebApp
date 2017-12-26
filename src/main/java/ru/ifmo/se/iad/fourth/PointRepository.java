package ru.ifmo.se.iad.fourth;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(exported = false)
public interface PointRepository extends PagingAndSortingRepository<Point, Long> {
    Page<Point> findByOwner(Pageable pageable, Student owner);
}
