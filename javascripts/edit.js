function toggleCropMode(a) {
    a ? ($(".tools").hide(), $(".crop-area").show(), $("#save-btn").hide()) : ($(".tools").show(), $(".crop-area").hide(), $("#save-btn").show())
}

function editor_style_callback(a, b) {
    switch (a) {
        case "crop":
            "done" !== b && ($("#crop-dimension").show(), $("#cd-width").val(b.width), $("#cd-height").val(b.height));
            break;
        case "undo":
            $('.single-btn[data-action="undo"]').toggleClass("disabled", !b);
            break;
        case "redo":
            $('.single-btn[data-action="redo"]').toggleClass("disabled", !b);
            break;
        case "del":
            $('.single-btn[data-action="deleteSelected"]').toggleClass("disabled", !b);
            break;
        case "clear":
            $('.single-btn[data-action="clear"]').toggleClass("disabled", b)
    }
}

function initEditor(a) {
    var b = $("#editor-outer-container"),
        c = b.find(".editor-container"),
        d = b.find(".doodle-canvas"),
        e = b.find(".layer-canvas"),
        f = b.find(".editor-outer-textarea"),
        g = b.find(".editor-textarea"),
        h = b.find(".editor-list-dialog"),
        i = new Image;
    editor = new Diigo.Doodle._Drawer({
        out_container: b[0],
        container: c[0],
        doodle_canvas: d[0],
        layer_canvas: e[0],
        textarea: g[0],
        textarea_out: f[0],
        $list_dialog: h,
        image: i
    }, function(a, b) {
        editor_style_callback(a, b)
    }), i.src = a, i.onload = function() {
        editor.setBgImage(i, !1), editor.setPenColor("#FC0"), editor.setPenType("curve")
    }, $(document).on("click", function() {
        $(".panel").removeClass("active"), $(".multi-btn-dropdown").removeClass("active"), $(".zoom-tip").removeClass("active")
    }), $("#crop-dimension").find("input").on("change input", function() {
        var a = Number($("#cd-width").val()),
            b = Number($("#cd-height").val());
        editor.setCropSize(a, b)
    }), $(".single-btn").on("click", function(a) {
        if (a.stopPropagation(), $(this).hasClass("shape-btn")) {
            $(".shape-btn").removeClass("active"), $(this).toggleClass("active");
            var b = $(this).attr("data-shape");
            "Text" === b ? ($(".tool-font-family").css("display", "inline-block"), $(".tool-font-size").css("display", "inline-block"), $(".tool-pen-width").hide()) : ($(".tool-font-family").hide(), $(".tool-font-size").hide(), $(".tool-pen-width").css("display", "inline-block")), "highlight" === b ? (editor.setPenOpacity(.3), editor.setPenWidth(16)) : (editor.setPenOpacity(1), editor.setPenWidth(currentPenWidth)), editor.setPenType(b)
        } else {
            var c = $(this).attr("data-action");
            "crop" === c ? (toggleCropMode(!0), editor.cutImage()) : "zoom-in" === c ? 5 != scale_sub && (scale_sub++, editor.setScale(Number(scales[scale_sub])), $(".zoom-tip").addClass("active").find(".zoom-level").text(100 * Number(scales[scale_sub]) + "%")) : "zoom-out" === c ? 0 != scale_sub && (scale_sub--, editor.setScale(Number(scales[scale_sub])), $(".zoom-tip").addClass("active").find(".zoom-level").text(100 * Number(scales[scale_sub]) + "%")) : editor[c]()
        }
    }), $("#crop-cancel-btn").on("click", function() {
        toggleCropMode(!1), editor.finishCutImage(!1)
    }), $("#crop-btn").on("click", function() {
        toggleCropMode(!1), editor.finishCutImage(!0)
    }), $("#restore-zoom").on("click", function(a) {
        a.stopPropagation(), editor.setScale(1), $(".zoom-tip").find(".zoom-level").text("100%")
    }), $(".color-item").on("click", function() {
        var a = $(this).attr("data-color");
        $("#tool-current-color").attr("data-color", a), editor.setPenColor(a)
    }), $(".pen-width-item").on("click", function() {
        var a = $(this).attr("data-width");
        $("#tool-current-width").attr("data-width", a).find("span").text(a + "px"), editor.setPenWidth(parseInt(a)), currentPenWidth = parseInt(a)
    }), $(".font-f-item").on("click", function() {
        var a = $(this).attr("data-ff");
        $("#tool-current-font-family").attr("data-ff", a).find("span").text(a), editor.setFontName(a)
    }), $(".font-s-item").on("click", function() {
        var a = $(this).attr("data-fs");
        $("#tool-current-font-size").attr("data-fs", a).text(a + "px"), editor.setFontSize(parseInt(a))
    }), $(".sub-single-btn").on("click", function() {
        var a = $(this).attr("data-shape");
        $(this).parents(".multi-btn").find(".shape-btn").attr("data-shape", a).trigger("click")
    }), $(".tool-select").find(".current").on("click", function(a) {
        a.stopPropagation(), $(".panel").removeClass("active"), $(this).parent().find(".panel").addClass("active")
    }), $(".multi-btn-arrow").on("click", function(a) {
        a.stopPropagation(), $(this).parent().find(".multi-btn-dropdown").addClass("active")
    }), $("#save-btn").on("click", function() {
        save()
    });
    var j = ["Times New Roman", "Arial", "Craft Girls", "Limelight", "Lobster", "Anton", "Chewy", "Frijole", "Spirax", "Dancing Script", "Changa One", "Griffy"];
    WebFontConfig = {
            custom: {
                families: j,
                urls: ["/stylesheets/font.css"]
            },
            loading: function() {
                console.log("Fonts loading ...")
            },
            active: function() {
                console.log("Fonts active!")
            },
            inactive: function() {
                console.log("error font")
            }
        },
        function() {
            var a = document.createElement("script");
            a.src = "/javascripts/libs/webfontloader.js", a.type = "text/javascript", a.async = "true";
            var b = document.getElementsByTagName("script")[0];
            b.parentNode.insertBefore(a, b)
        }()
}

