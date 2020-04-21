$(document).ready(function() {
    "use strict";

    /******************************************************************/
    /* NAVIGATION */
    /******************************************************************/
    $('.button-collapse').sideNav();

    /******************************************************************/
    /* SKILL BAR */ 
    /******************************************************************/
    $(".determinate").each(function() {
        var width = $(this).text();
        $(this).css("width", width)
            .empty()
            .append('<i class="fa fa-circle"></i>');
    });

    /******************************************************************/
    /* BLOG POST */ 
    /******************************************************************/
    jQuery(window).on('load', function() {
        var $ = jQuery;
        $('.blog').masonry({
            itemSelector: '.blog-post',
            columnWidth: '.blog-post',
            percentPosition: true
        });
    });

    var height = $('.caption').height();
    if ($(window).width()) {
        $('#featured').css('height', height);
        $('#featured img').css('height', height);
    }

    /******************************************************************/
    /* TOOLTIP */
    /******************************************************************/
    $('.tooltipped').tooltip({
        delay: 50
    });

    /******************************************************************/
    /* WOW INIT */
    /******************************************************************/
    var wow = new WOW({
        mobile: false
    });
    wow.init();

    /******************************************************************/
    /* CONTACT FORM */
    /******************************************************************/
    $("#contactForm").validator().on("submit", function(event) {
        if (event.isDefaultPrevented()) {
            // handle the invalid form...
            formError();
            submitMSG(false, "Did you fill in the form properly?");
        } else {
            // everything looks good!
            event.preventDefault();
            submitForm();
        }
    });
  
    function submitForm() {
        // Initiate Variables With Form Content
        var name = $("#name").val();
        var email = $("#email").val();
        var subject = "Resume Inquiry";
        var message = $("#message").val();

        $.ajax({
            type: "POST",
            url: "https://script.google.com/macros/s/AKfycbwpGkT-G_n3amhnNDpMC3GEMIs3Cbsnfzhw--nf8EmjP885OA/exec",
            data: "name=" + name + "&email=" + email + "&message=" + message + "&subject=" + subject,
            success: function(text) {
                if (text == "success") {
                    formSuccess();
                } else {
                    formError();
                    submitMSG(false, text);
                }
                initMap();
            }
        });
    }

    function formSuccess() {
        $("#contactForm")[0].reset();
        submitMSG(true, "Message Sent!")
    }

    function formError() {
        $("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
            function() {
                $(this).removeClass();
            });
    }

    function submitMSG(valid, msg) {
        if (valid) {
            var msgClasses = "h3 text-center fadeInUp animated text-success";
        } else {
            var msgClasses = "h3 text-center text-danger";
        }
        $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
    }


    /******************************************************************/
    /* Projects */
    /******************************************************************/
    $('#portfolio-item').mixItUp();

    $('.sa-view-project-detail').on('click', function(event) {
        event.preventDefault();
        var href = $(this).attr('href') + ' ' + $(this).attr('data-action'),
            dataShow = $('#project-gallery-view'),
            dataShowMeta = $('#project-gallery-view meta'),
            dataHide = $('#portfolio-item'),
            preLoader = $('#loader'),
            backBtn = $('#back-button'),
            filterBtn = $('#filter-button');

        dataHide.animate({
            'marginLeft': '-120%'
        }, {
            duration: 400,
            queue: false
        });
        filterBtn.animate({
            'marginLeft': '-120%'
        }, {
            duration: 400,
            queue: false
        });
        dataHide.fadeOut(400);
        filterBtn.fadeOut(400);
        setTimeout(function() {
            preLoader.show();
        }, 400);
        setTimeout(function() {
            dataShow.load(href, function() {
                dataShowMeta.remove();
                preLoader.hide();
                dataShow.fadeIn(600);
                backBtn.fadeIn(600);
            });
        }, 800);
    });

    $('#back-button').on('click', function(event) {
        event.preventDefault();
        var dataShow = $('#portfolio-item'),
            dataHide = $('#project-gallery-view'),
            filterBtn = $('#filter-button');

        $("[data-animate]").each(function() {
            $(this).addClass($(this).attr('data-animate'));
        });

        dataHide.fadeOut(400);
        $(this).fadeOut(400);
        setTimeout(function() {
            dataShow.animate({
                'marginLeft': '0'
            }, {
                duration: 400,
                queue: false
            });
            filterBtn.animate({
                'marginLeft': '0'
            }, {
                duration: 400,
                queue: false
            });
            dataShow.fadeIn(400);
            filterBtn.fadeIn(400);
        }, 400);
        setTimeout(function() {
            dataShow.find('.fadeInRight, .fadeInLeft, .fadeInUp, .fadeInDown').removeClass('fadeInRight').removeClass('fadeInLeft').removeClass('fadeInUp').removeClass('fadeInDown');
        }, 1500);
    });

});

/**********************************************************************/
/* MAP */
/**********************************************************************/
function initMap() {
    var mapOptions = {
        zoom: 17,
        scrollwheel: false,
        navigationControl: false,
        center: new google.maps.LatLng(47.5695282, -52.7127618),
        styles: [{
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [{
                "color": "#e9e9e9"
            }, {
                "lightness": 17
            }]
        }, {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [{
                "color": "#f5f5f5"
            }, {
                "lightness": 20
            }]
        }, {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#ffffff"
            }, {
                "lightness": 17
            }]
        }, {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [{
                "color": "#ffffff"
            }, {
                "lightness": 29
            }, {
                "weight": 0.2
            }]
        }, {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [{
                "color": "#ffffff"
            }, {
                "lightness": 18
            }]
        }, {
            "featureType": "road.local",
            "elementType": "geometry",
            "stylers": [{
                "color": "#ffffff"
            }, {
                "lightness": 16
            }]
        }, {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [{
                "color": "#f5f5f5"
            }, {
                "lightness": 21
            }]
        }, {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [{
                "color": "#dedede"
            }, {
                "lightness": 21
            }]
        }, {
            "elementType": "labels.text.stroke",
            "stylers": [{
                "visibility": "on"
            }, {
                "color": "#ffffff"
            }, {
                "lightness": 16
            }]
        }, {
            "elementType": "labels.text.fill",
            "stylers": [{
                "saturation": 36
            }, {
                "color": "#333333"
            }, {
                "lightness": 40
            }]
        }, {
            "elementType": "labels.icon",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [{
                "color": "#f2f2f2"
            }, {
                "lightness": 19
            }]
        }, {
            "featureType": "administrative",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#fefefe"
            }, {
                "lightness": 20
            }]
        }, {
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers": [{
                "color": "#fefefe"
            }, {
                "lightness": 17
            }, {
                "weight": 1.2
            }]
        }]
    };
    var mapElement = document.getElementById('map-canvas');
    var map = new google.maps.Map(mapElement, mapOptions);
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(47.5695282, -52.7127618),
        map: map,
        title: "53 Hayward Ave St. John's, NL A1C 3W6"
    });
}

/**********************************************************************/
/* GMAIL */
/**********************************************************************/
// Client ID and API key from the Developer Console
var CLIENT_ID = '511094256688-s1e1vfagqqui4jctijh81dukf0n1glit.apps.googleusercontent.com';
var API_KEY = 'FYDSy8EK74vNgl_oDh000ayz';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = 'https://www.googleapis.com/auth/gmail.send';

// On load, called to load the auth2 library and API client library.
function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

// Initializes the API client library and sets up sign-in state listeners.
function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(function () {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
        
        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;
    }, function(error) {
        appendPre(JSON.stringify(error, null, 2));
    });
}
