package indi.rossil.bookstore_backend.demo.service;

import indi.rossil.bookstore_backend.demo.service.widgets.Grant;

public interface CacheService {
    Grant getUsr(String token);
    void setUsr(String token, Grant grant);
    Boolean delUsr(String token);
}
