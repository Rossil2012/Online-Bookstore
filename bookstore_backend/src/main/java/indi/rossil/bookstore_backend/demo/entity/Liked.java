package indi.rossil.bookstore_backend.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import indi.rossil.bookstore_backend.demo.entity.PK.LikedPK;
import lombok.Data;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Data
@Entity
@Table(name = "likeditem")
@DynamicInsert
@DynamicUpdate
@IdClass(LikedPK.class)
@JsonIgnoreProperties(value = {"handler","hibernateLazyInitializer","fieldHandler"})
public class Liked {
    @Id
    @Column(name = "uid", nullable = false)
    private Long uid;

    @Id
    @Column(name = "bid", nullable = false)
    private Long bid;
}
