package indi.rossil.bookstore_backend.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import indi.rossil.bookstore_backend.demo.entity.PK.OrderItemPK;
import lombok.Data;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Data
@Entity
@Table(name = "bookorderitem")
@DynamicInsert
@DynamicUpdate
@IdClass(OrderItemPK.class)
@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
public class OrderItem {
    @Id
    @Column(name = "oid", nullable = false)
    private Long oid;

    @Id
    @Column(name = "bid", nullable = false)
    private Long bid;

    private Double price;
    private Long amount;
}
