/**
 * Created with catClicker.
 * User: Phlammariont
 * Date: 2015-10-19
 * Time: 07:27 AM
 * To change this template use Tools | Templates.
 */
  (function ($) {
  var Model = {
    init: function (cats) {
      Model.catList = cats;
    },
    setActualCatByName: function (catName) {
      Model.catList.forEach( function (cat) {
        cat.actual = cat.name === catName;
      })
    }
  };
  var Octopus = {
    init: function (cats) {
      Model.init(cats);
      View.init();
    },
    getCats: function () {
      return Model.catList;
    },
    pickCat: function () {
      var catName = $(this).find(".cat-name").html();
      Model.setActualCatByName(catName);
      View.catArea.render();
    },
    getActualCat: function () {
      var actualCat;
      Model.catList.forEach( function (cat) {
        if (cat.actual) {
          actualCat = cat;
        }
      });
      return actualCat;
    },
    vote: function () {
      Model.catList.forEach( function (cat) {
        if (cat.actual) {
          cat.counter++;
        }
      });
      View.catArea.render();
    }
  };
  var View = {
    init: function () {
      this.cacheElments();
      this.bindEvents();
      this.pickerArea.render();
    },
    cacheElments: function () {
      this.$catViewer = $("#cat-viewer");
      this.$catPicker = $("#cat-picker");
      this.$templateCatPicker = $("#template-cat-picker");
      this.pickerTemplate = _.template(View.$templateCatPicker.html());
    },
    bindEvents: function () {
      this.$catViewer.on("click", Octopus.vote);
    },
    catArea: {
      render: function ( ) {
        var cat = Octopus.getActualCat();
        if ( cat ) {
          View.$catViewer.find("img").attr("src", cat.imageUrl);
          View.$catViewer.find(".cat-name").html(cat.name);
          View.$catViewer.find(".count-container").html(cat.counter);
          View.$catViewer.show();
        } else {
          View.$catViewer.hide();
        }
      }
    },
    pickerArea: {
      init: function () {
        View.pickerArea.cacheElments();
        View.pickerArea.bindEvents();
      },
      cacheElments: function () {
        View.pickerArea.$cat = $(".cat-picker-container");
      },
      bindEvents: function () {
        View.pickerArea.$cat.on("click", Octopus.pickCat)
      },
      render: function () {
        var catList = Octopus.getCats();
        catList.forEach(function (cat) {
          var picker = View.pickerTemplate(cat);
          View.$catPicker.append(picker);
        });
        View.pickerArea.init();
      }
    }
  };
  var cats = [
    {
      name: "Farre-Cat",
      imageUrl: "http://cdn.playbuzz.com/cdn/0079c830-3406-4c05-a5c1-bc43e8f01479/7dd84d70-768b-492b-88f7-a6c70f2db2e9.jpg",
      counter: 1
    },
    {
      name: "Kit-Cat",
      imageUrl: "http://stylonica.com/wp-content/uploads/2014/03/2-cats.jpg",
      counter: 1
    },
    {
      name: "End-cat",
      imageUrl: "http://www.gordonrigg.com/the-hub/wp-content/uploads/2015/06/little_cute_cat_1920x1080.jpg",
      counter: 1
    }
  ];

  console.log("init");
  Octopus.init(cats);
})(jQuery);