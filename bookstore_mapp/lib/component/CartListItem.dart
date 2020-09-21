import 'package:bookstore_mapp/utils/Constant.dart';
import 'package:bookstore_mapp/utils/Global.dart';
import 'package:bookstore_mapp/utils/Request.dart';
import 'package:bookstore_mapp/view/Login.dart';
import 'package:flutter/material.dart';
import 'dart:convert';
import 'package:stepper_counter_swipe/stepper_counter_swipe.dart';

class CartListItem extends StatefulWidget {
  var _book, _deleteCallback, _amountChangeCallback;
  CartListItem(book, deleteCallback, amountChangeCallback):super(key: GlobalKey()) {
    _book = book;
    _deleteCallback = deleteCallback;
    _amountChangeCallback = amountChangeCallback;
  }

  @override
  _CartListItemState createState() => _CartListItemState(_book, _deleteCallback, _amountChangeCallback);
}

class _CartListItemState extends State<CartListItem> {
  var _book, _deleteCallback, _amountChangeCallback;
  _CartListItemState(book, deleteCallback, amountChangeCallback) {
    _book = book;
    _deleteCallback = deleteCallback;
    _amountChangeCallback = amountChangeCallback;
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.only(left: 10.0, right: 10.0, bottom: 10.0),
      child: Container(
        height: 120,
        decoration: BoxDecoration(
          color: Colors.white,
          border: Border.all(color: Colors.black, width: 3.0),
          boxShadow: [ BoxShadow(color: Colors.grey, blurRadius: 10.0, spreadRadius: 4.0) ],
          borderRadius: BorderRadius.circular(15.0)
        ),
        child: Row(
          children: <Widget>[
            ClipRRect(
              borderRadius: BorderRadius.circular(5),
              child: Image.memory(
                base64Decode(_book['image'].substring(23)),
                height: 100,
                width: 100,
                fit: BoxFit.cover,
              ),
            ),
            SizedBox(width: 15),
            Container(
              height: 100,
              width: MediaQuery.of(context).size.width - 130 - 20 - (80 + 15),
              child: ListView(
                primary: false,
                physics: NeverScrollableScrollPhysics(),
                shrinkWrap: true,
                children: <Widget>[
                  Container(
                    alignment: Alignment.centerLeft,
                    child: Text(
                      _book['name'],
                      style: TextStyle(
                        fontWeight: FontWeight.w700,
                        fontSize: 14,
                      ),
                      maxLines: 2,
                      textAlign: TextAlign.left,
                    ),
                  ),
                  SizedBox(height: 3),
                  Row(
                    children: <Widget>[
                      Container(
                        alignment: Alignment.centerLeft,
                        child: Text(
                          '¥',
                          style: TextStyle(
                            fontWeight: FontWeight.bold,
                            fontSize: 13,
                            color: Colors.redAccent,
                          ),
                          maxLines: 1,
                          textAlign: TextAlign.left,
                        ),
                      ),
                      SizedBox(width: 3),
                      Container(
                        alignment: Alignment.centerLeft,
                        child: Text(
                          _book['price'].toString(),
                          style: TextStyle(
                            fontWeight: FontWeight.bold,
                            fontSize: 13,
                            color: Colors.redAccent,
                          ),
                          maxLines: 1,
                          textAlign: TextAlign.left,
                        ),
                      ),
                    ],
                  ),
                  SizedBox(height: 10),
                  Container(
                    alignment: Alignment.centerLeft,
                    child: Text(
                      _book['author'],
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                        fontSize: 16,
                      ),
                      maxLines: 1,
                      textAlign: TextAlign.left,
                    ),
                  ),
                ],
              ),
            ),
            SizedBox(width: 15),
            Container(
              height: 100,
              width: 80,
              child: ListView(
                physics: NeverScrollableScrollPhysics(),
                children: <Widget>[
                  IconButton(
                    icon: Icon(
                      Icons.delete,
                    ),
                    color: Colors.black54,
                    onPressed: () {
                      Map json = new Map();
                      json['token'] = Global.get('token');
                      json['bid'] = _book['bookId'];
                      Request.post(Constant.url, '/removeCartItem', json, null).then((value) {
                        if (jsonDecode(value)['verify'] == '0') {
                          Navigator.of(context).push(
                            MaterialPageRoute(
                              builder: (context) => Login(),
                            ),
                          );
                        } else if (jsonDecode(value)['opt'] == '1') {
                          _deleteCallback();
                        }
                      });
                    },
                  ),
                  StepperSwipe(
                    initialValue: _book['amount'],
                    iconsColor: Colors.black,
                    dragButtonColor: Colors.blueAccent,
                    withNaturalNumbers: true,
                    onChanged: (value) {
                      if (Global.get('token') == null) {
                        Navigator.of(context).push(
                          MaterialPageRoute(
                            builder: (context) => Login(),
                          ),
                        );
                        return;
                      }
                      Map json = new Map();
                      json['token'] = Global.get('token');
                      json['bid'] = _book['bookId'];
                      json['amount'] = value;
                      Request.post(Constant.url, '/setCartItem', json, null).then((value) {
                        if (jsonDecode(value)['verify'] == '0') {
                          Navigator.of(context).push(
                            MaterialPageRoute(
                              builder: (context) => Login(),
                            ),
                          );
                        } else if (jsonDecode(value)['opt'] == '1') {
                          _amountChangeCallback();
                        }
                      });
                    },
                  )
                ],
              ),
            )
          ],
        ),
      ),
    );
  }
}