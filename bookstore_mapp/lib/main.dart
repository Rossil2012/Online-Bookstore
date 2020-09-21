import 'package:bookstore_mapp/screen/MainScreen.dart';
import 'package:flutter/material.dart';
import 'package:bot_toast/bot_toast.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Online Bookstore',
      builder: BotToastInit(),
      navigatorObservers: [BotToastNavigatorObserver()],
      home: MainScreen()
    );
  }
}
