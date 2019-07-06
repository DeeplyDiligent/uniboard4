$(document).ready(function(){
    $('head').append("<link href='https://fonts.googleapis.com/css?family=Titillium+Web&display=swap' rel='stylesheet'>");
    function prepareHeaderBar(){
        $('.header-banner').html("<div class='' id='uniboard-maximize'></div>");
        $('.header-banner').css({minHeight:"auto", backgroundImage:"", backgroundColor:"#7c4bff"});
        $('#uniboard-maximize').append(`<img src="${chrome.extension.getURL('img/uniboard-white.svg')}" width="260px" />`);
        $('#uniboard-maximize').append(`<div class="btn btn-secondary" 
            style="float: right;min-width:180px; margin-top:4px;
            font-family: 'Titillium Web', sans-serif; 
            background:white" id="uniboard-max-button">Open App</div>`);
    }
    function startIframe(){
        $('#page > *').hide();
        $("#page").append('<iframe id="pageaction" style="width:100%; border:none" height="100%" src="'+ chrome.extension.getURL('index.html')+'"></iframe>');
        $('#page').css({position:'fixed'})
        $('#page').removeClass('container-fluid');
        $('#page-footer').hide();
        setInterval(function(){ $('#page').css({width:$('body').width(),height:$('body').height()-72}); }, 0);
    }
    function prepareMinimizeButton(){
        $('.header-right').append("<div class='usermenu' id='uniboard-minimize'></div>");
        $('#uniboard-minimize').css({background:"#7c4afc", borderRadius:"20px", margin:"7px", padding:"0px", cursor:"pointer", boxShadow:"rgba(0, 0, 0, 0.45) 0px 0px 9px -3px"})
        $('#uniboard-minimize').html(`
        <span class="userbutton" style="margin: 7px 12px; ">
            <span>
                <span class="avatar current">
                    <img src="${chrome.extension.getURL('img/uniboard-white-icon.svg')}" class="userpicture" height="30" role="presentation" aria-hidden="true" style="margin-top:-2px" />
                </span>
            </span>
            <span class="usertext" style="color:white; font-family: 'Titillium Web', sans-serif;">Minimize</span>
        </span>`);

    }
    function fastHide(){
        $("#uniboard-minimize").animate({marginRight:'-200px', marginLeft:"60px"},0);
        $('#pageaction').slideUp(function(){
            $('#page').css({position:'relative'})
            $('#page > *').fadeIn(function(){
                $('#pageaction').hide();
                $('#page').addClass('container-fluid');
            },0);
        },0)
    }
    function bindMinimizeListeners(){
        if ($('#pageaction').is(':visible')){
            window.localStorage.setItem("uniboard-shown-by-default","false");
            $("#uniboard-minimize").animate({marginRight:'-200px', marginLeft:"60px"},350);
            $('#pageaction').slideUp(function(){
                $('#page').css({position:'relative'})
                $('#page > *').fadeIn(function(){
                    $('#pageaction').hide();
                    $('#page').addClass('container-fluid');
                });
            })
        } else {
            window.localStorage.setItem("uniboard-shown-by-default","true");
            $("#uniboard-minimize").animate({marginRight:'7px', marginLeft:"7px"},350);
            $('#page > *').hide();
            $('#page').removeClass('container-fluid');
            $('#pageaction').slideDown(function(){
                $('#page').css({position:'fixed'})
            })
        }
    }
    function showUniboardBasedOnSavedState(){
        storedState = window.localStorage.getItem("uniboard-shown-by-default")
        if(storedState==="false") fastHide();
    }
    function storeSesskey(callback){
        chrome.storage.local.set({'sessKeyForUniboard': (new URL($('[data-title="logout,moodle"]').attr('href'))).search.split('=')[1]},callback);
    }
    prepareHeaderBar();
    prepareMinimizeButton();
    showUniboardBasedOnSavedState();
    $('#uniboard-max-button,#uniboard-minimize').click(bindMinimizeListeners);
    storeSesskey(startIframe);
});