package indi.rossil.bookstore_backend.demo.dao;

import indi.rossil.bookstore_backend.demo.entity.Book;
import indi.rossil.bookstore_backend.demo.entity.Liked;
import indi.rossil.bookstore_backend.demo.entity.assemble.AsBook;

import java.util.List;


public interface BookDao {
    List<AsBook> getBooksAll();
    AsBook getBookOne(Long bid);
    void deleteBook(Long bid);
    void updateBook(AsBook asBook);
    Long maxBid();
    List<Liked> getLikedBooksAll(Long uid);
    Liked getLikedBookOne(Long uid, Long bid);
    void insertLiked(Long uid, Long bid);
    void deleteLikedAllByUidAndBid(Long uid, Long bid);
}
