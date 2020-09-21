package indi.rossil.bookstore_backend.demo.service.serviceimpl;

import com.alibaba.fastjson.JSON;
import indi.rossil.bookstore_backend.demo.constant.Constant;
import indi.rossil.bookstore_backend.demo.dao.UserDao;
import indi.rossil.bookstore_backend.demo.entity.User;
import indi.rossil.bookstore_backend.demo.entity.UserAuth;
import indi.rossil.bookstore_backend.demo.entity.assemble.AsUser;
import indi.rossil.bookstore_backend.demo.service.CacheService;
import indi.rossil.bookstore_backend.demo.service.UserService;
import indi.rossil.bookstore_backend.demo.service.widgets.Grant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserDao userDao;

    @Autowired
    private CacheService cacheService;

    @Override
    public AsUser getUserOne(Long uid) {
        return userDao.getUserOne(uid);
    }

    @Override
    public List<AsUser> getUsersAll() {
        return userDao.getUsersAll();
    }

    @Override
    public void setUserStatus(Long uid, Integer status) {
        AsUser asUser = userDao.getUserOne(uid);
        asUser.setStatus(status);

        userDao.updateUser(asUser);
    }

    @Override
    public String login(String usr, String password) {
        UserAuth userAuth = userDao.checkUsr(usr, password);
        if (userAuth == null) {
            Grant noGrant = new Grant();
            return JSON.toJSONString(noGrant);
        } else {
            Date date = new Date();
            String token = getSHA256(getDateStr(date) + userAuth.toString());
            Grant grant = new Grant(userAuth.getUid(), userAuth.getStatus(), token, Constant.sessionTermSec, date);
            cacheService.setUsr(token, grant);
            return JSON.toJSONString(grant);
        }
    }

    @Override
    public String register(String usr, String password, String email) {
        String emailReg = "^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]+)+$";
        if (email.matches(emailReg)) {
            if (userDao.checkUsername(usr) != null) {
                return Constant.OPTFAIL;
            }
            Long uid = userDao.newUserAuth(1, usr, password);
            userDao.addNewUser(uid, null, null, null, email, null);
            return login(usr, password);
        } else {
            return Constant.OPTFAIL;
        }

    }

    @Override
    public Boolean logout(String token) {
        return cacheService.delUsr(token);
    }

    @Override
    public Grant checkUser(String token) {
        Grant grant = cacheService.getUsr(token);
        if (grant != null) {
            Date date = new Date();
            if (grant.getTime().getTime() - date.getTime() > grant.getSessionTermSec() * 1000) {
                cacheService.delUsr(token);
                return null;
            } else {
                return grant;
            }
        }
        return null;
    }

    private static String getSHA256(String str) {
        MessageDigest messageDigest;
        String encodestr = "";
        try {
            messageDigest = MessageDigest.getInstance("SHA-256");
            messageDigest.update(str.getBytes("UTF-8"));
            encodestr = byte2Hex(messageDigest.digest());
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return encodestr;
    }

    private static String byte2Hex(byte[] bytes) {
        StringBuffer stringBuffer = new StringBuffer();
        String temp = "";
        for (int i = 0; i < bytes.length; i++) {
            temp = Integer.toHexString(bytes[i] & 0xFF);
            if (temp.length() == 1) {
                stringBuffer.append("0");
            }
            stringBuffer.append(temp);
        }
        return stringBuffer.toString();
    }

    private static String getDateStr(Date date) {
        String pattern = "yyyy-MM-dd HH:mm:ss";
        SimpleDateFormat sdf = new SimpleDateFormat(pattern);
        return sdf.format(date);
    }
}
