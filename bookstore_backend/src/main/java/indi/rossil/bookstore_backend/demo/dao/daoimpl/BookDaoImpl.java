package indi.rossil.bookstore_backend.demo.dao.daoimpl;

import indi.rossil.bookstore_backend.demo.entity.Book;
import indi.rossil.bookstore_backend.demo.dao.BookDao;
import indi.rossil.bookstore_backend.demo.entity.Liked;
import indi.rossil.bookstore_backend.demo.entity.NoBook;
import indi.rossil.bookstore_backend.demo.entity.assemble.AsBook;
import indi.rossil.bookstore_backend.demo.repository.BookRepository;

import indi.rossil.bookstore_backend.demo.repository.LikedRepository;
import indi.rossil.bookstore_backend.demo.repository.NoBookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.LinkedList;
import java.util.List;

@Component
public class BookDaoImpl implements BookDao {
    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private LikedRepository likedRepository;

    @Autowired
    private NoBookRepository noBookRepository;

    @Override
    public List<AsBook> getBooksAll() {
        List<Book> bookList = bookRepository.getBooksAll();
        List<AsBook> asBookList = new LinkedList<>();
        for (Book ite:bookList) {
            NoBook noBook = noBookRepository.findNoBookByBookId(ite.getBookId());
            AsBook asBook = new AsBook();
            asBook.makeBook(ite);
            asBook.makeNoBook(noBook);
            asBookList.add(asBook);
        }
        return asBookList;
    }

    @Override
    public AsBook getBookOne(Long bid) {
        Book book = bookRepository.findBookByBookId(bid);
        NoBook noBook = noBookRepository.findNoBookByBookId(bid);
        AsBook asBook = new AsBook();

        asBook.makeBook(book);
        asBook.makeNoBook(noBook);

        return asBook;
    }

    @Override
    public void deleteBook(Long bid) {
        Book book = bookRepository.findBookByBookId(bid);
        book.setStatus(0);
        bookRepository.save(book);
    }

    @Override
    public void updateBook(AsBook asBook) {
        Book oldBook = bookRepository.findBookByBookId(asBook.getBookId()), newBook = asBook.extractBook();
        NoBook oldNoBook = noBookRepository.findNoBookByBookId(asBook.getBookId()), newNoBook = asBook.extractNoBook();

        if (oldBook != null && oldNoBook != null) {
            if (newBook.getIsbn() != null) { oldBook.setIsbn(newBook.getIsbn()); }
            if (newBook.getName() != null) { oldBook.setName(newBook.getName()); }
            if (newBook.getType() != null) { oldBook.setType(newBook.getType()); }
            if (newBook.getAuthor() != null) { oldBook.setAuthor(newBook.getAuthor()); }
            if (newBook.getPrice() != null) { oldBook.setPrice(newBook.getPrice()); }
            if (newBook.getInventory() != null) { oldBook.setInventory(newBook.getInventory()); }
            if (newBook.getStatus() != null) { oldBook.setStatus(newBook.getStatus() != 0 ? 1 : 0); }

            if (newNoBook.getImageBase64() != null) { oldNoBook.setImageBase64(newNoBook.getImageBase64()); }
            if (newNoBook.getDescription() != null) { oldNoBook.setDescription(newNoBook.getDescription()); }

            bookRepository.save(oldBook);
            noBookRepository.save(oldNoBook);
        } else if (oldBook == null && oldNoBook == null) {
            bookRepository.save(newBook);
            noBookRepository.save(newNoBook);
        } else {
            System.out.println("Book Storage is Inconsistent!");
        }
    }

    @Override
    public Long maxBid() {
        return bookRepository.maxBid();
    }

    @Override
    public List<Liked> getLikedBooksAll(Long uid) {
        return likedRepository.findAllByUid(uid);
    }

    @Override
    public Liked getLikedBookOne(Long uid, Long bid) {
        return likedRepository.findLikedByUidAndBid(uid, bid);
    }

    @Override
    public void insertLiked(Long uid, Long bid) {
        likedRepository.insert(uid, bid);
    }

    @Override
    public void deleteLikedAllByUidAndBid(Long uid, Long bid) {
        likedRepository.deleteAllByUidAndBid(uid, bid);
    }
}
