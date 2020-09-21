package indi.rossil.bookstore_backend.demo.service.serviceimpl;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import indi.rossil.bookstore_backend.demo.dao.BookDao;
import indi.rossil.bookstore_backend.demo.dao.CartDao;
import indi.rossil.bookstore_backend.demo.entity.Book;
import indi.rossil.bookstore_backend.demo.entity.CartItem;
import indi.rossil.bookstore_backend.demo.entity.assemble.AsBook;
import indi.rossil.bookstore_backend.demo.entity.assemble.AsCartItem;
import indi.rossil.bookstore_backend.demo.service.CartService;
import indi.rossil.bookstore_backend.demo.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

@Transactional
@Service
public class CartServiceImpl implements CartService {
    @Autowired
    CartDao cartDao;

    @Autowired
    BookDao bookDao;

    @Autowired
    OrderService orderService;

    @Override
    public void setCartItem(Long uid, Long bid, Long amount) {
        if (amount <= 0) {
            CartItem cartItem = cartDao.getCartItemOne(uid, bid);
            if (cartItem == null) {
                cartDao.insertCartItem(uid, bid, 1L);
            } else {
                cartItem.setAmount(cartItem.getAmount() + 1);
            }
        } else {
            cartDao.insertCartItem(uid, bid, amount);
        }
    }

    @Override
    public void removeBook(Long uid, Long bid) {
        cartDao.removeCartItem(uid, bid);
    }

    @Override
    public void submit(Long uid) {
        orderService.addOrder(uid, cartDao.getCartItemsAll(uid));
        cartDao.clearCart(uid);
    }

    @Override
    public String getCartItemsAll(Long uid) {
        List<CartItem> cartItemList = cartDao.getCartItemsAll(uid);
        List<AsCartItem> asCartItemList = new LinkedList<>();
        for (CartItem ite:cartItemList) {
            AsCartItem asCartItem = new AsCartItem();
            asCartItem.makeAsBook(bookDao.getBookOne(ite.getBid()));
            asCartItem.makeCartItem(ite);
            asCartItemList.add(asCartItem);
        }
        return JSON.toJSONString(asCartItemList);
    }
}
