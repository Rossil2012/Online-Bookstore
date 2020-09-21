package indi.rossil.bookstore_backend.demo.controller;

import com.alibaba.fastjson.JSON;
import indi.rossil.bookstore_backend.demo.constant.Constant;
import indi.rossil.bookstore_backend.demo.service.UserService;

import indi.rossil.bookstore_backend.demo.service.widgets.Grant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public String login(@RequestBody Map<String, String> json) {
        System.out.println(json);
        return userService.login(json.get(Constant.USERNAME), json.get(Constant.PASSWORD));
    }

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public String register(@RequestBody Map<String, String> json) {
        System.out.println(json);
        return userService.register(json.get(Constant.USERNAME), json.get(Constant.PASSWORD), json.get(Constant.EMAIL));
    }

    @RequestMapping(value = "/logout", method = RequestMethod.POST)
    public void logout(@RequestBody Map<String, String> json) {
        userService.logout(json.get(Constant.TOKEN));
    }

    @RequestMapping(value = "/getUsersAll", method = RequestMethod.POST)
    public String getUsersAll(@RequestBody Map<String, String> json) {
        Grant auth = userService.checkUser(json.get(Constant.TOKEN));
        if (auth != null && auth.getStatus() == 0) {
            return JSON.toJSONString(userService.getUsersAll());
        }
        return Constant.VERIFYFAIL;
    }

    @RequestMapping(value = "/prohibitUser", method = RequestMethod.POST)
    public String prohibitUser(@RequestBody Map<String, String> json) {
        Grant auth = userService.checkUser(json.get(Constant.TOKEN));
        if (auth != null && auth.getStatus() == 0) {
            userService.setUserStatus(Long.valueOf(json.get(Constant.USERID)), 400);
            return Constant.OPTSUCC;
        }
        return Constant.VERIFYFAIL;
    }

    @RequestMapping(value = "/permitUser", method = RequestMethod.POST)
    public String permitUser(@RequestBody Map<String, String> json) {
        Grant auth = userService.checkUser(json.get(Constant.TOKEN));
        if (auth != null && auth.getStatus() == 0) {
            userService.setUserStatus(Long.valueOf(json.get(Constant.USERID)), 1);
            return Constant.OPTSUCC;
        }
        return Constant.VERIFYFAIL;
    }
}
