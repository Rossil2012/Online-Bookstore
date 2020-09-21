package indi.rossil.bookstore_backend.demo.repository;

import indi.rossil.bookstore_backend.demo.entity.User;
import indi.rossil.bookstore_backend.demo.entity.UserAuth;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface UserAuthRepository extends JpaRepository<UserAuth, Long> {
    UserAuth findUserAuthByUid(Long uid);
    UserAuth findUserAuthByUsername(String username);
    UserAuth findUserAuthByUsernameAndPassword(String username, String password);

    @Query(value = "SELECT MAX(uid) FROM `userauth`", nativeQuery = true)
    Long maxUid();

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO `userauth` VALUES (?1, ?2, ?3, ?4)", nativeQuery = true)
    void insert(Long uid, Integer status, String usr, String password);

}
