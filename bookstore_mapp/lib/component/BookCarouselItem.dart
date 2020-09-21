import 'package:flutter/material.dart';
import 'dart:convert';
import 'package:bookstore_mapp/view/BookDetail.dart';

class BookCarouselItem extends StatelessWidget {
  var _book;

  BookCarouselItem(book) : super(key: GlobalKey()) {
    _book = book;
  }

  @override
  Widget build(BuildContext context) {
    return InkWell(
      child: Container(
          child: Image.memory(
        base64Decode(_book['image'].substring(23)),
        fit: BoxFit.cover,
      )),
      onTap: () {
        Navigator.of(context).push(
          MaterialPageRoute(
            builder: (context) => BookDetail(_book),
          ),
        );
      },
    );
  }
}
