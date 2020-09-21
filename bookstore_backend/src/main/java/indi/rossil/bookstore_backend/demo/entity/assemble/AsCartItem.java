package indi.rossil.bookstore_backend.demo.entity.assemble;

import indi.rossil.bookstore_backend.demo.entity.Book;
import indi.rossil.bookstore_backend.demo.entity.CartItem;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AsCartItem {
    private Long bookId;
    private String name;
    private String author;
    private String type;
    private Double price;
    private Long amount;
    private String image;

    public void makeAsBook(AsBook asBook) {
        this.bookId = asBook.getBookId();
        this.name = asBook.getName();
        this.author = asBook.getAuthor();
        this.type = asBook.getType();
        this.price = asBook.getPrice();
        this.image = asBook.getImage();
    }

    public void makeCartItem(CartItem cartItem) {
        this.amount = cartItem.getAmount();
    }
}
