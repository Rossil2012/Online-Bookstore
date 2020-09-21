package indi.rossil.bookstore_backend.demo.service.widgets;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@Data
@AllArgsConstructor
public class Grant {
    public Grant() {
        this.uid = null;
        this.status = 404;
        this.token = null;
        this.sessionTermSec = null;
        this.time = null;
    }
    private Long uid;
    private Integer status;
    private String token;
    private Long sessionTermSec;
    private Date time;
}
