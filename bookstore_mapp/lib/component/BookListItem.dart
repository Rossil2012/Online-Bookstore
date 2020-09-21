import 'package:bookstore_mapp/utils/Global.dart';
import 'package:bookstore_mapp/view/BookDetail.dart';
import 'package:flip_card/flip_card.dart';
import 'package:flutter/material.dart';
import 'dart:convert';

class BookListItem extends StatefulWidget {
  var _book;

  BookListItem(book) : super(key: GlobalKey()) {
    _book = book;
  }

  @override
  _BookListItemState createState() => _BookListItemState(_book);
}

class _BookListItemState extends State<BookListItem> {
  var _book;

  _BookListItemState(book) {
    _book = book;
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
        padding: const EdgeInsets.only(bottom: 10.0, left: 10, right: 10),
        child: FlipCard(
          direction: FlipDirection.HORIZONTAL,
          flipOnTouch: true,
          front: Container(
            height: 110,
            decoration: BoxDecoration(
              boxShadow: [
                BoxShadow(
                    color: Colors.grey, blurRadius: 5.0, spreadRadius: 2.0)
              ],
              color: Colors.white,
              border: Border.all(color: Colors.black54, width: 2.0),
              borderRadius: BorderRadius.all(Radius.circular(4.0)),
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
                  height: 80,
                  width:
                      MediaQuery.of(context).size.width - 130 - 20 - (50 + 15),
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
                SizedBox(width: 15.0),
                Center(
                  child: IconButton(
                    icon: Icon(
                      Icons.transit_enterexit
                    ),
                    onPressed: () {
                      Navigator.of(context).push(
                        MaterialPageRoute(
                          builder: (context) => BookDetail(_book),
                        ),
                      );
                    },
                  ),
                )
              ],
            ),
          ),
          back: Container(
            height: 110,
            padding: EdgeInsets.all(10.0),
            decoration: BoxDecoration(
              boxShadow: [
                BoxShadow(
                    color: Colors.grey, blurRadius: 5.0, spreadRadius: 2.0)
              ],
              color: Colors.white,
              border: Border.all(color: Colors.black54, width: 2.0),
              borderRadius: BorderRadius.all(Radius.circular(4.0)),
            ),
            child: Text(
              _book['description'],
              overflow: TextOverflow.ellipsis,
              maxLines: 4,
            ),
          ),
        ));
  }
}
