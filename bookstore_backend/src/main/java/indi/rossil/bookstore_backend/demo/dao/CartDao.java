package indi.rossil.bookstore_backend.demo.dao;

import indi.rossil.bookstore_backend.demo.entity.CartItem;

import java.util.List;

public interface CartDao {
    List<CartItem> getCartItemsAll(Long uid);
    CartItem getCartItemOne(Long uid, Long bid);
    void clearCart(Long uid);
    void insertCartItem(Long uid, Long bid, Long amount);
    void removeCartItem(Long uid, Long bid);
}
