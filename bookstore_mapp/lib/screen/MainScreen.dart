import 'package:bookstore_mapp/view/Books.dart';
import 'package:bookstore_mapp/view/Cart.dart';
import 'package:bookstore_mapp/view/Profile.dart';
import 'package:flutter/material.dart';
import 'package:getflutter/getflutter.dart';
import 'package:titled_navigation_bar/titled_navigation_bar.dart';

class MainScreen extends StatefulWidget {
  @override
  _MainScreenState createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
  int _page = 0;
  PageController _pageController;

  @override
  void initState() {
    super.initState();
    _pageController = PageController();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: PageView (
        controller: _pageController,
        onPageChanged: (index) {
          setState(() {
            _page = index;
          });
        },
//        children: <Widget>[Books(), Cart(), Profile()],
        children: <Widget>[Books(), Cart()],
      ),
      bottomNavigationBar: TitledBottomNavigationBar(
        currentIndex: _page,

        reverse: true,
        onTap: (index) {
          setState(() {
            _page = index;
          });
          _pageController.jumpToPage(index);
        },
        items: [
          TitledNavigationBarItem(title: Text('Home'), icon: Icons.home),
          TitledNavigationBarItem(title: Text('Cart'), icon: Icons.shopping_cart),
//          TitledNavigationBarItem(title: Text('Profile'), icon: Icons.person)
        ],
      ),
    );
  }
}
