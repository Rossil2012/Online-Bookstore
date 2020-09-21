package indi.rossil.bookstore_backend.demo.repository;

import indi.rossil.bookstore_backend.demo.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    List<OrderItem> findAllByOid(Long oid);

    @Modifying
    @Transactional
    @Query(value = "REPLACE INTO `bookorderitem` VALUES (?1, ?2, ?3, ?4)", nativeQuery = true)
    void insert(Long oid, Long bid, Double price, Long amount);
}
