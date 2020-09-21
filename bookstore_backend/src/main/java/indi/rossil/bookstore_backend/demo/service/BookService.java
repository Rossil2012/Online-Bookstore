package indi.rossil.bookstore_backend.demo.service;

import indi.rossil.bookstore_backend.demo.entity.Book;
import indi.rossil.bookstore_backend.demo.entity.Liked;
import indi.rossil.bookstore_backend.demo.entity.assemble.AsBook;

import java.util.List;
import java.util.Map;


public interface BookService {
    List<AsBook> getBooksAll();
    AsBook getBookOne(Long bid);
    void deleteBook(Long bid);
    Boolean updateBook(Map<String, String> json);
    List<Liked> getLikedBooksAll(Long uid);
    Liked getLikedBookOne(Long uid, Long bid);
    void likeBook(Long uid, Long bid);
    void dislikeBook(Long uid, Long bid);
}
