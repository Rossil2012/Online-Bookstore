Component({
  lifetimes: {
    attached: function() {
      let utils = require('../../../utils/util');
      const callback = (data) => {
        console.log(data);
        this.setData({
          books: data
        })
        this.setData({
          searchedBooks: data
        });
      };
      utils.restRequest("http://localhost:8080/getBooksAll", null, callback, "GET");
    }
  },
  data: {
    books: Array,
    searchedBooks: Array,
    noticeText: '啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦',
    searchText: '',
    isDetail: true,
    category: 0,
    categoryOpt: [{
      text: 'All Category',
      value: 0
    }],
    filter: 0,
    filterOpt: [{
      text: 'Like & Dislike',
      value: 0
    }]
  },
  methods: {
    changeView: function() {
      this.setData({
        isDetail: !this.data.isDetail
      })
    },
    tapDetail: function(event) {
      console.log(event);
      getApp()['curBook'] = this.data.books.filter((ite) => ite.bookId === event.currentTarget.dataset.src)[0];
      wx.navigateTo({
        url: '/pages/book-detail/book-detail'
      })
    },
    onSearch: function() {
      const a = 1;
      console.log(a);
      // a = 2;
      console.log(a);

      this.setData({
        searchedBooks: this.data.books.filter((ite) => {
          return ite['name'].indexOf(this.data.searchText) !== -1 ||
                 ite['author'].indexOf(this.data.searchText) !== -1;
        })
      });
    }
  },
})