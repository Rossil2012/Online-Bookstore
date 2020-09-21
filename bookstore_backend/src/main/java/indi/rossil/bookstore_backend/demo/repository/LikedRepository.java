package indi.rossil.bookstore_backend.demo.repository;

import indi.rossil.bookstore_backend.demo.entity.Liked;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface LikedRepository extends JpaRepository<Liked, Long> {
    List<Liked> findAllByUid(Long uid);
    Liked findLikedByUidAndBid(Long uid, Long bid);

    @Modifying
    @Transactional
    void deleteAllByUidAndBid(Long uid, Long bid);

    @Modifying
    @Transactional
    @Query(value = "REPLACE INTO `likeditem` VALUES (?1, ?2)", nativeQuery = true)
    void insert(Long uid, Long bid);
}
