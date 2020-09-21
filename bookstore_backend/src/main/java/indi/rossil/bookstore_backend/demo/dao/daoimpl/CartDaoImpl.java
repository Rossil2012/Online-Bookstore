package indi.rossil.bookstore_backend.demo.dao.daoimpl;

import indi.rossil.bookstore_backend.demo.dao.CartDao;
import indi.rossil.bookstore_backend.demo.entity.CartItem;
import indi.rossil.bookstore_backend.demo.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CartDaoImpl implements CartDao {
    @Autowired
    CartRepository cartRepository;

    @Override
    public List<CartItem> getCartItemsAll(Long uid) {
        return cartRepository.findAllByUid(uid);
    }

    @Override
    public CartItem getCartItemOne(Long uid, Long bid) {
        return cartRepository.findCartItemByUidAndBid(uid, bid);
    }

    @Override
    public void clearCart(Long uid) {
        cartRepository.deleteAllByUid(uid);
    }

    @Override
    public void insertCartItem(Long uid, Long bid, Long amount) {
        cartRepository.insert(uid, bid, amount);
    }

    @Override
    public void removeCartItem(Long uid, Long bid) {
        cartRepository.deleteAllByUidAndBid(uid, bid);
    }
}
