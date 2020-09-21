package indi.rossil.bookstore_backend.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import indi.rossil.bookstore_backend.demo.entity.PK.CartItemPK;
import lombok.Data;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Data
@Entity
@Table(name = "cartitem")
@DynamicInsert
@DynamicUpdate
@IdClass(CartItemPK.class)
@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
public class CartItem {
    @Id
    @Column(name = "uid", nullable = false)
    private Long uid;

    @Id
    @Column(name = "bid", nullable = false)
    private Long bid;

    private Long amount;
}
