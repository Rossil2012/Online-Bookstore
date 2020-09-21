package indi.rossil.bookstore_backend.demo.dao;

import indi.rossil.bookstore_backend.demo.entity.Order;
import indi.rossil.bookstore_backend.demo.entity.OrderItem;

import java.util.Date;
import java.util.List;


public interface OrderDao {
    List<Order> getOrdersAllUsers();
    List<Order> getOrdersOneUser(Long uid);
    Order getOrderByOid(Long oid);
    List<OrderItem> getOrderItemsOneOrder(Long oid);
    Boolean checkUserAndOrder(Long uid, Long oid);
    Long maxOid();
    void insertOrder(Long oid, Long uid, Double cost, Date date);
    void insertOrderItems(List<OrderItem> orderItemList);
}
