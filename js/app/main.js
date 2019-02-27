"use strict";

require(["jquery"], function($) {
    require(["framework7"], function(Framework7) {
        require(["dpanels"], function(dpanels) {
            // Initialize your app
            var theApp = new window.Framework7({
                init        : false,
                cache       : false,
                material    : true,
                pushState   : true,
                swipeout    : false,
                pushStateSeparator: '#/',
                hideNavbarOnPageScroll: true,
                showBarsOnPageScrollEnd: true,
                showBarsOnPageScrollTop: true,
                onAjaxStart: function () {
                    var _loading_screen = $$('.tc-loading-screen');
                    _loading_screen.toggleClass('on');
                },
                onAjaxComplete: function () {
                    var _loading_screen = $$('.tc-loading-screen');
                    _loading_screen.toggleClass('on');
                }
            });

            // Export selectors engine
            var $$ = Dom7;

            // Add view
            var mainView = theApp.addView('.view-main', {});

            // company code
            var company_code = "1172700";

            var counta;
            var countb;
            var cat_level_0;
            var cat_level_1;
            var category_id;
            var cat_list;
            var option_city;
            var doc_appointment;




            /**
             * Page Initialization
             *
             * @summary Have to write all page related javascript in here,
             *          Make sure @theApp's init set to false above.
             *          Make sure the element you process exist on page.
             *          Will make this code work after with theApp.init()
             *
             * @docs    http://www.idangero.us/framework7/docs/page-callbacks.html
             */
            theApp.onPageInit('*', function (page) {


                /**
                 * Transparent Navbar Coloring
                 *
                 * @summary In case you use transparent nav bar on the page,
                 *          When you leave the top of the page, this will add coloring.
                 *          When you get to top of the page it will remove color again.
                 */
                var _navbar_transparent = $$('.navbar.transparent');
                if( _navbar_transparent.length )
                    $$('.page-content').scroll(function () {
                        var inside_header = ($$(this).scrollTop() <= 60);

                        if ( inside_header == true )
                            _navbar_transparent.removeClass('primary-bg-temporary');
                        else
                            _navbar_transparent.addClass('primary-bg-temporary');

                    });

                /**
                 * Header Search
                 *
                 * @summary Controls the visibility of the search bar on the nav bar.
                 *          You can disable it by removing any related HTML or the code below.
                 */
                var _search_toggler = $$('.header-search-icon'),
                    _header_search  = $$('.tc-header-search');

                if( _header_search.length   > 0 &&
                    _search_toggler.length  > 0 )

                    _search_toggler.on('click', function () {
                        _header_search.toggleClass('show');
                        $$(this).toggleClass('show');
                    });

                /**
                 * Photo/Gallery Browser
                 *
                 * @summary Collects the images inside gallery caption and creates a photo browser
                 *          Please make sure you use the following markup.
                 *          Images can be populated as many as you want.
                 *          Can be used for one image only.
                 *
                 * @docs    http://www.idangero.us/framework7/docs/photo-browser.html
                 *
                 * @markup  <div data-gallery-id="UNIQUE_NAME">
                                <img src="PATH_TO_LIST_IMAGE" data-big-src="PATH_TO_BIG_IMAGE" data-caption="CAPTION_TEXT"/>
                                <img src="PATH_TO_LIST_IMAGE" data-big-src="PATH_TO_BIG_IMAGE" data-caption="CAPTION_TEXT"/>
                                <img src="PATH_TO_LIST_IMAGE" data-big-src="PATH_TO_BIG_IMAGE" data-caption="CAPTION_TEXT"/>
                                ...
                            </div>
                 */
                var _photo_browser_gallery = $$('[data-gallery-id]');
                _photo_browser_gallery.each(function () {
                    var _galleries = [];

                    $$(this).find('[data-big-src]').each(function () {
                        _galleries.push({
                            url     : $$(this).data('big-src'),
                            caption : $$(this).data('caption')
                        });
                    });

                    var myPhotoBrowserPopupDark = theApp.photoBrowser({
                        photos : _galleries,
                        theme: 'dark',
                        type: 'standalone'
                    });

                    $$(this).find('[data-big-src]').on('click', function () {
                        myPhotoBrowserPopupDark.open();
                    });
                });

                /**
                 * Filterable Grid
                 *
                 * @summary Follow the markup below.
                 *          Check the @docs for other grid options,
                 *          You can use as many columns in a row as you want, not restricted to 100.
                 *          Filtering is optional.
                 *
                 *
                 * @docs    http://www.idangero.us/framework7/docs/_FEATURES/grid.html
                 *
                 * @markup  <div class="row">
                                 <div class="col-100">
                                     <div class="content-block-inner">
                                         <div class="tc-filters clearfix">
                                             <span>Filter:</span>
                                             <a href="#" data-filter="*" class="active">All</a>
                                             <a href="#" data-filter=".design">Design</a>
                                             <a href="#" data-filter=".development">Development</a>
                                         </div>
                                     </div>
                                 </div>
                            </div>

                             <div class="row tc-isotope">
                                 <div class="tc-isotope-item col-50 tablet-33 design">...</div>
                                 <div class="tc-isotope-item col-50 tablet-33 design">...</div>
                                 <div class="tc-isotope-item col-50 tablet-33 design">...</div>
                                 ...
                             </div>
                 */
                var _isotope = $('.tc-isotope');
                if( _isotope.get(0) )

                    require(["isotope",'imagesLoaded'], function(Isotope,imagesLoaded) {
                        _isotope.imagesLoaded(function () {
                            _isotope.each(function () {
                                var ___this     = $(this),
                                    __filters   = ___this.prev().find('a');

                                var iso = new Isotope( ___this.get(0), {
                                    itemSelector: '.tc-isotope-item',
                                    layoutMode: 'fitRows'
                                });

                                __filters.on( 'click', function(e) {
                                    e.preventDefault();
                                    var that        = $(this),
                                        filterValue = that.data('filter');

                                    if( !that.hasClass('active') ){
                                        __filters.filter(function(){
                                            return $(this).hasClass('active');
                                        }).removeClass('active');

                                        that.addClass('active');
                                        iso.arrange({
                                            filter: filterValue
                                        });
                                    }
                                });
                            });
                        });
                    });



                /**
                 * Countdown
                 *
                 * @summary         A simple Countdown plugin
                 * @data-end-date   Use the Month/Day/Year format
                 *
                 *
                 * @docs    http://hilios.github.io/jQuery.countdown/
                 *
                 * @markup  <div class="tc-countdown horizontal"
                                data-end-date="12/30/2015"
                                data-days-label="Days"
                                data-hours-label="Hours"
                                data-minutes-label="Minutes"
                                data-seconds-label="Seconds"
                            ></div>
                 */
                var _countdown = $('.tc-countdown');

                if( _countdown.get(0) )
                    require(['countdown'], function(countdown) {
                        function formatter(event,el){
                            var days = event.strftime('<div><h4>%D</h4><span>'+el.data('days-label')+'</span></div>'),
                                hours = event.strftime('<div><h4>%H</h4><span>'+el.data('hours-label')+'</span></div>'),
                                minutes = event.strftime('<div><h4>%M</h4><span>'+el.data('minutes-label')+'</span></div>'),
                                seconds = event.strftime('<div><h4>%S</h4><span>'+el.data('seconds-label')+'</span></div>');

                            return days+hours+minutes+seconds;
                        }

                        _countdown.each(function () {
                            var __this      = $(this),
                                __endDate   = __this.data('end-date');

                            __this.countdown(__endDate, function(event) {
                                $(this).html(formatter(event,__this));
                            });
                        });
                    });



                /**---------------------
                 *
                 * Google Maps
                 *
                 *---------------------**/
                var _map = $('.tc-map');
                if( _map.get(0) ){

                    require(['async!http://maps.google.com/maps/api/js?sensor=true'], function() {

                        function initMap(el) {
                            var myLatLng = {lat: el.data('lat'), lng: el.data('lng')};

                            // Create a map object and specify the DOM element for display.
                            var map = new google.maps.Map(el.get(0), {
                                center: myLatLng,
                                zoom: 15,
                                scrollwheel: false,
                                draggable: false
                            });

                            // Create a marker and set its position.
                            var marker = new google.maps.Marker({
                                map: map,
                                position: myLatLng,
                                draggable: false,
                                title: "We're Here!"
                            });
                        }

                        _map.each(function(){
                            var _this = $(this);
                            initMap(_this);
                        });
                    });
                }



                /**---------------------
                 *
                 * PHP Ajax Contact Form
                 *
                 *---------------------**/
                var _contact_forms = $('.tc-contact-form');
                _contact_forms.each(function () {
                    var _this   = $(this),
                        _submit = _this.find('[type=submit]');

                    _this.bind('submit', function(){
                        _submit.attr('disabled','disabled');

                        $.ajax({
                            type: "POST",
                            url: "mail.php",
                            data: _this.serialize(),
                            success: function(returnedInfo){
                                if( returnedInfo == 0 ){
                                    theApp.addNotification({
                                        message: 'Message Sent!'
                                    });
                                }else{
                                    theApp.addNotification({
                                        message: 'Our mail servers are currently down, please try again later!'
                                    });
                                }
                                _submit.removeAttr('disabled');
                            }
                        });
                        return false;
                    });
                });



                /**---------------------
                 *
                 * Iframe Placing
                 *
                 *---------------------**/
                var _embedResponsives = $('.embed-responsive.will-load');
                if( _embedResponsives.get(0) )
                    _embedResponsives.each(function(){

                        var _this = $(this),
                            _img = _this.children('img'),
                            _iframeSrc = _img.data('iframe-src');

                        _this.append('<iframe src="'+_iframeSrc+'" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');
                        _img.remove();
                        _this.removeClass('will-load');

                    });



                // Default
                var calendarDefault = theApp.calendar({
                    input: '#ks-calendar-default',
                });
                // With custom date format
                var calendarDateFormat = theApp.calendar({
                    input: '#ks-calendar-date-format',
                    dateFormat: 'DD, MM dd, yyyy'
                });
                // With multiple values
                var calendarMultiple = theApp.calendar({
                    input: '#ks-calendar-multiple',
                    dateFormat: 'M dd yyyy',
                    multiple: true
                });
            });

            theApp.onPageInit('profile', function (page) {

                //theApp.alert("done");
                var token = localStorage.getItem('app_token');
                $.ajax({
                    type: "POST",
                    url: "http://detechnovate.net/intuitive/api/profile/",
                    
                    headers: {"token": token},
                    data: {},
                    dataType: "json",

                    success: function (msg) {
                        if(msg.status == 1) {

                            var first_name = msg.data.first_name;
                            var mobile_no = msg.data.mobile_no;
                            var mr_no = msg.data.mr_no;
                            if(first_name == null){
                                first_name = "New User";
                            }

                            if(mr_no == 0){
                                mr_no = "Not Available";
                            }

                            $('#first_name').html(first_name);
                            $('#mobile_no').html(mobile_no);
                            $('#mr_no').html(mr_no);
                        } else if(msg.status == 101){

                            alert(msg.message);
                            window.location.replace('login.html');
                        } else {

                            alert(msg.message);
                        }

                    },
                    error: function(msg){
                        alert("Error connecting");

                    }
                });
            });

            theApp.onPageInit('edit-profile', function (page) {

                //theApp.alert("done");
                var token = localStorage.getItem('app_token');
                $.ajax({
                    type: "POST",
                    url: "http://detechnovate.net/intuitive/api/profile/",
                    
                    headers: {"token": token},
                    data: {},
                    dataType: "json",

                    success: function (msg) {
                        if(msg.status == 1) {

                            var first_name = msg.data.first_name;
                            var mobile_no = msg.data.mobile_no;
                            var mr_no = msg.data.mr_no;
                           var middle_name = msg.data.middle_name;
                            var last_name = msg.data.last_name;
                            var gender = msg.data.gender;

                            $('#ed_first_name').val(first_name);
                            $('#middle_name').val(middle_name);
                            $('#last_name').val(last_name);
                            $('#gender').val(gender);
                        } else if(msg.status == 101){

                            alert(msg.message);
                        } else {

                            alert(msg.message);
                        }

                    },
                    error: function(msg){
                        alert("Error connecting");

                    }
                });
            });
            theApp.onPageInit('find-doctor', function (page) {

                //theApp.alert("done");
                var token = localStorage.getItem('app_token');
                $.ajax({
                    type: "POST",
                    url: "http://detechnovate.net/intuitive/api/view_doctors/",
                    
                    headers: {"token": token},
                    data: {},
                    dataType: "json",

                    success: function (msg) {
                        if(msg.status == 1) {
                            cat_list = msg.data.center;
                            var doctor_list = "";
                            var d =0;
                            $.each(msg.data.center,function(key,val){
                            doctor_list+='<div class="row no-gutter">';
                                doctor_list+='<a class=cat-link href=# data-count=' + d + ' data-center=' + val.name +' >';
                                doctor_list+='<div class="col-20 text-right pr--10">';
                                doctor_list+='<img src="img/icon/hospital/hospital-icon.png" class="max-img"/>';
                                doctor_list+='</div>';
                                doctor_list+='<div class="col-80 hosp-info text-left">';
                                doctor_list+='<h4><b>'+val.name+'</b></h4>';
                                //doctor_list+='<p class="grey-text">4 Ola Oluwa Close, Akora Estate, Off Adeniyi Jones, Ikeja Lagos</p>';

                                doctor_list+='</div>';
                                doctor_list+='</a>';
                                //doctor_list+='<div class="tc-divider dark thick"></div>';
                                doctor_list+='</div>';


                                d++;

                            });
                            cat_level_0 = doctor_list;
                            $('#list-doctor').html(doctor_list);
                        } else if(msg.status == 101){

                            alert(msg.message);
                            window.location.replace('login.html');
                        } else {

                            alert(msg.message);
                        }

                    },
                    error: function(msg){
                        alert("Error connecting");

                    }
                });
            });

            $(document).on('click', 'a.cat-link', function () {

                category_id = null;

                counta = $(this).attr('data-count');
                var e = 0;
                var menu = cat_list[counta].department;

                var list_table1 = "";

                
                $.each(menu, function (key, value) {
                    
                    list_table1 += '<a href="#" class="lnk-back-refresh"><p><i class="fa fa-arrow-left"></i> Back</p></a>';
                    list_table1 += '<div class="row no-gutter margin-tb-20">';
                    list_table1 += '<a class=cat-link1 href=#  data-count=' + e + ' data-catname=' + value.dept + '>';
                    list_table1 += '<div class="col-20 text-right pr--10">';
                    list_table1 += '<img src="img/icon/doctors/doctor.png" class="find-doc-img"/>';
                    list_table1 += '</div>';
                    list_table1 += '<div class="col-80 type-doc text-left">';
                    list_table1 += '<i class="fa fa-chevron-right type-doc-arrow"></i>';
                    list_table1 += '<h4><b>'+ value.dept +'</b></h4>';

                    list_table1 += '<hr class="type-doc-hr">';

                    list_table1 += '</div>';
                    list_table1 += '</a>';
                    list_table1 += '</div>';
                    e++;

                });
                cat_level_1 = list_table1;
                $('#list-doctor').html(list_table1);


            });

            $(document).on('click', '.lnk-back-refresh', function () {
                mainView.router.refreshPage();
            });

            $(document).on('click', 'a.back-link', function () {

                $('#list-doctor').html(cat_level_1);

            });

            $(document).on('click', 'a.cat-link1', function () {

                category_id = null;

                countb = $(this).attr('data-count');
                var menu1 = cat_list[counta].department[countb].doctor;

                var list_table2 = "";

                list_table2 += '<a href="#" class="back-link"><p><i class="fa fa-arrow-left"></i> Back</p></a>';
                list_table2 +='<div class="row no-gutter">';
                list_table2 +='<a href="#">';
                list_table2 +='<div class="col-20 text-right pr--10">';
                list_table2 +='<img src="img/icon/doctors/doctor.png" class="img-wid-63"/>';
                list_table2 +='</div>';
                list_table2 +='<div class="col-80 book-info text-left">';
                list_table2 +='<h4><b>Doctor</b></h4>';
                list_table2 +='<p class="grey-text">Doctor, Cosultant, etc.</p>';

                list_table2 +='</div>';
                list_table2 +='</a>';

                list_table2 +='</div>';

                $.each(menu1, function (key, value) {
                    

                    list_table2 += '<div class="row no-gutter border-bottom">';
                    list_table2 += '<div class="doctor-info">';
                    list_table2 += '<div class="text-left">';
                    list_table2 += '<h4><b>'+ value.doctor_name + '</b></h4>';
                    // list_table2 += '<p>Intuitive Branch 1</p>';
                    list_table2 += '<p>'+ value.doctor_type + '</p>';
                    list_table2 += '<p>'+ value.specialization + '</p>';
                    list_table2 += '</div>';
                    list_table2 += '<div class="btn-group-right">';
                    list_table2 += '<a  href="#" id="btn-bookmark" data-doctorname="'+ value.doctor_name + '" data-doctorid='+ value.doctor_id +' class="btn-doc-right"><button class="btn-transparent-blueoutline">Bookmark <i class="fa fa-heart"></i></button></a><a href="doctor-appointment.html?doctor_id='+value.doctor_id+'&doctor_name='+value.doctor_name+'" id="btn-book" data-doctorname='+ value.doctor_name + ' data-doctorid=' + value.doctor_id + ' class="btn-doc-right"><button class="color-btn-blue">Book Now</button></a>';

                    list_table2 += '</div>';
                    list_table2 += '</div>';

                    list_table2 += '</div>';

                });
                $('#list-doctor').html(list_table2);


            });

            $(document).on('click', '#btn-bookmark', function () {

                var doctor_name = $(this).attr('data-doctorname');
                var doctor_id = $(this).attr('data-doctorid');
                
                var token = localStorage.getItem('app_token');
                var data = {doctor_id: doctor_id, doctor_name: doctor_name};
                $.ajax({
                    type: "POST",
                    url: "http://detechnovate.net/intuitive/api/save_bookmark/",
                    
                    headers: {"token": token},
                    data: JSON.stringify(data),
                    dataType: "json",

                    success: function (msg) {
                        if (msg.status == 1) {

                            alert(msg.message);
                        } else if (msg.status == 101) {

                            alert(msg.message);
                            window.location.replace("login.html");
                        } else {

                            alert(msg.message);
                        }
                    }
                });
            });

            $(document).on('click', '#btn-confirm-appoint', function () {



                var appointment_id = $(this).attr('data-appointid');
                var appointment_time = $(this).attr('data-appointtime');
                var app_time = new Date(val.appointment_time);
                var doctor_name = $(this).attr('data-doctor');

                var token = localStorage.getItem('app_token');
                var confirm_book =confirm("Confirm Appointment with "+doctor_name+"\n at "+app_time);
                var data = {appointment_id: appointment_id};
                if (confirm_book==true) {
                    $.ajax({
                        type: "POST",
                        url: "http://detechnovate.net/intuitive/api/confirm_appointment/",

                        headers: {"token": token},
                        data: JSON.stringify(data),
                        dataType: "json",

                        success: function (msg) {
                            if (msg.status == 1) {

                                alert(msg.message);
                                mainView.router.refreshPage();

                            } else if (msg.status == 101) {

                                alert(msg.message);
                                window.location.replace("login.html");
                            } else {

                                alert(msg.message);
                            }
                        }
                    });
                }
            });

            $(document).on('click', '#cancel-appoint', function () {



                var appointment_id = $(this).attr('data-appointid');
                var reason = $('#cancel_reason').val();
                if (reason == "") {
                    alert("Kindly enter your reason for cancelling");
                    $('#reason').focus();
                    return false;
                }
                else {
                    var data = {appointment_id: appointment_id, reason:reason};
                    var token = localStorage.getItem('app_token');
                    $.ajax({
                        type: "POST",
                        url: "http://detechnovate.net/intuitive/api/cancel_appointment/",



                        headers: {"token": token},
                        data: JSON.stringify(data),
                        dataType: "json",

                        success: function (msg) {
                            if (msg.status == 1) {

                                alert(msg.message);
                                mainView.router.loadPage('appointments.html');
                            } else if (msg.status == 101) {

                                alert(msg.message);
                                window.location.replace("login.html");
                            } else {

                                alert(msg.message);
                            }
                        }
                    });
                }
            });

            theApp.onPageInit('service', function (page) {

                //theApp.alert("done");
                var token = localStorage.getItem('app_token');
                $.ajax({
                    type: "POST",
                    url: "http://detechnovate.net/intuitive/api/view_services/",
                    
                    headers: {"token": token},
                    data: {},
                    dataType: "json",

                    success: function (msg) {
                        if(msg.status == 1) {

                            var service = "";
                            $.each(msg.data,function(key,val){

                            service +='<div class="accordion-item">';
                            service +='<div class="accordion-item-toggle"><b class="color-black">'+val.service_name+'</b> <i class="fa fa-chevron-right grey-text float-right"></i></div>';
                            service +='<div class="accordion-item-content">';
                            service +='<div>';
                            service +=val.service_desc;
                            service +='</div>';
                            service +='</div>';
                            service +='</div>';



                            });

                            $('#service-list').html(service);
                        } else if(msg.status == 101){

                            alert(msg.message);
                            window.location.replace("login.html");
                        } else {

                            alert(msg.message);
                        }

                    },
                    error: function(msg){
                        alert("Error connecting");

                    }
                });
            });

            theApp.onPageInit('mydoctors', function (page) {

                //theApp.alert("done");
                var token = localStorage.getItem('app_token');
                $.ajax({
                    type: "POST",
                    url: "http://detechnovate.net/intuitive/api/view_bookmark/",
                    
                    headers: {"token": token},
                    data: {},
                    dataType: "json",

                    success: function (msg) {
                        if(msg.status == 1) {

                            var article = "";
                            $.each(msg.data,function(key,value){

                                article +='<div class="row no-gutter border-bottom">';
                                article +='<div class="doctor-info">';
                                article +='<div class="text-left">';
                                article +='<h4><b>'+value.doctor_name+'</b></h4>';
                                // article +='<p>'+value.doctor_id+'</p>';
                                //article +='<p>'+value.doctor_name+'</p>';
                                //article +='<p>Lagos.</p>';
                                //article +='<p>18 yrs Experience</p>';
                                article +='</div>';
                                article +='<div class="btn-group-right">';
                                article +='<a href="#" class="btn-doc-right book-remove" data-bookid="'+value.book_id+'" data-doctor="'+value.doctor_name+'"><button class="btn-transparent-blueoutline">Remove</button></a><a href="doctor-appointment.html?doctor_id='+value.doctor_id+'&doctor_name='+value.doctor_name+'" id="btn-bookid" data-doctorname='+ value.doctor_name + ' data-doctorid='+ value.doctor_id +' class="btn-doc-right"><button class="color-btn-blue">Book Now</button></a>';

                                article +='</div>';
                                article +='</div>';

                                article +='</div>';




                            });

                            $('#show-doctors').html(article);
                        } else if(msg.status == 101){

                            alert(msg.message);
                            window.location.replace("login.html");
                        } else {

                            alert(msg.message);
                        }

                    },
                    error: function(msg){
                        alert("Error connecting");

                    }
                });
            });

            $(document).on('click', '.book-remove', function () {

                var doctor_name = $(this).attr('data-doctor');
                var bookmark_id = $(this).attr('data-bookid');

                
                var token = localStorage.getItem('app_token');
                var data = {bookmark_id: bookmark_id};

                var confirmbook =confirm("Remove doctor "+doctor_name+" from favourites");
                if (confirmbook==true){

                    $.ajax({
                        type: "POST",
                        url: "http://detechnovate.net/intuitive/api/delete_bookmark/",
                        
                        headers: {"token": token},
                        data: JSON.stringify(data),
                        dataType: "json",

                        success: function (msg) {
                            if (msg.status == 1) {

                                alert(msg.message);
                                //mainView.router.loadPage('mydoctors.html');
                                mainView.router.refreshPage();
                            } else if (msg.status == 101) {

                                alert(msg.message);
                                window.location.replace("login.html");
                            } else {

                                alert(msg.message);
                            }
                        }
                    });

                }

            });

            theApp.onPageInit('appointments', function (page) {

                //theApp.alert("done");
                var token = localStorage.getItem('app_token');
                $.ajax({
                    type: "POST",
                    url: "http://detechnovate.net/intuitive/api/my_appointments/",
                    
                    headers: {"token": token},
                    data: {},
                    dataType: "json",

                    success: function (msg) {
                        if(msg.status == 1) {
							var article = "";
							if (msg.data.appointments === undefined || msg.data.appointments.length == 0) {
								article +='<p class="grey-text">No appointment found</p>';
							} else {
								
								$.each(msg.data.appointments,function(key,val){

									var app_time = new Date(val.appointment_time);

									article +='<div class="row no-gutter border-bottom">';


									article +='<div class="col-20 text-center">';
									article +='<img src="img/icon/appointment/doctor.png" class="appoint-icon">';
									article +='</div>';

									article +='<div class="col-40">';
									article +='<h4><b>'+val.doctor_name+'</b></h4>';
									article +='<p class="grey-text red-mt-15">'+val.center_name+'</p>';
									article +='</div>';

									article +='<div class="col-33">';
                                    if (val.appointment_status == "Booked") {
                                        article += '<a href="cancel_appointment.html?id='+val.appointment_id+'&center='+val.center_name+'&doctor_name='+val.doctor_name+'&app_time='+val.appointment_time+'"><button class="btn-cancel-appoint"  data-appointid="' + val.appointment_id + '">Cancel <i class="fa fa-close"></i> </button></a>';
                                        article += '<button class="btn-confirm-appoint" id="btn-confirm-appoint" data-appointid="' + val.appointment_id + '" data-doctor="' + val.doctor_name +'" data-appointtime="' + val.appointment_time +'">Confirm <i class="fa fa-check"></i> </button></a>';
                                    }
									article +='</div>';



									article +='<div class="col-20 text-center">';
									article +='<i class="fa fa-clock-o fa-appoint-icon"></i>';
									article +='</div>';
									article +='<div class="col-80 padding-appoint-time">';
									article +=app_time;
									article +='</div>';


									article +='</div>';



								});
							}
                            $('#show-appoint').html(article);
                        } else if(msg.status == 101){

                            alert(msg.message);
                            window.location.replace("login.html");
                        } else {

                            alert(msg.message);
                        }

                    },
                    error: function(msg){
                        alert("Error connecting");

                    }
                });
            });

            theApp.onPageInit('blog', function (page) {

                //theApp.alert("done");
                var token = localStorage.getItem('app_token');
                $.ajax({
                    type: "POST",
                    url: "http://detechnovate.net/intuitive/api/view_articles/",
                    
                    headers: {"token": token},
                    data: {},
                    dataType: "json",

                    success: function (msg) {
                        if(msg.status == 1) {

                            var article = "";
                            $.each(msg.data,function(key,val){

                                article +='<div class="row">';

                                article +='<div class="col-100 tablet-66">';
                                article +='<br/>';
                                article +='<div class="tc-blog-item clearfix">';
                                article +='<a href="article-detail.html?id='+val.article_id+'" class="preview">';
                                article +='<img src="'+val.image+'" alt="" />';
                                article +='</a>';
                                article +='<a href="#" class="title"><h4>'+val.subject+'</h4></a>';
                                article +='<small class="subtitle grey-text">Posted on <b>'+val.create_date+'</b> by <b>'+val.author+'</b></small>';
                                article +='<div class="details">';
                                article +='<p>'+val.over_view+'</p>';
                                article +='</div>';

                                article +='<div class="text-right">';
                                article +='<a href="article-detail.html?id='+val.article_id+'">Go to Post <i class="fa fa-arrow-right"></i></a>';
                                article +='</div>';
                                article +='</div>';<!-- .tc-blog-item | ENDS -->
                                article +='<div class="tc-divider dark thick"></div>';



                                article +='</div>';
                                article +='</div>';



                            });

                            $('#article-list').html(article);
                        } else if(msg.status == 101){

                            alert(msg.message);
                            window.location.replace("login.html");
                        } else {

                            alert(msg.message);
                        }

                    },
                    error: function(msg){
                        alert("Error connecting");

                    }
                });
            });


            theApp.onPageInit('blog-detail', function (page) {

                //theApp.alert("done");
                var token = localStorage.getItem('app_token');

                var article_id = page.query.id;
                var data = {article_id:article_id};
                $.ajax({
                    type: "POST",
                    url: "http://detechnovate.net/intuitive/api/get_article/",
                    
                    headers: {"token": token},
                    data: JSON.stringify(data),
                    dataType: "json",

                    success: function (msg) {
                        if(msg.status == 1) {

                            var subject = msg.data.subject;
                            var article_body = msg.data.article_body;
                            var image = msg.data.image;
                            var author = msg.data.author;
                            var create_date = msg.data.create_date;

                            var txt_image = '<img src="'+image+'" />';

                            $('#detail-subject').html(subject);
                            $('#detail-author').html(author);
                            $('#detail-date').html(create_date);
                            $('#detail-body').html(article_body);
                            $('#detail-image').html(txt_image);
                        } else if(msg.status == 101){

                            alert(msg.message);
                            window.location.replace("login.html");
                        } else {

                            alert(msg.message);
                        }

                    },
                    error: function(msg){
                        alert("Error connecting");

                    }
                });
            });

            theApp.onPageInit('cancel-appointment', function (page) {

                //theApp.alert("done");
                //var token = localStorage.getItem('app_token');

                var doctor_name = page.query.doctor_name;
                var center_name = page.query.center;
                var app_time = page.query.app_time;
                var id = page.query.id;

                var appointment_time = new Date(app_time);
                //alert(article_id);


                $('#btn-show').html('<a><button class="btn-cancel-appoint" id="cancel-appoint" data-appointid='+id+'>Cancel <i class="fa fa-close"></i> </button></a>');
                $('#cnl-doctor').html(doctor_name);
                $('#cnl-center').html(center_name);
                $('#cnl-time').html(appointment_time);
            });


            theApp.onPageInit('doctor-appointment', function (page) {

                //theApp.alert("done");
                var token = localStorage.getItem('app_token');

                var doctor_id = page.query.doctor_id;
                var doctor_name = decodeURI(page.query.doctor_name);
                var data = {doctor_id:doctor_id};
                $.ajax({
                    type: "POST",
                    url: "http://detechnovate.net/intuitive/api/view_appointments/",
                    
                    headers: {"token": token},
                    data: JSON.stringify(data),
                    dataType: "json",

                    success: function (msg) {
                        if(msg.status == 1) {

                            doc_appointment= msg.data;



                            var appointment = "";
                            appointment += '<div class="row no-gutter">';
                            appointment += '<a href="#">';
                            appointment += '<div class="col-20 text-right pr--10">';
                            appointment += '<img src="img/icon/hospital/hospital-icon.png" class="max-img"/>';
                            appointment += '</div>';
                            appointment += '<div class="col-80 doc-info text-left">';
                            appointment += '<h4><b>'+doctor_name+'</b></h4>';
                            appointment += '<p class="grey-text">Intuitive Branch, Lagos</p>';

                            appointment += '</div>';
                            appointment += '</a>';
                            appointment += '</div>';

                            if (msg.data === undefined || msg.data.length == 0) {
                                appointment += '<p class="grey-text">No appointment found</p>';
                            } else {

                                var appoint_date = "";
                                $.each(msg.data,function(key,val) {

                                    appoint_date += '<option value="'+key+'">'+val.dates+' </option>';

                                });
                                appointment +='<form  action="?" class="list-block reduce-list-block no-margin">';
                                //
                                appointment +='<div class="item-content">';
                                appointment +='<div class="item-inner">';
                                appointment +='<div class="item-input item-input-field">';
                                appointment +='<select id="appointment_dates">'+appoint_date+'</select>';
                                appointment +='</div>';
                                appointment +='</div>';
                                appointment +='<div class="item-media"><i class="fa fa-chevron-right"></i></div>';
                                appointment +='</div>';
                                //
                                var val1 = msg.data[0];
                                //console.log(val1);
                                    appointment +='<div id="list-appointment">';
                                    appointment +='<div class="accordion-list date-accordion">';
                                    appointment +='<div class="accordion-item">';
                                    appointment +='<div class="accordion-item-toggle"><i class="fa fa-cloud grey-text"></i> <b class="color-black">Morning</b> <span class="grey-text">'+val1.morning.text+'</span></div>';
                                    appointment +='<div class="accordion-item-content">';
                                    appointment +='<div>';
                                    $.each(val1.morning.times,function(keym,valm) {
                                        appointment += '<a href="#" class="lnk-appoint" data-timeslot="'+ valm.time_slot +'" data-time="' + valm.time +'" data-doctorid="'+ valm.doctor_id +'" data-centerid="' + valm.center_id +'">' + valm.time +'</a>';
                                    });

                                    appointment +='</div>';
                                    //
                                    appointment +='</div>';
                                    appointment +='</div>';

                                appointment +='<div class="accordion-item">';
                                appointment +='<div class="accordion-item-toggle"><i class="fa fa-sun-o grey-text"></i> <b class="color-black">Afternoon</b> <span class="grey-text">'+val1.afternoon.text+'</span></div>';
                                appointment +='<div class="accordion-item-content">';
                                appointment +='<div>';
                                $.each(val1.afternoon.times,function(keya,vala) {
                                    appointment += '<a href="#" class="lnk-appoint" data-timeslot="'+ vala.time_slot +'" data-time="' + vala.time +'" data-doctorid="'+ vala.doctor_id +'" data-centerid="' + vala.center_id +'">' + vala.time +'</a>';
                                });

                                appointment +='</div>';
                                //
                                appointment +='</div>';
                                appointment +='</div>';

                                appointment +='<div class="accordion-item">';
                                appointment +='<div class="accordion-item-toggle"><i class="fa fa-moon grey-text"></i> <b class="color-black">Evening</b> <span class="grey-text">'+val1.evening.text+'</span></div>';
                                appointment +='<div class="accordion-item-content">';
                                appointment +='<div>';
                                $.each(val1.evening.times,function(keye,vale) {
                                    appointment += '<a href="#" class="lnk-appoint" data-timeslot="'+ vale.time_slot +'" data-time="' + vale.time +'" data-doctorid="'+ vale.doctor_id +'" data-centerid="' + vale.center_id +'">' + vale.time +'</a>';
                                });

                                appointment +='</div>';
                                //
                                appointment +='</div>';
                                appointment +='</div>';

                                appointment +='<div class="accordion-item">';
                                appointment +='<div class="accordion-item-toggle"><i class="fa fa-moon fa-star"></i> <b class="color-black">Night</b> <span class="grey-text">'+val1.night.text+'</span></div>';
                                appointment +='<div class="accordion-item-content">';
                                appointment +='<div>';
                                $.each(val1.night.times,function(keyn,valn) {
                                    appointment += '<a href="#" class="lnk-appoint" data-timeslot="'+ valn.time_slot +'" data-time="' + valn.time +'" data-doctorid="'+ valn.doctor_id +'" data-centerid="' + valn.center_id +'">' + valn.time +'</a>';
                                });

                                appointment +='</div>';
                                //
                                appointment +='</div>';
                                appointment +='</div>';

                                appointment +='</div>';
                                appointment +='</div>'; //end list-appointment




                                appointment+= '</form>';

                            }
                            $('#lbl-doctor').html(appointment);
                        } else if(msg.status == 101){

                            alert(msg.message);
                            window.location.replace("login.html");
                        } else if(msg.status == 0){

                            alert(msg.message);
                        } else {

                            alert("Error Connecting");
                        }

                    },
                    error: function(msg){
                        alert("Error connecting");

                    }
                });
            });

            $(document).on('change', '#appointment_date', function () {

                var date_id =  $('#appointment_date').val();
                var val1 = msg.data[date_id];
                var appointment = "";
                //console.log(val1);

                appointment +='<div class="accordion-list date-accordion">';
                appointment +='<div class="accordion-item">';
                appointment +='<div class="accordion-item-toggle"><i class="fa fa-cloud grey-text"></i> <b class="color-black">Morning</b> <span class="grey-text">'+val1.morning.text+'</span></div>';
                appointment +='<div class="accordion-item-content">';
                appointment +='<div>';
                $.each(val1.morning.times,function(keym,valm) {
                    appointment += '<a href="#" class="lnk-appoint" data-timeslot="'+ valm.time_slot +'" data-time="' + valm.time +'" data-doctorid="'+ valm.doctor_id +'" data-centerid="' + valm.center_id +'">' + valm.time +'</a>';
                });

                appointment +='</div>';
                //
                appointment +='</div>';
                appointment +='</div>';

                appointment +='<div class="accordion-item">';
                appointment +='<div class="accordion-item-toggle"><i class="fa fa-sun-o grey-text"></i> <b class="color-black">Afternoon</b> <span class="grey-text">'+val1.afternoon.text+'</span></div>';
                appointment +='<div class="accordion-item-content">';
                appointment +='<div>';
                $.each(val1.afternoon.times,function(keya,vala) {
                    appointment += '<a href="#" class="lnk-appoint" data-timeslot="'+ vala.time_slot +'" data-time="' + vala.time +'" data-doctorid="'+ vala.doctor_id +'" data-centerid="' + vala.center_id +'">' + vala.time +'</a>';
                });

                appointment +='</div>';
                //
                appointment +='</div>';
                appointment +='</div>';

                appointment +='<div class="accordion-item">';
                appointment +='<div class="accordion-item-toggle"><i class="fa fa-moon grey-text"></i> <b class="color-black">Evening</b> <span class="grey-text">'+val1.evening.text+'</span></div>';
                appointment +='<div class="accordion-item-content">';
                appointment +='<div>';
                $.each(val1.evening.times,function(keye,vale) {
                    appointment += '<a href="#" class="lnk-appoint" data-timeslot="'+ vale.time_slot +'" data-time="' + vale.time +'" data-doctorid="'+ vale.doctor_id +'" data-centerid="' + vale.center_id +'">' + vale.time +'</a>';
                });

                appointment +='</div>';
                //
                appointment +='</div>';
                appointment +='</div>';

                appointment +='<div class="accordion-item">';
                appointment +='<div class="accordion-item-toggle"><i class="fa fa-moon fa-star"></i> <b class="color-black">Night</b> <span class="grey-text">'+val1.night.text+'</span></div>';
                appointment +='<div class="accordion-item-content">';
                appointment +='<div>';
                $.each(val1.night.times,function(keyn,valn) {
                    appointment += '<a href="#" class="lnk-appoint" data-timeslot="'+ valn.time_slot +'" data-time="' + valn.time +'" data-doctorid="'+ valn.doctor_id +'" data-centerid="' + valn.center_id +'">' + valn.time +'</a>';
                });

                appointment +='</div>';
               
                appointment +='</div>';
                appointment +='</div>';

                appointment +='</div>';





                $('#list-appointment').html(appointment);

            });

            $(document).on('click', '.lnk-appoint', function () {

                
                var appointment = $(this).attr('data-timeslot');
                var center_id = $(this).attr('data-centerid');
                var doctor_id = $(this).attr('data-doctorid');
                var app_time = new Date(appointment);
                                
                var token = localStorage.getItem('app_token');
                var data = {doctor_id: doctor_id, appointment: appointment, center_id:center_id};

                var confirmbook =confirm("Book appointment for:\n "+app_time+"");
                if (confirmbook==true){

                    $.ajax({
                        type: "POST",
						url: "http://detechnovate.net/intuitive/api/book_appointments/",
                        


                        headers: {"token": token},
                        data: JSON.stringify(data),
                        dataType: "json",

                        success: function (msg) {
                            if (msg.status == 1) {

                                alert(msg.message);
                            } else if (msg.status == 101) {

                                alert(msg.message);
                                window.location.replace("login.html");
                            } else {

                                alert(msg.message);
                            }
                        }
                    });

                }

            });

            theApp.onPageInit('pre-register', function (page) {

                //theApp.alert("done");
                var token = localStorage.getItem('app_token');
                
                $.ajax({
                    type: "POST",
                    url: "http://detechnovate.net/intuitive/api/view_salutations/",
                    
                    headers: {"token": token},
                    data: {},
                    dataType: "json",

                    success: function (msg) {
                        if(msg.status == 1) {

                            var state = "";
                            $.each(msg.states,function(key,val) {

                                state += '<option value="'+val.state_id+'">'+val.state_name+' </option>';

                            });

                            var category = "";
                            $.each(msg.patient_categories,function(keyc,valc) {

                                category += '<option value="'+valc.category_id+'">'+valc.category_name+' </option>';

                            });
                            //
                            var salutations = "";
                            $.each(msg.salutations,function(keys,vals) {

                                salutations += '<option value="'+vals.salutation_id+'">'+vals.salutation+' </option>';

                            });
                            //
                            var gender = "";
                            $.each(msg.gender,function(keyg,valg) {

                                gender += '<option value="'+valg.gender_id+'">'+valg.gender_name+' </option>';

                            });
                            option_city = msg.cities;
                            

                            $('#pre-state').html(state);
                            $('#pre-salutation').html(salutations);
                            $('#pre-category').html(category);
                            $('#pre-gender').html(gender);
                            
                        } else if(msg.status == 101){

                            alert(msg.message);
                            window.location.replace("login.html");
                        } else {

                            alert(msg.message);
                        }

                    },
                    error: function(msg){
                        alert("Error connecting");

                    }
                });
            });

            $(document).on('change', '#pre-state', function () {

                var state_id =  $('#pre-state').val();
                //alert(state_id);
                var returnedData = $.grep(option_city, function (element, index) {
                    return element.state_id == state_id;
                });

                //alert(returnedData[0].state_id + "  " + returnedData[0].city_id);
                var city = "";
                $.each(returnedData,function(key,val) {

                    city += '<option value="'+val.city_id+'">'+val.city_name+' </option>';

                });

                $('#pre-city').html(city);
            });

            theApp.onPageInit('find-hospital', function (page) {
                $$.get('https://goo.gl/maps/CFUQAqBsaUJ2', {}, function (data) {
                    $$('#hosp-map').html(data);
                });
            });
            theApp.onPageInit('cart', function (page) {
                /**---------------------
                 *
                 * Cart Item Quantity
                 *
                 *---------------------**/
                $('.quantity').each(function () {
                    var _increase = $(this).find('.increase'),
                        _decrease = $(this).find('.decrease'),
                        _quantity = $(this).find('input');

                    _increase.on('click', function (e) {
                        e.preventDefault();

                        var _quantity_value = parseInt(_quantity.val());

                        _quantity.val( _quantity_value + 1 );
                    });

                    _decrease.on('click', function (e) {
                        e.preventDefault();

                        var _quantity_value = parseInt(_quantity.val());

                        _quantity.val( Math.max( 1, (_quantity_value - 1) ) );
                    });
                });
            });

            $(document).on('click', '#btn-edit-profile', function () {


                var first_name = $('#ed_first_name').val();
                var last_name = $('#last_name').val();
                var middle_name = $('#middle_name').val();
                var gender = $('#gender').val();
                var token = localStorage.getItem('app_token');
                if (first_name == "") {
                    alert("Kindly enter your first name");
                    $('#first_name').focus();
                    return false;
                } else {
                    var data = {first_name:first_name, last_name:last_name, middle_name:middle_name, gender:gender};
                    $.ajax({
                        type: "POST",
						url: "http://detechnovate.net/intuitive/api/update_profile/",
                        
                        headers: {"token": token},
                        data: JSON.stringify(data),
                        dataType: 'json',

                        success: function(msg){

                            if (msg.status == 1){

                                alert(msg.message);
                                localStorage.setItem('app_name', first_name);
                                mainView.router.loadPage('profile.html');
                                return false;
                            } else {

                                alert(msg.message);
                                return false;
                            }

                        },
                        error: function(msg){
                            alert("Error connecting");

                        }

                    });
                    return false;
                }
            });

            $(document).on('click', '#btn-change-password', function () {


                var current_password = $('#current_password').val();
                var new_password = $('#new_password').val();
                var confirm_password = $('#confirm_password').val();
                var token = localStorage.getItem('app_token');
                if (current_password == "") {
                    alert("Kindly enter your current password");
                    $('#current_password').focus();
                    return false;
                }
                else if (new_password == ""){
                    alert("Kindly enter your new password");
                    $('#new_password').focus();
                    return false;
                }
                else if (new_password.length < 7){
                    alert("Password is a minimum of 7 characters");
                    $('#new_password').focus();
                    return false;

                }

                else if (confirm_password != new_password){
                    alert("Password mis-match");
                    $('#new_password').focus();
                    return false;

                } else {
                    var data = {current_password:current_password, new_password:new_password};
                    $.ajax({
                        type: "POST",
						url: "http://detechnovate.net/intuitive/api/change_password/",
                        
                        headers: {"token": token},
                        data: JSON.stringify(data),
                        dataType: 'json',

                        success: function(msg){

                            
                            if (msg.status == 1) {

                                alert(msg.message);
                                mainView.router.loadPage('profile.html');
                                return false;
                            } else if (msg.status == 101){

                                alert(msg.message);
                                window.location.replace('login.html');
                                return false;

                            } else {

                                alert(msg.message);
                                return false;
                            }

                        },
                        error: function(msg){
                            alert("Error connecting");

                        }

                    });
                    return false;
                }
            });

            $(document).on('click', '#btn-pre-register', function () {


                var salutation = $('#pre-salutation').val();
                var first_name = $('#pre-first-name').val();
                var middle_name = $('#pre-middle-name').val();
                var last_name = $('#pre-last-name').val();
                var gender = $('#pre-gender').val();
                var category = $('#pre-category').val();
                var dob = $('#pre-dob').val();
                var state = $('#pre-state').val();
                var city = $('#pre-city').val();
                var address = $('#pre-address').val();
                var token = localStorage.getItem('app_token');
                if (first_name == "") {
                    alert("Kindly enter your first name");
                    $('#pre-first-name').focus();
                    return false;
                }
                else if (salutation == ""){
                    alert("Kindly select your title");
                    $('#pre-salutation').focus();
                    return false;
                }
                else if (gender == ""){
                    alert("Kindly select gender");
                    $('#pre-gender').focus();
                    return false;

                }

                else if (category == "") {
                    alert("Kindly select category");
                    $('#pre-category').focus();
                    return false;
                }

                else if (state == "") {
                    alert("Kindly select state");
                    $('#pre-state').focus();
                    return false;
                }
                else if (city == "") {
                    alert("Kindly select city");
                    $('#pre-city').focus();
                    return false;
                }
                else if (dob == ""){
                        alert("Kindly enter date of birth");
                        $('#pre-dob').focus();
                        return false;
                } else {
                    var data = {salutation:salutation, first_name:first_name, middle_name:middle_name, last_name:last_name, gender:gender, category:category, dob:dob, address:address, state:state, city:city};
                    $.ajax({
                        type: "POST",
						url: "http://detechnovate.net/intuitive/api/pre_register/",
                        
                        headers: {"token": token},
                        data: JSON.stringify(data),
                        dataType: 'json',

                        success: function(msg){

                           
                            if (msg.status == 1) {

                                alert(msg.message);
                                mainView.router.loadPage('profile.html');
                                return false;
                            } else if (msg.status == 101){

                                alert(msg.message);
                                //window.location.replace('login.html');
                                return false;

                            } else {

                                alert(msg.message);
                                return false;
                            }

                        },
                        error: function(msg){
                            alert("Error connecting");

                        }

                    });
                    return false;
                }
            });

            $(document).on('click', '#btn-send-message', function () {


                var subject = $('#inp-about').val();
                var message = $('#inp-message').val();

                var token = localStorage.getItem('app_token');
                if (subject == "") {
                    alert("Kindly select subject");
                    $('#inp-about').focus();
                    return false;
                }
                else if (message == ""){
                    alert("Kindly enter your message");
                    $('#new_password').focus();
                    return false;


                } else {
                    var data = {subject:subject, message:message};
                    $.ajax({
                        type: "POST",
						url: "http://detechnovate.net/intuitive/api/save_message/",
						headers: {"token": token},
                        data: JSON.stringify(data),
                        dataType: 'json',

                        success: function(msg){

                            //console.log(msg.result.success);
                            //alert(JSON.stringify(msg));
                            //return msg;
                            if (msg.status == 1) {

                                alert(msg.message);
                                $('#inp-about').val('');
                                $('#inp-message').val('');
                                return false;
                            } else if (msg.status == 101){

                                alert(msg.message);
                                //window.location.replace('login.html');
                                return false;

                            } else {

                                alert(msg.message);
                                return false;
                            }

                        },
                        error: function(msg){
                            alert("Error connecting");

                        }

                    });
                    return false;
                }
            });
			


            theApp.init();
        });
    });
});


