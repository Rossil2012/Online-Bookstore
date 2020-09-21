package indi.rossil.bookstore_backend.demo.service.serviceimpl;

import indi.rossil.bookstore_backend.demo.service.CacheService;
import indi.rossil.bookstore_backend.demo.service.widgets.Grant;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class CacheServiceImpl implements CacheService {
    private static Map<String, Grant> userAuth = new HashMap<>();

    @Override
    public Grant getUsr(String token) {
        return userAuth.get(token);
    }

    @Override
    public void setUsr(String token, Grant grant) {
        userAuth.put(token, grant);
    }

    @Override
    public Boolean delUsr(String token) {
        if (userAuth.containsKey(token)) {
            userAuth.remove(token);
            return true;
        }
        return false;
    }
}
