package indi.rossil.bookstore_backend.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Data
@Entity
@Table(name = "book")
@DynamicInsert
@DynamicUpdate
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Book {
    @Id
    @Column(name = "id")
    private Long bookId;

    private String isbn;
    private String name;
    private String type;
    private String author;
    private Double price;
    private Long inventory;
    private Integer status;

    @Transient
    private String image;
    @Transient
    private String description;
}