function prepareEditArea(a) {
    console.log(a);
    var b = a.menuType,
        c = a.type,
        d = a.data;
    taburl = a.taburl, tabtitle = a.tabtitle, getEditOffset(), window.con = 1, window.con2 = 1, scrollbarWidth = getScrollbarWidth(), $("#save-image").attr({
        src: d[0]
    }).load(function() {
        function e(a, b, c, f, h, j, k, l, m) {
            if (console.log(a), !a) {
                var o = showCanvas.toDataURL();
                initEditor(o)
            }
            k = r * i, r == u - 1 && (c = i - lastH, h = m = lastH), $("#save-image").attr({
                src: a
            }).load(function() {
                $(this).unbind("load"), console.log(this, b, c, f, h, j, k, l, m), showCtx.drawImage(this, b, c, f, h, j, k, l, m), ++r > u - 1 ? g() : console.log(n), e(d[++n], b, c, f, h, j, k, l, m)
            })
        }

        function f(a, b, c, e, g, i, k, l, m) {
            i = j * h, j == t - 1 && (b = h - lastW, e = l = lastW), $("#save-image").attr({
                src: a
            }).load(function() {
                $(this).unbind("load"), showCtx.drawImage(this, b, c, e, g, i, k, l, m), t - 1 > j && f(d[++j], b, c, e, g, i, k, l, m)
            })
        }

        function g() {
            ++j > t - 1 || (j == t - 1 ? (k = h - lastW, v = dw = editW - j * h, w = j * h) : (k = 0, v = dw = h, w = j * h), l = 0, x = dh = i, y = 0, r = 0, n = r + j * u, e(d[n], k, l, v, x, w, y, dw, dh))
        }
        var h = this.width,
            i = this.height,
            k = a.centerOffX,
            l = a.centerOffY;
        switch (c) {
            case "visible":
                "selected" == b ? (editW = a.centerW * window.devicePixelRatio, editH = a.centerH * window.devicePixelRatio, updateEditArea(), updateShowCanvas(), getEditOffset(), addMargin(), getEditOffset()) : "upload" == b ? (editW = h, editH = i, k = 0, l = 0, updateEditArea(), updateShowCanvas(), getEditOffset()) : "desktop" == b ? (editW = h, editH = i, k = 0, l = 0, updateEditArea(), updateShowCanvas(), getEditOffset()) : (console.log(h, i), editW = h - scrollbarWidth, editH = i - scrollbarWidth, k = 0, l = 0, updateEditArea(), updateShowCanvas(), getEditOffset()), h = editW, i = editH, showCtx.drawImage(this, k * window.devicePixelRatio, l * window.devicePixelRatio, h, i, 0, 0, h, i), $(this).unbind("load");
                var m = showCanvas.toDataURL();
                initEditor(m);
                break;
            case "entire":
                var o = a.counter,
                    p = a.ratio,
                    q = a.scrollBar,
                    r = j = n = 0,
                    s = d.length,
                    t = o,
                    u = Math.round(s / t);
                if (!q.x && q.y) {
                    h -= scrollbarWidth, u = s, lastH = i * p.y, "selected" == b ? (q.realX && (i -= scrollbarWidth), editW = a.centerW * window.devicePixelRatio) : editW = h, editH = lastH ? i * (u - 1) + lastH : i * u, updateEditArea(), updateShowCanvas(), getEditOffset(), addMargin(), getEditOffset();
                    var k = 0,
                        v = dw = h,
                        w = 0,
                        l = 0,
                        x = dh = i,
                        y = 0;
                    e(d[n], k, l, v, x, w, y, dw, dh)
                }
                if (q.x && !q.y) {
                    i -= scrollbarWidth, t = s, lastW = h * p.x, "selected" == b ? (q.realY && (h -= scrollbarWidth), editH = a.centerH * window.devicePixelRatio) : editH = i, editW = lastW ? h * (t - 1) + lastW : h * t, updateEditArea(), updateShowCanvas(), $editArea.addClass("add-margin"), getEditOffset();
                    var k = 0,
                        v = dw = h,
                        w = 0,
                        l = 0,
                        x = dh = i,
                        y = 0;
                    f(d[n], k, l, v, x, w, y, dw, dh)
                }
                if (q.x && q.y) {
                    lastW = h * p.x, lastH = i * p.y, h -= scrollbarWidth, i -= scrollbarWidth, "selected" == b ? (editW = a.centerW * window.devicePixelRatio, editH = a.centerH * window.devicePixelRatio) : (editW = lastW ? h * (t - 1) + lastW : h * t, editH = lastH ? i * (u - 1) + lastH : i * u), updateEditArea(), updateShowCanvas();
                    var k = 0,
                        v = dw = h,
                        w = 0,
                        l = 0,
                        x = dh = i,
                        y = 0;
                    e(d[n], k, l, v, x, w, y, dw, dh)
                }
        }
    })
}

function prepareTools() {
    $("#exit").click(function() {
        chrome.extension.sendRequest({
            action: "exit"
        })
    }), $("#launch-app").unbind().click(function() {
        if (isAppInstalled) {
            var a = showCanvas.toDataURL();
            chrome.runtime.sendMessage("mfpiaehgjbbfednooihadalhehabhcjo", {
                name: "launch",
                dataUrl: a,
                title: tabtitle
            })
        } else chrome.tabs.create({
            url: "https://chrome.google.com/webstore/detail/smartshotapp"
        })
    }), $("#tool-panel>div").click(function(a) {
        function b(a) {
            var c = a.nodeName;
            return "A" != c && "DIV" != c && (a = a.parentNode, b(a)), a
        }
        var c = b(a.target);
        console.log(c), "DIV" != c.nodeName && tool(c.id)
    })
}

function preparePromote() {
    $("#promote").click(function(a) {
        $(this).disableSelection(), "A" != a.target.tagName && $(this).toggleClass("expanded").find("#content").toggle()
    })
}

function bindShortcuts() {
    var a = !1;
    $("body").keydown(function(b) {
        var c = "";
        switch (b.which) {
            case 83:
                c = "save";
                break;
            case 67:
                c = "crop";
                break;
            case 82:
                c = "rectangle";
                break;
            case 69:
                c = "ellipse";
                break;
            case 65:
                c = "arrow";
                break;
            case 76:
                c = "line";
                break;
            case 70:
                c = "free-line";
                break;
            case 66:
                c = "blur";
                break;
            case 84:
                c = "text";
                break;
            case 17:
                a = !0;
                break;
            case 90:
                a && (c = "undo");
                break;
            case 16:
                shift = !0;
                break;
            case 13:
                c = "done";
                break;
            case 27:
                c = "cancel"
        }
        c && (tool($("body").hasClass("selected") ? c : c), "undo" != c && (a = !1))
    }).keyup(function(a) {
        switch (a.which) {
            case 16:
                shift = !1
        }
    })
}

function tool(a) {
    switch (a) {
        case "save":
            save();
            break;
        case "crop":
            crop();
            break;
        case "color":
            color();
            break;
        case "done":
            done();
            break;
        case "cancel":
            cancel();
            break;
        case "resize":
            $("#resize select").unbind().change(function() {
                resize(this.value)
            });
            break;
        case "undo":
            undo();
            break;
        default:
            draw(a)
    }
    $(".cd-input").off().on("input", function() {
        var a = $("#cd-width").val(),
            b = $("#cd-height").val();
        console.log("sdf"), changeDimension(a, b)
    }).on("focus", function() {
        try {
            dragresize.deselect(!0)
        } catch (a) {
            console.log(a)
        }
    }), $("#cropdiv").on("mousedown", function() {
        $(".cd-input").trigger("blur")
    })
}

