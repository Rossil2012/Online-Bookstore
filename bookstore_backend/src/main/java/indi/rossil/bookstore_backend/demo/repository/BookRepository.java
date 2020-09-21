package indi.rossil.bookstore_backend.demo.repository;

import indi.rossil.bookstore_backend.demo.entity.Book;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

    @Query(value = "FROM Book")
    List<Book> getBooksAll();

    Book findBookByBookId(Long bid);

    @Query(value = "SELECT MAX(id) FROM `book`", nativeQuery = true)
    Long maxBid();

    @Modifying
    @Transactional
    void deleteAllByBookId(Long bid);
}
