package indi.rossil.bookstore_backend.demo.entity.PK;

import lombok.Data;

import java.io.Serializable;

@Data
public class OrderItemPK implements Serializable {
    private Long oid;
    private Long bid;
}
