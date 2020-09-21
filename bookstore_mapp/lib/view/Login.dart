import 'dart:convert';
import 'package:bookstore_mapp/utils/Constant.dart';
import 'package:flutter/material.dart';
import 'package:flutter_login/flutter_login.dart';
import 'package:bookstore_mapp/utils/Request.dart';
import 'package:bookstore_mapp/utils/Global.dart';

class Login extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return FlutterLogin(
      title: 'BookStore',
      onLogin: _authUser,
      onSignup: _signUp,
      onRecoverPassword: _recoverPassword,
      onSubmitAnimationCompleted: () {
        Navigator.pop(context);
      },
      emailValidator: (value) => (value.isEmpty ? 'Empty Username' : null),
      passwordValidator: (value) => (value.isEmpty ? 'Empty Password' : null),
      messages: LoginMessages(
        usernameHint: 'Username',
        recoverPasswordDescription: 'Your password will be reset to 123456'
      ),
    );
  }

  Future<String> _authUser(LoginData data) {
    Map<String, String> authInfo = new Map();
    authInfo['username'] = data.name;
    authInfo['password'] = data.password;
    return Request.post(Constant.url, '/login', authInfo, null).then((res) {
      var json = jsonDecode(res);
      if (json['status'] == 404) {
        return 'Invalid Username or Password.';
      } else {
        Global.put('token', json['token']);
        return null;
      }
    });
  }

  Future<String> _signUp(LoginData data) {
    return Future.value('Unavailable Now');
  }

  Future<String> _recoverPassword(String name) {
    return Future.value('Unavailable Now');
  }
}