package indi.rossil.bookstore_backend.demo.entity.assemble;

import com.alibaba.fastjson.annotation.JSONField;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import indi.rossil.bookstore_backend.demo.entity.NoUser;
import indi.rossil.bookstore_backend.demo.entity.User;
import indi.rossil.bookstore_backend.demo.entity.UserAuth;
import lombok.*;
import org.bson.types.ObjectId;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties({"noId"})
public class AsUser {
    private Long uid;

    private String username;
    private String password;
    private Integer status;

    private String nickname;
    private String tel;
    private String address;
    private String email;

    public void makeUser(User user) {
        if (user == null) {
            return;
        }
        this.uid = user.getUid();
        this.nickname = user.getNickname();
        this.tel = user.getTel();
        this.address = user.getAddress();
        this.email = user.getEmail();
    }

    public User extractUser() {
        User user = new User();

        user.setUid(this.uid);
        user.setNickname(this.nickname);
        user.setTel(this.tel);
        user.setAddress(this.address);
        user.setEmail(this.email);

        return user;
    }

    public void makeUserAuth(UserAuth userAuth) {
        if (userAuth == null) {
            return;
        }
        this.username = userAuth.getUsername();
        this.password = userAuth.getPassword();
        this.status = userAuth.getStatus();
    }

    public UserAuth extractUserAuth() {
        UserAuth userAuth = new UserAuth();

        userAuth.setUid(this.uid);
        userAuth.setUsername(this.username);
        userAuth.setPassword(this.password);
        userAuth.setStatus(this.status);

        return userAuth;
    }
}
