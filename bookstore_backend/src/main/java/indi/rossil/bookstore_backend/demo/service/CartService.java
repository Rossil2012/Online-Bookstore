package indi.rossil.bookstore_backend.demo.service;

import indi.rossil.bookstore_backend.demo.entity.Book;

import java.util.List;

public interface CartService {
    void setCartItem(Long uid, Long bid, Long amount);
    void removeBook(Long uid, Long bid);
    void submit(Long uid);
    String getCartItemsAll(Long uid);
}
