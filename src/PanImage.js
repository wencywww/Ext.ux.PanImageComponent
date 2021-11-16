Ext.onReady(function () {

    /*
     * Provides Pan & Zoom functionality to Ext.Img component
     * Can be instantiated via the panimage or panimagecomponent xtype.
     * Uses the Panzoom library - https://github.com/timmywil/panzoom.
     * 
     * Available configs:
     * @param {Object} componentConfig - used to provide panzoom instance config options
     *
     * Available on GitHub:
     * https://github.com/wencywww/Ext.ux.PanImageComponent
     * 
     * Example Sencha fiddle available at:
     * https://fiddle.sencha.com/#fiddle/3h23
     * */

    Ext.define('Ext.ux.PanImageComponent', {
        extend: 'Ext.Img',
        alias: ['widget.panimage', 'widget.panimagecomponent'],
        autoEl: 'div',
        componentDefaults: {},

        initComponent: function () {
            var me = this;

            me.on({
                afterrender: me.initPanZoom,
            });

            me.callParent(arguments);
        },

        initPanZoom: function () {
            var me = this;
            var defaults = {
                animate: true,
                maxScale: 5,
                contain: 'outside'
            };
            me.componentDefaults = me.componentConfig ? Ext.apply(defaults, me.componentConfig) : defaults;

            var el = me.getEl();
            var im = el.dom.children[0];
            var parent = im.parentElement;

            var panzoom = Panzoom(im, me.componentDefaults);
            parent.addEventListener('wheel', panzoom.zoomWithWheel);

        }
    });

});

/**
 * Panzoom for panning and zooming elements using CSS transforms
 * Copyright Timmy Willison and other contributors
 * https://github.com/timmywil/panzoom/blob/main/MIT-License.txt
 */
