package indi.rossil.bookstore_backend.demo.service.serviceimpl;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import indi.rossil.bookstore_backend.demo.constant.Constant;
import indi.rossil.bookstore_backend.demo.entity.Book;
import indi.rossil.bookstore_backend.demo.dao.BookDao;
import indi.rossil.bookstore_backend.demo.entity.Liked;
import indi.rossil.bookstore_backend.demo.entity.NoBook;
import indi.rossil.bookstore_backend.demo.entity.assemble.AsBook;
import indi.rossil.bookstore_backend.demo.service.BookService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.Map;

@Transactional
@Service
public class BookServiceImpl implements BookService {
    @Autowired
    private BookDao bookDao;

    @Override
    public List<AsBook> getBooksAll() {
        return bookDao.getBooksAll();
    }

    @Override
    public AsBook getBookOne(Long bid){
        return bookDao.getBookOne(bid);
    }

    @Override
    public void deleteBook(Long bid) {
        bookDao.deleteBook(bid);
    }

    @Override
    public Boolean updateBook(Map<String, String> json) {
        Long bid = json.get(Constant.BOOKID) == null ? null : Long.valueOf(json.get(Constant.BOOKID));
        String isbn = json.get(Constant.ISBN);
        String name = json.get(Constant.BOOKNAME);
        String author = json.get(Constant.BOOKAUTHOR);
        String category = json.get(Constant.BOOKCATEGORY);
        Double price = json.get(Constant.BOOKPRICE) == null ? null : Double.valueOf(json.get(Constant.BOOKPRICE));
        Long inventory = json.get(Constant.BOOKINVENTORY) == null ? null : Long.valueOf(json.get(Constant.BOOKINVENTORY));
        Integer status = json.get(Constant.STATUS) == null ? null : Integer.valueOf(json.get(Constant.STATUS));

        String image = json.get(Constant.IMAGE);
        String description = json.get(Constant.DESCRIPTION);

        if (bid != null) {
            AsBook record = bookDao.getBookOne(bid);
            if (name != null) { record.setName(name); }
            if (isbn != null) { record.setIsbn(isbn); }
            if (author != null) { record.setAuthor(author); }
            if (category != null) { record.setType(category); }
            if (price != null) { record.setPrice(price); }
            if (inventory != null) { record.setInventory(inventory); }
            if (status != null) { record.setStatus(status != 0 ? 1 : 0); }

            if (image != null) { record.setImage(image); }
            if (description != null) { record.setDescription(description); }

            System.out.println(record);
            bookDao.updateBook(record);
        } else {
            bid = bookDao.maxBid() + 1;
            System.out.println(json);
            if (name == null || price == null || inventory == null || status == null) {
                return false;
            }
            AsBook record = new AsBook(null, bid, isbn, name, author, category, price, inventory, status != 0 ? 1 : 0, image, description);

            System.out.println(record);
            bookDao.updateBook(record);
        }

        return true;
    }

    @Override
    public List<Liked> getLikedBooksAll(Long uid) {
        return bookDao.getLikedBooksAll(uid);
    }

    @Override
    public Liked getLikedBookOne(Long uid, Long bid) {
        return bookDao.getLikedBookOne(uid, bid);
    }

    @Override
    public void likeBook(Long uid, Long bid) {
        bookDao.insertLiked(uid, bid);
    }

    @Override
    public void dislikeBook(Long uid, Long bid) {
        bookDao.deleteLikedAllByUidAndBid(uid, bid);
    }
}
