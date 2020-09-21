import 'dart:async';
import 'package:bookstore_mapp/utils/Request.dart';
import 'package:bookstore_mapp/view/Login.dart';
import 'package:bookstore_mapp/utils/Global.dart';
import 'package:bookstore_mapp/utils/Constant.dart';
import 'package:flutter/material.dart';
import 'dart:convert';
import 'dart:io';
import 'package:like_button/like_button.dart';
import 'package:bot_toast/bot_toast.dart';

class BookDetail extends StatefulWidget {
  var _book;

  BookDetail(book) {
    _book = book;
  }

  @override
  _BookDetailState createState() => _BookDetailState(_book);
}

class _BookDetailState extends State<BookDetail> {
  var _book;
  bool _isLiked, _tmpLiked;

  _BookDetailState(book) {
    _book = book;
  }

  @override
  void initState() {
    super.initState();
    _isLiked = false;
    _tmpLiked = false;
    if (Global.get('token') != null) {
      post();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text('Online Bookstore'),
          leading: IconButton(
            icon: Icon(
              Icons.arrow_back,
            ),
            onPressed: () => Navigator.pop(context),
          ),
        ),
        body: ListView(
          children: <Widget>[
            SizedBox(height: 10),
            Container(
                padding: EdgeInsets.only(left: 20),
                height: 400,
                child: Padding(
                  padding: EdgeInsets.only(right: 10),
                  child: ClipRRect(
                    borderRadius: BorderRadius.circular(10),
                    child: Image.memory(
                      base64Decode(_book['image'].substring(23)),
                      height: 250,
                      width: MediaQuery.of(context).size.width - 40,
                      fit: BoxFit.cover,
                    ),
                  ),
                )),
            SizedBox(height: 20),
            ListView(
              padding: EdgeInsets.symmetric(horizontal: 20),
              primary: false,
              physics: NeverScrollableScrollPhysics(),
              shrinkWrap: true,
              children: <Widget>[
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: <Widget>[
                    Container(
                      alignment: Alignment.centerLeft,
                      child: Text(
                        _book['name'],
                        style: TextStyle(
                          fontWeight: FontWeight.w700,
                          fontSize: 20,
                        ),
                        maxLines: 2,
                        textAlign: TextAlign.left,
                      ),
                    ),
                    LikeButton(
                      isLiked: _isLiked,
                      onTap: (flag) async {
                        bool succ = false;
                        if (Global.get('token') == null) {
                          Navigator.of(context).push(
                            MaterialPageRoute(
                              builder: (context) => Login(),
                            ),
                          ).then((value) {
                            post();
                          });
                        } else {
                          Map json = new Map();
                          json['token'] = Global.get('token');
                          json['bid'] = _book['bookId'];
                          var httpClient = new HttpClient();
                          var uri = Uri.http(Constant.url,
                              !flag ? '/likeBook' : '/dislikeBook', null);
                          var request = await httpClient.postUrl(uri);
                          request.headers.set(
                              'content-type', 'application/json');
                          request.add(utf8.encode(jsonEncode(json)));
                          var response = await request.close();
                          if (response.statusCode == HttpStatus.ok) {
                            String res = await response.transform(utf8.decoder).join();
                            succ = jsonDecode(res)['opt'] == '1';
                            if (jsonDecode(res)['verify'] == '0') {
                              Navigator.of(context).push(
                                MaterialPageRoute(
                                  builder: (context) => Login(),
                                ),
                              ).then((value) {
                                post();
                              });
                            }
                          } else {
                            succ = false;
                          }
                        }
                        return Future.value(succ ? !flag : flag);
                      },
                    ),
                  ],
                ),
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
                SizedBox(height: 20),
                Container(
                  alignment: Alignment.centerLeft,
                  child: Text(
                    _book['author'],
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 17,
                    ),
                    maxLines: 1,
                    textAlign: TextAlign.left,
                  ),
                ),
                SizedBox(height: 20),
                Container(
                  alignment: Alignment.centerLeft,
                  child: Text(
                    _book['description'],
                    style: TextStyle(
                      fontWeight: FontWeight.normal,
                      fontSize: 15,
                    ),
                    textAlign: TextAlign.left,
                  ),
                ),
                SizedBox(height: 70),
              ],
            ),
          ],
        ),
        floatingActionButton: FloatingActionButton(
          child: Icon(
            Icons.shopping_cart,
          ),
          onPressed: () {
            if (Global.get('token') == null) {
              Navigator.of(context).push(
                MaterialPageRoute(
                  builder: (context) => Login(),
                ),
              ).then((value) {
                post();
              });
              return;
            }
            Map json = new Map();
            json['token'] = Global.get('token');
            json['bid'] = _book['bookId'];
            json['amount'] = 0;
            Request.post(Constant.url, '/setCartItem', json, null).then((value) {
              if (jsonDecode(value)['verify'] == '0') {
                Navigator.of(context).push(
                  MaterialPageRoute(
                    builder: (context) => Login(),
                  ),
                ).then((value) {
                  post();
                });
              } else if (jsonDecode(value)['opt'] == '1') {
                BotToast.showText(text: 'Add to Cart Successfully!');
              }
            });
          },
        ));
  }

  getLiked(data) {
    if (jsonDecode(data)['opt'] == '1') {
      setState(() {
        _isLiked = true;
      });
    }
  }

  post() {
    Map json = new Map();
    json['token'] = Global.get('token');
    json['bid'] = _book['bookId'];
    Request.post(Constant.url, '/getLikedBookOne', json, getLiked);
  }
}
