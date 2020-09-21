package indi.rossil.bookstore_backend.demo.dao.daoimpl;

import indi.rossil.bookstore_backend.demo.dao.UserDao;
import indi.rossil.bookstore_backend.demo.entity.NoUser;
import indi.rossil.bookstore_backend.demo.entity.User;
import indi.rossil.bookstore_backend.demo.entity.UserAuth;
import indi.rossil.bookstore_backend.demo.entity.assemble.AsUser;
import indi.rossil.bookstore_backend.demo.repository.UserAuthRepository;
import indi.rossil.bookstore_backend.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.LinkedList;
import java.util.List;

@Component
public class UserDaoImpl implements UserDao {
    @Autowired
    private UserAuthRepository userAuthRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserAuth checkUsr(String usr, String passwd) {
        return userAuthRepository.findUserAuthByUsernameAndPassword(usr, passwd);
    }

    @Override
    public UserAuth checkUsername(String username) {
        return userAuthRepository.findUserAuthByUsername(username);
    }

    @Override
    public Long newUserAuth(Integer status, String usr, String passwd) {
        Long uid = userAuthRepository.maxUid() + 1;
        userAuthRepository.insert(uid, status, usr, passwd);
        return uid;
    }

    @Override
    public void addNewUser(Long uid, String nickname, String tel, String address, String email, String avatar) {
        User user = userRepository.findUserByUid(uid);

        if (user != null) {
            if (nickname != null) { user.setNickname(nickname); }
            if (tel != null) { user.setTel(tel); }
            if (address != null) { user.setAddress(address); }
            if (email != null) { user.setEmail(email); }
        } else {
            user = new User(uid, nickname, tel, address, email, null, null, null);
        }

        userRepository.save(user);
    }

    @Override
    public void updateUser(AsUser asUser) {
        User user = asUser.extractUser();
        UserAuth userAuth = asUser.extractUserAuth();

        userRepository.save(user);
        userAuthRepository.save(userAuth);
    }

    @Override
    public AsUser getUserOne(Long uid) {
        User user = userRepository.findUserByUid(uid);
        UserAuth userAuth = userAuthRepository.findUserAuthByUid(uid);
        AsUser asUser = new AsUser();

        asUser.makeUser(user);
        asUser.makeUserAuth(userAuth);

        return asUser;
    }

    @Override
    public List<AsUser> getUsersAll() {
        List<User> userList = userRepository.getUsersAll();
        System.out.println(userList);
        List<AsUser> asUserList = new LinkedList<>();
        for (User ite:userList) {
            UserAuth userAuth = userAuthRepository.findUserAuthByUid(ite.getUid());
            AsUser asUser = new AsUser();
            asUser.makeUser(ite);
            asUser.makeUserAuth(userAuth);

            asUserList.add(asUser);
        }

        System.out.println(asUserList);
        return asUserList;
    }
}
