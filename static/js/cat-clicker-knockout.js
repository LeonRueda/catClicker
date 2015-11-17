/**
 * Created with catClicker.
 * User: Phlammariont
 * Date: 2015-10-19
 * Time: 07:27 AM
 */
(function ($) {
  var ViewModel = function () {
    this.name = ko.observable("Farre-Cat");
    this.counter = ko.observable(0);
    this.imageUrl = ko.observable("http://cdn.playbuzz.com/cdn/0079c830-3406-4c05-a5c1-bc43e8f01479/7dd84d70-768b-492b-88f7-a6c70f2db2e9.jpg");
    this.nicks = ko.observableArray([
      {name: "nicky"},
      {name: "ale"},
      {name: "leonidas"}
    ]);

    this.increaseCounter = function () {
      this.counter(this.counter() + 1);
    }
  };

  console.log("init");
  ko.applyBindings( new ViewModel() );
})(jQuery);