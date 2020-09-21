import 'dart:convert';
import 'package:bookstore_mapp/component/CartListItem.dart';
import 'package:bookstore_mapp/utils/Constant.dart';
import 'package:bookstore_mapp/utils/Global.dart';
import 'package:bookstore_mapp/utils/Request.dart';
import 'package:bookstore_mapp/view/Login.dart';
import 'package:flutter/material.dart';
import 'package:bot_toast/bot_toast.dart';

class Cart extends StatefulWidget {
  @override
  _CartState createState() => _CartState();
}

class _CartState extends State<Cart> {
  var _items;

  @override
  void initState() {
    super.initState();
    _items = new List();
    if (Global.get('token') == null) {
      Future.delayed(Duration(seconds: 0)).then((value) {
        Navigator.of(context)
            .push(
          MaterialPageRoute(
            builder: (context) => Login(),
          ),
        )
            .then((value) {
          post();
        });
        return null;
      });
      return;
    }
    post();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Online Bookstore'),
      ),
      body: ListView(
        children: <Widget>[
          SizedBox(height: 10.0),
          Container(
            child: ListView.builder(
                primary: false,
                physics: NeverScrollableScrollPhysics(),
                shrinkWrap: true,
                itemCount: _items.length,
                itemBuilder: (BuildContext context, int index) {
                  return CartListItem(_items[index], deleteCartItem, amountChange);
                }),
          ),
          SizedBox(height: 150.0)
        ],
      ),
      floatingActionButton: Container(
        height: 120,
        width: 120,
        decoration: BoxDecoration(
            color: Colors.white70,
            borderRadius: BorderRadius.circular(15.0),
            border: Border.all(color: Colors.grey, width: 1.0),
            boxShadow: [
              BoxShadow(color: Colors.grey, blurRadius: 10.0, spreadRadius: 3.0)
            ]),
        child: ListView(
          physics: NeverScrollableScrollPhysics(),
          children: <Widget>[
            IconButton(
              icon: Icon(
                Icons.shop,
              ),
              iconSize: 40,
              onPressed: () {
                if (_items.isEmpty) {
                  BotToast.showText(text: 'Error: The Cart is Empty !');
                  return;
                }
                Map json = new Map();
                json['token'] = Global.get('token');
                if (json['token'] == null) {
                  Navigator.of(context)
                      .push(
                    MaterialPageRoute(
                      builder: (context) => Login(),
                    ),
                  )
                      .then((value) {
                    post();
                  });
                }
                Request.post(Constant.url, '/submitCart', json, null)
                    .then((value) {
                  if (jsonDecode(value)['verify'] == '0') {
                    Navigator.of(context).push(
                      MaterialPageRoute(
                        builder: (context) => Login(),
                      ),
                    ).then((value) {
                      post();
                    });
                  } else if (jsonDecode(value)['opt'] == '1') {
                    post();
                    BotToast.showText(text: 'Submit Successfully !');
                  }
                });
              },
            ),
            Divider(
              thickness: 4.0,
            ),
            Center(
                child: Row(
              children: <Widget>[
                SizedBox(width: 10.0),
                Text(
                  '¥',
                  style: TextStyle(color: Colors.red, fontSize: 25.0),
                ),
                Expanded(child: SizedBox()),
                Text(
                  getCost().toString(),
                  maxLines: 2,
                  style: TextStyle(color: Colors.red, fontSize: 18.0),
                ),
                Expanded(child: SizedBox())
              ],
            )),
          ],
        ),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.endFloat,
    );
  }

  post() {
    Map json = new Map();
    json['token'] = Global.get('token');
    Request.post(Constant.url, '/getCartItemsAll', json, getCartItems);
  }

  getCartItems(data) {
    var json = jsonDecode(data);
    List list = new List();
    Map map = new Map();
    if (json is List) {
      list = json;
    } else if (json is Map) {
      map = json;
    }
    if (map['verify'] == '0') {
      Navigator.of(context).push(
        MaterialPageRoute(
          builder: (context) => Login(),
        ),
      );
      post();
      return;
    } else {
      setState(() {
        _items = json;
      });
    }
  }

  double getCost() {
    double tmp = 0.0;
    _items.forEach((ite) {
      tmp += ite['price'];
    });
    return (tmp * 100).floor() / 100.0;
  }

  deleteCartItem() {
    post();
    BotToast.showText(text: 'Delete Successfully !');
  }

  amountChange() {
    post();
  }
}