! function (t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).Panzoom = e()
}(this, function () {
    "use strict";
    var C = function () {
        return (C = Object.assign || function (t) {
            for (var e, n = 1, o = arguments.length; n < o; n++)
                for (var r in e = arguments[n]) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
            return t
        }).apply(this, arguments)
    };

    function T(t, e) {
        for (var n = t.length; n--;)
            if (t[n].pointerId === e.pointerId) return n;
        return -1
    }

    function N(t, e) {
        if (e.touches)
            for (var n = 0, o = 0, r = e.touches; o < r.length; o++) {
                var a = r[o];
                a.pointerId = n++, N(t, a)
            } else -1 < (n = T(t, e)) && t.splice(n, 1), t.push(e)
    }

    function L(t) {
        for (var e, n = (t = t.slice(0)).pop(); e = t.pop();) n = {
            clientX: (e.clientX - n.clientX) / 2 + n.clientX,
            clientY: (e.clientY - n.clientY) / 2 + n.clientY
        };
        return n
    }

    function V(t) {
        if (t.length < 2) return 0;
        var e = t[0],
            t = t[1];
        return Math.sqrt(Math.pow(Math.abs(t.clientX - e.clientX), 2) + Math.pow(Math.abs(t.clientY - e.clientY), 2))
    }
    "undefined" != typeof window && (window.NodeList && !NodeList.prototype.forEach && (NodeList.prototype.forEach = Array.prototype.forEach), "function" != typeof window.CustomEvent && (window.CustomEvent = function (t, e) {
        e = e || {
            bubbles: !1,
            cancelable: !1,
            detail: null
        };
        var n = document.createEvent("CustomEvent");
        return n.initCustomEvent(t, e.bubbles, e.cancelable, e.detail), n
    }));
    var G = {
        down: "mousedown",
        move: "mousemove",
        up: "mouseup mouseleave"
    };

    function I(t, e, n, o) {
        G[t].split(" ").forEach(function (t) {
            e.addEventListener(t, n, o)
        })
    }

    function W(t, e, n) {
        G[t].split(" ").forEach(function (t) {
            e.removeEventListener(t, n)
        })
    }
    "undefined" != typeof window && ("function" == typeof window.PointerEvent ? G = {
        down: "pointerdown",
        move: "pointermove",
        up: "pointerup pointerleave pointercancel"
    } : "function" == typeof window.TouchEvent && (G = {
        down: "touchstart",
        move: "touchmove",
        up: "touchend touchcancel"
    }));
    var a, i = "undefined" != typeof document && !!document.documentMode;
    var l = ["webkit", "moz", "ms"],
        c = {};

    function Z(t) {
        if (c[t]) return c[t];
        var e = a = a || document.createElement("div").style;
        if (t in e) return c[t] = t;
        for (var n = t[0].toUpperCase() + t.slice(1), o = l.length; o--;) {
            var r = "" + l[o] + n;
            if (r in e) return c[t] = r
        }
    }

    function r(t, e) {
        return parseFloat(e[Z(t)]) || 0
    }

    function s(t, e, n) {
        var o = "border" === e ? "Width" : "";
        return {
            left: r(e + "Left" + o, n = void 0 === n ? window.getComputedStyle(t) : n),
            right: r(e + "Right" + o, n),
            top: r(e + "Top" + o, n),
            bottom: r(e + "Bottom" + o, n)
        }
    }

    function q(t, e, n) {
        t.style[Z(e)] = n
    }

    function B(t) {
        var e = t.parentNode,
            n = window.getComputedStyle(t),
            o = window.getComputedStyle(e),
            r = t.getBoundingClientRect(),
            a = e.getBoundingClientRect();
        return {
            elem: {
                style: n,
                width: r.width,
                height: r.height,
                top: r.top,
                bottom: r.bottom,
                left: r.left,
                right: r.right,
                margin: s(t, "margin", n),
                border: s(t, "border", n)
            },
            parent: {
                style: o,
                width: a.width,
                height: a.height,
                top: a.top,
                bottom: a.bottom,
                left: a.left,
                right: a.right,
                padding: s(e, "padding", o),
                border: s(e, "border", o)
            }
        }
    }
    var D = /^http:[\w\.\/]+svg$/;
    var F = {
        animate: !1,
        canvas: !1,
        cursor: "move",
        disablePan: !1,
        disableZoom: !1,
        disableXAxis: !1,
        disableYAxis: !1,
        duration: 200,
        easing: "ease-in-out",
        exclude: [],
        excludeClass: "panzoom-exclude",
        handleStartEvent: function (t) {
            t.preventDefault(), t.stopPropagation()
        },
        maxScale: 4,
        minScale: .125,
        overflow: "hidden",
        panOnlyWhenZoomed: !1,
        relative: !1,
        setTransform: function (t, e, n) {
            var o = e.x,
                r = e.y,
                a = e.scale,
                e = e.isSVG;
            q(t, "transform", "scale(" + a + ") translate(" + o + "px, " + r + "px)"), e && i && (e = window.getComputedStyle(t).getPropertyValue("transform"), t.setAttribute("transform", e))
        },
        startX: 0,
        startY: 0,
        startScale: 1,
        step: .3,
        touchAction: "none"
    };

    function t(d, f) {
        if (!d) throw new Error("Panzoom requires an element as an argument");
        if (1 !== d.nodeType) throw new Error("Panzoom requires an element with a nodeType of 1");
        if (t = (e = d).ownerDocument, e = e.parentNode, !(t && e && 9 === t.nodeType && 1 === e.nodeType && t.documentElement.contains(e))) throw new Error("Panzoom should be called on elements that have been attached to the DOM");
        var t;
        f = C(C({}, F), f);
        var e, c = (e = d, D.test(e.namespaceURI) && "svg" !== e.nodeName.toLowerCase()),
            n = d.parentNode;
        n.style.overflow = f.overflow, n.style.userSelect = "none", n.style.touchAction = f.touchAction, (f.canvas ? n : d).style.cursor = f.cursor, d.style.userSelect = "none", d.style.touchAction = f.touchAction, q(d, "transformOrigin", "string" == typeof f.origin ? f.origin : c ? "0 0" : "50% 50%");
        var o, r, a, i, l, s, m = 0,
            h = 0,
            v = 1,
            p = !1;

        function u(t, e, n) {
            n.silent || (e = new CustomEvent(t, {
                detail: e
            }), d.dispatchEvent(e))
        }

        function g(e, n, t) {
            var o = {
                x: m,
                y: h,
                scale: v,
                isSVG: c,
                originalEvent: t
            };
            return requestAnimationFrame(function () {
                var t;
                "boolean" == typeof n.animate && (n.animate ? (t = n, q(d, "transition", Z("transform") + " " + t.duration + "ms " + t.easing)) : q(d, "transition", "none")), n.setTransform(d, o, n), u(e, o, n), u("panzoomchange", o, n)
            }), o
        }

        function y() {
            var t, e, n;
            f.contain && (e = (n = B(d)).parent.width - n.parent.border.left - n.parent.border.right, t = n.parent.height - n.parent.border.top - n.parent.border.bottom, e = e / (n.elem.width / v), n = t / (n.elem.height / v), "inside" === f.contain ? f.maxScale = Math.min(e, n) : "outside" === f.contain && (f.minScale = Math.max(e, n)))
        }

        function w(t, e, n, o) {
            var r, a, i, l, c, s, p = C(C({}, f), o),
                u = {
                    x: m,
                    y: h,
                    opts: p
                };
            return !p.force && (p.disablePan || p.panOnlyWhenZoomed && v === p.startScale) || (t = parseFloat(t), e = parseFloat(e), p.disableXAxis || (u.x = (p.relative ? m : 0) + t), p.disableYAxis || (u.y = (p.relative ? h : 0) + e), p.contain && (t = ((o = (a = (r = B(d)).elem.width / v) * n) - a) / 2, e = ((a = (e = r.elem.height / v) * n) - e) / 2, "inside" === p.contain ? (i = (-r.elem.margin.left - r.parent.padding.left + t) / n, l = (r.parent.width - o - r.parent.padding.left - r.elem.margin.left - r.parent.border.left - r.parent.border.right + t) / n, u.x = Math.max(Math.min(u.x, l), i), c = (-r.elem.margin.top - r.parent.padding.top + e) / n, s = (r.parent.height - a - r.parent.padding.top - r.elem.margin.top - r.parent.border.top - r.parent.border.bottom + e) / n, u.y = Math.max(Math.min(u.y, s), c)) : "outside" === p.contain && (i = (-(o - r.parent.width) - r.parent.padding.left - r.parent.border.left - r.parent.border.right + t) / n, l = (t - r.parent.padding.left) / n, u.x = Math.max(Math.min(u.x, l), i), c = (-(a - r.parent.height) - r.parent.padding.top - r.parent.border.top - r.parent.border.bottom + e) / n, s = (e - r.parent.padding.top) / n, u.y = Math.max(Math.min(u.y, s), c)))), u
        }

        function b(t, e) {
            var n = C(C({}, f), e),
                e = {
                    scale: v,
                    opts: n
                };
            return !n.force && n.disableZoom || (e.scale = Math.min(Math.max(t, n.minScale), n.maxScale)), e
        }

        function x(t, e, n, o) {
            n = w(t, e, v, n);
            return m !== n.x || h !== n.y ? (m = n.x, h = n.y, g("panzoompan", n.opts, o)) : {
                x: m,
                y: h,
                scale: v,
                isSVG: c,
                originalEvent: o
            }
        }

        function S(t, e, n) {
            var o = b(t, e),
                r = o.opts;
            if (r.force || !r.disableZoom) {
                t = o.scale;
                var a = m,
                    e = h;
                r.focal && (a = ((o = r.focal).x / t - o.x / v + m * t) / t, e = (o.y / t - o.y / v + h * t) / t);
                e = w(a, e, t, {
                    relative: !1,
                    force: !0
                });
                return m = e.x, h = e.y, v = t, g("panzoomzoom", r, n)
            }
        }

        function E(t, e) {
            e = C(C(C({}, f), {
                animate: !0
            }), e);
            return S(v * Math.exp((t ? 1 : -1) * e.step), e)
        }

        function O(t, e, n, o) {
            var r = B(d),
                a = r.parent.width - r.parent.padding.left - r.parent.padding.right - r.parent.border.left - r.parent.border.right,
                i = r.parent.height - r.parent.padding.top - r.parent.padding.bottom - r.parent.border.top - r.parent.border.bottom,
                l = e.clientX - r.parent.left - r.parent.padding.left - r.parent.border.left - r.elem.margin.left,
                e = e.clientY - r.parent.top - r.parent.padding.top - r.parent.border.top - r.elem.margin.top;
            c || (l -= r.elem.width / v / 2, e -= r.elem.height / v / 2);
            i = {
                x: l / a * (a * t),
                y: e / i * (i * t)
            };
            return S(t, C(C({
                animate: !1
            }, n), {
                focal: i
            }), o)
        }
        S(f.startScale, {
            animate: !1,
            force: !0
        }), setTimeout(function () {
            y(), x(f.startX, f.startY, {
                animate: !1,
                force: !0
            })
        });
        var M = [];

        function P(t) {
            ! function (t, e) {
                for (var n, o, r = t; null != r; r = r.parentNode)
                    if (n = r, o = e.excludeClass, 1 === n.nodeType && -1 < (" " + (n.getAttribute("class") || "").trim() + " ").indexOf(" " + o + " ") || -1 < e.exclude.indexOf(r)) return 1
            }(t.target, f) && (N(M, t), p = !0, f.handleStartEvent(t), u("panzoomstart", {
                x: o = m,
                y: r = h,
                scale: v,
                isSVG: c,
                originalEvent: t
            }, f), t = L(M), a = t.clientX, i = t.clientY, l = v, s = V(M))
        }

        function A(t) {
            var e;
            p && void 0 !== o && void 0 !== r && void 0 !== a && void 0 !== i && (N(M, t), e = L(M), 1 < M.length ? (0 === s && (s = V(M)), O(b((V(M) - s) * f.step / 80 + l).scale, e)) : x(o + (e.clientX - a) / v, r + (e.clientY - i) / v, {
                animate: !1
            }, t))
        }

        function z(t) {
            1 === M.length && u("panzoomend", {
                x: m,
                y: h,
                scale: v,
                isSVG: c,
                originalEvent: t
            }, f),
                function (t, e) {
                    if (e.touches)
                        for (; t.length;) t.pop();
                    else {
                        e = T(t, e); - 1 < e && t.splice(e, 1)
                    }
                }(M, t), p && (p = !1, o = r = a = i = void 0)
        }
        var X = !1;

        function Y() {
            X || (X = !0, I("down", f.canvas ? n : d, P), I("move", document, A, {
                passive: !0
            }), I("up", document, z, {
                passive: !0
            }))
        }
        return f.noBind || Y(), {
            bind: Y,
            destroy: function () {
                X = !1, W("down", f.canvas ? n : d, P), W("move", document, A), W("up", document, z)
            },
            eventNames: G,
            getPan: function () {
                return {
                    x: m,
                    y: h
                }
            },
            getScale: function () {
                return v
            },
            getOptions: function () {
                return function (t) {
                    var e, n = {};
                    for (e in t) t.hasOwnProperty(e) && (n[e] = t[e]);
                    return n
                }(f)
            },
            pan: x,
            reset: function (t) {
                var e = C(C(C({}, f), {
                    animate: !0,
                    force: !0
                }), t);
                return v = b(e.startScale, e).scale, t = w(e.startX, e.startY, v, e), m = t.x, h = t.y, g("panzoomreset", e)
            },
            resetStyle: function () {
                n.style.overflow = "", n.style.userSelect = "", n.style.touchAction = "", n.style.cursor = "", d.style.cursor = "", d.style.userSelect = "", d.style.touchAction = "", q(d, "transformOrigin", "")
            },
            setOptions: function (t) {
                for (var e in t = void 0 === t ? {} : t) t.hasOwnProperty(e) && (f[e] = t[e]);
                (t.hasOwnProperty("cursor") || t.hasOwnProperty("canvas")) && (n.style.cursor = d.style.cursor = "", (f.canvas ? n : d).style.cursor = f.cursor), t.hasOwnProperty("overflow") && (n.style.overflow = t.overflow), t.hasOwnProperty("touchAction") && (n.style.touchAction = t.touchAction, d.style.touchAction = t.touchAction), (t.hasOwnProperty("minScale") || t.hasOwnProperty("maxScale") || t.hasOwnProperty("contain")) && y()
            },
            setStyle: function (t, e) {
                return q(d, t, e)
            },
            zoom: S,
            zoomIn: function (t) {
                return E(!0, t)
            },
            zoomOut: function (t) {
                return E(!1, t)
            },
            zoomToPoint: O,
            zoomWithWheel: function (t, e) {
                t.preventDefault();
                var n = C(C(C({}, f), e), {
                    animate: !1
                }),
                    e = 0 === t.deltaY && t.deltaX ? t.deltaX : t.deltaY;
                return O(b(v * Math.exp((e < 0 ? 1 : -1) * n.step / 3), n).scale, t, n)
            }
        }
    }
    return t.defaultOptions = F, t
});
