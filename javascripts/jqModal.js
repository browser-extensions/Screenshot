! function(a) {
    a.fn.jqm = function(d) {
        var e = {
            overlay: 50,
            overlayClass: "jqmOverlay",
            closeClass: "jqmClose",
            trigger: ".jqModal",
            ajax: f,
            ajaxText: "",
            target: f,
            modal: f,
            toTop: f,
            onShow: f,
            onHide: f,
            onLoad: f
        };
        return this.each(function() {
            return this._jqm ? c[this._jqm].c = a.extend({}, c[this._jqm].c, d) : (b++, this._jqm = b, c[b] = {
                c: a.extend(e, a.jqm.params, d),
                a: f,
                w: a(this).addClass("jqmID" + b),
                s: b
            }, void(e.trigger && a(this).jqmAddTrigger(e.trigger)))
        })
    }, a.fn.jqmAddClose = function(a) {
        return l(this, a, "jqmHide")
    }, a.fn.jqmAddTrigger = function(a) {
        return l(this, a, "jqmShow")
    }, a.fn.jqmShow = function(b) {
        return this.each(function() {
            b = b || window.event, a.jqm.open(this._jqm, b)
        })
    }, a.fn.jqmHide = function(b) {
        return this.each(function() {
            b = b || window.event, a.jqm.close(this._jqm, b)
        })
    }, a.jqm = {
        hash: {},
        open: function(b, g) {
            var i = c[b],
                k = i.c,
                l = "." + k.closeClass,
                m = parseInt(i.w.css("z-index")),
                m = m > 0 ? m : 3e3,
                n = a("<div></div>").css({
                    height: "100%",
                    width: "100%",
                    position: "fixed",
                    left: 0,
                    top: 0,
                    "z-index": m - 1,
                    opacity: k.overlay / 100
                });
            if (i.a) return f;
            if (i.t = g, i.a = !0, i.w.css("z-index", m), k.modal ? (d[0] || j("bind"), d.push(b)) : k.overlay > 0 ? i.w.jqmAddClose(n) : n = f, i.o = n ? n.addClass(k.overlayClass).prependTo("body") : f, e && (a("html,body").css({
                    height: "100%",
                    width: "100%"
                }), n)) {
                n = n.css({
                    position: "absolute"
                })[0];
                for (var o in {
                        Top: 1,
                        Left: 1
                    }) n.style.setExpression(o.toLowerCase(), "(_=(document.documentElement.scroll" + o + " || document.body.scroll" + o + "))+'px'")
            }
            if (k.ajax) {
                var p = k.target || i.w,
                    q = k.ajax,
                    p = "string" == typeof p ? a(p, i.w) : a(p),
                    q = "@" == q.substr(0, 1) ? a(g).attr(q.substring(1)) : q;
                p.html(k.ajaxText).load(q, function() {
                    k.onLoad && k.onLoad.call(this, i), l && i.w.jqmAddClose(a(l, i.w)), h(i)
                })
            } else l && i.w.jqmAddClose(a(l, i.w));
            return k.toTop && i.o && i.w.before('<span id="jqmP' + i.w[0]._jqm + '"></span>').insertAfter(i.o), k.onShow ? k.onShow(i) : i.w.show(), h(i), f
        },
        close: function(b) {
            var e = c[b];
            return e.a ? (e.a = f, d[0] && (d.pop(), d[0] || j("unbind")), e.c.toTop && e.o && a("#jqmP" + e.w[0]._jqm).after(e.w).remove(), e.c.onHide ? e.c.onHide(e) : (e.w.hide(), e.o && e.o.remove()), f) : f
        },
        params: {}
    };
    var b = 0,
        c = a.jqm.hash,
        d = [],
        e = a.browser.msie && "6.0" == a.browser.version,
        f = !1,
        g = a('<iframe src="javascript:false;document.write(\'\');" class="jqm"></iframe>').css({
            opacity: 0
        }),
        h = function(b) {
            e && (b.o ? b.o.html('<p style="width:100%;height:100%"/>').prepend(g) : a("iframe.jqm", b.w)[0] || b.w.prepend(g)), i(b)
        },
        i = function(b) {
            try {
                a(":input:visible", b.w)[0].focus()
            } catch (c) {}
        },
        j = function(b) {
            a()[b]("keypress", k)[b]("keydown", k)[b]("mousedown", k)
        },
        k = function(b) {
            var e = c[d[d.length - 1]],
                f = !a(b.target).parents(".jqmID" + e.s)[0];
            return f && i(e), !f
        },
        l = function(b, d, e) {
            return b.each(function() {
                var b = this._jqm;
                a(d).each(function() {
                    this[e] || (this[e] = [], a(this).click(function() {
                        for (var a in {
                                jqmShow: 1,
                                jqmHide: 1
                            })
                            for (var b in this[a]) c[this[a][b]] && c[this[a][b]].w[a](this);
                        return f
                    })), this[e].push(b)
                })
            })
        }
}(jQuery);