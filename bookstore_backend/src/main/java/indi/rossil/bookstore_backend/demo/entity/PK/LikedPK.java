package indi.rossil.bookstore_backend.demo.entity.PK;

import lombok.Data;

import java.io.Serializable;

@Data
public class LikedPK implements Serializable {
    private Long uid;
    private Long bid;
}
