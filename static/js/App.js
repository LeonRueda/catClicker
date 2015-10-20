/**
* Created with catClicker.
* User: Phlammariont
* Date: 2015-10-18
* Time: 12:02 AM
*/

App = {
    init: function (cats) {
        this.createCats(cats);
        this.cacheElments();
        this.bindEvents();
        this.instanceCounter();
    },
    createCats: function(cats) {
        for (var i=0; i < cats.length; i++) {
            console.log("crating cat " + i);
            var actualCat = cats[i];
            var element = document.createElement('div');
            element.className="container-fluid cat-container";
            $(element).append(
                '<img src="' + actualCat["image-url"] + '" width="100%"/>' +
                    '<div class="cat-circle">' +
                        '<div id="" class="counter-container count-container"></div>' +
                    '</div>' +
                '<div class="cat-name-container">' +
                    '<div class="cat-name">' + actualCat.name + '</div>' +
                '</div>'
            );
            $(element).on("click", (function(counter) {
                return function () {
                    $(this).find(".counter-container").html(counter++);   
                }
            })(actualCat.counter));
            document.body.appendChild(element);
        }
    },
    cacheElments: function () {
        this.$catContainer = $(".cat-container");
        this.$countContainer = $(".count-container");
    },
    bindEvents: function () {
        //this.$catContainer.off("click").on("click", App.incrementCounCat);
    },
    incrementCounCat: function () {
        $(this).data("counter", $(this).data("counter") + 1);
        console.log("click" +  $(this).data("counter") )
        $(this).find(".count-container").html($(this).data("counter"));
    },
    instanceCounter: function () {
        this.$countContainer.parent().css('height', this.$countContainer.parent().width());
    }
}
cats = [
    {
        name: "Farre-Cat",
        "image-url": "http://cdn.playbuzz.com/cdn/0079c830-3406-4c05-a5c1-bc43e8f01479/7dd84d70-768b-492b-88f7-a6c70f2db2e9.jpg",
        counter: 0
    },
    {
        name: "Kit-Cat",
        "image-url": "http://stylonica.com/wp-content/uploads/2014/03/2-cats.jpg",
        counter: 0
    }
];
App.init(cats);