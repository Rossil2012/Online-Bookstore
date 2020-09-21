package indi.rossil.bookstore_backend.demo.entity.assemble;

import com.alibaba.fastjson.annotation.JSONField;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import indi.rossil.bookstore_backend.demo.entity.Book;
import indi.rossil.bookstore_backend.demo.entity.NoBook;
import lombok.*;
import org.bson.types.ObjectId;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AsBook {
    @JSONField(serialize = false)
    private ObjectId noId;
    private Long bookId;

    private String isbn;
    private String name;
    private String type;
    private String author;
    private Double price;
    private Long inventory;
    private Integer status;

    private String image;
    private String description;

    public void makeBook(Book book) {
        this.bookId = book.getBookId();
        this.isbn = book.getIsbn();
        this.name = book.getName();
        this.type = book.getType();
        this.author = book.getAuthor();
        this.price = book.getPrice();
        this.inventory = book.getInventory();
        this.status = book.getStatus();
    }

    public Book extractBook() {
        Book book = new Book();
        book.setBookId(this.bookId);
        book.setIsbn(this.isbn);
        book.setName(this.name);
        book.setType(this.type);
        book.setAuthor(this.author);
        book.setPrice(this.price);
        book.setInventory(this.inventory);
        book.setStatus(this.status);

        return book;
    }

    public void makeNoBook(NoBook noBook) {
        this.noId = noBook.getId();
        this.bookId = noBook.getBookId();
        this.image = noBook.getImageBase64();
        this.description = noBook.getDescription();
    }

    public NoBook extractNoBook() {
        NoBook noBook = new NoBook();
        noBook.setId(this.noId);
        noBook.setBookId(this.bookId);
        noBook.setImageBase64(this.image);
        noBook.setDescription(this.description);

        return noBook;
    }
}
