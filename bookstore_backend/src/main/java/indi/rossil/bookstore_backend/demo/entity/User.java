package indi.rossil.bookstore_backend.demo.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import indi.rossil.bookstore_backend.demo.entity.assemble.AsCartItem;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.repository.cdi.Eager;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Data
@Entity
@Table(name = "user")
@DynamicInsert
@DynamicUpdate
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(value = {"handler","hibernateLazyInitializer","fieldHandler"})
public class User {
    @Id
    @Column(name = "uid", nullable = false)
    private Long uid;

    private String nickname;
    private String tel;
    private String address;
    private String email;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "cartitem", joinColumns = { @JoinColumn(name = "uid") }, inverseJoinColumns = { @JoinColumn(name = "bid") })
    List<Book> cartBookList;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "likeditem", joinColumns = { @JoinColumn(name = "uid") }, inverseJoinColumns = { @JoinColumn(name = "bid") })
    List<Book> likedBookList;

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "uid")
    List<Order> orderList;

}