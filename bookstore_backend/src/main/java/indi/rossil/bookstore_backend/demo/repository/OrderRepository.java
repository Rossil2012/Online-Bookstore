package indi.rossil.bookstore_backend.demo.repository;

import indi.rossil.bookstore_backend.demo.entity.Order;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findAllByUid(Long uid);
    Order findOrderByUidAndOid(Long uid, Long oid);
    Order findOrderByOid(Long uid);

    @Query(value = "SELECT MAX(oid) FROM `bookorder`", nativeQuery = true)
    Long maxOid();

    @Modifying
    @Transactional
    @Query(value = "REPLACE INTO `bookorder` VALUES (?1, ?2, ?3, ?4)", nativeQuery = true)
    void insert(Long oid, Long uid, Double cost, Date date);
}
