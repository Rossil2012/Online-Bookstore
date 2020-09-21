package indi.rossil.bookstore_backend.demo.entity.assemble;

import indi.rossil.bookstore_backend.demo.entity.Book;
import indi.rossil.bookstore_backend.demo.entity.Order;
import indi.rossil.bookstore_backend.demo.entity.OrderItem;
import lombok.*;

import java.sql.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AsOrderItem {
    private Long bookId;
    private String isbn;
    private String name;
    private String type;

    private Long oid;
    private Double price;
    private Long amount;

    private Date date;

    public void makeBook(AsBook asBook) {
        this.bookId = asBook.getBookId();
        this.isbn = asBook.getIsbn();
        this.name = asBook.getName();
        this.type = asBook.getType();
    }

    public void makeOrderItem(OrderItem orderItem) {
        this.oid = orderItem.getOid();
        this.price = orderItem.getPrice();
        this.amount = orderItem.getAmount();
    }

    public void makeOrder(Order order) {
        this.date = order.getDate();
    }
}
