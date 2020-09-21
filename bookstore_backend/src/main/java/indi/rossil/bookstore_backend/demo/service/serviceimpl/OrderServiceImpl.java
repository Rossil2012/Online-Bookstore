package indi.rossil.bookstore_backend.demo.service.serviceimpl;

import indi.rossil.bookstore_backend.demo.dao.BookDao;
import indi.rossil.bookstore_backend.demo.dao.OrderDao;
import indi.rossil.bookstore_backend.demo.dao.UserDao;
import indi.rossil.bookstore_backend.demo.entity.CartItem;
import indi.rossil.bookstore_backend.demo.entity.Order;
import indi.rossil.bookstore_backend.demo.entity.OrderItem;
import indi.rossil.bookstore_backend.demo.entity.assemble.AsBook;
import indi.rossil.bookstore_backend.demo.entity.assemble.AsOrderCollection;
import indi.rossil.bookstore_backend.demo.entity.assemble.AsOrderItem;
import indi.rossil.bookstore_backend.demo.entity.assemble.AsUser;
import indi.rossil.bookstore_backend.demo.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.LinkedList;
import java.util.List;

@Transactional
@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    OrderDao orderDao;

    @Autowired
    BookDao bookDao;

    @Autowired
    UserDao userDao;

    @Override
    public List<Order> getOrdersAllUsers() {
        return orderDao.getOrdersAllUsers();
    }

    @Override
    public List<Order> getOrdersOneUser(Long uid) {
        return orderDao.getOrdersOneUser(uid);
    }

    @Override
    public List<AsOrderCollection> getOrderCollectionsAllUsers() {
        List<AsUser> userList = userDao.getUsersAll();
        List<AsOrderCollection> asOrderCollectionList = new LinkedList<>();

        for (AsUser ite:userList) {
            asOrderCollectionList.add(getOrderCollectionsOneUser(ite.getUid()));
        }

        return asOrderCollectionList;
    }

    @Override
    public AsOrderCollection getOrderCollectionsOneUser(Long uid) {
        AsUser asUser = userDao.getUserOne(uid);
        AsOrderCollection asOrderCollection = new AsOrderCollection();

        List<Order> orderList = orderDao.getOrdersOneUser(asUser.getUid());
        List<List<AsOrderItem>> asOrderList = new LinkedList<>();
        for (Order ite:orderList) {
            List<AsOrderItem> asOrderItemList = getOrderItemsOneOrder(null, ite.getOid(), true);
            asOrderList.add(asOrderItemList);
        }

        asOrderCollection.makeUser(asUser);
        asOrderCollection.makeOrderItemList(asOrderList);

        return asOrderCollection;
    }

    @Override
    public List<AsOrderItem> getOrderItemsOneOrder(Long uid, Long oid, Boolean isAdmin) {
        if (!isAdmin && !orderDao.checkUserAndOrder(uid, oid)) {
            return null;
        } else {
            List<OrderItem> orderItemList = orderDao.getOrderItemsOneOrder(oid);
            List<AsOrderItem> asOrderItemList = new LinkedList<>();
            for (OrderItem ite:orderItemList) {
                AsBook asBook = bookDao.getBookOne(ite.getBid());
                AsOrderItem asOrderItem = new AsOrderItem();
                asOrderItem.makeBook(asBook);
                asOrderItem.makeOrderItem(ite);
                asOrderItem.makeOrder(orderDao.getOrderByOid(oid));
                asOrderItemList.add(asOrderItem);
            }
            return asOrderItemList;
        }
    }

    @Override
    public void addOrder(Long uid, List<CartItem> cartItemList) {
        System.out.println(cartItemList);
        Long oid = orderDao.maxOid() + 1;
        Date date = new Date();
        double cost = 0.0;
        List<OrderItem> orderItemList = new LinkedList<>();
        for (CartItem ite:cartItemList) {
            OrderItem oitem = new OrderItem();
            AsBook asBook = bookDao.getBookOne(ite.getBid());
            Long actual_purchase = asBook.getInventory() >= ite.getAmount() ? ite.getAmount() : asBook.getInventory();
            Double unit_price =  asBook.getPrice();
            oitem.setOid(oid);
            oitem.setBid(ite.getBid());
            oitem.setPrice(unit_price);
            oitem.setAmount(actual_purchase);
            orderItemList.add(oitem);

            asBook.setInventory(asBook.getInventory() - actual_purchase);
            bookDao.updateBook(asBook);

            cost += oitem.getAmount() * unit_price;
        }
        orderDao.insertOrder(oid, uid, cost, date);
        orderDao.insertOrderItems(orderItemList);
    }
}
