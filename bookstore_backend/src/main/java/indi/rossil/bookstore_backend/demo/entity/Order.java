package indi.rossil.bookstore_backend.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.sql.Date;
import java.util.List;

@Data
@Entity
@Table(name = "bookorder")
@DynamicInsert
@DynamicUpdate
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Order {
    @Id
    @Column(name = "oid")
    private Long oid;

    private Long uid;
    private Double cost;
    private Date date;

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "oid")
    List<OrderItem> orderItemList;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "bookorderitem", joinColumns = { @JoinColumn(name = "oid") }, inverseJoinColumns = { @JoinColumn(name = "bid") })
    List<Book> orderBookList;
}
