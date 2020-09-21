import 'dart:convert';
import 'dart:io';

class Request {
  static Future<String> post(url, path, data, callback) async {
    var httpClient = new HttpClient();
    var uri = Uri.http(url, path, null);
    var request = await httpClient.postUrl(uri);
    request.headers.set('content-type', 'application/json');
    request.add(utf8.encode(json.encode(data)));
    var response = await request.close();
    if (response.statusCode == HttpStatus.ok) {
      String res = await response.transform(utf8.decoder).join();
      if (callback != null) {
        callback(res);
      }
      return Future.value(res);
    } else {
      return Future.error('error');
    }
  }

  static Future<String> get(url, path, args, callback) async {
    var httpClient = new HttpClient();
    var uri = Uri.http(url, path, args);
    var request = await httpClient.getUrl(uri);
    var response = await request.close();
    if (response.statusCode == HttpStatus.ok) {
      String res = await response.transform(utf8.decoder).join();
      if (callback != null) {
        callback(res);
      }
      return Future.value(res);
    } else {
      return Future.error('error');
    }
  }
}