package indi.rossil.bookstore_backend.demo.controller;

import com.alibaba.fastjson.JSON;
import indi.rossil.bookstore_backend.demo.constant.Constant;
import indi.rossil.bookstore_backend.demo.entity.Book;
import indi.rossil.bookstore_backend.demo.service.CartService;
import indi.rossil.bookstore_backend.demo.service.UserService;
import indi.rossil.bookstore_backend.demo.service.widgets.Grant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class CartController {
    @Autowired
    CartService cartService;

    @Autowired
    UserService userService;

    @RequestMapping(value = "/getCartItemsAll", method = RequestMethod.POST)
    String getCartItemsAll(@RequestBody Map<String, String> json) {
        Grant auth = userService.checkUser(json.get(Constant.TOKEN));
        if (auth != null) {
            return cartService.getCartItemsAll(auth.getUid());
        }
        return Constant.VERIFYFAIL;
    }

    @RequestMapping(value = "/setCartItem", method = RequestMethod.POST)
    String setCartItem(@RequestBody Map<String, String> json) {
        Grant auth = userService.checkUser(json.get(Constant.TOKEN));
        if (auth != null) {
            cartService.setCartItem(auth.getUid(), Long.valueOf(json.get(Constant.BOOKID)), Long.valueOf(json.get(Constant.AMOUNT)));
            return Constant.OPTSUCC;
        }
        return Constant.VERIFYFAIL;
    }

    @RequestMapping(value = "/removeCartItem", method = RequestMethod.POST)
    String removeCartItem(@RequestBody Map<String, String> json) {
        Grant auth = userService.checkUser(json.get(Constant.TOKEN));
        if (auth != null) {
            cartService.removeBook(auth.getUid(), Long.valueOf(json.get(Constant.BOOKID)));
            return Constant.OPTSUCC;
        }
        return Constant.VERIFYFAIL;
    }

    @RequestMapping(value = "/submitCart", method = RequestMethod.POST)
    String submitCart(@RequestBody Map<String, String> json) {
        Grant auth = userService.checkUser(json.get(Constant.TOKEN));
        if (auth != null) {
            cartService.submit(auth.getUid());
            return Constant.OPTSUCC;
        }
        return Constant.VERIFYFAIL;
    }
}
