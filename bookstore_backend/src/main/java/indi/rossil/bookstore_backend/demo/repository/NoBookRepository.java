package indi.rossil.bookstore_backend.demo.repository;

import indi.rossil.bookstore_backend.demo.entity.NoBook;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface NoBookRepository extends MongoRepository<NoBook, Long> {
    NoBook findNoBookByBookId(Long bid);
    void deleteAllByBookId(Long bid);
}
