/**
 * Created with catClicker.
 * User: Phlammariont
 * Date: 2015-10-19
 * Time: 07:27 AM
 */
(function ($) {
  var initialCats = [
    {
      name  : "Farre-Cat",
      counter: 0,
      imageUrl: "http://cdn.playbuzz.com/cdn/0079c830-3406-4c05-a5c1-bc43e8f01479/7dd84d70-768b-492b-88f7-a6c70f2db2e9.jpg",
      nicks: [
        {name: "nicky"},
        {name: "ale"},
        {name: "leonidas"}
      ]
    },
    {
      name: "Kit-Cat",
      imageUrl: "http://stylonica.com/wp-content/uploads/2014/03/2-cats.jpg",
      counter: 0,
      nicks: [
        {name: "kity"},
        {name: "kitt"},
        {name: "kini"}
      ]
    },
    {
      name: "End-cat",
      imageUrl: "http://www.gordonrigg.com/the-hub/wp-content/uploads/2015/06/little_cute_cat_1920x1080.jpg",
      counter: 0,
      nicks: [
        {name: "endy"},
        {name: "flufy"},
        {name: "chinni"}
      ]
    }
  ];
  var Cat = function ( data ) {
    this.name = ko.observable( data.name );
    this.counter = ko.observable( data.counter );
    this.imageUrl = ko.observable( data.imageUrl );
    this.nicks = ko.observableArray( data.nicks );
  };
  var ViewModel = function () {
    var self = this;
    this.listCats = ko.observableArray([]);

    initialCats.forEach(function ( cat ) {
      self.listCats.push( new Cat ( cat ) );
    });

    this.currentCat = ko.observable( this.listCats()[0] );

    this.increaseCounter = function () {
      this.counter(this.counter() + 1);
    };
    this.setActualCat = function ( cat ) {
      self.currentCat( cat );
    }
  };

  console.log("init");
  ko.applyBindings( new ViewModel() );
})(jQuery);