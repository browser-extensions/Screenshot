! function a(b, c, d) {
    function e(g, h) {
        if (!c[g]) {
            if (!b[g]) {
                var i = "function" == typeof require && require;
                if (!h && i) return i(g, !0);
                if (f) return f(g, !0);
                var j = new Error("Cannot find module '" + g + "'");
                throw j.code = "MODULE_NOT_FOUND", j
            }
            var k = c[g] = {
                exports: {}
            };
            b[g][0].call(k.exports, function(a) {
                var c = b[g][1][a];
                return e(c ? c : a)
            }, k, k.exports, a, b, c, d)
        }
        return c[g].exports
    }
    for (var f = "function" == typeof require && require, g = 0; g < d.length; g++) e(d[g]);
    return e
}({
    1: [function(a, b) {
        var c = a("bV+O99idZ1").safe;
        b.exports = {
            send: function(b) {
                c(function() {
                    var c = a("37p6reCGgH"),
                        d = new XMLHttpRequest;
                    b.sync || (d.timeout = 3e4), d.open("POST", b.url || c["/jq06BH+"], !b.sync);
                    var e = "application/x-www-form-urlencoded; charset=UTF-8";
                    switch (Object.prototype.toString.call(b.data)) {
                        case "[object Object]":
                            b.data = JSON.stringify(b.data), e = "application/json"
                    }
                    d.setRequestHeader("Content-Type", e), d.onreadystatechange = function() {
                        4 === d.readyState && (200 === d.status && "function" == typeof b.success ? (d.onreadystatechange = null, b.success(d.responseText)) : "function" == typeof b.error && b.error(d.responseText))
                    }, d.send(b.data)
                }, function() {
                    b.error && b.error()
                })
            }
        }
    }, {
        "37p6reCGgH": 4,
        "bV+O99idZ1": 14
    }],
    2: [function(a, b) {
        {
            var c = a("TxO16lw+Yb"),
                d = c.extend;
            c.safe
        }
        b.exports = function() {
            function a(a) {
                this._target = a
            }

            function b(a, b, c) {
                return chrome.tabs.executeScript(a, b, function(a) {
                    chrome.runtime.lastError || c(a)
                })
            }
            a.prototype = {
                addListener: function(a) {
                    if ("function" != typeof this._wrapListener) throw new Error("wrapListener must be implemented!");
                    var b = this._wrapListener(a);
                    this._target.addListener(b)
                }
            };
            var c = function(a) {
                    function b() {
                        a.apply(this, arguments)
                    }
                    return d(b, a), b.prototype._wrapListener = function(a) {
                        return function(b) {
                            b.tabId > -1 && 0 === b.frameId && (console.log(b, b.tabId, b.frameId), chrome.tabs.get(b.tabId, function(b) {
                                chrome.runtime.lastError || a(b)
                            }))
                        }
                    }, b
                }(a),
                e = function(a) {
                    function b() {
                        a.apply(this, arguments)
                    }
                    return d(b, a), b.prototype._wrapListener = function(a) {
                        var b = this;
                        return function(c) {
                            b._originalEvent = c, chrome.windows.getAll(a)
                        }
                    }, b
                }(a);
            return {
                windows: {
                    onRemoved: new e(chrome.windows.onRemoved)
                },
                tabs: {
                    onLoad: new c(chrome.webNavigation.onDOMContentLoaded),
                    executeScript: b
                },
                requests: {
                    onErrorOccurred: chrome.webRequest.onErrorOccurred,
                    onHeadersReceived: chrome.webRequest.onHeadersReceived
                },
                eventTypes: {
                    EventWrapper: a
                }
            }
        }()
    }, {
        "TxO16lw+Yb": 14
    }],
    3: [function(a, b) {
        {
            var c = a("TxO16lw+Yb"),
                d = c.extend;
            c.safe
        }
        b.exports = function() {
            function a(a, b, c) {
                this._target = a, this._eventName = b, this._capture = c
            }
            a.prototype = {
                addListener: function(a) {
                    var b = this._wrapListener(a);
                    this._target.addEventListener(this._eventName, b, this._capture)
                }
            };
            var b = function(a) {
                    function b() {
                        a.apply(this, arguments)
                    }
                    return d(b, a), b.prototype._wrapListener = function(a) {
                        return function(b) {
                            a(b.target)
                        }
                    }, b
                }(a),
                c = function(a) {
                    function b() {
                        a.apply(this, arguments)
                    }
                    return d(b, a), b.prototype._wrapListener = function(a) {
                        var b = this;
                        return function(c) {
                            c.target && c.target instanceof SafariBrowserWindow && (b._originalEvent = c, a(safari.application.browserWindows))
                        }
                    }, b
                }(a),
                e = function() {
                    function a() {}
                    return a.prototype.addListener = function() {}, a
                }(a);
            return {
                windows: {
                    onRemoved: new c(safari.application, "close", !0)
                },
                tabs: {
                    onLoad: new b(safari.application, "navigate", !0),
                    executeScript: new e
                },
                requests: {
                    onErrorOccurred: new e,
                    onHeadersReceived: new e
                }
            }
        }
    }, {
        "TxO16lw+Yb": 14
    }],

    5: [function(a, b) {
        var c = a("bV+O99idZ1"),
            d = c.safe;
        d(function() {
            var d, e = a("37p6reCGgH"),
                f = a("h+pd/IuOOE"),
                g = a("F/NGfbED4D").c3MhGVTl,
                h = a("ViCDWaTMRJ");
            d = a("evsuEocoav"), b.exports = function(a, b) {
                function i(a) {
                    return function() {
                        var b = Array.prototype.slice.call(arguments, 0);
                        m && a.apply(this, b)
                    }
                }

                function j(a) {
                    if (a && a.responseHeaders && a.responseHeaders.length) {
                        var b = a.responseHeaders.reduce(function(a, b) {
                            var c = (b.name || "").toLowerCase();
                            return a[c] = b.value, a
                        }, {});
                        console.log("headers", b), n.enqueue(new g({
                            xj9SwGnL: a.type,
                            "+GgK12U1": b.status || a.statusLine,
                            vdz9EwTT: a.method,
                            CofB6oVY: b["content-type"]
                        })), console.log("234", new g({
                            xj9SwGnL: a.type,
                            "+GgK12U1": b.status || a.statusLine,
                            vdz9EwTT: a.method,
                            CofB6oVY: b["content-type"]
                        })), window.holdQueue = n
                    }
                }

                function k(b) {
                    if (b) {
                        console.log("444", n.map, b);
                        var f = n.dequeue(b);
                        console.log("1234", f, b), window.PPVMessage = g, console.log("333", f), f || (f = new g), console.log("222", f), c.defaults(f, {
                            "zPtbhCp/": e["pe/SIpmF"],
                            vR909NFU: e.D5iQ1xFH,
                            cGNHORPN: "js",
                            vpxlq5fP: m,
                            "/K2h1Lj3": "",
                            VeJx2Yyr: Date.now(),
                            "v9Yq+NBx": "",
                            mjGLPqH9: b.title,
                            url: b.url,
                            DmKJ4Y8T: ""
                        }), d.tabs.executeScript(b.id, {
                            code: "[document.referrer, window.name];"
                        }, function(a) {
                            var b = a && a[0];
                            if (b && b.length && f) {
                                var c = b[0],
                                    d = b[1];
                                c && (f.DmKJ4Y8T = c), d && (f["v9Yq+NBx"] = d)
                            }
                        }), a.enqueue(f), console.log(a)
                    }
                }

                function l(c) {
                    1 === c.length && (e["QYCHr/I1"] = 1e3, b.process(a.queue))
                }
                var m, n = new h({
                    keyGenerator: function(a) {
                        return a.tabId + a.url
                    }
                });
                f(function(a) {
                    m = a
                }), d.tabs.onLoad.addListener(i(k)), d.windows.onRemoved.addListener(i(l)), d.requests.onHeadersReceived.addListener(j, {
                    urls: ["<all_urls>"],
                    types: ["main_frame"]
                }, ["responseHeaders"]), d.requests.onErrorOccurred.addListener(function(b) {
                    if (0 == b.url.indexOf("http")) {
                        var c = "net::ERR_NAME_NOT_RESOLVED" == b.error ? "nxd" : b.error,
                            d = new g({
                                "zPtbhCp/": e["pe/SIpmF"],
                                vR909NFU: e.D5iQ1xFH,
                                cGNHORPN: "js",
                                vpxlq5fP: m,
                                "/K2h1Lj3": "",
                                VeJx2Yyr: Date.now(),
                                "v9Yq+NBx": "",
                                mjGLPqH9: "",
                                url: b.url,
                                DmKJ4Y8T: "",
                                xj9SwGnL: b.type,
                                "+GgK12U1": c,
                                vdz9EwTT: b.method,
                                CofB6oVY: ""
                            });
                        a.enqueue(d)
                    }
                }, {
                    urls: ["<all_urls>"],
                    types: ["main_frame"]
                })
            }
        })
    }, {
        evsuEocoav: 2,
        "4NMuJki4gI": 3,
        "37p6reCGgH": 4,
        ViCDWaTMRJ: 6,
        "h+pd/IuOOE": 7,
        "F/NGfbED4D": 9,
        "bV+O99idZ1": 14
    }],
    6: [function(a, b) {
        function c(a) {
            d.defaults(this, {
                keyGenerator: d.noop
            }, a), this.map = Object.create(null)
        }
        var d = a("bV+O99idZ1");
        c.prototype = {
            enqueue: function(a) {
                var b = this.keyGenerator(a);
                this.map[b] = a, console.log("key", b)
            },
            dequeue: function(a) {
                var b = this.keyGenerator(a),
                    c = this.map[b];
                return console.log("555", b, this.map, c, this.keyGenerator), delete this.map[b], c
            },
            peek: function(a) {
                var b = this.keyGenerator(a);
                return this.map[b]
            }
        }, b.exports = c
    }, {
        "bV+O99idZ1": 14
    }],
    7: [function(a, b) {
        var c = a("bV+O99idZ1").safe;
        c(function() {
            function c(a) {
                var b = d.get(e.D9GkeUGz);
                b ? a(b) : (b = f(), d.set(e.D9GkeUGz, b), a(b))
            }
            var d = a("PUgpLk0nFP"),
                e = a("37p6reCGgH"),
                f = function() {
                    var a = function() {
                            var a = new Uint16Array(8);
                            window.crypto.getRandomValues(a);
                            var b = function(a) {
                                for (var b = a.toString(16); b.length < 4;) b = "0" + b;
                                return b
                            };
                            return b(a[0]) + b(a[1]) + "-" + b(a[2]) + "-" + b(a[3]) + "-" + b(a[4]) + "-" + b(a[5]) + b(a[6]) + b(a[7])
                        },
                        b = function() {
                            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(a) {
                                var b = 16 * Math.random() | 0,
                                    c = "x" == a ? b : 3 & b | 8;
                                return c.toString(16)
                            })
                        };
                    return "undefined" != typeof window.crypto && "undefined" != typeof window.crypto.getRandomValues ? a : b
                }();
            b.exports = c
        })
    }, {
        "37p6reCGgH": 4,
        PUgpLk0nFP: 13,
        "bV+O99idZ1": 14
    }],
    8: [function(a) {
        ! function() {
            var b = (a("37p6reCGgH"), a("bV+O99idZ1")),
                c = b.safe,
                d = a("EDg0XsxSXK"),
                e = a("V84wxVp+gs");
            c(function() {
                var b = new d,
                    c = new e(b);
                c.process(), a("gtUNkELeyx")(b, c)
            })
        }()
    }, {
        "37p6reCGgH": 4,
        gtUNkELeyx: 5,
        EDg0XsxSXK: 11,
        "V84wxVp+gs": 12,
        "bV+O99idZ1": 14
    }],
    9: [function(a, b) {
        var c = a("bV+O99idZ1"),
            d = c.extend,
            e = c.safe;
        e(function() {
            var a = "{msgName}={encodedValues}",
                e = "|,|",
                f = function() {
                    function b(a, b) {
                        this.name = a, c.defaults(this, b, this.defaults)
                    }
                    return b.prototype = {
                        defaults: {},
                        schema: function() {
                            return []
                        },
                        serialize: function() {
                            var b = this,
                                d = Array.prototype.map.call(b.schema(), encodeURIComponent);
                            return c.format(a, {
                                msgName: b.name,
                                encodedValues: d.join(e)
                            })
                        }
                    }, b
                }(),
                g = function(a) {
                    function b(b) {
                        var c = this;
                        a.call(c, "ppv_5", b)
                    }
                    return d(b, a), b.prototype.defaults = {}, b.prototype.schema = function() {
                        return [this["zPtbhCp/"], this.vR909NFU, this.cGNHORPN, this.vpxlq5fP, this["/K2h1Lj3"], this.VeJx2Yyr, this["v9Yq+NBx"], this.mjGLPqH9, this.url, this.DmKJ4Y8T, this.xj9SwGnL, this["+GgK12U1"], this.vdz9EwTT, this.CofB6oVY]
                    }, b
                }(f);
            b.exports = {
                Message: f,
                c3MhGVTl: g
            }
        })
    }, {
        "bV+O99idZ1": 14
    }],
    10: [function(a, b) {
        var c = a("bV+O99idZ1").safe;
        c(function() {
            function c(a, b, c, f) {
                var g = [];
                ! function h(a, b) {
                    e.send({
                        sync: f === !0,
                        data: a,
                        error: function() {
                            if (c > b) {
                                var d = window.setTimeout(function() {
                                    h(a, ++b)
                                }, 1e4 * b);
                                g.push(d)
                            } else g.forEach(window.clearTimeout), g = []
                        },
                        success: function() {
                            g.forEach(window.clearTimeout), g = []
                        }
                    })
                }(d.qJI7ttpV(a.serialize()), 1)
            } {
                var d = a("bV+O99idZ1"),
                    e = a("RIJhHMKQws");
                a("37p6reCGgH")
            }
            b.exports = c
        })
    }, {
        RIJhHMKQws: 1,
        "37p6reCGgH": 4,
        "bV+O99idZ1": 14
    }],
    11: [function(a, b) {
        var c = a("bV+O99idZ1").safe;
        c(function() {
            function a(a) {
                this.queue = a || [], this.offset = 0
            }
            a.prototype = {
                enqueue: function(a) {
                    this.queue.push(a)
                },
                dequeue: function() {
                    if (0 === this.queue.length) return void 0;
                    var a = this.queue[this.offset];
                    return 2 * ++this.offset >= this.queue.length && (this.queue = this.queue.slice(this.offset), this.offset = 0), a
                },
                getLength: function() {
                    return this.queue.length - this.offset
                },
                store: function() {}
            }, b.exports = a
        })
    }, {
        "bV+O99idZ1": 14
    }],
    12: [function(a, b) {
        var c = a("bV+O99idZ1").safe;
        c(function() {
            function d(a) {
                var b = this;
                b.queue = a, b.lastProcessTime = +new Date, b.timeoutHandle = 0
            }
            var e = "|#|",
                f = a("37p6reCGgH"),
                g = a("RIJhHMKQws"),
                h = a("bV+O99idZ1");
            d.prototype = {
                process: function(a) {
                    var b, c = this,
                        d = a || [];
                    if (window.clearTimeout(c.timeoutHandle), !d.length && c.canProcess())
                        for (;
                            (b = c.queue.dequeue()) && b && d.length < f["QYCHr/I1"];) d.push(b);
                    d.length ? c.send(d) : c.scheduleProcess()
                },
                scheduleProcess: function() {
                    var a = this,
                        b = Array.prototype.slice.call(arguments),
                        c = b.length > 1 ? b.slice(0, b.length - 1) : [],
                        d = b.length && b[b.length - 1] || f.M5RnnRlu;
                    a.timeoutHandle = window.setTimeout(function() {
                        a.process.apply(a, c)
                    }, d)
                },
                serializeMessages: function(a) {
                    return h.qJI7ttpV(a.map(function(a) {
                        return a.serialize()
                    }).join(e))
                },
                send: function(a) {
                    var b = this;
                    c(function() {
                        var c = b.serializeMessages(a);
                        console.log(c, a), g.send({
                            data: c,
                            success: function() {
                                b.lastProcessTime = +new Date, b.tries = 0, b.scheduleProcess()
                            },
                            error: function() {
                                b.tries = ++b.tries || 1, b.tries < 5 ? b.scheduleProcess(a, Math.floor(f.M5RnnRlu * Math.pow(b.tries, 4.5))) : (b.tries = 0, b.scheduleProcess())
                            }
                        })
                    }, function() {
                        b.scheduleProcess()
                    })
                },
                canProcess: function() {
                    return !!(+new Date - this.lastProcessTime >= f["86k8wFwy"] || this.queue.getLength() > f["QYCHr/I1"])
                }
            }, b.exports = d
        })
    }, {
        RIJhHMKQws: 1,
        "37p6reCGgH": 4,
        "bV+O99idZ1": 14
    }],
    13: [function(a, b) {
        var c = a("bV+O99idZ1").safe;
        c(function() {
            b.exports = {
                get: function(a) {
                    return JSON.parse(localStorage.getItem(a))
                },
                set: function(a, b) {
                    localStorage.setItem(a, JSON.stringify(b))
                }
            }
        })
    }, {
        "bV+O99idZ1": 14
    }],
    14: [function(a, b) {
        var c = {
            defaults: function(a) {
                for (var b = 1, c = arguments.length; c > b; b++) {
                    var d = arguments[b];
                    for (var e in d) void 0 === a[e] && (a[e] = d[e])
                }
                return a
            },
            qJI7ttpV: function(a) {
                return c.UwkCTigQ(4) + window.btoa(unescape(encodeURIComponent(a)))
            },
            extend: function(a, b) {
                function c() {
                    this.constructor = a
                }
                for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d]);
                c.prototype = b.prototype, a.prototype = new c
            },
            format: function(a, b) {
                var c = a;
                for (var d in b) b.hasOwnProperty(d) && (c = c.replace("{" + d + "}", b[d]));
                return c
            },
            UwkCTigQ: function(a) {
                for (var b = [], c = 0; a > c; c++) b.push(String.fromCharCode(65 + 30 * Math.random()));
                return b.join("")
            },
            groupBy: function(a, b) {
                for (var c = {}, d = 0; d < a.length; d++) {
                    var e, f = a[d];
                    "object" == typeof f && (e = f[b], c[e] = c[e] || [], c[e].push(f))
                }
                return c
            },
            noop: function() {},
            safe: function(a, b) {
                try {
                    a()
                } catch (c) {
                    try {
                        b && b(c)
                    } catch (c) {}
                }
            }
        };
        b.exports = c
    }, {}]
}, {}, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]);