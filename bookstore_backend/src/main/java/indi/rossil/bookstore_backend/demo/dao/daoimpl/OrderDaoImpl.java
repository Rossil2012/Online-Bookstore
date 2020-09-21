package indi.rossil.bookstore_backend.demo.dao.daoimpl;

import indi.rossil.bookstore_backend.demo.dao.OrderDao;
import indi.rossil.bookstore_backend.demo.entity.Order;
import indi.rossil.bookstore_backend.demo.entity.OrderItem;
import indi.rossil.bookstore_backend.demo.repository.OrderItemRepository;
import indi.rossil.bookstore_backend.demo.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;

@Component
public class OrderDaoImpl implements OrderDao {
    @Autowired
    OrderRepository orderRepository;

    @Autowired
    OrderItemRepository orderItemRepository;

    @Override
    public List<Order> getOrdersAllUsers() {
        System.out.println(orderRepository.findAll());
        return orderRepository.findAll();
    }

    @Override
    public List<Order> getOrdersOneUser(Long uid) {
        return orderRepository.findAllByUid(uid);
    }

    @Override
    public Order getOrderByOid(Long oid) {
        return orderRepository.findOrderByOid(oid);
    }

    @Override
    public List<OrderItem> getOrderItemsOneOrder(Long oid) {
        return orderItemRepository.findAllByOid(oid);
    }

    @Override
    public Boolean checkUserAndOrder(Long uid, Long oid) {
        return orderRepository.findOrderByUidAndOid(uid, oid) != null;
    }

    @Override
    public Long maxOid() {
        Long max = orderRepository.maxOid();
        return max == null ? 0 : max;
    }

    @Override
    public void insertOrder(Long oid, Long uid, Double cost, Date date) {
        orderRepository.insert(oid, uid, cost, date);
    }

    @Override
    public void insertOrderItems(List<OrderItem> orderItemList) {
        for (OrderItem ite:orderItemList) {
            orderItemRepository.insert(ite.getOid(), ite.getBid(), ite.getPrice(), ite.getAmount());
        }
    }
}

