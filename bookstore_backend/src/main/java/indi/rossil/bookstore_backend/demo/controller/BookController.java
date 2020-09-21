package indi.rossil.bookstore_backend.demo.controller;

import com.alibaba.fastjson.JSON;
import indi.rossil.bookstore_backend.demo.constant.Constant;
import indi.rossil.bookstore_backend.demo.entity.Book;
import indi.rossil.bookstore_backend.demo.entity.Liked;
import indi.rossil.bookstore_backend.demo.entity.NoBook;
import indi.rossil.bookstore_backend.demo.repository.BookRepository;
import indi.rossil.bookstore_backend.demo.repository.NoBookRepository;
import indi.rossil.bookstore_backend.demo.service.BookService;

import indi.rossil.bookstore_backend.demo.service.UserService;
import indi.rossil.bookstore_backend.demo.service.widgets.Grant;
import org.apache.commons.lang.StringUtils;
import org.bson.internal.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.net.URL;
import java.util.List;
import java.util.Map;

@RestController
public class BookController {
    @Autowired
    private BookService bookService;

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/getBooksAll", method = RequestMethod.GET)
    public String getBooksAll() {
        return JSON.toJSONString(bookService.getBooksAll());
    }

    @RequestMapping(value = "/getBookOne", method = RequestMethod.GET)
    public String getBookOne(@RequestParam("id") Long bookId) {
        return JSON.toJSONString(bookService.getBookOne(bookId));
    }

    @RequestMapping(value = "/likeBook", method = RequestMethod.POST)
    public String likeBook(@RequestBody Map<String, String> json) {
        Grant auth = userService.checkUser(json.get(Constant.TOKEN));
        if (auth != null) {
            bookService.likeBook(auth.getUid(), Long.valueOf(json.get(Constant.BOOKID)));
            return Constant.OPTSUCC;
        }
        return Constant.VERIFYFAIL;
    }

    @RequestMapping(value = "/dislikeBook", method = RequestMethod.POST)
    public String dislikeBook(@RequestBody Map<String, String> json) {
        Grant auth = userService.checkUser(json.get(Constant.TOKEN));
        if (auth != null) {
            bookService.dislikeBook(auth.getUid(), Long.valueOf(json.get(Constant.BOOKID)));
            return Constant.OPTSUCC;
        }
        return Constant.VERIFYFAIL;
    }

    @RequestMapping(value = "/getLikedBooksAll", method = RequestMethod.POST)
    public String getLikedBooksAll(@RequestBody Map<String, String> json) {
        Grant auth = userService.checkUser(json.get(Constant.TOKEN));
        if (auth != null) {
            return JSON.toJSONString(bookService.getLikedBooksAll(auth.getUid()));
        }
        return Constant.VERIFYFAIL;
    }

    @RequestMapping(value = "/getLikedBookOne", method = RequestMethod.POST)
    public String getLikedBookOne(@RequestBody Map<String, String> json) {
        Grant auth = userService.checkUser(json.get(Constant.TOKEN));
        if (auth != null) {
            return bookService.getLikedBookOne(auth.getUid(), Long.valueOf(json.get(Constant.BOOKID))) == null ?
                Constant.OPTFAIL : Constant.OPTSUCC;
        }
        return Constant.VERIFYFAIL;
    }

    @RequestMapping(value = "/updateBook", method = RequestMethod.POST)
    public String updateBook(@RequestBody Map<String, String> json) {
        System.out.println(json);
        Grant auth = userService.checkUser(json.get(Constant.TOKEN));
        if (auth != null && auth.getStatus() == 0) {
            if (bookService.updateBook(json)) {
                return Constant.OPTSUCC;
            } else {
                return Constant.OPTFAIL;
            }

        }
        return Constant.VERIFYFAIL;
    }

    @RequestMapping(value = "/deleteBook", method = RequestMethod.POST)
    public String deleteBook(@RequestBody Map<String, String> json) {
        System.out.println(json);
        Grant auth = userService.checkUser(json.get(Constant.TOKEN));
        if (auth != null && auth.getStatus() == 0) {
            bookService.deleteBook(Long.valueOf(json.get(Constant.BOOKID)));
            return Constant.OPTSUCC;
        }
        return Constant.VERIFYFAIL;
    }

    /* Only for Test */
    @Autowired
    private NoBookRepository noBookRepository;
    @Autowired
    private BookRepository bookRepository;
    @RequestMapping(value = "/getNoBookData")
    public void tmp() throws IOException {
        List<Book> tmp = bookRepository.getBooksAll();
        String head = "data:image/jpeg;base64,";
        for (Book ite:tmp) {
            System.out.println(ite);
            URL url = new URL(ite.getImage());
            BufferedImage image = ImageIO.read(url);

            ByteArrayOutputStream bos = new ByteArrayOutputStream();
            String type = StringUtils.substring(ite.getImage(), ite.getImage().lastIndexOf(".") + 1);
            ImageIO.write(image, type, bos);
            byte[] imageBytes = bos.toByteArray();
            String imageString = Base64.encode(imageBytes);
            bos.close();

//            NoBook noBook = new NoBook(ite.getBookId(), head + imageString, ite.getDescription());
//            System.out.println(ite.getBookId());
//            noBookRepository.save(noBook);
        }
    }
}
