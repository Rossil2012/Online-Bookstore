package indi.rossil.bookstore_backend.demo.service;

import indi.rossil.bookstore_backend.demo.entity.CartItem;
import indi.rossil.bookstore_backend.demo.entity.Order;
import indi.rossil.bookstore_backend.demo.entity.assemble.AsOrderCollection;
import indi.rossil.bookstore_backend.demo.entity.assemble.AsOrderItem;

import java.util.List;


public interface OrderService {
    List<Order> getOrdersAllUsers();
    List<Order> getOrdersOneUser(Long uid);
    List<AsOrderCollection> getOrderCollectionsAllUsers();
    AsOrderCollection getOrderCollectionsOneUser(Long uid);
    List<AsOrderItem> getOrderItemsOneOrder(Long uid, Long oid, Boolean isAdmin);
    void addOrder(Long uid, List<CartItem> cartItemList);
}
