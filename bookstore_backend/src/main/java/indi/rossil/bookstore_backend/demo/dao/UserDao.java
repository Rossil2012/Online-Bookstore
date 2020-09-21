package indi.rossil.bookstore_backend.demo.dao;

import indi.rossil.bookstore_backend.demo.entity.User;
import indi.rossil.bookstore_backend.demo.entity.UserAuth;
import indi.rossil.bookstore_backend.demo.entity.assemble.AsUser;

import java.util.List;

public interface UserDao {
    UserAuth checkUsr(String usr, String passwd);
    UserAuth checkUsername(String username);
    Long newUserAuth(Integer status, String usr, String passwd);
    void addNewUser(Long uid, String nickname, String tel, String address, String email, String avatar);
    void updateUser(AsUser asUser);
    AsUser getUserOne(Long uid);
    List<AsUser> getUsersAll();
}