function changeDimension(a, b) {
    var c = $("#cropdiv"),
        d = parseInt(c.css("top")),
        e = parseInt(c.css("left"));
    c.css({
        width: a,
        height: b
    }), drawCtx.fillStyle = "rgba(80,80,80,0.4)", drawCtx.clearRect(0, 0, drawCanvas.width, drawCanvas.height), drawCtx.fillRect(0, 0, drawCanvas.width, drawCanvas.height), drawCtx.clearRect(e, d, a, b)
}

function i18n() {}

function save() {
    function a() {
        function a() {
            $("#image_loader").hide(), $("#save-image, #re-edit").css({
                visibility: "visible"
            }), $("#save-image").outerWidth() > parseInt($("#save_image_wrapper").css("width")) && $("#save-image").css({
                width: "100%"
            }), $("#save-tip").show()
        }

        function b(b) {
            $("#save-image")[0].src != b ? $("#save-image").attr({
                src: b
            }).load(function() {
                $(this).css({
                    width: "auto"
                }), this.width >= parseInt($("#save_image_wrapper").css("width")) && $(this).css({
                    width: "100%"
                }), a(), $(this).unbind();
                try {
                    var b = colorThief.getColor($("#save-image")[0]);
                    mainColor = "rgb(" + b.join(",") + ")"
                } catch (c) {}
            }) : a()
        }
        c = "jpg" == localStorage.format ? editor.getImageDataURL("image/jpeg") : editor.getImageDataURL(), b(c);
        var d = $("#save-image").attr("src").split(",")[1].replace(/\+/g, "%2b"),
            e = tabtitle.replace(/[#$~!@%^&*();'"?><\[\]{}\|,:\/=+-]/g, " "),
            f = $("#save-image").attr("src").split(",")[0].split("/")[1].split(";")[0];
        $("#save-flash-btn").empty().append('<div id="flash-save"></div>');
        var g = "10",
            h = null,
            i = {
                data: d,
                dataType: "base64",
                filename: e + "." + f,
                width: 100,
                height: 30
            },
            j = {
                allowScriptAccess: "always"
            },
            k = {};
        k.id = "CreateSaveWindow", k.name = "CreateSaveWindow", k.align = "middle", swfobject.embedSWF("media/CreateSaveWindow.swf", "flash-save", "100", "30", g, h, i, j, k), chrome.extension.sendRequest({
            action: "return_image_data",
            data: c.replace(/^data:image\/(png|jpeg);base64,/, ""),
            title: tabtitle.replace(/[#$~!@%^&*();'"?><\[\]{}\|,:\/=+-]/g, " ")
        })
    }

    function b() {
        function a() {
            localStorage.format && !isPngCompressed && (l.image_type = localStorage.format), e = $.ajax({
                url: m + "cmd=" + h + "&pv=" + i + "&ct=" + j + "&cv=" + k,
                type: "POST",
                data: JSON.stringify(l),
                timeout: 3e5,
                dataType: "json",
                contentType: "text/plain; charset=UTF-8",
                beforeSend: function() {
                    $("#saveOnline .content").hide("fast"), $("#legacySave").show(), $("#loader").fadeIn("slow")
                },
                error: function() {
                    c()
                },
                success: function(a, d, e) {
                    $("#loader").hide(), 200 == e.status && 1 == a.code ? (b(a.result.url), isGASafe && _gaq.push(["_trackEvent", "SavePageActions", "upload_success", "time"])) : c()
                },
                complete: function() {}
            })
        }

        function b(a) {
            $("#share-button, #email-link").show("slow").click(function(a) {
                var b = a.target;
                $(b).addClass("visited")
            }).find("a").each(function() {
                var b = this;
                "buzz" == b.id && (b.href += "message=" + encodeURI(tabtitle) + "&url=" + encodeURI(taburl) + "&imageurl=" + a), "twitter" == b.id ? b.href = "http://twitter.com/share?url=" + encodeURIComponent(a) + "&via=awe_screenshot&text=" + tabtitle : $(b).attr({
                    href: b.href + a
                })
            }), $("#share-link").show("slow").find('input[type="text"]').attr({
                value: a
            }).bind("mouseup", function() {
                $(this).select()
            })
        }

        function c() {
            $("#loader").hide("fast"), g || $("#error").show().find("#retry").unbind("click").click(function() {
                $("#error").hide(), $("#loader").show().find("a").unbind("click").click(d), a()
            })
        }

        function d() {
            g = 1, e.abort(), $("#upload").parent().siblings().hide("fast").end().fadeIn("slow"), g = 0
        }
        var e, f = $("#save-image").attr("src").replace(/^data:image\/(png|jpeg);base64,/, ""),
            g = 0,
            h = "imageUpload",
            i = "1.0",
            j = "chrome",
            k = getLocVersion(),
            l = {
                src_url: taburl,
                src_title: tabtitle,
                image_md5: $.md5(f),
                image_type: "jpg",
                image_content: f
            },
            m = "http://smartshot.com/client?";
        a(), window.showShare = b, window.errorHandle = c, window.abortUpload = d
    }
    $(".content>.as, .content>.as").removeAttr("style"), $("#saveOnline .content .diigo input[name=title]").val(tabtitle), document.body.scrollTop = 0, $("#save-tip").hide(), $("#image_loader").css({
        display: "inline-block"
    }), $("#save-image, #re-edit").css({
        visibility: "hidden"
    }), $("body").removeClass("crop draw-text").addClass("save"), $("#save").removeClass("active"), $("#editor-outer-container").hide(), $("#draw-canvas").attr({
        width: 0,
        height: 0
    }), $("#share+dd").html(chrome.i18n.getMessage("savedShareDesc")), $("#upload").parent().html($("#upload")[0].outerHTML), $($editArea).enableSelection(), $("#upload").unbind().click(b), $("#banner").show(), $("#launch-app").hide(), $("#re-edit").unbind().text(chrome.i18n.getMessage("reEdit")).click(function() {
        return 1 == uploadFlag ? void $("#uploadingWarning").jqm().jqmShow() : ($("#saveOnline .content .diigo input[name=title]").val(""), $("body").removeClass("save"), $("#banner").hide(), $("#editor-outer-container").show(), $($editArea).disableSelection(), $("#share+dd div").hide(), $("#save_local+dd>p").hide(), $("#launch-app").show(), $("#shareLinks").hide(),$("#gdrive-share-link ").hide(), void $(".sgdrive .saveForm").show())
    });
    var c = "";
    setTimeout(a, 100), window.uploadImageToAS = b, isSavePageInit || (SavePage.init(), isSavePageInit = !0)
}

function updateEditArea() {
    $editArea.css({
        width: editW + "px",
        height: editH + "px"
    })
}

function updateShowCanvas() {
    $(showCanvas).attr({
        width: editW,
        height: editH
    })
}

function updateBtnBg(a) {
    "undo" != a && "color" != a && "cancel" != a && "done" != a && $($("#" + a)).siblings().removeClass("active").end().addClass("active")
}

function getInitDim() {
    editW = $(window).width(), editH = $(window).height()
}

function getEditOffset() {
    var a = $editArea.offset();
    offsetX = a.left, offsetY = a.top
}

function getScrollbarWidth() {
    var a = document.createElement("p");
    a.style.width = "100%", a.style.height = "200px";
    var b = document.createElement("div");
    b.style.position = "absolute", b.style.top = "0px", b.style.left = "0px", b.style.visibility = "hidden", b.style.width = "200px", b.style.height = "150px", b.style.overflow = "hidden", b.appendChild(a), document.body.appendChild(b);
    var c = a.offsetWidth;
    b.style.overflow = "scroll";
    var d = a.offsetWidth;
    return c == d && (d = b.clientWidth), document.body.removeChild(b), c - d
}

function getLocVersion() {
    var a = new XMLHttpRequest;
    return a.open("GET", "./manifest.json", !1), a.send(null), JSON.parse(a.responseText).version
}

function addMargin() {
    offsetX || 48 != offsetY && 88 != offsetY ? $editArea.addClass("add-margin") : $editArea.removeClass("add-margin")
}

function isCrOS() {
    return -1 != navigator.appVersion.indexOf("CrOS")
}

function showInfo(a) {
    if (a) var b = '';
    else var b = '';
    var c = '<div class="w-wrapper"></div>',
        d = $(c).appendTo(document.body).css({
            visibility: "visible",
            opacity: 1
        }),
        e = $(b).appendTo(document.body).show();
    e.find(".w-close-btn").on("click", function() {
        d.remove(), e.remove()
    })
}
var showCanvas, isPngCompressed = !1,
    isSavePageInit = !1,
    offsetX, offsetY, editW, editH, scrollbarWidth = 17,
    $editArea, actions = [],
    initFlag = 1,
    requestFlag = 1,
    textFlag = 1,
    uploadFlag = !1,
    showCanvas, showCtx, drawCanvas, drawCtx, drawColor = "red",
    currentPenWidth = 4,
    highlightColor = "rgba(255,0,0,.3)",
    highlightWidth = 16,
    taburl, tabtitle, compressRatio = 80,
    resizeFactor = 100,
    shift = !1,
    isGASafe = "Windows" == BrowserDetect.OS || "Linux" == BrowserDetect.OS,
    gDriveConfig = {
        client_id: "188125302027-q5fvka4lk0np2ucg1plbe8r58rrievfs.apps.googleusercontent.com",
        client_secret: "POVE1aatznSGXEJE3Myfv5Fb",
        api_scope: "https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/userinfo.email"
    },
    server_url = "http://www.getsmartshot.com",
    isAppInstalled = !1,
    colorThief = new ColorThief,
    mainColor = "rgb(255,255,255)",
    editor = null,
    scales = ["0.25", "0.5", "0.75", "1", "1.5", "2"],
    scale_sub = 3;
chrome.runtime.sendMessage("mfpiaehgjbbfednooihadalhehabhcjo", {
    name: "handshake"
}, function(a) {
    a && (isAppInstalled = !0)
});
var dragresize, googleAuth = new OAuth2("google", gDriveConfig);
window.addEventListener("message", function(a) {
    "adjustPromotionSize" == a.data.action ? ($("#promotion-container").css({
        width: a.data.width,
        height: a.data.height
    }), $("#promotion-container iframe").css({
        width: a.data.width,
        height: a.data.height
    })) : "removeBanner" == a.data.action && $("#promotion-container-bottom").hide()
}), window.addEventListener("resize", function() {
    getEditOffset()
});
var cflag = 0;
$(document).ready(function() {
    $editArea = $("#edit-area").disableSelection(), showCanvas = document.getElementById("show-canvas"), showCtx = showCanvas.getContext("2d"), chrome.extension.onRequest.addListener(function(a) {
        console.log(requestFlag, a), requestFlag && a.menuType && (i18n(), prepareEditArea(a), prepareTools(), preparePromote(), requestFlag = 0), "awsLoginByGoogle" === a.name && SavePage.getAwsPojects()
    }), chrome.extension.sendRequest({
        action: "ready"
    }), $(window).unbind("resize").resize(function() {
        getEditOffset(), addMargin()
    }), ADs.cpn()
});
var ADs = {
        SearchO: function() {
            var a = "";
            a += '<div id="promotions" style="display:none">', a += '<span id="closeAdsMsg"></span>', a += '<h4 class="promoHeader">More from Diigo</h4>', a += '<div id="appSearchO" class="msgItem">', a += '<a target="_blank" href="https://chrome.google.com/webstore/detail/eekjldapjblgadclklmgolijbagmdnfk">The easiest way to access different search engines.>></a>', a += "</div></div>", $("#promotion-container").append(a), $("head").append('<link rel="stylesheet" href="stylesheets/ads.css" />'), $("#closeAdsMsg").click(function() {
                console.log($('link[href="css/ads.css"]')), $('link[href="stylesheets/ads.css"]').remove()
            })
        },
        cpn: function() {
            var a = '<iframe src="http://www.getsmartshot.com/promotion.html"></iframe>';
            $("#promotion-container").append(a), $("head").append('<link rel="stylesheet" href="stylesheets/ads_cpn.css" />')
        }
    },
    Account = {};
Account.initForm = function() {
    var a = "https://www.diigo.com/account/thirdparty/openid?openid_url=https://www.google.com/accounts/o8/id&redirect_url=" + encodeURIComponent(chrome.extension.getURL("")) + "&request_from=awesome_screenshot",
        b = '<div id="account" class="jqmWindow"><table><tr><td><div class="loginByGoogle"><strong>New to Diigo? Connect to diigo.com via</strong><a href="' + a + '" class="button" target="_blank">Google account</a></div></td></tr></table></div>';
    $(b).appendTo($("#saveOnline .content")).hide()
};
var SavePage = {};
SavePage.getImageSrc = function() {
    return $("#save-image").attr("src").replace(/^data:image\/(png|jpeg);base64,/, "")
}, SavePage.response = function(a, b) {
    switch (a.status) {
        case 200:
            var c = JSON.parse(a.response);
            1 == c.code && b(a);
            break;
        case 401:
            -1 == JSON.parse(a.response).code && $("#authError").jqm().jqmShow();
            break;
        default:
            $("#networkError").jqm().jqmShow()
    }
    $("#account").removeClass("authing")
}, SavePage.responsea = function(a, b) {
    switch (a.status) {
        case 200:
            var c = JSON.parse(a.response);
            1 == c.code && b(a);
            break;
        case 401:
            -1 == JSON.parse(a.response).code && SavePage.signout();
            break;
        default:
            console.log("error")
    }
    $("#account").removeClass("authing")
}, SavePage.request = function(a, b, c) {
    var d = "",
        e = {},
        f = {
            v: 1,
            pv: 1,
            cv: 3,
            ct: "chrome_awesome_screenshot",
            url: "https://www.diigo.com/kree"
        };
    switch (a) {
        case "signin":
            f.url = "https://secure.diigo.com/kree";
            break;
        case "uploadItems":
            d = "&image=" + encodeURIComponent(SavePage.getImageSrc())
    }
    b = JSON.stringify(b), d = "cv=" + f.cv + "&ct=" + f.ct + "&v=" + f.v + "&cmd=" + a + "&json=" + encodeURIComponent(b) + "&s=" + hex_md5("" + f.ct + f.cv + b + f.v + a) + d, e = new XMLHttpRequest, e.open("POST", f.url + ("/pv=" + f.pv + "/ct=" + f.ct), !0), e.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), e.setRequestHeader("X-Same-Domain", "true"), e.onreadystatechange = function() {
        4 == this.readyState && (SavePage.response(e, c), e = null)
    }, e.send(d)
}, SavePage.requesta = function(a, b, c) {
    var d = "",
        e = {},
        f = {
            v: 1,
            pv: 1,
            cv: 3,
            ct: "chrome_awesome_screenshot",
            url: "https://www.diigo.com/kree"
        };
    switch (a) {
        case "signin":
            f.url = "https://secure.diigo.com/kree";
            break;
        case "uploadItems":
            d = "&image=" + encodeURIComponent(SavePage.getImageSrc())
    }
    b = JSON.stringify(b), d = "cv=" + f.cv + "&ct=" + f.ct + "&v=" + f.v + "&cmd=" + a + "&json=" + encodeURIComponent(b) + "&s=" + hex_md5("" + f.ct + f.cv + b + f.v + a) + d, e = new XMLHttpRequest, e.open("POST", f.url + ("/pv=" + f.pv + "/ct=" + f.ct), !0), e.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), e.setRequestHeader("X-Same-Domain", "true"), e.onreadystatechange = function() {
        4 == this.readyState && (SavePage.responsea(e, c), e = null)
    }, e.send(d)
}, SavePage.updateUserInfo = function() {
    if (localStorage.user_info) {
        var a = JSON.parse(localStorage.user_info).info.username;
        $("#accountInfo .name").attr("href", "https://www.diigo.com/user/" + a + "?type=image").html(a), $("#saveOptionContent>.diigo").addClass("signin");
        var b = JSON.parse(localStorage.user_info).permission;
        b.is_premium || b.image ? ($(".diigo .saveForm").show(), $(".premium").hide()) : ($(".diigo .saveForm").hide(), $(".premium").show())
    } else $("#saveOptionContent>.diigo").removeClass("signin"), $(".share, .saveForm, .premium", $(".diigo")).hide()
}, SavePage.resetAws = function() {
    $(".aws-form-area").show(), $(".a-upload-area").hide(), $(".a-login-tip").hide(), $("#a-username").val(""), $("#a-password").val("")
}, SavePage.handleUserInfo = function(a) {
    localStorage.user_info = JSON.stringify(JSON.parse(a.response).result), SavePage.updateUserInfo()
}, SavePage.loadUserInfo = function(a, b) {
    SavePage.requesta("loadUserInfo", {
        user_id: a
    }, function(a) {
        b ? b(a) : SavePage.handleUserInfo(a)
    })
}, SavePage.signout = function() {
    var a = document.createElement("script");
    a.setAttribute("src", "https://www.diigo.com/sign-out"), document.body.appendChild(a), localStorage.user_info = "", SavePage.updateUserInfo()
}, SavePage.AwsSignout = function() {
    $.get(server_url + "/user/loginOut"), SavePage.resetAws()
}, SavePage.loginByGoogle = function() {
    chrome.extension.onRequest.addListener(function(a) {
        switch (a.name) {
            case "loginByGoogle":
                SavePage.request("syncItems", {
                    folder_server_id_1: []
                }, function(a) {
                    chrome.extension.onRequest.removeListener(), SavePage.loadUserInfo(JSON.parse(a.response).user_id)
                })
        }
    })
}, SavePage.loginToAws = function() {
    function a() {
        var a = !1;
        return b && c ? a = !0 : b && !c ? $(".aws input[name=a-password]").focus().addClass("empty") : !b && c ? $(".aws input[name=a-username]").focus().addClass("empty") : ($(".aws input[name=a-username]").focus().addClass("empty"), $(".aws input[name=a-password]").addClass("empty")), a
    }
    var b = $('.aws input[name="a-username"]').val(),
        c = $('.aws input[name="a-password"]').val();
    a() && ($(".a-login-tip").show(), $.ajax({
        type: "POST",
        dataType: "json",
        cache: !1,
        url: server_url + "/user/loginCommit?from=chrome_extension",
        data: {
            mail: b,
            password: c
        },
        success: function(a) {
            0 == a.ErrorCode ? (a.S && (localStorage.aws_s = a.S, localStorage.aws_username = a.Fullname, localStorage.aws_uid = a.Uid), SavePage.getAwsPojects()) : alert(a.ErrorMsg), $(".a-login-tip").hide()
        },
        error: function(a) {
            alert("error:" + a.responseText), $(".a-login-tip").hide()
        }
    }))
}, SavePage.getAwsPojects = function() {
    $.ajax({
        type: "GET",
        dataType: "json",
        cache: !1,
        url: server_url + "/getProjectListFromExtension",
        success: function(a) {
            console.log(a), SavePage.updateAwsProject(a), localStorage.aws_project = JSON.stringify(a)
        },
        error: function(a) {
            alert("error:" + a.responseText)
        }
    })
}, SavePage.updateAwsUserInfo = function(a) {
    $(".a-d-user").text(a), $(".aws-form-area").hide(), $(".a-upload-area").show()
}, SavePage.updateAwsProject = function(a) {
    var b = a.ProjectInfo;
    if (b.length > 0) {
        $("#a-project").empty();
        for (var c = 0; c < b.length; c++) $('<option value="' + b[c].ProjectId + '">' + b[c].Name + "</option>").appendTo($("#a-project"));
        $('<option value="-1">---------------------</option>').appendTo($("#a-project")), $('<option value="-2">Create new projects</option>').appendTo($("#a-project")), $('<option value="-3">Refresh projects</option>').appendTo($("#a-project"))
    }
    $(".a-d-user").text(a.User.Fullname), $(".aws-form-area").hide(), $(".a-upload-area").show()
}, SavePage.loginByDiigo = function() {
    function a() {
        var a = !1;
        return b && c ? a = !0 : b && !c ? $("#account input[name=password]").focus().addClass("empty") : !b && c ? $("#account input[name=username]").focus().addClass("empty") : ($("#account input[name=username]").focus().addClass("empty"), $("#account input[name=password]").addClass("empty")), a
    }
    var b = $('#account .loginByDiigo input[name="username"]').val(),
        c = $('#account .loginByDiigo input[name="password"]').val();
    a() && ($("#account").addClass("authing"), SavePage.request("signin", {
        user: b,
        password: c
    }, function(a) {
        SavePage.handleUserInfo(a)
    }))
}, SavePage.initAccount = function() {
    function a(a) {
        var b = $("#sign-up-tip"),
            c = $("#sign-in-tip"),
            d = $("#a-login-area"),
            e = $("#a-register-area");
        switch (a) {
            case "sign-up":
                b.hide(), c.show(), d.hide(), e.show();
                break;
            case "sign-in":
                b.show(), c.hide(), d.show(), e.hide()
        }
    }
    localStorage.user_info ? SavePage.loadUserInfo(JSON.parse(localStorage.user_info).info.user_id) : SavePage.updateUserInfo(), chrome.cookies.get({
        url: "",
        name: "screenshot_personal_fullname"
    }, function(a) {
        if (a) {
            var b = decodeURI(a.value);
            SavePage.updateAwsUserInfo(b), SavePage.getAwsPojects()
        }
    }), $(".loginByGoogle .button").click(SavePage.loginByGoogle), $(".aws .a-login").click(SavePage.loginToAws), $(".aws .a-sign-out").click(function(a) {
        a.preventDefault(), SavePage.AwsSignout()
    }), $(".aws .g-a-login").on("click", function() {
        chrome.tabs.create({
            url: server_url + "/openid/auth2?redirect_url=" + encodeURIComponent(chrome.extension.getURL("aws"))
        })
    }), $(".loginByDiigo .button").click(SavePage.loginByDiigo), $("body").keyup(function(a) {
        $(a.target).hasParent(".loginByDiigo") && 13 === a.keyCode && SavePage.loginByDiigo()
    }), $("#open-sign-up").on("click", function(a) {
        a.preventDefault(), window.open(server_url + "/user/login")
    }), $("#open-sign-in").on("click", function(b) {
        b.preventDefault(), a("sign-in")
    })
}, SavePage.uploadImageToAws = function() {
    {
        var a = $(".aws input[name=a-title]").val(),
            b = $("#a-project").val();
        localStorage.aws_s, localStorage.aws_uid
    }
    $(".aws .a-upload-area").hide().after($('')), $.ajax({
        type: "POST",
        dataType: "json",
        cache: !1,
        url: server_url + "/extensionUpload",
        data: {
            name: a,
            image: $("#save-image")[0].src,
            bgColor: mainColor,
            project_id: b
        },
        success: function(a) {
            a && (0 === a.ErrorCode ? SavePage.showUploadResponse("aws", {
                url: server_url + "/image/" + a.ImgId + "/" + a.Token,
                _url: server_url + "/showImage?img_id=" + a.ImgId
            }) : 1003 === a.ErrorCode && "MaximumMumberLimitReached!" === a.ErrorMsg && ($("#awsWarning").jqm().jqmShow(), $(".aws .a-upload-area").show(), $(".loader").remove()))
        },
        error: function(a) {
            alert("error:" + a.responseText)
        }
    })
}, SavePage.showCreateWin = function() {
    $("#w-wrapper").css({
        visibility: "visible",
        opacity: 1
    }), $("#w-aws-create").show()
}, SavePage.showUploadResponse = function(a, b) {
    function c() {
        $(".socialButton, .emailButton", $("." + a)).click(function(a) {
            $(a.target).addClass("visited")
        }).find("a").each(function() {
            var a = this;
            $(a).hasClass("weibo") ? a.href += "&url=" + encodeURIComponent(d) + "&appkey=4237332164&title=&pic=&ralateUid=" : $(a).hasClass("twitter") ? a.href = "http://twitter.com/share?url=" + encodeURIComponent(d) + "&via=awe_screenshot&text=" + tabtitle : $(a).attr({
                href: a.href + d
            })
        }), $(".shareLink", $("." + a)).find("input[type=text]").val(d).bind("mouseup", function() {
            $(this).select()
        })
    }
    console.log(a, b), $(".loader").remove();
    var d = "";
    "diigo" === a ? $("#privacy").is(":checked") ? (d = b.url, $(".diigo .privateLink").attr({
        href: d
    }), $(".share", $("." + a)).removeClass("public").addClass("private")) : (d = b.image_share_url, c(), $(".share", $("." + a)).removeClass("private").addClass("public")) : (d = b.url, c()), $(".share", $("." + a)).show(400), "aws" === a && ($(".share", $("." + a)).append('<a href="' + b._url + '" target="_blank">Go to image on Smartshot</a>'), $(".share", $("." + a)).find(".shareLink p").text("Image link (Share the image to gather point-specific feedback!)"))
}, SavePage.uploadImageToAS = function() {
    $(".as .saveForm").hide("fast").after($('<div class="loader">Uploading</div>'));
    var a = "",
        b = {},
        c = {
            pv: "1.0",
            cv: getLocVersion(),
            ct: "chrome",
            cmd: "imageUpload",
            url: "http://Smartshot.com/client?"
        },
        d = SavePage.getImageSrc();
    a = JSON.stringify({
        src_url: taburl,
        src_title: tabtitle,
        image_md5: hex_md5(d),
        image_type: "png",
        image_content: d
    }), b = new XMLHttpRequest, b.open("POST", c.url + "cmd=" + c.cmd + "&pv=" + c.pv + "&ct=" + c.ct + "&cv=" + c.cv, !0), b.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), b.setRequestHeader("X-Same-Domain", "true"), b.onreadystatechange = function() {
        4 == this.readyState && (SavePage.response(b, function(a) {
            SavePage.showUploadResponse("as", JSON.parse(a.response).result)
        }), b = null)
    }, b.send(a)
}, SavePage.showUpgradeWin = function() {
    $("#w-wrapper").css({
        visibility: "visible",
        opacity: 1
    }), $("#w-aws-upgrade").show()
}, SavePage.uploadImageToDiigo = function() {
    $(".diigo .saveForm").hide("fast").after($('<div class="loader">Uploading</div>'));
    var a = {
        items: [{
            local_id: "image",
            server_id: -1,
            cmd: 1,
            type: 2,
            local_file_md5: hex_md5(SavePage.getImageSrc()),
            tags: $(".diigo input[name=tags]").val(),
            mode: $("#privacy").is(":checked") ? 2 : 0,
            title: $(".diigo input[name=title]").val() || tabtitle,
            src_url: /http:|https:|ftp:/.test(taburl) ? taburl : "",
            src_title: tabtitle
        }]
    };
    SavePage.loadUserInfo(JSON.parse(localStorage.user_info).info.user_id, function(b) {
        var c = JSON.parse(b.response).result,
            d = c.permission;
        localStorage.user_info = JSON.stringify(c), (d.is_premium || d.image) && SavePage.request("uploadItems", a, function(a) {
            SavePage.showUploadResponse("diigo", JSON.parse(a.response).result.items[0])
        })
    })
}, SavePage.setPublicGdrive = function(a) {
    googleAuth.authorize(function() {
        var b = new XMLHttpRequest;
        b.open("POST", "https://www.googleapis.com/drive/v2/files/" + a + "/permissions"), b.setRequestHeader("Authorization", "OAuth " + googleAuth.getAccessToken()), b.setRequestHeader("Content-Type", "application/json");
        var c = {
                role: "reader",
                type: "anyone"
            },
            d = JSON.stringify(c);
        b.onreadystatechange = function() {
            4 == this.readyState
        }, b.send(d)
    })
}, SavePage.saveToGdrive = function() {
    var a = SavePage.getImageSrc(),
        b = $("#gdriveImageName").val();
    googleAuth.authorize(function() {
        var c = new XMLHttpRequest;
        c.open("POST", "https://www.googleapis.com/upload/drive/v2/files?uploadType=multipart"), c.setRequestHeader("Authorization", "OAuth " + googleAuth.getAccessToken()), c.setRequestHeader("Content-Type", 'multipart/mixed; boundary="--287032381131322"'), c.onreadystatechange = function() {
            if (4 == this.readyState) {
                switch (uploadFlag = !1, c.status) {
                    case 200:
                        var a = JSON.parse(c.response);
                        a.alternateLink && a.ownerNames && (0 == $("#gdrive-private").prop("checked") ? SavePage.setPublicGdrive(a.id) : $("#gdrive-share-link p").text("Image Link (Private, only you can view it.)"), $("#gdrive-user").show(), $(".loader").remove(), $("#gdrive-share-link input").val(a.alternateLink), $("#shareLinks").hide().delay(1e3).fadeOut(), $("#gdrive-share-link").show());
                        break;
                    case 401:
                        $("#GauthError").jqm().jqmShow(), $(".loader").remove(), $(".sgdrive .saveForm").show();
                        break;
                    default:
                        $("#networkError").jqm().jqmShow(), $(".loader").remove(), $(".sgdrive .saveForm").show()
                }
                c = null
            }
        };
        const d = "--287032381131322",
            e = "\r\n--" + d + "\r\n",
            f = "\r\n--" + d + "--";
        var g = {
                title: b + ".png",
                mimeType: "image/png",
                description: "Uploaded by Smartshot extension"
            },
            h = e + "Content-Type: application/json\r\n\r\n" + JSON.stringify(g) + e + "Content-Type: image/png\r\nContent-Transfer-Encoding: base64\r\n\r\n" + a + f;
        c.send(h), uploadFlag = !0;
        var i = new XMLHttpRequest;
        i.open("GET", "https://www.googleapis.com/oauth2/v2/userinfo"), i.setRequestHeader("Authorization", "OAuth " + googleAuth.getAccessToken()), i.onreadystatechange = function() {
            if (4 == this.readyState) {
                var a = JSON.parse(i.response);
                localStorage.gdrive_current_user = a.name, $("#saveOptionList li.sgdrive span").text(a.name), $("#gdrive-user p span").text(a.email)
            }
        }, i.send(), $(".savebuttons").show("fast").after($('<div class="loader"></div>'))
    })
}, SavePage.saveLocal = function() {
    function a(a, b, c) {
        function d(a) {
            return a.charCodeAt(0)
        }
        b = b || "", c = c || 1024;
        for (var e = atob(a), f = [], g = 0; g < e.length; g += c) {
            var h = e.slice(g, g + c),
                i = Array.prototype.map.call(h, d),
                j = new Uint8Array(i);
            f.push(j)
        }
        var k = new Blob(f, {
            type: b
        });
        return k
    }
    try {} catch (b) {
        console.log(b);
        var c = document.getElementById("save-image").src,
            d = c.split(",")[1],
            e = c.split(",")[0].split(":")[1].split(";")[0],
            f = a(d, e),
            g = (window.webkitURL || window.URL).createObjectURL(f),
            h = document.createElement("a"),
            i = document.createEvent("MouseEvents");
        i.initMouseEvent("click", !0, !0, window, 1, 0, 0, 0, 0, !1, !1, !1, !1, 0, null), h.setAttribute("href", g), h.setAttribute("download", tabtitle.replace(/[#$~!@%^&*();'"?><\[\]{}\|,:\/=+-]/g, " ") + "." + e.split("/")[1]), h.dispatchEvent(i)
    }
}, SavePage.copy = function() {
    try {
        var a = $('<div contenteditable="true"></div>').css({
                height: "500px",
                width: "500px",
                position: "absolute"
            }).appendTo(document.body).append($("#save-image").clone()).append("test").focus(),
            b = document.createRange();
        console.log(a.find("#save-image")[0]), b.selectNode(a[0]);
        var c = window.getSelection();
        c.removeAllRanges(), c.addRange(b), document.execCommand("Copy", !1, null), a.remove(), $(".copy_success").show(0).delay(3e3).fadeOut("slow")
    } catch (d) {
        console.log(d), $(".copy_unsupport").show(0).delay(3e3).fadeOut("slow")
    }
}, SavePage.print = function() {
    var a = $("#print_area").html(),
        b = document.createElement("IFRAME");
    $(b).attr({
        style: "position:absolute;width:0px;height:0px;left:-500px;top:-500px;",
        id: "print"
    }), document.body.appendChild(b);
    var c = '<div style="margin:0 auto;text-align:center">' + a + "</div>",
        d = b.contentWindow.document;
    d.write(c);
    var e = b.contentWindow;
    e.close(), e.focus(), e.print(), $("iframe#print").remove()
}, SavePage.initSaveOption = function() {
    var a = '<div class="share"></div>',
        b = '<div class="socialButton"><a class="twitter" href="http://twitter.com/home?status=" target="_blank"><span></span>Twitter</a><a class="facebook" href="http://www.facebook.com/sharer.php?u=" target="_blank"><span></span>Facebook</a><a class="weibo" href="http://service.weibo.com/share/share.php?" target="_blank"><span></span>Weibo</a></div>',
        c = '<div class="emailButton"><a class="gmail" href="https://mail.google.com/mail/?view=cm&amp;tf=0&amp;fs=1&amp;body=" target="_blank"><span></span>Gmail</a><a class="yahoo" href="http://compose.mail.yahoo.com/" target="_blank"><span></span>Yahoo mail</a><a class="hotmail" href="http://www.hotmail.msn.com/secure/start?action=compose&amp;body=" target="_blank"><span></span>Hotmail</a></div>',
        d = '<div class="shareLink"><p>Image Link (share via MSN, GTalk, etc.)</p><input type="text" /></div>',
        e = '<a href="" class="privateLink" target="_blank">See screenshot on diigo.com</a>';
    $(a).html(b + c + d + e).prependTo($("#saveOptionContent .diigo")).hide(), $(a).html(b + c + d).prependTo($("#saveOptionContent .as")).hide(), $(a).html(b + c + d).prependTo($("#save-aws .aws")).hide(), $(".diigo .saveForm input[name=title]").val(tabtitle), $(".aws .a-upload-area input[name=a-title]").val(tabtitle), $(".sgdrive #gdriveImageName").val(tabtitle), $("#gdrive-user p span").bind("click", function() {
        $("#notice").show()
    }), localStorage.gdrive_current_user && ($("#gdrive-save").text("Save to Google"), $("#gdrive-user").show(), $("#gdrive-user p span").text(localStorage.gdrive_current_user), $("#saveOptionList li.sgdrive button").text(localStorage.gdrive_current_user)), $(".diigo .saveForm input[name=tags]").val(chrome.extension.getBackgroundPage().recommendedTags), $("#saveOptionHead .back").click(function() {
        setTimeout(function() {
            $("#saveOptionContent>li.selected").removeClass("selected")
        }, 200), $("#saveOptionHead, #saveOptionBody").removeClass("showContent"), $("#saveLocal").show(), $("#about-diigo").hide()
    }), $("#saveLocal").click(function(a) {
        var b = a.target;
        $(b).hasClass("button") && ($(b).hasParent(".save_button") ? SavePage.saveLocal() : $(b).hasParent(".copy_button") ? SavePage.copy() : $(b).hasParent(".print_button") && SavePage.print())
    }), $(".l-s-btn").on("click", function() {
        $(this).hasClass("copy") ? SavePage.copy() : $(this).hasClass("print") && SavePage.print()
    }), $(".signout").click(function() {
        SavePage.signout()
    }), $(".btnDark").click(function(a) {
        $(a.target).hasParent("#authError") ? $("#saveOptionContent>.diigo").removeClass("signin") : "clear-authentication" == a.target.id && ($(".loader").remove(), $(".sgdrive .saveForm").show(), $("#gdrive-save").text("Save on Google"), $("#notice").show(), $("#gdrive-user").hide(), $("#saveOptionList li.sgdrive span").text("Save on Google"), googleAuth.clear(), delete localStorage.gdrive_current_user, googleAuth = new OAuth2("google", gDriveConfig))
    }), $("#saveOptionList").click(function(a) {
        var b = a.target;
        $(b).hasParent("#saveOptionList") && !$(b).hasClass("more-option") && ($("#saveOptionContent").find("." + b.className).addClass("selected"), $("#saveOptionHead, #saveOptionBody").addClass("showContent"), $("#saveLocal").hide(), $(b).hasClass("diigo") && $("#about-diigo").show())
    }), $(".sgdrive span").click(function() {
        $("#saveOptionContent").find(".sgdrive").addClass("selected"), $("#saveOptionHead, #saveOptionBody").addClass("showContent"), $("#saveLocal").hide()
    }), $("#gdrive-signout").click(function(a) {
        var b = a.target;
        $(b).hasClass("jqmClose") && ($(".loader").remove(), $(".sgdrive .saveForm").show()), $("#gdrive-save").text("Save on Google"), $("#gdrive-signout").hide(), $("#gdrive-user").hide(), $("#saveOptionList li.sgdrive span").text(""), googleAuth.clear(), delete localStorage.gdrive_current_user, googleAuth = new OAuth2("google", gDriveConfig)
    }), $("#saveOptionContent").click(function(a) {
        $(a.target).hasClass("save") && ($(a.target).hasParent(".diigo") ? SavePage.uploadImageToDiigo() : $(a.target).hasParent(".as") ? SavePage.uploadImageToAS() : "gdrive-save" == a.target.id ? SavePage.saveToGdrive() : "gdrive-connect" == a.target.id ? SavePage.authorizeGdrive() : $(a.target).hasParent(".local") && SavePage.saveLocal())
    }), $("#a-upload-btn").on("click", function() {
        SavePage.uploadImageToAws()
    })
}, SavePage.getAwsUserInfo = function() {
    $.ajax({
        url: server_url + "/user/getUserInfoFromExtension",
        type: "GET",
        cache: !1,
        success: function(a) {
            0 == a.ErrorCode ? (a.S, SavePage.getAwsPojects()) : alert(a.ErrorMsg), $(".a-login-tip").hide()
        },
        error: function(a) {
            alert("error:" + a.responseText), $(".a-login-tip").hide()
        }
    })
}, SavePage.addNewProject = function(a) {
    $('<option value="' + a.ProjectId + '">' + a.Name + "</option>").prependTo($("#a-project")), $("#a-project").val(a.ProjectId)
}, SavePage.init = function() {
    SavePage.initSaveOption(), SavePage.initAccount(), $("#open-path").click(function() {
        SavePage.openSavePath()
    }), $("#w-cpy").on("click", function(a) {
        a.preventDefault(), showInfo()
    }), $("#c-tip").on("click", function(a) {
        a.preventDefault(), showInfo(!0)
    }), $("#test-promo").on("click", function(a) {
        a.preventDefault(), $("#w-wrapper").css({
            visibility: "visible",
            opacity: 1
        }), $("#w-aws-info").show()
    }), $(".noti").on("click", function(a) {
        a.preventDefault(), $(this).hide(), localStorage["show-noti"] = "false", $("#w-wrapper").css({
            visibility: "visible",
            opacity: 1
        }), $("#w-aws-info").show()
    }), $(".w-info").find(".w-close-btn").on("click", function() {
        1 == $(".w-info").filter(function() {
            return $(this).is(":visible")
        }).length && $("#w-wrapper").css({
            visibility: "hidden",
            opacity: 0
        }), $(this).parent().hide(), "w-aws-create" == $(this).parent().attr("id") && $("#c-p-input").val("")
    }), $("#more-option").on("click", function(a) {
        a.preventDefault(), $(this).hide(), $("#save-cloud").show()
    }), "true" === localStorage["show-noti"] && $(".noti").show(), $("#a-project").on("change", function() {
        var a = $(this),
            b = a.val();
        switch (console.log(b), b) {
            case "-1":
                break;
            case "-2":
                a.val(-1), SavePage.showCreateWin();
                break;
            case "-3":
                a.val(-1), SavePage.getAwsPojects()
        }
    }), $("#c-p-btn").on("click", function(a) {
        a.preventDefault();
        var b = $(this),
            c = $("#c-p-input").val();
        return "" == c.trim() ? void $("#c-p-input").focus() : ($(this).text("Creating...").addClass("disabled"), void $.ajax({
            type: "POST",
            dataType: "json",
            cache: !1,
            url: server_url + "/createProject?from=chrome_extension",
            data: {
                name: c
            },
            success: function(a) {
                0 == a.ErrorCode ? (SavePage.addNewProject(a.ProjectDetail), $("#w-aws-create").find(".w-close-btn").trigger("click")) : 1007 == a.ErrorCode && "The maximum number of limit is reached!" == a.ErrorMsg && SavePage.showUpgradeWin(), b.text("Create").removeClass("disabled")
            },
            error: function(a) {
                alert("error:" + a.responseText), b.text("Create").removeClass("disabled")
            }
        }))
    })
}, chrome.extension.sendRequest({
    action: "closeWin"
});