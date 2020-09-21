package indi.rossil.bookstore_backend.demo.entity.assemble;

import indi.rossil.bookstore_backend.demo.entity.OrderItem;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AsOrderCollection {
    private Long uid;
    private String username;

    private List<List<AsOrderItem>> asOrderList;

    public void makeUser(AsUser asUser) {
        this.uid = asUser.getUid();
        this.username = asUser.getUsername();
    }

    public void makeOrderItemList(List<List<AsOrderItem>> asOrderList) {
        this.asOrderList = asOrderList;
    }
}
