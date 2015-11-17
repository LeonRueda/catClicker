/**
 * Created with catClicker.
 * User: Phlammariont
 * Date: 2015-10-19
 * Time: 07:27 AM
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
  var AppViewModel = function () {
    this.cats = Model.catList;
    this.actualCat = Octopus.getActualCat();

    var self = this;
    this.getActualCat = function () {
      self.actualCat = Octopus.getActualCat();
    };
    //this.nicks = Model.catList[0].nicks;
  };
  var Octopus = {
    init: function (cats) {
      Model.init(cats);
      Views.init();

      ko.applyBindings( new AppViewModel() );
    },
    getCats: function () {
      return Model.catList;
    },
    pickCat: function () {
      var catName = $(this).find(".cat-name").html();
      Model.setActualCatByName(catName);
      Views.catArea.render();
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
      Views.catArea.render();
    }
  };
  var Views = {
    init: function () {
      this.cacheElments();
      this.bindEvents();
      this.adminArea.init();
      this.pickerArea.render();
    },
    cacheElments: function () {
      this.$catViewer = $("#cat-viewer");
      this.$catPicker = $("#cat-picker");
      this.$catAdmin = $("#cat-admin");
      this.$btnAdmin = $("#btn-admin");
      this.$catAdminForm = $("#cat-admin-form");
      this.$txtNameCat = $("#txt-cat-name-admin");
      this.$txtImageUrlCat = $("#txt-cat-image-url-admin");
      this.$txtCounterCat = $("#txt-cat-counter-admin");
      this.$templateCatPicker = $("#template-cat-picker");
      this.pickerTemplate = _.template(Views.$templateCatPicker.html());
    },
    bindEvents: function () {
      this.$catViewer.on("click", Octopus.vote);
      this.$btnAdmin.on("click", Views.adminArea.render);
    },
    catArea: {
      render: function ( ) {
        var cat = Octopus.getActualCat();
        if ( cat ) {
          Views.$catViewer.find("img").attr("src", cat.imageUrl);
          Views.$catViewer.find(".cat-name").html(cat.name);
          Views.$catViewer.find(".count-container").html(cat.counter);
          Views.$catViewer.show();
          Views.adminArea.clear();
        } else {
          Views.$catViewer.hide();
          Views.$catAdmin.hide();
        }
      }
    },
    pickerArea: {
      init: function () {
        Views.pickerArea.cacheElments();
        Views.pickerArea.bindEvents();
      },
      cacheElments: function () {
        Views.pickerArea.$cat = $(".cat-picker-container");
      },
      bindEvents: function () {
        Views.pickerArea.$cat.on("click", Octopus.pickCat)
      },
      render: function () {
        Views.$catPicker.html('');
        var catList = Octopus.getCats();
        catList.forEach(function (cat) {
          var picker = Views.pickerTemplate(cat);
          Views.$catPicker.append(picker);
        });
        Views.pickerArea.init();
      }
    },
    adminArea: {
      init: function () {
        this.bindEvents();
      },
      bindEvents: function () {
        Views.$catAdminForm.on("submit", function (e) {
          e.preventDefault();
          var cat = Octopus.getActualCat();
          cat.name = Views.$txtNameCat.val();
          cat.imageUrl = Views.$txtImageUrlCat.val();
          cat.counter = Views.$txtCounterCat.val();
          Views.catArea.render();
          Views.pickerArea.render();
          Views.adminArea.clear();
        });
        Views.$catAdminForm.on("reset", function (e) {
          e.preventDefault();
          Views.adminArea.clear();
        })
      },
      render: function () {
        Views.$btnAdmin.hide();
        var cat = Octopus.getActualCat();
        Views.$txtNameCat.val(cat.name);
        Views.$txtImageUrlCat.val(cat.imageUrl);
        Views.$txtCounterCat.val(cat.counter);
        Views.$catAdminForm.show();
      },
      clear: function () {
        Views.$catAdmin.show();
        Views.$btnAdmin.show();
        Views.$catAdminForm.hide();
      }

    }
  };
  var cats = [
    {
      actual: true,
      name: "Farre-Cat",
      imageUrl: "http://cdn.playbuzz.com/cdn/0079c830-3406-4c05-a5c1-bc43e8f01479/7dd84d70-768b-492b-88f7-a6c70f2db2e9.jpg",
      counter: 1,
      nicks: ko.observableArray([
        {name: "nicky"},
        {name: "ale"},
        {name: "leonidas"}
      ])
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