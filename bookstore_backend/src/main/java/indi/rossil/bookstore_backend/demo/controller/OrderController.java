package indi.rossil.bookstore_backend.demo.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.annotation.JSONField;
import indi.rossil.bookstore_backend.demo.constant.Constant;
import indi.rossil.bookstore_backend.demo.service.OrderService;
import indi.rossil.bookstore_backend.demo.service.UserService;
import indi.rossil.bookstore_backend.demo.service.widgets.Grant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.persistence.ManyToMany;
import java.util.Map;

@RestController
public class OrderController {
    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/getOrdersAllUsers", method = RequestMethod.POST)
    public String getOrdersAllUsers(@RequestBody Map<String, String> json) {
        Grant auth = userService.checkUser(json.get(Constant.TOKEN));
        if (auth != null && auth.getStatus() == 0) {
            return JSON.toJSONString(orderService.getOrdersAllUsers());
        }
        return Constant.VERIFYFAIL;
    }

    @RequestMapping(value = "/getOrdersOneUser", method = RequestMethod.POST)
    public String getOrdersOneUser(@RequestBody Map<String, String> json) {
        Grant auth = userService.checkUser(json.get(Constant.TOKEN));
        if (auth != null) {
            return JSON.toJSONString(orderService.getOrdersOneUser(auth.getUid()));
        }
        return Constant.VERIFYFAIL;
    }

    @RequestMapping(value = "/getOrderItemsOneOrder", method = RequestMethod.POST)
    public String getOrderItemsOneOrder(@RequestBody Map<String, String> json) {
        Grant auth = userService.checkUser(json.get(Constant.TOKEN));
        if (auth != null) {
            return JSON.toJSONString(orderService.getOrderItemsOneOrder(auth.getUid(), Long.valueOf(json.get(Constant.ORDERID)), auth.getStatus() == 0));
        }
        return Constant.VERIFYFAIL;
    }

    @RequestMapping(value = "/getOrderCollectionsAllUsers", method = RequestMethod.POST)
    public String getOrderCollectionsAllUsers(@RequestBody Map<String, String> json) {
        Grant auth = userService.checkUser(json.get(Constant.TOKEN));
        if (auth != null && auth.getStatus() == 0) {
            return JSON.toJSONString(orderService.getOrderCollectionsAllUsers());
        }

        return Constant.VERIFYFAIL;
    }

    @RequestMapping(value = "/getOrderCollectionsOneUser", method = RequestMethod.POST)
    public String getOrderCollectionsOneUser(@RequestBody Map<String, String> json) {
        Grant auth = userService.checkUser(json.get(Constant.TOKEN));
        if (auth != null) {
            return JSON.toJSONString(orderService.getOrderCollectionsOneUser(auth.getUid()));
        }
        return Constant.VERIFYFAIL;
    }
}
