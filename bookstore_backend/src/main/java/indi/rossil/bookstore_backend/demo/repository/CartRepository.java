package indi.rossil.bookstore_backend.demo.repository;

import indi.rossil.bookstore_backend.demo.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface CartRepository extends JpaRepository<CartItem, Long> {
    List<CartItem> findAllByUid(Long uid);
    CartItem findCartItemByUidAndBid(Long uid, Long bid);

    @Modifying
    @Transactional
    @Query(value = "REPLACE INTO `cartitem` VALUES (?1, ?2, ?3)", nativeQuery = true)
    void insert(Long uid, Long bid, Long amount);

    @Modifying
    @Transactional
    void deleteAllByUid(Long uid);

    @Modifying
    @Transactional
    void deleteAllByUidAndBid(Long uid, Long bid);
}
