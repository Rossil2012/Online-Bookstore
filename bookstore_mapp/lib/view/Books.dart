import 'package:bookstore_mapp/component/BookCarouselItem.dart';
import 'package:bookstore_mapp/component/BookListItem.dart';
import 'package:bookstore_mapp/component/CartListItem.dart';
import 'package:bookstore_mapp/utils/Request.dart';
import 'package:flutter/material.dart';
import 'package:getflutter/getflutter.dart';
import 'dart:convert';
import 'package:bookstore_mapp/utils/Constant.dart';

class Books extends StatefulWidget {
  @override
  _BooksState createState() => _BooksState();
}

class _BooksState extends State<Books> {
  List<dynamic> _books = List(), _searched = List();
  bool searchFolded = true;

  @override
  void initState() {
    super.initState();
    Future.delayed(Duration(seconds: 0)).then((value) {
      Request.get(Constant.url, '/getBooksAll', null, receiveBooksData);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text(
              'Online Bookstore'
          ),
        ),
        floatingActionButtonLocation: FloatingActionButtonLocation.centerFloat,
        floatingActionButton: Container(
            width: MediaQuery.of(context).size.width - 60,
            child: Container(
              decoration: BoxDecoration(
                  boxShadow: [
                    BoxShadow(
                        color: Colors.black87,
                        blurRadius: 15.0,
                        spreadRadius: 5.0)
                  ]),
              child: Theme(
                  data: ThemeData(
                      primaryColor: Colors.white, hintColor: Colors.white),
                  child: TextField(
                    decoration: InputDecoration(
                        contentPadding: EdgeInsets.all(10.0),
                        border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(15.0)),
                        fillColor: Colors.blueGrey[50],
                        filled: true,
                        prefixIcon: Icon(
                          Icons.search,
                          color: Colors.blueGrey[300],
                        )),
                    onChanged: (String text) {
                      var tmp = List();
                      _books.forEach((ite) {
                        if (ite['author'].contains(text) || ite['name'].contains(text)) {
                          tmp.add(ite);
                        }
                      });
                      setState(() {
                        _searched = tmp;
                      });
                    },
                  )),
            )),
        body: ListView(
          children: <Widget>[
            SizedBox(height: 20),
            Container(
              width: double.infinity,
              height: 300,
              margin: EdgeInsets.all(0.0),
              child: GFCarousel(
                items: swiperImgs(),
                height: 300,
                enableInfiniteScroll: true,
                viewportFraction: 0.8,
                enlargeMainPage: true,
                autoPlay: true,
                autoPlayInterval: Duration(seconds: 5),
                autoPlayAnimationDuration: Duration(seconds: 1),
              ),
              decoration: BoxDecoration(boxShadow: [
                BoxShadow(
                    color: Colors.black87, blurRadius: 25.0, spreadRadius: 10.0)
              ]),
            ),
            Container(
              padding: EdgeInsets.only(top: 30),
              child: ListView.builder(
                primary: false,
                physics: NeverScrollableScrollPhysics(),
                shrinkWrap: true,
                itemCount: _searched.length,
                itemBuilder: (BuildContext context, int index) {
                  return BookListItem(_searched[index]);
                },
              ),
            ),
            SizedBox(height: 50.0)
          ],
        ));
  }

  receiveBooksData(data) {
    List list = jsonDecode(data);
    this.setState(() {
      _books = list;
      _searched = list;
    });
  }

  List<Widget> swiperImgs() {
    List<Widget> ret = new List();
    if (_books.isEmpty) {
      return <Widget>[
        Container(
        child: Image.network(
            'http://via.placeholder.com/300x300',
            fit: BoxFit.cover
        ),
      )];
    } else {
      _books.sublist(0, 5).forEach((ite) {
        ret.add(BookCarouselItem(ite));
      });
      return ret;
    }
  }
}
