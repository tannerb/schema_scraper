// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require websocket_rails/main
//= require turbolinks
//= require foundation
//= require_tree .

$(function(){ 
    $(document).foundation(); 
    var dispatcher = new WebSocketRails('localhost:3000/websocket');
    
    dispatcher.on_open = function(data) {
        console.log('Connection established: ', data);
    };

    dispatcher.bind('connection_closed', function(data) {
        console.log('Connection closed', data);
    });
    
    dispatcher.bind('recipes.crawling', function(data) {
        console.log('crawling', data);
    })
    
    $('#search-url-btn').click(function () {
        var url = { url: $('#search-url').val() };
        dispatcher.trigger('recipes.crawl', url);
        console.log('click', url);
    });
});

