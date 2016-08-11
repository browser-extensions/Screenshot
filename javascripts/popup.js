var Bg = chrome.extension.getBackgroundPage();
chrome.cookies.getAll({
    url: "http://getsmartshot.com"
}, function(a) {
    if (a) {
        for (var b = 0, c = a.length; c > b; b++)
            if ("screenshot_personal_fullname" === a[b].name) var d = decodeURI(a[b].value);
            else if ("screenshot_personal_type" === a[b].name) {
            console.log(a[b]);
            var e = a[b].value
        }
        d ? ($(".aws-info").find(".user-name").text(d).attr("title", d), $(".aws-info").show(), $(".aws-login").hide()) : ($(".aws-info").hide(), $(".aws-login").show()), console.log(e, typeof e), "0" == e ? $(".aws-user").removeClass("premium") : "undefined" == typeof e ? ($(".aws-premium-icon").hide(), $(".aws-upgrade").hide()) : $(".aws-user").addClass("premium")
    }
}), $(document).ready(function() {
    function a() {
        if (localStorage.msObj) {
            var a = JSON.parse(localStorage.msObj),
                b = 1 == a.visible.enable ? "Ctrl+Shift+" + a.visible.key : "Not set",
                c = 1 == a.selected.enable ? "Ctrl+Shift+" + a.selected.key : "Not set",
                d = 1 == a.entire.enable ? "Ctrl+Shift+" + a.entire.key : "Not set";
            $("#visible").find(".shortcut").remove().end().append("<a class='shortcut'>" + b + "</a>"), $("#selected").find(".shortcut").remove().end().append("<a class='shortcut'>" + c + "</a>"), $("#entire").find(".shortcut").remove().end().append("<a class='shortcut'>" + d + "</a>")
        }
    }

    function b() {
        $(".i18n").each(function() {
            var a = this,
                b = a.id;
            $(a).html(chrome.i18n.getMessage(b.replace(/-/, "")))
        }), $(".title").each(function() {
            var a = this,
                b = a.id;
            $(a).attr({
                title: chrome.i18n.getMessage(b.replace(/-/, "") + "_title")
            })
        })
    }

    function c() {
        $("ul").remove(), $(".aws-account, .sep").hide(), $("#capturing").fadeIn("slow")
    }

    function d(a) {
        chrome.extension.sendRequest(a)
    }
    
    var e, f = !0;
    b(), a(), !localStorage.capture_desktop || "false" == localStorage.capture_desktop, chrome.windows.getCurrent(function(a) {
        chrome.tabs.getSelected(a.id, function(a) {
            console.log(new Date), e = a.url;
            var b = e.match(/https?:\/\/*\/*/gi);
            (null == b || e.match(/https:\/\/chrome.google.com\/extensions/i)) && $("#entire, #selected, #delay-capture").attr({
                title: chrome.i18n.getMessage("disableEntireTitle")
            }).css({
                display: "none"
            }).unbind("click"), "complete" != a.status && ($("#selected").attr({
                title: "Page still loading! Please wait."
            }).css({
                display: "none"
            }), f = !1), /http|https|file|ftp/.test(e.slice(0, 5)) || $("").css({
                disable: "none"
            }).unbind("click")
        })
    }), chrome.extension.onRequest.addListener(function(a) {
        switch (a.action) {
            case "enable_selected":
                if (e.match(/https:\/\/*\/*/gi)) return void $("#selected").attr({
                    title: "For security reason, Capture Selected Area doesn't work in https pages!"
                });
                f = !0, $("#selected").attr({
                    title: ""
                }).css({
                    color: "#000"
                });
                break;
            case "shownew":
                window.close();
                break;
            case "closeWin":
                window.close()
        }
    }), $("a").click(function() {
        var a = this.id;
        if ("visible" == a && (-1 != navigator.appVersion.indexOf("Chrome/11") && /^file:\/\/*/.test(b) ? alert("You can't capture local page's in Chrome beta!") : d({
                action: a
            }), window.close()), "delay-capture" == a && (-1 != navigator.appVersion.indexOf("Chrome/11") && /^file:\/\/*/.test(b) ? alert("You can't capture local page's in Chrome beta!") : chrome.tabs.getSelected(null, function(b) {
                chrome.tabs.sendRequest(b.id, {
                    action: a,
                    sec: localStorage.delay_sec
                }), window.close()
            })), "entire" == a && (c(), d({
                action: a
            }), c()), "selected" == a && (f ? (window.close(), d({
                action: a
            })) : d({
                action: "https"
            }), window.close()), "upload" == a) {
            var b = chrome.extension.getURL("") + "upload.html";
            chrome.tabs.create({
                url: b
            }), window.close()
        }
        if ("option" == a) {
            var b = chrome.extension.getURL("") + "options.html";
            chrome.tabs.create({
                url: b
            }), window.close()
        }
        if ("help" == a) {
            var b = "http://amzing.co/page/contact";
            chrome.tabs.create({
                url: b
            }), window.close()
        }
        "desktop" == a && (Bg.beginDesktop(), window.close()), "donate" == a && (chrome.tabs.create({
            url: chrome.extension.getURL("") + "purchase.html"
        }), window.close())
    })
});