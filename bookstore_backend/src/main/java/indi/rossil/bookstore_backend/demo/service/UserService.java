package indi.rossil.bookstore_backend.demo.service;

import indi.rossil.bookstore_backend.demo.entity.User;
import indi.rossil.bookstore_backend.demo.entity.UserAuth;
import indi.rossil.bookstore_backend.demo.entity.assemble.AsUser;
import indi.rossil.bookstore_backend.demo.service.widgets.Grant;

import java.util.List;

public interface UserService {
    AsUser getUserOne(Long uid);
    List<AsUser> getUsersAll();
    void setUserStatus(Long uid, Integer status);
    String login(String usr, String password);
    String register(String usr, String password, String email);
    Boolean logout(String token);
    Grant checkUser(String token);
}
