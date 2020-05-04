(window._gsQueue || (window._gsQueue = [])).push(function() {
        "use strict";
        window._gsDefine("TweenMax", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(t, e, i) {
                var s = [].slice,
                    r = function(t, e, s) {
                        i.call(this, t, e, s), this._cycle = 0, this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._dirty = !0, this.render = r.prototype.render
                    },
                    n = function(t) {
                        return t.jquery || t.length && t !== window && t[0] && (t[0] === window || t[0].nodeType && t[0].style && !t.nodeType)
                    },
                    a = r.prototype = i.to({}, .1, {}),
                    o = [];
                r.version = "1.10.2", a.constructor = r, a.kill()._gc = !1, r.killTweensOf = r.killDelayedCallsTo = i.killTweensOf, r.getTweensOf = i.getTweensOf, r.ticker = i.ticker, a.invalidate = function() {
                    return this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._uncache(!0), i.prototype.invalidate.call(this)
                }, a.updateTo = function(t, e) {
                    var s, r = this.ratio;
                    e && this.timeline && this._startTime < this._timeline._time && (this._startTime = this._timeline._time, this._uncache(!1), this._gc ? this._enabled(!0, !1) : this._timeline.insert(this, this._startTime - this._delay));
                    for (s in t) this.vars[s] = t[s];
                    if (this._initted)
                        if (e) this._initted = !1;
                        else if (this._notifyPluginsOfEnabled && this._firstPT && i._onPluginEvent("_onDisable", this), this._time / this._duration > .998) {
                        var n = this._time;
                        this.render(0, !0, !1), this._initted = !1, this.render(n, !0, !1)
                    } else if (this._time > 0) {
                        this._initted = !1, this._init();
                        for (var a, o = 1 / (1 - r), h = this._firstPT; h;) a = h.s + h.c, h.c *= o, h.s = a - h.c, h = h._next
                    }
                    return this
                }, a.render = function(t, e, i) {
                    var s, r, n, a, h, l, _, u = this._dirty ? this.totalDuration() : this._totalDuration,
                        p = this._time,
                        f = this._totalTime,
                        c = this._cycle;
                    if (t >= u ? (this._totalTime = u, this._cycle = this._repeat, this._yoyo && 0 !== (1 & this._cycle) ? (this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0) : (this._time = this._duration, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1), this._reversed || (s = !0, r = "onComplete"), 0 === this._duration && ((0 === t || 0 > this._rawPrevTime) && this._rawPrevTime !== t && (i = !0, this._rawPrevTime > 0 && (r = "onReverseComplete", e && (t = -1))), this._rawPrevTime = t)) : 1e-7 > t ? (this._totalTime = this._time = this._cycle = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== f || 0 === this._duration && this._rawPrevTime > 0) && (r = "onReverseComplete", s = this._reversed), 0 > t ? (this._active = !1, 0 === this._duration && (this._rawPrevTime >= 0 && (i = !0), this._rawPrevTime = t)) : this._initted || (i = !0)) : (this._totalTime = this._time = t, 0 !== this._repeat && (a = this._duration + this._repeatDelay, this._cycle = this._totalTime / a >> 0, 0 !== this._cycle && this._cycle === this._totalTime / a && this._cycle--, this._time = this._totalTime - this._cycle * a, this._yoyo && 0 !== (1 & this._cycle) && (this._time = this._duration - this._time), this._time > this._duration ? this._time = this._duration : 0 > this._time && (this._time = 0)), this._easeType ? (h = this._time / this._duration, l = this._easeType, _ = this._easePower, (1 === l || 3 === l && h >= .5) && (h = 1 - h), 3 === l && (h *= 2), 1 === _ ? h *= h : 2 === _ ? h *= h * h : 3 === _ ? h *= h * h * h : 4 === _ && (h *= h * h * h * h), this.ratio = 1 === l ? 1 - h : 2 === l ? h : .5 > this._time / this._duration ? h / 2 : 1 - h / 2) : this.ratio = this._ease.getRatio(this._time / this._duration)), p === this._time && !i) return void(f !== this._totalTime && this._onUpdate && (e || this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || o)));
                    if (!this._initted) {
                        if (this._init(), !this._initted) return;
                        this._time && !s ? this.ratio = this._ease.getRatio(this._time / this._duration) : s && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
                    }
                    for (this._active || !this._paused && this._time !== p && t >= 0 && (this._active = !0), 0 === f && (this._startAt && (t >= 0 ? this._startAt.render(t, e, i) : r || (r = "_dummyGS")), this.vars.onStart && (0 !== this._totalTime || 0 === this._duration) && (e || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || o))), n = this._firstPT; n;) n.f ? n.t[n.p](n.c * this.ratio + n.s) : n.t[n.p] = n.c * this.ratio + n.s, n = n._next;
                    this._onUpdate && (0 > t && this._startAt && this._startAt.render(t, e, i), e || this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || o)), this._cycle !== c && (e || this._gc || this.vars.onRepeat && this.vars.onRepeat.apply(this.vars.onRepeatScope || this, this.vars.onRepeatParams || o)), r && (this._gc || (0 > t && this._startAt && !this._onUpdate && this._startAt.render(t, e, i), s && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[r] && this.vars[r].apply(this.vars[r + "Scope"] || this, this.vars[r + "Params"] || o)))
                }, r.to = function(t, e, i) {
                    return new r(t, e, i)
                }, r.from = function(t, e, i) {
                    return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, new r(t, e, i)
                }, r.fromTo = function(t, e, i, s) {
                    return s.startAt = i, s.immediateRender = 0 != s.immediateRender && 0 != i.immediateRender, new r(t, e, s)
                }, r.staggerTo = r.allTo = function(t, e, a, h, l, _, u) {
                    h = h || 0;
                    var p, f, c, m, d = a.delay || 0,
                        g = [],
                        v = function() {
                            a.onComplete && a.onComplete.apply(a.onCompleteScope || this, arguments), l.apply(u || this, _ || o)
                        };
                    for (t instanceof Array || ("string" == typeof t && (t = i.selector(t) || t), n(t) && (t = s.call(t, 0))), p = t.length, c = 0; p > c; c++) {
                        f = {};
                        for (m in a) f[m] = a[m];
                        f.delay = d, c === p - 1 && l && (f.onComplete = v), g[c] = new r(t[c], e, f), d += h
                    }
                    return g
                }, r.staggerFrom = r.allFrom = function(t, e, i, s, n, a, o) {
                    return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, r.staggerTo(t, e, i, s, n, a, o)
                }, r.staggerFromTo = r.allFromTo = function(t, e, i, s, n, a, o, h) {
                    return s.startAt = i, s.immediateRender = 0 != s.immediateRender && 0 != i.immediateRender, r.staggerTo(t, e, s, n, a, o, h)
                }, r.delayedCall = function(t, e, i, s, n) {
                    return new r(e, 0, {
                        delay: t,
                        onComplete: e,
                        onCompleteParams: i,
                        onCompleteScope: s,
                        onReverseComplete: e,
                        onReverseCompleteParams: i,
                        onReverseCompleteScope: s,
                        immediateRender: !1,
                        useFrames: n,
                        overwrite: 0
                    })
                }, r.set = function(t, e) {
                    return new r(t, 0, e)
                }, r.isTweening = function(t) {
                    for (var e, s = i.getTweensOf(t), r = s.length; --r > -1;)
                        if (e = s[r], e._active || e._startTime === e._timeline._time && e._timeline._active) return !0;
                    return !1
                };
                var h = function(t, e) {
                        for (var s = [], r = 0, n = t._first; n;) n instanceof i ? s[r++] = n : (e && (s[r++] = n), s = s.concat(h(n, e)), r = s.length), n = n._next;
                        return s
                    },
                    l = r.getAllTweens = function(e) {
                        return h(t._rootTimeline, e).concat(h(t._rootFramesTimeline, e))
                    };
                r.killAll = function(t, i, s, r) {
                    null == i && (i = !0), null == s && (s = !0);
                    var n, a, o, h = l(0 != r),
                        _ = h.length,
                        u = i && s && r;
                    for (o = 0; _ > o; o++) a = h[o], (u || a instanceof e || (n = a.target === a.vars.onComplete) && s || i && !n) && (t ? a.totalTime(a.totalDuration()) : a._enabled(!1, !1))
                }, r.killChildTweensOf = function(t, e) {
                    if (null != t) {
                        var a, o, h, l, _, u = i._tweenLookup;
                        if ("string" == typeof t && (t = i.selector(t) || t), n(t) && (t = s(t, 0)), t instanceof Array)
                            for (l = t.length; --l > -1;) r.killChildTweensOf(t[l], e);
                        else {
                            a = [];
                            for (h in u)
                                for (o = u[h].target.parentNode; o;) o === t && (a = a.concat(u[h].tweens)), o = o.parentNode;
                            for (_ = a.length, l = 0; _ > l; l++) e && a[l].totalTime(a[l].totalDuration()), a[l]._enabled(!1, !1)
                        }
                    }
                };
                var _ = function(t, i, s, r) {
                    i = i !== !1, s = s !== !1, r = r !== !1;
                    for (var n, a, o = l(r), h = i && s && r, _ = o.length; --_ > -1;) a = o[_], (h || a instanceof e || (n = a.target === a.vars.onComplete) && s || i && !n) && a.paused(t)
                };
                return r.pauseAll = function(t, e, i) {
                    _(!0, t, e, i)
                }, r.resumeAll = function(t, e, i) {
                    _(!1, t, e, i)
                }, r.globalTimeScale = function(e) {
                    var s = t._rootTimeline,
                        r = i.ticker.time;
                    return arguments.length ? (e = e || 1e-6, s._startTime = r - (r - s._startTime) * s._timeScale / e, s = t._rootFramesTimeline, r = i.ticker.frame, s._startTime = r - (r - s._startTime) * s._timeScale / e, s._timeScale = t._rootTimeline._timeScale = e, e) : s._timeScale
                }, a.progress = function(t) {
                    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - t : t) + this._cycle * (this._duration + this._repeatDelay), !1) : this._time / this.duration()
                }, a.totalProgress = function(t) {
                    return arguments.length ? this.totalTime(this.totalDuration() * t, !1) : this._totalTime / this.totalDuration()
                }, a.time = function(t, e) {
                    return arguments.length ? (this._dirty && this.totalDuration(), t > this._duration && (t = this._duration), this._yoyo && 0 !== (1 & this._cycle) ? t = this._duration - t + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (t += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(t, e)) : this._time
                }, a.duration = function(e) {
                    return arguments.length ? t.prototype.duration.call(this, e) : this._duration
                }, a.totalDuration = function(t) {
                    return arguments.length ? -1 === this._repeat ? this : this.duration((t - this._repeat * this._repeatDelay) / (this._repeat + 1)) : (this._dirty && (this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat, this._dirty = !1), this._totalDuration)
                }, a.repeat = function(t) {
                    return arguments.length ? (this._repeat = t, this._uncache(!0)) : this._repeat
                }, a.repeatDelay = function(t) {
                    return arguments.length ? (this._repeatDelay = t, this._uncache(!0)) : this._repeatDelay
                }, a.yoyo = function(t) {
                    return arguments.length ? (this._yoyo = t, this) : this._yoyo
                }, r
            }, !0), window._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(t, e, i) {
                var s = function(t) {
                        e.call(this, t), this._labels = {}, this.autoRemoveChildren = this.vars.autoRemoveChildren === !0, this.smoothChildTiming = this.vars.smoothChildTiming === !0, this._sortChildren = !0, this._onUpdate = this.vars.onUpdate;
                        var i, s, r = this.vars;
                        for (s in r) i = r[s], i instanceof Array && -1 !== i.join("").indexOf("{self}") && (r[s] = this._swapSelfInParams(i));
                        r.tweens instanceof Array && this.add(r.tweens, 0, r.align, r.stagger)
                    },
                    r = [],
                    n = function(t) {
                        var e, i = {};
                        for (e in t) i[e] = t[e];
                        return i
                    },
                    a = function(t, e, i, s) {
                        t._timeline.pause(t._startTime), e && e.apply(s || t._timeline, i || r)
                    },
                    o = r.slice,
                    h = s.prototype = new e;
                return s.version = "1.10.2", h.constructor = s, h.kill()._gc = !1, h.to = function(t, e, s, r) {
                    return e ? this.add(new i(t, e, s), r) : this.set(t, s, r)
                }, h.from = function(t, e, s, r) {
                    return this.add(i.from(t, e, s), r)
                }, h.fromTo = function(t, e, s, r, n) {
                    return e ? this.add(i.fromTo(t, e, s, r), n) : this.set(t, r, n)
                }, h.staggerTo = function(t, e, r, a, h, l, _, u) {
                    var p, f = new s({
                        onComplete: l,
                        onCompleteParams: _,
                        onCompleteScope: u
                    });
                    for ("string" == typeof t && (t = i.selector(t) || t), !(t instanceof Array) && t.length && t !== window && t[0] && (t[0] === window || t[0].nodeType && t[0].style && !t.nodeType) && (t = o.call(t, 0)), a = a || 0, p = 0; t.length > p; p++) r.startAt && (r.startAt = n(r.startAt)), f.to(t[p], e, n(r), p * a);
                    return this.add(f, h)
                }, h.staggerFrom = function(t, e, i, s, r, n, a, o) {
                    return i.immediateRender = 0 != i.immediateRender, i.runBackwards = !0, this.staggerTo(t, e, i, s, r, n, a, o)
                }, h.staggerFromTo = function(t, e, i, s, r, n, a, o, h) {
                    return s.startAt = i, s.immediateRender = 0 != s.immediateRender && 0 != i.immediateRender, this.staggerTo(t, e, s, r, n, a, o, h)
                }, h.call = function(t, e, s, r) {
                    return this.add(i.delayedCall(0, t, e, s), r)
                }, h.set = function(t, e, s) {
                    return s = this._parseTimeOrLabel(s, 0, !0), null == e.immediateRender && (e.immediateRender = s === this._time && !this._paused), this.add(new i(t, 0, e), s)
                }, s.exportRoot = function(t, e) {
                    t = t || {}, null == t.smoothChildTiming && (t.smoothChildTiming = !0);
                    var r, n, a = new s(t),
                        o = a._timeline;
                    for (null == e && (e = !0), o._remove(a, !0), a._startTime = 0, a._rawPrevTime = a._time = a._totalTime = o._time, r = o._first; r;) n = r._next, e && r instanceof i && r.target === r.vars.onComplete || a.add(r, r._startTime - r._delay), r = n;
                    return o.add(a, 0), a
                }, h.add = function(r, n, a, o) {
                    var h, l, _, u, p;
                    if ("number" != typeof n && (n = this._parseTimeOrLabel(n, 0, !0, r)), !(r instanceof t)) {
                        if (r instanceof Array) {
                            for (a = a || "normal", o = o || 0, h = n, l = r.length, _ = 0; l > _; _++)(u = r[_]) instanceof Array && (u = new s({
                                tweens: u
                            })), this.add(u, h), "string" != typeof u && "function" != typeof u && ("sequence" === a ? h = u._startTime + u.totalDuration() / u._timeScale : "start" === a && (u._startTime -= u.delay())), h += o;
                            return this._uncache(!0)
                        }
                        if ("string" == typeof r) return this.addLabel(r, n);
                        if ("function" != typeof r) throw "Cannot add " + r + " into the timeline; it is neither a tween, timeline, function, nor a string.";
                        r = i.delayedCall(0, r)
                    }
                    if (e.prototype.add.call(this, r, n), this._gc && !this._paused && this._time === this._duration && this._time < this.duration())
                        for (p = this; p._gc && p._timeline;) p._timeline.smoothChildTiming ? p.totalTime(p._totalTime, !0) : p._enabled(!0, !1), p = p._timeline;
                    return this
                }, h.remove = function(e) {
                    if (e instanceof t) return this._remove(e, !1);
                    if (e instanceof Array) {
                        for (var i = e.length; --i > -1;) this.remove(e[i]);
                        return this
                    }
                    return "string" == typeof e ? this.removeLabel(e) : this.kill(null, e)
                }, h._remove = function(t, i) {
                    return e.prototype._remove.call(this, t, i), this._last ? this._time > this._last._startTime && (this._time = this.duration(), this._totalTime = this._totalDuration) : this._time = this._totalTime = 0, this
                }, h.append = function(t, e) {
                    return this.add(t, this._parseTimeOrLabel(null, e, !0, t))
                }, h.insert = h.insertMultiple = function(t, e, i, s) {
                    return this.add(t, e || 0, i, s)
                }, h.appendMultiple = function(t, e, i, s) {
                    return this.add(t, this._parseTimeOrLabel(null, e, !0, t), i, s)
                }, h.addLabel = function(t, e) {
                    return this._labels[t] = this._parseTimeOrLabel(e), this
                }, h.addPause = function(t, e, i, s) {
                    return this.call(a, ["{self}", e, i, s], this, t)
                }, h.removeLabel = function(t) {
                    return delete this._labels[t], this
                }, h.getLabelTime = function(t) {
                    return null != this._labels[t] ? this._labels[t] : -1
                }, h._parseTimeOrLabel = function(e, i, s, r) {
                    var n;
                    if (r instanceof t && r.timeline === this) this.remove(r);
                    else if (r instanceof Array)
                        for (n = r.length; --n > -1;) r[n] instanceof t && r[n].timeline === this && this.remove(r[n]);
                    if ("string" == typeof i) return this._parseTimeOrLabel(i, s && "number" == typeof e && null == this._labels[i] ? e - this.duration() : 0, s);
                    if (i = i || 0, "string" != typeof e || !isNaN(e) && null == this._labels[e]) null == e && (e = this.duration());
                    else {
                        if (n = e.indexOf("="), -1 === n) return null == this._labels[e] ? s ? this._labels[e] = this.duration() + i : i : this._labels[e] + i;
                        i = parseInt(e.charAt(n - 1) + "1", 10) * Number(e.substr(n + 1)), e = n > 1 ? this._parseTimeOrLabel(e.substr(0, n - 1), 0, s) : this.duration()
                    }
                    return Number(e) + i
                }, h.seek = function(t, e) {
                    return this.totalTime("number" == typeof t ? t : this._parseTimeOrLabel(t), e !== !1)
                }, h.stop = function() {
                    return this.paused(!0)
                }, h.gotoAndPlay = function(t, e) {
                    return this.play(t, e)
                }, h.gotoAndStop = function(t, e) {
                    return this.pause(t, e)
                }, h.render = function(t, e, i) {
                    this._gc && this._enabled(!0, !1);
                    var s, n, a, o, h, l = this._dirty ? this.totalDuration() : this._totalDuration,
                        _ = this._time,
                        u = this._startTime,
                        p = this._timeScale,
                        f = this._paused;
                    if (t >= l ? (this._totalTime = this._time = l, this._reversed || this._hasPausedChild() || (n = !0, o = "onComplete", 0 === this._duration && (0 === t || 0 > this._rawPrevTime) && this._rawPrevTime !== t && this._first && (h = !0, this._rawPrevTime > 0 && (o = "onReverseComplete"))), this._rawPrevTime = t, t = l + 1e-6) : 1e-7 > t ? (this._totalTime = this._time = 0, (0 !== _ || 0 === this._duration && this._rawPrevTime > 0) && (o = "onReverseComplete", n = this._reversed), 0 > t ? (this._active = !1, 0 === this._duration && this._rawPrevTime >= 0 && this._first && (h = !0), this._rawPrevTime = t) : (this._rawPrevTime = t, t = 0, this._initted || (h = !0))) : this._totalTime = this._time = this._rawPrevTime = t, this._time !== _ && this._first || i || h) {
                        if (this._initted || (this._initted = !0), this._active || !this._paused && this._time !== _ && t > 0 && (this._active = !0), 0 === _ && this.vars.onStart && 0 !== this._time && (e || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || r)), this._time >= _)
                            for (s = this._first; s && (a = s._next, !this._paused || f);)(s._active || s._startTime <= this._time && !s._paused && !s._gc) && (s._reversed ? s.render((s._dirty ? s.totalDuration() : s._totalDuration) - (t - s._startTime) * s._timeScale, e, i) : s.render((t - s._startTime) * s._timeScale, e, i)), s = a;
                        else
                            for (s = this._last; s && (a = s._prev, !this._paused || f);)(s._active || _ >= s._startTime && !s._paused && !s._gc) && (s._reversed ? s.render((s._dirty ? s.totalDuration() : s._totalDuration) - (t - s._startTime) * s._timeScale, e, i) : s.render((t - s._startTime) * s._timeScale, e, i)), s = a;
                        this._onUpdate && (e || this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || r)), o && (this._gc || (u === this._startTime || p !== this._timeScale) && (0 === this._time || l >= this.totalDuration()) && (n && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[o] && this.vars[o].apply(this.vars[o + "Scope"] || this, this.vars[o + "Params"] || r)))
                    }
                }, h._hasPausedChild = function() {
                    for (var t = this._first; t;) {
                        if (t._paused || t instanceof s && t._hasPausedChild()) return !0;
                        t = t._next
                    }
                    return !1
                }, h.getChildren = function(t, e, s, r) {
                    r = r || -9999999999;
                    for (var n = [], a = this._first, o = 0; a;) r > a._startTime || (a instanceof i ? e !== !1 && (n[o++] = a) : (s !== !1 && (n[o++] = a), t !== !1 && (n = n.concat(a.getChildren(!0, e, s)), o = n.length))), a = a._next;
                    return n
                }, h.getTweensOf = function(t, e) {
                    for (var s = i.getTweensOf(t), r = s.length, n = [], a = 0; --r > -1;)(s[r].timeline === this || e && this._contains(s[r])) && (n[a++] = s[r]);
                    return n
                }, h._contains = function(t) {
                    for (var e = t.timeline; e;) {
                        if (e === this) return !0;
                        e = e.timeline
                    }
                    return !1
                }, h.shiftChildren = function(t, e, i) {
                    i = i || 0;
                    for (var s, r = this._first, n = this._labels; r;) r._startTime >= i && (r._startTime += t), r = r._next;
                    if (e)
                        for (s in n) n[s] >= i && (n[s] += t);
                    return this._uncache(!0)
                }, h._kill = function(t, e) {
                    if (!t && !e) return this._enabled(!1, !1);
                    for (var i = e ? this.getTweensOf(e) : this.getChildren(!0, !0, !1), s = i.length, r = !1; --s > -1;) i[s]._kill(t, e) && (r = !0);
                    return r
                }, h.clear = function(t) {
                    var e = this.getChildren(!1, !0, !0),
                        i = e.length;
                    for (this._time = this._totalTime = 0; --i > -1;) e[i]._enabled(!1, !1);
                    return t !== !1 && (this._labels = {}), this._uncache(!0)
                }, h.invalidate = function() {
                    for (var t = this._first; t;) t.invalidate(), t = t._next;
                    return this
                }, h._enabled = function(t, i) {
                    if (t === this._gc)
                        for (var s = this._first; s;) s._enabled(t, !0), s = s._next;
                    return e.prototype._enabled.call(this, t, i)
                }, h.progress = function(t) {
                    return arguments.length ? this.totalTime(this.duration() * t, !1) : this._time / this.duration()
                }, h.duration = function(t) {
                    return arguments.length ? (0 !== this.duration() && 0 !== t && this.timeScale(this._duration / t), this) : (this._dirty && this.totalDuration(), this._duration)
                }, h.totalDuration = function(t) {
                    if (!arguments.length) {
                        if (this._dirty) {
                            for (var e, i, s = 0, r = this._last, n = 999999999999; r;) e = r._prev, r._dirty && r.totalDuration(), r._startTime > n && this._sortChildren && !r._paused ? this.add(r, r._startTime - r._delay) : n = r._startTime, 0 > r._startTime && !r._paused && (s -= r._startTime, this._timeline.smoothChildTiming && (this._startTime += r._startTime / this._timeScale), this.shiftChildren(-r._startTime, !1, -9999999999), n = 0), i = r._startTime + r._totalDuration / r._timeScale, i > s && (s = i), r = e;
                            this._duration = this._totalDuration = s, this._dirty = !1
                        }
                        return this._totalDuration
                    }
                    return 0 !== this.totalDuration() && 0 !== t && this.timeScale(this._totalDuration / t), this
                }, h.usesFrames = function() {
                    for (var e = this._timeline; e._timeline;) e = e._timeline;
                    return e === t._rootFramesTimeline
                }, h.rawTime = function() {
                    return this._paused || 0 !== this._totalTime && this._totalTime !== this._totalDuration ? this._totalTime : (this._timeline.rawTime() - this._startTime) * this._timeScale
                }, s
            }, !0), window._gsDefine("TimelineMax", ["TimelineLite", "TweenLite", "easing.Ease"], function(t, e, i) {
                var s = function(e) {
                        t.call(this, e), this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._cycle = 0, this._yoyo = this.vars.yoyo === !0, this._dirty = !0
                    },
                    r = [],
                    n = new i(null, null, 1, 0),
                    a = function(t) {
                        for (; t;) {
                            if (t._paused) return !0;
                            t = t._timeline
                        }
                        return !1
                    },
                    o = s.prototype = new t;
                return o.constructor = s, o.kill()._gc = !1, s.version = "1.10.2", o.invalidate = function() {
                    return this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._uncache(!0), t.prototype.invalidate.call(this)
                }, o.addCallback = function(t, i, s, r) {
                    return this.add(e.delayedCall(0, t, s, r), i)
                }, o.removeCallback = function(t, e) {
                    if (t)
                        if (null == e) this._kill(null, t);
                        else
                            for (var i = this.getTweensOf(t, !1), s = i.length, r = this._parseTimeOrLabel(e); --s > -1;) i[s]._startTime === r && i[s]._enabled(!1, !1);
                    return this
                }, o.tweenTo = function(t, i) {
                    i = i || {};
                    var s, a, o = {
                        ease: n,
                        overwrite: 2,
                        useFrames: this.usesFrames(),
                        immediateRender: !1
                    };
                    for (s in i) o[s] = i[s];
                    return o.time = this._parseTimeOrLabel(t), a = new e(this, Math.abs(Number(o.time) - this._time) / this._timeScale || .001, o), o.onStart = function() {
                        a.target.paused(!0), a.vars.time !== a.target.time() && a.duration(Math.abs(a.vars.time - a.target.time()) / a.target._timeScale), i.onStart && i.onStart.apply(i.onStartScope || a, i.onStartParams || r)
                    }, a
                }, o.tweenFromTo = function(t, e, i) {
                    i = i || {}, t = this._parseTimeOrLabel(t), i.startAt = {
                        onComplete: this.seek,
                        onCompleteParams: [t],
                        onCompleteScope: this
                    }, i.immediateRender = i.immediateRender !== !1;
                    var s = this.tweenTo(e, i);
                    return s.duration(Math.abs(s.vars.time - t) / this._timeScale || .001)
                }, o.render = function(t, e, i) {
                    this._gc && this._enabled(!0, !1);
                    var s, n, a, o, h, l, _ = this._dirty ? this.totalDuration() : this._totalDuration,
                        u = this._duration,
                        p = this._time,
                        f = this._totalTime,
                        c = this._startTime,
                        m = this._timeScale,
                        d = this._rawPrevTime,
                        g = this._paused,
                        v = this._cycle;
                    if (t >= _ ? (this._locked || (this._totalTime = _, this._cycle = this._repeat), this._reversed || this._hasPausedChild() || (n = !0, o = "onComplete", 0 === u && (0 === t || 0 > this._rawPrevTime) && this._rawPrevTime !== t && this._first && (h = !0, this._rawPrevTime > 0 && (o = "onReverseComplete"))), this._rawPrevTime = t, this._yoyo && 0 !== (1 & this._cycle) ? this._time = t = 0 : (this._time = u, t = u + 1e-6)) : 1e-7 > t ? (this._locked || (this._totalTime = this._cycle = 0), this._time = 0, (0 !== p || 0 === u && this._rawPrevTime > 0 && !this._locked) && (o = "onReverseComplete", n = this._reversed), 0 > t ? (this._active = !1, 0 === u && this._rawPrevTime >= 0 && this._first && (h = !0), this._rawPrevTime = t) : (this._rawPrevTime = t, t = 0, this._initted || (h = !0))) : (this._time = this._rawPrevTime = t, this._locked || (this._totalTime = t, 0 !== this._repeat && (l = u + this._repeatDelay, this._cycle = this._totalTime / l >> 0, 0 !== this._cycle && this._cycle === this._totalTime / l && this._cycle--, this._time = this._totalTime - this._cycle * l, this._yoyo && 0 !== (1 & this._cycle) && (this._time = u - this._time), this._time > u ? (this._time = u, t = u + 1e-6) : 0 > this._time ? this._time = t = 0 : t = this._time))), this._cycle !== v && !this._locked) {
                        var y = this._yoyo && 0 !== (1 & v),
                            T = y === (this._yoyo && 0 !== (1 & this._cycle)),
                            x = this._totalTime,
                            w = this._cycle,
                            b = this._rawPrevTime,
                            P = this._time;
                        if (this._totalTime = v * u, v > this._cycle ? y = !y : this._totalTime += u, this._time = p, this._rawPrevTime = 0 === u ? d - 1e-5 : d, this._cycle = v, this._locked = !0, p = y ? 0 : u, this.render(p, e, 0 === u), e || this._gc || this.vars.onRepeat && this.vars.onRepeat.apply(this.vars.onRepeatScope || this, this.vars.onRepeatParams || r), T && (p = y ? u + 1e-6 : -1e-6, this.render(p, !0, !1)), this._locked = !1, this._paused && !g) return;
                        this._time = P, this._totalTime = x, this._cycle = w, this._rawPrevTime = b
                    }
                    if (!(this._time !== p && this._first || i || h)) return void(f !== this._totalTime && this._onUpdate && (e || this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || r)));
                    if (this._initted || (this._initted = !0), this._active || !this._paused && this._totalTime !== f && t > 0 && (this._active = !0), 0 === f && this.vars.onStart && 0 !== this._totalTime && (e || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || r)), this._time >= p)
                        for (s = this._first; s && (a = s._next, !this._paused || g);)(s._active || s._startTime <= this._time && !s._paused && !s._gc) && (s._reversed ? s.render((s._dirty ? s.totalDuration() : s._totalDuration) - (t - s._startTime) * s._timeScale, e, i) : s.render((t - s._startTime) * s._timeScale, e, i)), s = a;
                    else
                        for (s = this._last; s && (a = s._prev, !this._paused || g);)(s._active || p >= s._startTime && !s._paused && !s._gc) && (s._reversed ? s.render((s._dirty ? s.totalDuration() : s._totalDuration) - (t - s._startTime) * s._timeScale, e, i) : s.render((t - s._startTime) * s._timeScale, e, i)), s = a;
                    this._onUpdate && (e || this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || r)), o && (this._locked || this._gc || (c === this._startTime || m !== this._timeScale) && (0 === this._time || _ >= this.totalDuration()) && (n && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[o] && this.vars[o].apply(this.vars[o + "Scope"] || this, this.vars[o + "Params"] || r)))
                }, o.getActive = function(t, e, i) {
                    null == t && (t = !0), null == e && (e = !0), null == i && (i = !1);
                    var s, r, n = [],
                        o = this.getChildren(t, e, i),
                        h = 0,
                        l = o.length;
                    for (s = 0; l > s; s++) r = o[s], r._paused || r._timeline._time >= r._startTime && r._timeline._time < r._startTime + r._totalDuration / r._timeScale && (a(r._timeline) || (n[h++] = r));
                    return n
                }, o.getLabelAfter = function(t) {
                    t || 0 !== t && (t = this._time);
                    var e, i = this.getLabelsArray(),
                        s = i.length;
                    for (e = 0; s > e; e++)
                        if (i[e].time > t) return i[e].name;
                    return null
                }, o.getLabelBefore = function(t) {
                    null == t && (t = this._time);
                    for (var e = this.getLabelsArray(), i = e.length; --i > -1;)
                        if (t > e[i].time) return e[i].name;
                    return null
                }, o.getLabelsArray = function() {
                    var t, e = [],
                        i = 0;
                    for (t in this._labels) e[i++] = {
                        time: this._labels[t],
                        name: t
                    };
                    return e.sort(function(t, e) {
                        return t.time - e.time
                    }), e
                }, o.progress = function(t) {
                    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - t : t) + this._cycle * (this._duration + this._repeatDelay), !1) : this._time / this.duration()
                }, o.totalProgress = function(t) {
                    return arguments.length ? this.totalTime(this.totalDuration() * t, !1) : this._totalTime / this.totalDuration()
                }, o.totalDuration = function(e) {
                    return arguments.length ? -1 === this._repeat ? this : this.duration((e - this._repeat * this._repeatDelay) / (this._repeat + 1)) : (this._dirty && (t.prototype.totalDuration.call(this), this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat), this._totalDuration)
                }, o.time = function(t, e) {
                    return arguments.length ? (this._dirty && this.totalDuration(), t > this._duration && (t = this._duration), this._yoyo && 0 !== (1 & this._cycle) ? t = this._duration - t + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (t += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(t, e)) : this._time
                }, o.repeat = function(t) {
                    return arguments.length ? (this._repeat = t, this._uncache(!0)) : this._repeat
                }, o.repeatDelay = function(t) {
                    return arguments.length ? (this._repeatDelay = t, this._uncache(!0)) : this._repeatDelay
                }, o.yoyo = function(t) {
                    return arguments.length ? (this._yoyo = t, this) : this._yoyo
                }, o.currentLabel = function(t) {
                    return arguments.length ? this.seek(t, !0) : this.getLabelBefore(this._time + 1e-8)
                }, s
            }, !0),
            function() {
                var t = 180 / Math.PI,
                    e = Math.PI / 180,
                    i = [],
                    s = [],
                    r = [],
                    n = {},
                    a = function(t, e, i, s) {
                        this.a = t, this.b = e, this.c = i, this.d = s, this.da = s - t, this.ca = i - t, this.ba = e - t
                    },
                    o = ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,",
                    h = function(t, e, i, s) {
                        var r = {
                                a: t
                            },
                            n = {},
                            a = {},
                            o = {
                                c: s
                            },
                            h = (t + e) / 2,
                            l = (e + i) / 2,
                            _ = (i + s) / 2,
                            u = (h + l) / 2,
                            p = (l + _) / 2,
                            f = (p - u) / 8;
                        return r.b = h + (t - h) / 4, n.b = u + f, r.c = n.a = (r.b + n.b) / 2, n.c = a.a = (u + p) / 2, a.b = p - f, o.b = _ + (s - _) / 4, a.c = o.a = (a.b + o.b) / 2, [r, n, a, o]
                    },
                    l = function(t, e, n, a, o) {
                        var l, _, u, p, f, c, m, d, g, v, y, T, x, w = t.length - 1,
                            b = 0,
                            P = t[0].a;
                        for (l = 0; w > l; l++) f = t[b], _ = f.a, u = f.d, p = t[b + 1].d, o ? (y = i[l], T = s[l], x = .25 * (T + y) * e / (a ? .5 : r[l] || .5), c = u - (u - _) * (a ? .5 * e : 0 !== y ? x / y : 0), m = u + (p - u) * (a ? .5 * e : 0 !== T ? x / T : 0), d = u - (c + ((m - c) * (3 * y / (y + T) + .5) / 4 || 0))) : (c = u - .5 * (u - _) * e, m = u + .5 * (p - u) * e, d = u - (c + m) / 2), c += d, m += d, f.c = g = c, f.b = 0 !== l ? P : P = f.a + .6 * (f.c - f.a), f.da = u - _, f.ca = g - _, f.ba = P - _, n ? (v = h(_, P, g, u), t.splice(b, 1, v[0], v[1], v[2], v[3]), b += 4) : b++, P = m;
                        f = t[b], f.b = P, f.c = P + .4 * (f.d - P), f.da = f.d - f.a, f.ca = f.c - f.a, f.ba = P - f.a, n && (v = h(f.a, P, f.c, f.d), t.splice(b, 1, v[0], v[1], v[2], v[3]))
                    },
                    _ = function(t, e, r, n) {
                        var o, h, l, _, u, p, f = [];
                        if (n)
                            for (t = [n].concat(t), h = t.length; --h > -1;) "string" == typeof(p = t[h][e]) && "=" === p.charAt(1) && (t[h][e] = n[e] + Number(p.charAt(0) + p.substr(2)));
                        if (o = t.length - 2, 0 > o) return f[0] = new a(t[0][e], 0, 0, t[-1 > o ? 0 : 1][e]), f;
                        for (h = 0; o > h; h++) l = t[h][e], _ = t[h + 1][e], f[h] = new a(l, 0, 0, _), r && (u = t[h + 2][e], i[h] = (i[h] || 0) + (_ - l) * (_ - l), s[h] = (s[h] || 0) + (u - _) * (u - _));
                        return f[h] = new a(t[h][e], 0, 0, t[h + 1][e]), f
                    },
                    u = function(t, e, a, h, u, p) {
                        var f, c, m, d, g, v, y, T, x = {},
                            w = [],
                            b = p || t[0];
                        u = "string" == typeof u ? "," + u + "," : o, null == e && (e = 1);
                        for (c in t[0]) w.push(c);
                        if (t.length > 1) {
                            for (T = t[t.length - 1], y = !0, f = w.length; --f > -1;)
                                if (c = w[f], Math.abs(b[c] - T[c]) > .05) {
                                    y = !1;
                                    break
                                }
                            y && (t = t.concat(), p && t.unshift(p), t.push(t[1]), p = t[t.length - 3])
                        }
                        for (i.length = s.length = r.length = 0, f = w.length; --f > -1;) c = w[f], n[c] = -1 !== u.indexOf("," + c + ","), x[c] = _(t, c, n[c], p);
                        for (f = i.length; --f > -1;) i[f] = Math.sqrt(i[f]), s[f] = Math.sqrt(s[f]);
                        if (!h) {
                            for (f = w.length; --f > -1;)
                                if (n[c])
                                    for (m = x[w[f]], v = m.length - 1, d = 0; v > d; d++) g = m[d + 1].da / s[d] + m[d].da / i[d], r[d] = (r[d] || 0) + g * g;
                            for (f = r.length; --f > -1;) r[f] = Math.sqrt(r[f])
                        }
                        for (f = w.length, d = a ? 4 : 1; --f > -1;) c = w[f], m = x[c], l(m, e, a, h, n[c]), y && (m.splice(0, d), m.splice(m.length - d, d));
                        return x
                    },
                    p = function(t, e, i) {
                        e = e || "soft";
                        var s, r, n, o, h, l, _, u, p, f, c, m = {},
                            d = "cubic" === e ? 3 : 2,
                            g = "soft" === e,
                            v = [];
                        if (g && i && (t = [i].concat(t)), null == t || d + 1 > t.length) throw "invalid Bezier data";
                        for (p in t[0]) v.push(p);
                        for (l = v.length; --l > -1;) {
                            for (p = v[l], m[p] = h = [], f = 0, u = t.length, _ = 0; u > _; _++) s = null == i ? t[_][p] : "string" == typeof(c = t[_][p]) && "=" === c.charAt(1) ? i[p] + Number(c.charAt(0) + c.substr(2)) : Number(c), g && _ > 1 && u - 1 > _ && (h[f++] = (s + h[f - 2]) / 2), h[f++] = s;
                            for (u = f - d + 1, f = 0, _ = 0; u > _; _ += d) s = h[_], r = h[_ + 1], n = h[_ + 2], o = 2 === d ? 0 : h[_ + 3], h[f++] = c = 3 === d ? new a(s, r, n, o) : new a(s, (2 * r + s) / 3, (2 * r + n) / 3, n);
                            h.length = f
                        }
                        return m
                    },
                    f = function(t, e, i) {
                        for (var s, r, n, a, o, h, l, _, u, p, f, c = 1 / i, m = t.length; --m > -1;)
                            for (p = t[m], n = p.a, a = p.d - n, o = p.c - n, h = p.b - n, s = r = 0, _ = 1; i >= _; _++) l = c * _, u = 1 - l, s = r - (r = (l * l * a + 3 * u * (l * o + u * h)) * l), f = m * i + _ - 1, e[f] = (e[f] || 0) + s * s
                    },
                    c = function(t, e) {
                        e = e >> 0 || 6;
                        var i, s, r, n, a = [],
                            o = [],
                            h = 0,
                            l = 0,
                            _ = e - 1,
                            u = [],
                            p = [];
                        for (i in t) f(t[i], a, e);
                        for (r = a.length, s = 0; r > s; s++) h += Math.sqrt(a[s]), n = s % e, p[n] = h, n === _ && (l += h, n = s / e >> 0, u[n] = p, o[n] = l, h = 0, p = []);
                        return {
                            length: l,
                            lengths: o,
                            segments: u
                        }
                    },
                    m = window._gsDefine.plugin({
                        propName: "bezier",
                        priority: -1,
                        API: 2,
                        global: !0,
                        init: function(t, e, i) {
                            this._target = t, e instanceof Array && (e = {
                                values: e
                            }), this._func = {}, this._round = {}, this._props = [], this._timeRes = null == e.timeResolution ? 6 : parseInt(e.timeResolution, 10);
                            var s, r, n, a, o, h = e.values || [],
                                l = {},
                                _ = h[0],
                                f = e.autoRotate || i.vars.orientToBezier;
                            this._autoRotate = f ? f instanceof Array ? f : [
                                ["x", "y", "rotation", f === !0 ? 0 : Number(f) || 0]
                            ] : null;
                            for (s in _) this._props.push(s);
                            for (n = this._props.length; --n > -1;) s = this._props[n], this._overwriteProps.push(s), r = this._func[s] = "function" == typeof t[s], l[s] = r ? t[s.indexOf("set") || "function" != typeof t["get" + s.substr(3)] ? s : "get" + s.substr(3)]() : parseFloat(t[s]), o || l[s] !== h[0][s] && (o = l);
                            if (this._beziers = "cubic" !== e.type && "quadratic" !== e.type && "soft" !== e.type ? u(h, isNaN(e.curviness) ? 1 : e.curviness, !1, "thruBasic" === e.type, e.correlate, o) : p(h, e.type, l), this._segCount = this._beziers[s].length, this._timeRes) {
                                var m = c(this._beziers, this._timeRes);
                                this._length = m.length, this._lengths = m.lengths, this._segments = m.segments, this._l1 = this._li = this._s1 = this._si = 0, this._l2 = this._lengths[0], this._curSeg = this._segments[0], this._s2 = this._curSeg[0], this._prec = 1 / this._curSeg.length
                            }
                            if (f = this._autoRotate)
                                for (f[0] instanceof Array || (this._autoRotate = f = [f]), n = f.length; --n > -1;)
                                    for (a = 0; 3 > a; a++) s = f[n][a], this._func[s] = "function" == typeof t[s] && t[s.indexOf("set") || "function" != typeof t["get" + s.substr(3)] ? s : "get" + s.substr(3)];
                            return !0
                        },
                        set: function(e) {
                            var i, s, r, n, a, o, h, l, _, u, p = this._segCount,
                                f = this._func,
                                c = this._target;
                            if (this._timeRes) {
                                if (_ = this._lengths, u = this._curSeg, e *= this._length, r = this._li, e > this._l2 && p - 1 > r) {
                                    for (l = p - 1; l > r && e >= (this._l2 = _[++r]););
                                    this._l1 = _[r - 1], this._li = r, this._curSeg = u = this._segments[r], this._s2 = u[this._s1 = this._si = 0]
                                } else if (this._l1 > e && r > 0) {
                                    for (; r > 0 && (this._l1 = _[--r]) >= e;);
                                    0 === r && this._l1 > e ? this._l1 = 0 : r++, this._l2 = _[r], this._li = r, this._curSeg = u = this._segments[r], this._s1 = u[(this._si = u.length - 1) - 1] || 0, this._s2 = u[this._si]
                                }
                                if (i = r, e -= this._l1, r = this._si, e > this._s2 && u.length - 1 > r) {
                                    for (l = u.length - 1; l > r && e >= (this._s2 = u[++r]););
                                    this._s1 = u[r - 1], this._si = r
                                } else if (this._s1 > e && r > 0) {
                                    for (; r > 0 && (this._s1 = u[--r]) >= e;);
                                    0 === r && this._s1 > e ? this._s1 = 0 : r++, this._s2 = u[r], this._si = r
                                }
                                o = (r + (e - this._s1) / (this._s2 - this._s1)) * this._prec
                            } else i = 0 > e ? 0 : e >= 1 ? p - 1 : p * e >> 0, o = (e - i * (1 / p)) * p;
                            for (s = 1 - o, r = this._props.length; --r > -1;) n = this._props[r], a = this._beziers[n][i], h = (o * o * a.da + 3 * s * (o * a.ca + s * a.ba)) * o + a.a, this._round[n] && (h = h + (h > 0 ? .5 : -.5) >> 0), f[n] ? c[n](h) : c[n] = h;
                            if (this._autoRotate) {
                                var m, d, g, v, y, T, x, w = this._autoRotate;
                                for (r = w.length; --r > -1;) n = w[r][2], T = w[r][3] || 0, x = w[r][4] === !0 ? 1 : t, a = this._beziers[w[r][0]], m = this._beziers[w[r][1]], a && m && (a = a[i], m = m[i], d = a.a + (a.b - a.a) * o, v = a.b + (a.c - a.b) * o, d += (v - d) * o, v += (a.c + (a.d - a.c) * o - v) * o, g = m.a + (m.b - m.a) * o, y = m.b + (m.c - m.b) * o, g += (y - g) * o, y += (m.c + (m.d - m.c) * o - y) * o, h = Math.atan2(y - g, v - d) * x + T, f[n] ? c[n](h) : c[n] = h)
                            }
                        }
                    }),
                    d = m.prototype;
                m.bezierThrough = u, m.cubicToQuadratic = h, m._autoCSS = !0, m.quadraticToCubic = function(t, e, i) {
                    return new a(t, (2 * e + t) / 3, (2 * e + i) / 3, i)
                }, m._cssRegister = function() {
                    var t = window._gsDefine.globals.CSSPlugin;
                    if (t) {
                        var i = t._internals,
                            s = i._parseToProxy,
                            r = i._setPluginRatio,
                            n = i.CSSPropTween;
                        i._registerComplexSpecialProp("bezier", {
                            parser: function(t, i, a, o, h, l) {
                                i instanceof Array && (i = {
                                    values: i
                                }), l = new m;
                                var _, u, p, f = i.values,
                                    c = f.length - 1,
                                    d = [],
                                    g = {};
                                if (0 > c) return h;
                                for (_ = 0; c >= _; _++) p = s(t, f[_], o, h, l, c !== _), d[_] = p.end;
                                for (u in i) g[u] = i[u];
                                return g.values = d, h = new n(t, "bezier", 0, 0, p.pt, 2), h.data = p, h.plugin = l, h.setRatio = r, 0 === g.autoRotate && (g.autoRotate = !0), !g.autoRotate || g.autoRotate instanceof Array || (_ = g.autoRotate === !0 ? 0 : Number(g.autoRotate) * e,
                                    g.autoRotate = null != p.end.left ? [
                                        ["left", "top", "rotation", _, !0]
                                    ] : null != p.end.x && [
                                        ["x", "y", "rotation", _, !0]
                                    ]), g.autoRotate && (o._transform || o._enableTransforms(!1), p.autoRotate = o._target._gsTransform), l._onInitTween(p.proxy, g, o._tween), h
                            }
                        })
                    }
                }, d._roundProps = function(t, e) {
                    for (var i = this._overwriteProps, s = i.length; --s > -1;)(t[i[s]] || t.bezier || t.bezierThrough) && (this._round[i[s]] = e)
                }, d._kill = function(t) {
                    var e, i, s = this._props;
                    for (e in this._beziers)
                        if (e in t)
                            for (delete this._beziers[e], delete this._func[e], i = s.length; --i > -1;) s[i] === e && s.splice(i, 1);
                    return this._super._kill.call(this, t)
                }
            }(), window._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function(t, e) {
                var i, s, r, n, a = function() {
                        t.call(this, "css"), this._overwriteProps.length = 0, this.setRatio = a.prototype.setRatio
                    },
                    o = {},
                    h = a.prototype = new t("css");
                h.constructor = a, a.version = "1.10.2", a.API = 2, a.defaultTransformPerspective = 0, h = "px", a.suffixMap = {
                    top: h,
                    right: h,
                    bottom: h,
                    left: h,
                    width: h,
                    height: h,
                    fontSize: h,
                    padding: h,
                    margin: h,
                    perspective: h
                };
                var l, _, u, p, f, c, m = /(?:\d|\-\d|\.\d|\-\.\d)+/g,
                    d = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
                    g = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
                    v = /[^\d\-\.]/g,
                    y = /(?:\d|\-|\+|=|#|\.)*/g,
                    T = /opacity *= *([^)]*)/,
                    x = /opacity:([^;]*)/,
                    w = /alpha\(opacity *=.+?\)/i,
                    b = /^(rgb|hsl)/,
                    P = /([A-Z])/g,
                    S = /-([a-z])/gi,
                    R = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
                    k = function(t, e) {
                        return e.toUpperCase()
                    },
                    A = /(?:Left|Right|Width)/i,
                    C = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
                    O = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
                    M = /,(?=[^\)]*(?:\(|$))/gi,
                    D = Math.PI / 180,
                    I = 180 / Math.PI,
                    F = {},
                    X = document,
                    N = X.createElement("div"),
                    L = X.createElement("img"),
                    E = a._internals = {
                        _specialProps: o
                    },
                    z = navigator.userAgent,
                    Y = function() {
                        var t, e = z.indexOf("Android"),
                            i = X.createElement("div");
                        return u = -1 !== z.indexOf("Safari") && -1 === z.indexOf("Chrome") && (-1 === e || Number(z.substr(e + 8, 1)) > 3), f = u && 6 > Number(z.substr(z.indexOf("Version/") + 8, 1)), p = -1 !== z.indexOf("Firefox"), /MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(z), c = parseFloat(RegExp.$1), i.innerHTML = "<a style='top:1px;opacity:.55;'>a</a>", t = i.getElementsByTagName("a")[0], !!t && /^0.55/.test(t.style.opacity)
                    }(),
                    U = function(t) {
                        return T.test("string" == typeof t ? t : (t.currentStyle ? t.currentStyle.filter : t.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1
                    },
                    B = function(t) {
                        window.console && gradle.event(t)
                    },
                    j = "",
                    V = "",
                    q = function(t, e) {
                        e = e || N;
                        var i, s, r = e.style;
                        if (void 0 !== r[t]) return t;
                        for (t = t.charAt(0).toUpperCase() + t.substr(1), i = ["O", "Moz", "ms", "Ms", "Webkit"], s = 5; --s > -1 && void 0 === r[i[s] + t];);
                        return s >= 0 ? (V = 3 === s ? "ms" : i[s], j = "-" + V.toLowerCase() + "-", V + t) : null
                    },
                    Z = X.defaultView ? X.defaultView.getComputedStyle : function() {},
                    W = a.getStyle = function(t, e, i, s, r) {
                        var n;
                        return Y || "opacity" !== e ? (!s && t.style[e] ? n = t.style[e] : (i = i || Z(t, null)) ? (t = i.getPropertyValue(e.replace(P, "-$1").toLowerCase()), n = t || i.length ? t : i[e]) : t.currentStyle && (n = t.currentStyle[e]), null == r || n && "none" !== n && "auto" !== n && "auto auto" !== n ? n : r) : U(t)
                    },
                    $ = function(t, e, i, s, r) {
                        if ("px" === s || !s) return i;
                        if ("auto" === s || !i) return 0;
                        var n, a = A.test(e),
                            o = t,
                            h = N.style,
                            l = 0 > i;
                        return l && (i = -i), "%" === s && -1 !== e.indexOf("border") ? n = i / 100 * (a ? t.clientWidth : t.clientHeight) : (h.cssText = "border-style:solid; border-width:0; position:absolute; line-height:0;", "%" !== s && o.appendChild ? h[a ? "borderLeftWidth" : "borderTopWidth"] = i + s : (o = t.parentNode || X.body, h[a ? "width" : "height"] = i + s), o.appendChild(N), n = parseFloat(N[a ? "offsetWidth" : "offsetHeight"]), o.removeChild(N), 0 !== n || r || (n = $(t, e, i, s, !0))), l ? -n : n
                    },
                    G = function(t, e, i) {
                        if ("absolute" !== W(t, "position", i)) return 0;
                        var s = "left" === e ? "Left" : "Top",
                            r = W(t, "margin" + s, i);
                        return t["offset" + s] - ($(t, e, parseFloat(r), r.replace(y, "")) || 0)
                    },
                    Q = function(t, e) {
                        var i, s, r = {};
                        if (e = e || Z(t, null))
                            if (i = e.length)
                                for (; --i > -1;) r[e[i].replace(S, k)] = e.getPropertyValue(e[i]);
                            else
                                for (i in e) r[i] = e[i];
                        else if (e = t.currentStyle || t.style)
                            for (i in e) r[i.replace(S, k)] = e[i];
                        return Y || (r.opacity = U(t)), s = bt(t, e, !1), r.rotation = s.rotation * I, r.skewX = s.skewX * I, r.scaleX = s.scaleX, r.scaleY = s.scaleY, r.x = s.x, r.y = s.y, wt && (r.z = s.z, r.rotationX = s.rotationX * I, r.rotationY = s.rotationY * I, r.scaleZ = s.scaleZ), r.filters && delete r.filters, r
                    },
                    H = function(t, e, i, s, r) {
                        var n, a, o, h = {},
                            l = t.style;
                        for (a in i) "cssText" !== a && "length" !== a && isNaN(a) && (e[a] !== (n = i[a]) || r && r[a]) && -1 === a.indexOf("Origin") && ("number" == typeof n || "string" == typeof n) && (h[a] = "auto" !== n || "left" !== a && "top" !== a ? "" !== n && "auto" !== n && "none" !== n || "string" != typeof e[a] || "" === e[a].replace(v, "") ? n : 0 : G(t, a), void 0 !== l[a] && (o = new ut(l, a, l[a], o)));
                        if (s)
                            for (a in s) "className" !== a && (h[a] = s[a]);
                        return {
                            difs: h,
                            firstMPT: o
                        }
                    },
                    K = {
                        width: ["Left", "Right"],
                        height: ["Top", "Bottom"]
                    },
                    J = ["marginLeft", "marginRight", "marginTop", "marginBottom"],
                    tt = function(t, e, i) {
                        var s = parseFloat("width" === e ? t.offsetWidth : t.offsetHeight),
                            r = K[e],
                            n = r.length;
                        for (i = i || Z(t, null); --n > -1;) s -= parseFloat(W(t, "padding" + r[n], i, !0)) || 0, s -= parseFloat(W(t, "border" + r[n] + "Width", i, !0)) || 0;
                        return s
                    },
                    et = function(t, e) {
                        (null == t || "" === t || "auto" === t || "auto auto" === t) && (t = "0 0");
                        var i = t.split(" "),
                            s = -1 !== t.indexOf("left") ? "0%" : -1 !== t.indexOf("right") ? "100%" : i[0],
                            r = -1 !== t.indexOf("top") ? "0%" : -1 !== t.indexOf("bottom") ? "100%" : i[1];
                        return null == r ? r = "0" : "center" === r && (r = "50%"), ("center" === s || isNaN(parseFloat(s)) && -1 === (s + "").indexOf("=")) && (s = "50%"), e && (e.oxp = -1 !== s.indexOf("%"), e.oyp = -1 !== r.indexOf("%"), e.oxr = "=" === s.charAt(1), e.oyr = "=" === r.charAt(1), e.ox = parseFloat(s.replace(v, "")), e.oy = parseFloat(r.replace(v, ""))), s + " " + r + (i.length > 2 ? " " + i[2] : "")
                    },
                    it = function(t, e) {
                        return "string" == typeof t && "=" === t.charAt(1) ? parseInt(t.charAt(0) + "1", 10) * parseFloat(t.substr(2)) : parseFloat(t) - parseFloat(e)
                    },
                    st = function(t, e) {
                        return null == t ? e : "string" == typeof t && "=" === t.charAt(1) ? parseInt(t.charAt(0) + "1", 10) * Number(t.substr(2)) + e : parseFloat(t)
                    },
                    rt = function(t, e, i, s) {
                        var r, n, a, o, h = 1e-6;
                        return null == t ? o = e : "number" == typeof t ? o = t * D : (r = 2 * Math.PI, n = t.split("_"), a = Number(n[0].replace(v, "")) * (-1 === t.indexOf("rad") ? D : 1) - ("=" === t.charAt(1) ? 0 : e), n.length && (s && (s[i] = e + a), -1 !== t.indexOf("short") && (a %= r, a !== a % (r / 2) && (a = 0 > a ? a + r : a - r)), -1 !== t.indexOf("_cw") && 0 > a ? a = (a + 9999999999 * r) % r - (0 | a / r) * r : -1 !== t.indexOf("ccw") && a > 0 && (a = (a - 9999999999 * r) % r - (0 | a / r) * r)), o = e + a), h > o && o > -h && (o = 0), o
                    },
                    nt = {
                        aqua: [0, 255, 255],
                        lime: [0, 255, 0],
                        silver: [192, 192, 192],
                        black: [0, 0, 0],
                        maroon: [128, 0, 0],
                        teal: [0, 128, 128],
                        blue: [0, 0, 255],
                        navy: [0, 0, 128],
                        white: [255, 255, 255],
                        fuchsia: [255, 0, 255],
                        olive: [128, 128, 0],
                        yellow: [255, 255, 0],
                        orange: [255, 165, 0],
                        gray: [128, 128, 128],
                        purple: [128, 0, 128],
                        green: [0, 128, 0],
                        red: [255, 0, 0],
                        pink: [255, 192, 203],
                        cyan: [0, 255, 255],
                        transparent: [255, 255, 255, 0]
                    },
                    at = function(t, e, i) {
                        return t = 0 > t ? t + 1 : t > 1 ? t - 1 : t, 0 | 255 * (1 > 6 * t ? e + 6 * (i - e) * t : .5 > t ? i : 2 > 3 * t ? e + 6 * (i - e) * (2 / 3 - t) : e) + .5
                    },
                    ot = function(t) {
                        var e, i, s, r, n, a;
                        return t && "" !== t ? "number" == typeof t ? [t >> 16, 255 & t >> 8, 255 & t] : ("," === t.charAt(t.length - 1) && (t = t.substr(0, t.length - 1)), nt[t] ? nt[t] : "#" === t.charAt(0) ? (4 === t.length && (e = t.charAt(1), i = t.charAt(2), s = t.charAt(3), t = "#" + e + e + i + i + s + s), t = parseInt(t.substr(1), 16), [t >> 16, 255 & t >> 8, 255 & t]) : "hsl" === t.substr(0, 3) ? (t = t.match(m), r = Number(t[0]) % 360 / 360, n = Number(t[1]) / 100, a = Number(t[2]) / 100, i = .5 >= a ? a * (n + 1) : a + n - a * n, e = 2 * a - i, t.length > 3 && (t[3] = Number(t[3])), t[0] = at(r + 1 / 3, e, i), t[1] = at(r, e, i), t[2] = at(r - 1 / 3, e, i), t) : (t = t.match(m) || nt.transparent, t[0] = Number(t[0]), t[1] = Number(t[1]), t[2] = Number(t[2]), t.length > 3 && (t[3] = Number(t[3])), t)) : nt.black
                    },
                    ht = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#.+?\\b";
                for (h in nt) ht += "|" + h + "\\b";
                ht = RegExp(ht + ")", "gi");
                var lt = function(t, e, i, s) {
                        if (null == t) return function(t) {
                            return t
                        };
                        var r, n = e ? (t.match(ht) || [""])[0] : "",
                            a = t.split(n).join("").match(g) || [],
                            o = t.substr(0, t.indexOf(a[0])),
                            h = ")" === t.charAt(t.length - 1) ? ")" : "",
                            l = -1 !== t.indexOf(" ") ? " " : ",",
                            _ = a.length,
                            u = _ > 0 ? a[0].replace(m, "") : "";
                        return _ ? r = e ? function(t) {
                            var e, p, f, c;
                            if ("number" == typeof t) t += u;
                            else if (s && M.test(t)) {
                                for (c = t.replace(M, "|").split("|"), f = 0; c.length > f; f++) c[f] = r(c[f]);
                                return c.join(",")
                            }
                            if (e = (t.match(ht) || [n])[0], p = t.split(e).join("").match(g) || [], f = p.length, _ > f--)
                                for (; _ > ++f;) p[f] = i ? p[0 | (f - 1) / 2] : a[f];
                            return o + p.join(l) + l + e + h + (-1 !== t.indexOf("inset") ? " inset" : "")
                        } : function(t) {
                            var e, n, p;
                            if ("number" == typeof t) t += u;
                            else if (s && M.test(t)) {
                                for (n = t.replace(M, "|").split("|"), p = 0; n.length > p; p++) n[p] = r(n[p]);
                                return n.join(",")
                            }
                            if (e = t.match(g) || [], p = e.length, _ > p--)
                                for (; _ > ++p;) e[p] = i ? e[0 | (p - 1) / 2] : a[p];
                            return o + e.join(l) + h
                        } : function(t) {
                            return t
                        }
                    },
                    _t = function(t) {
                        return t = t.split(","),
                            function(e, i, s, r, n, a, o) {
                                var h, l = (i + "").split(" ");
                                for (o = {}, h = 0; 4 > h; h++) o[t[h]] = l[h] = l[h] || l[(h - 1) / 2 >> 0];
                                return r.parse(e, o, n, a)
                            }
                    },
                    ut = (E._setPluginRatio = function(t) {
                        this.plugin.setRatio(t);
                        for (var e, i, s, r, n = this.data, a = n.proxy, o = n.firstMPT, h = 1e-6; o;) e = a[o.v], o.r ? e = e > 0 ? 0 | e + .5 : 0 | e - .5 : h > e && e > -h && (e = 0), o.t[o.p] = e, o = o._next;
                        if (n.autoRotate && (n.autoRotate.rotation = a.rotation), 1 === t)
                            for (o = n.firstMPT; o;) {
                                if (i = o.t, i.type) {
                                    if (1 === i.type) {
                                        for (r = i.xs0 + i.s + i.xs1, s = 1; i.l > s; s++) r += i["xn" + s] + i["xs" + (s + 1)];
                                        i.e = r
                                    }
                                } else i.e = i.s + i.xs0;
                                o = o._next
                            }
                    }, function(t, e, i, s, r) {
                        this.t = t, this.p = e, this.v = i, this.r = r, s && (s._prev = this, this._next = s)
                    }),
                    pt = (E._parseToProxy = function(t, e, i, s, r, n) {
                        var a, o, h, l, _, u = s,
                            p = {},
                            f = {},
                            c = i._transform,
                            m = F;
                        for (i._transform = null, F = e, s = _ = i.parse(t, e, s, r), F = m, n && (i._transform = c, u && (u._prev = null, u._prev && (u._prev._next = null))); s && s !== u;) {
                            if (1 >= s.type && (o = s.p, f[o] = s.s + s.c, p[o] = s.s, n || (l = new ut(s, "s", o, l, s.r), s.c = 0), 1 === s.type))
                                for (a = s.l; --a > 0;) h = "xn" + a, o = s.p + "_" + h, f[o] = s.data[h], p[o] = s[h], n || (l = new ut(s, h, o, l, s.rxp[h]));
                            s = s._next
                        }
                        return {
                            proxy: p,
                            end: f,
                            firstMPT: l,
                            pt: _
                        }
                    }, E.CSSPropTween = function(t, e, s, r, a, o, h, l, _, u, p) {
                        this.t = t, this.p = e, this.s = s, this.c = r, this.n = h || e, t instanceof pt || n.push(this.n), this.r = l, this.type = o || 0, _ && (this.pr = _, i = !0), this.b = void 0 === u ? s : u, this.e = void 0 === p ? s + r : p, a && (this._next = a, a._prev = this)
                    }),
                    ft = a.parseComplex = function(t, e, i, s, r, n, a, o, h, _) {
                        i = i || n || "", a = new pt(t, e, 0, 0, a, _ ? 2 : 1, null, (!1), o, i, s), s += "";
                        var u, p, f, c, g, v, y, T, x, w, P, S, R = i.split(", ").join(",").split(" "),
                            k = s.split(", ").join(",").split(" "),
                            A = R.length,
                            C = l !== !1;
                        for ((-1 !== s.indexOf(",") || -1 !== i.indexOf(",")) && (R = R.join(" ").replace(M, ", ").split(" "), k = k.join(" ").replace(M, ", ").split(" "), A = R.length), A !== k.length && (R = (n || "").split(" "), A = R.length), a.plugin = h, a.setRatio = _, u = 0; A > u; u++)
                            if (c = R[u], g = k[u], T = parseFloat(c), T || 0 === T) a.appendXtra("", T, it(g, T), g.replace(d, ""), C && -1 !== g.indexOf("px"), !0);
                            else if (r && ("#" === c.charAt(0) || nt[c] || b.test(c))) S = "," === g.charAt(g.length - 1) ? ")," : ")", c = ot(c), g = ot(g), x = c.length + g.length > 6, x && !Y && 0 === g[3] ? (a["xs" + a.l] += a.l ? " transparent" : "transparent", a.e = a.e.split(k[u]).join("transparent")) : (Y || (x = !1), a.appendXtra(x ? "rgba(" : "rgb(", c[0], g[0] - c[0], ",", !0, !0).appendXtra("", c[1], g[1] - c[1], ",", !0).appendXtra("", c[2], g[2] - c[2], x ? "," : S, !0), x && (c = 4 > c.length ? 1 : c[3], a.appendXtra("", c, (4 > g.length ? 1 : g[3]) - c, S, !1)));
                        else if (v = c.match(m)) {
                            if (y = g.match(d), !y || y.length !== v.length) return a;
                            for (f = 0, p = 0; v.length > p; p++) P = v[p], w = c.indexOf(P, f), a.appendXtra(c.substr(f, w - f), Number(P), it(y[p], P), "", C && "px" === c.substr(w + P.length, 2), 0 === p), f = w + P.length;
                            a["xs" + a.l] += c.substr(f)
                        } else a["xs" + a.l] += a.l ? " " + c : c;
                        if (-1 !== s.indexOf("=") && a.data) {
                            for (S = a.xs0 + a.data.s, u = 1; a.l > u; u++) S += a["xs" + u] + a.data["xn" + u];
                            a.e = S + a["xs" + u]
                        }
                        return a.l || (a.type = -1, a.xs0 = a.e), a.xfirst || a
                    },
                    ct = 9;
                for (h = pt.prototype, h.l = h.pr = 0; --ct > 0;) h["xn" + ct] = 0, h["xs" + ct] = "";
                h.xs0 = "", h._next = h._prev = h.xfirst = h.data = h.plugin = h.setRatio = h.rxp = null, h.appendXtra = function(t, e, i, s, r, n) {
                    var a = this,
                        o = a.l;
                    return a["xs" + o] += n && o ? " " + t : t || "", i || 0 === o || a.plugin ? (a.l++, a.type = a.setRatio ? 2 : 1, a["xs" + a.l] = s || "", o > 0 ? (a.data["xn" + o] = e + i, a.rxp["xn" + o] = r, a["xn" + o] = e, a.plugin || (a.xfirst = new pt(a, "xn" + o, e, i, a.xfirst || a, 0, a.n, r, a.pr), a.xfirst.xs0 = 0), a) : (a.data = {
                        s: e + i
                    }, a.rxp = {}, a.s = e, a.c = i, a.r = r, a)) : (a["xs" + o] += e + (s || ""), a)
                };
                var mt = function(t, e) {
                        e = e || {}, this.p = e.prefix ? q(t) || t : t, o[t] = o[this.p] = this, this.format = e.formatter || lt(e.defaultValue, e.color, e.collapsible, e.multi), e.parser && (this.parse = e.parser), this.clrs = e.color, this.multi = e.multi, this.keyword = e.keyword, this.dflt = e.defaultValue, this.pr = e.priority || 0
                    },
                    dt = E._registerComplexSpecialProp = function(t, e, i) {
                        "object" != typeof e && (e = {
                            parser: i
                        });
                        var s, r, n = t.split(","),
                            a = e.defaultValue;
                        for (i = i || [a], s = 0; n.length > s; s++) e.prefix = 0 === s && e.prefix, e.defaultValue = i[s] || a, r = new mt(n[s], e)
                    },
                    gt = function(t) {
                        if (!o[t]) {
                            var e = t.charAt(0).toUpperCase() + t.substr(1) + "Plugin";
                            dt(t, {
                                parser: function(t, i, s, r, n, a, h) {
                                    var l = (window.GreenSockGlobals || window).com.greensock.plugins[e];
                                    return l ? (l._cssRegister(), o[s].parse(t, i, s, r, n, a, h)) : (B("Error: " + e + " js file not loaded."), n)
                                }
                            })
                        }
                    };
                h = mt.prototype, h.parseComplex = function(t, e, i, s, r, n) {
                    var a, o, h, l, _, u, p = this.keyword;
                    if (this.multi && (M.test(i) || M.test(e) ? (o = e.replace(M, "|").split("|"), h = i.replace(M, "|").split("|")) : p && (o = [e], h = [i])), h) {
                        for (l = h.length > o.length ? h.length : o.length, a = 0; l > a; a++) e = o[a] = o[a] || this.dflt, i = h[a] = h[a] || this.dflt, p && (_ = e.indexOf(p), u = i.indexOf(p), _ !== u && (i = -1 === u ? h : o, i[a] += " " + p));
                        e = o.join(", "), i = h.join(", ")
                    }
                    return ft(t, this.p, e, i, this.clrs, this.dflt, s, this.pr, r, n)
                }, h.parse = function(t, e, i, s, n, a) {
                    return this.parseComplex(t.style, this.format(W(t, this.p, r, !1, this.dflt)), this.format(e), n, a)
                }, a.registerSpecialProp = function(t, e, i) {
                    dt(t, {
                        parser: function(t, s, r, n, a, o) {
                            var h = new pt(t, r, 0, 0, a, 2, r, (!1), i);
                            return h.plugin = o, h.setRatio = e(t, s, n._tween, r), h
                        },
                        priority: i
                    })
                };
                var vt = "scaleX,scaleY,scaleZ,x,y,z,skewX,rotation,rotationX,rotationY,perspective".split(","),
                    yt = q("transform"),
                    Tt = j + "transform",
                    xt = q("transformOrigin"),
                    wt = null !== q("perspective"),
                    bt = function(t, e, i, s) {
                        if (t._gsTransform && i && !s) return t._gsTransform;
                        var r, n, o, h, l, _, u, p, f, c, m, d, g, v = i ? t._gsTransform || {
                                skewY: 0
                            } : {
                                skewY: 0
                            },
                            y = 0 > v.scaleX,
                            T = 2e-5,
                            x = 1e5,
                            w = -Math.PI + 1e-4,
                            b = Math.PI - 1e-4,
                            P = wt ? parseFloat(W(t, xt, e, !1, "0 0 0").split(" ")[2]) || v.zOrigin || 0 : 0;
                        for (yt ? r = W(t, Tt, e, !0) : t.currentStyle && (r = t.currentStyle.filter.match(C), r = r && 4 === r.length ? [r[0].substr(4), Number(r[2].substr(4)), Number(r[1].substr(4)), r[3].substr(4), v.x || 0, v.y || 0].join(",") : ""), n = (r || "").match(/(?:\-|\b)[\d\-\.e]+\b/gi) || [], o = n.length; --o > -1;) h = Number(n[o]), n[o] = (l = h - (h |= 0)) ? (0 | l * x + (0 > l ? -.5 : .5)) / x + h : h;
                        if (16 === n.length) {
                            var S = n[8],
                                R = n[9],
                                k = n[10],
                                A = n[12],
                                O = n[13],
                                M = n[14];
                            if (v.zOrigin && (M = -v.zOrigin, A = S * M - n[12], O = R * M - n[13], M = k * M + v.zOrigin - n[14]), !i || s || null == v.rotationX) {
                                var D, I, F, X, N, L, E, z = n[0],
                                    Y = n[1],
                                    U = n[2],
                                    B = n[3],
                                    j = n[4],
                                    V = n[5],
                                    q = n[6],
                                    Z = n[7],
                                    $ = n[11],
                                    G = v.rotationX = Math.atan2(q, k),
                                    Q = w > G || G > b;
                                G && (X = Math.cos(-G), N = Math.sin(-G), D = j * X + S * N, I = V * X + R * N, F = q * X + k * N, S = j * -N + S * X, R = V * -N + R * X, k = q * -N + k * X, $ = Z * -N + $ * X, j = D, V = I, q = F), G = v.rotationY = Math.atan2(S, z), G && (L = w > G || G > b, X = Math.cos(-G), N = Math.sin(-G), D = z * X - S * N, I = Y * X - R * N, F = U * X - k * N, R = Y * N + R * X, k = U * N + k * X, $ = B * N + $ * X, z = D, Y = I, U = F), G = v.rotation = Math.atan2(Y, V), G && (E = w > G || G > b, X = Math.cos(-G), N = Math.sin(-G), z = z * X + j * N, I = Y * X + V * N, V = Y * -N + V * X, q = U * -N + q * X, Y = I), E && Q ? v.rotation = v.rotationX = 0 : E && L ? v.rotation = v.rotationY = 0 : L && Q && (v.rotationY = v.rotationX = 0), v.scaleX = (0 | Math.sqrt(z * z + Y * Y) * x + .5) / x, v.scaleY = (0 | Math.sqrt(V * V + R * R) * x + .5) / x, v.scaleZ = (0 | Math.sqrt(q * q + k * k) * x + .5) / x, v.skewX = 0, v.perspective = $ ? 1 / (0 > $ ? -$ : $) : 0, v.x = A, v.y = O, v.z = M
                            }
                        } else if (!(wt && !s && n.length && v.x === n[4] && v.y === n[5] && (v.rotationX || v.rotationY) || void 0 !== v.x && "none" === W(t, "display", e))) {
                            var H = n.length >= 6,
                                K = H ? n[0] : 1,
                                J = n[1] || 0,
                                tt = n[2] || 0,
                                et = H ? n[3] : 1;
                            v.x = n[4] || 0, v.y = n[5] || 0, _ = Math.sqrt(K * K + J * J), u = Math.sqrt(et * et + tt * tt), p = K || J ? Math.atan2(J, K) : v.rotation || 0, f = tt || et ? Math.atan2(tt, et) + p : v.skewX || 0, c = _ - Math.abs(v.scaleX || 0), m = u - Math.abs(v.scaleY || 0), Math.abs(f) > Math.PI / 2 && Math.abs(f) < 1.5 * Math.PI && (y ? (_ *= -1, f += 0 >= p ? Math.PI : -Math.PI, p += 0 >= p ? Math.PI : -Math.PI) : (u *= -1, f += 0 >= f ? Math.PI : -Math.PI)), d = (p - v.rotation) % Math.PI, g = (f - v.skewX) % Math.PI, (void 0 === v.skewX || c > T || -T > c || m > T || -T > m || d > w && b > d && !1 | d * x || g > w && b > g && !1 | g * x) && (v.scaleX = _, v.scaleY = u, v.rotation = p, v.skewX = f), wt && (v.rotationX = v.rotationY = v.z = 0, v.perspective = parseFloat(a.defaultTransformPerspective) || 0, v.scaleZ = 1)
                        }
                        v.zOrigin = P;
                        for (o in v) T > v[o] && v[o] > -T && (v[o] = 0);
                        return i && (t._gsTransform = v), v
                    },
                    Pt = function(t) {
                        var e, i, s = this.data,
                            r = -s.rotation,
                            n = r + s.skewX,
                            a = 1e5,
                            o = (0 | Math.cos(r) * s.scaleX * a) / a,
                            h = (0 | Math.sin(r) * s.scaleX * a) / a,
                            l = (0 | Math.sin(n) * -s.scaleY * a) / a,
                            _ = (0 | Math.cos(n) * s.scaleY * a) / a,
                            u = this.t.style,
                            p = this.t.currentStyle;
                        if (p) {
                            i = h, h = -l, l = -i, e = p.filter, u.filter = "";
                            var f, m, d = this.t.offsetWidth,
                                g = this.t.offsetHeight,
                                v = "absolute" !== p.position,
                                x = "progid:DXImageTransform.Microsoft.Matrix(M11=" + o + ", M12=" + h + ", M21=" + l + ", M22=" + _,
                                w = s.x,
                                b = s.y;
                            if (null != s.ox && (f = (s.oxp ? .01 * d * s.ox : s.ox) - d / 2, m = (s.oyp ? .01 * g * s.oy : s.oy) - g / 2, w += f - (f * o + m * h), b += m - (f * l + m * _)), v) f = d / 2, m = g / 2, x += ", Dx=" + (f - (f * o + m * h) + w) + ", Dy=" + (m - (f * l + m * _) + b) + ")";
                            else {
                                var P, S, R, k = 8 > c ? 1 : -1;
                                for (f = s.ieOffsetX || 0, m = s.ieOffsetY || 0, s.ieOffsetX = Math.round((d - ((0 > o ? -o : o) * d + (0 > h ? -h : h) * g)) / 2 + w), s.ieOffsetY = Math.round((g - ((0 > _ ? -_ : _) * g + (0 > l ? -l : l) * d)) / 2 + b), ct = 0; 4 > ct; ct++) S = J[ct], P = p[S], i = -1 !== P.indexOf("px") ? parseFloat(P) : $(this.t, S, parseFloat(P), P.replace(y, "")) || 0, R = i !== s[S] ? 2 > ct ? -s.ieOffsetX : -s.ieOffsetY : 2 > ct ? f - s.ieOffsetX : m - s.ieOffsetY, u[S] = (s[S] = Math.round(i - R * (0 === ct || 2 === ct ? 1 : k))) + "px";
                                x += ", sizingMethod='auto expand')"
                            }
                            u.filter = -1 !== e.indexOf("DXImageTransform.Microsoft.Matrix(") ? e.replace(O, x) : x + " " + e, (0 === t || 1 === t) && 1 === o && 0 === h && 0 === l && 1 === _ && (v && -1 === x.indexOf("Dx=0, Dy=0") || T.test(e) && 100 !== parseFloat(RegExp.$1) || -1 === e.indexOf("gradient(") && u.removeAttribute("filter"))
                        }
                    },
                    St = function() {
                        var t, e, i, s, r, n, a, o, h, l, _, u, f, c, m, d, g, v, y, T, x, w, b, P, S, R, k, A = this.data,
                            C = this.t.style,
                            O = A.rotation,
                            M = A.scaleX,
                            D = A.scaleY,
                            I = A.scaleZ;
                        if (p && (S = C.top ? "top" : C.bottom ? "bottom" : parseFloat(W(this.t, "top", null, !1)) ? "bottom" : "top", x = W(this.t, S, null, !1), R = parseFloat(x) || 0, k = x.substr((R + "").length) || "px", A._ffFix = !A._ffFix, C[S] = (A._ffFix ? R + .05 : R - .05) + k), O || A.skewX) y = Math.cos(O), T = Math.sin(O), t = y, r = T, A.skewX && (O -= A.skewX, y = Math.cos(O), T = Math.sin(O)), e = -T, n = y;
                        else {
                            if (!A.rotationY && !A.rotationX && 1 === I) return void(C[yt] = "translate3d(" + A.x + "px," + A.y + "px," + A.z + "px)" + (1 !== M || 1 !== D ? " scale(" + M + "," + D + ")" : ""));
                            t = n = 1, e = r = 0
                        }
                        _ = 1, i = s = a = o = h = l = u = f = c = 0, d = A.perspective, m = d ? -1 / d : 0, g = A.zOrigin, v = 1e5, O = A.rotationY, O && (y = Math.cos(O), T = Math.sin(O), h = _ * -T, f = m * -T, i = t * T, a = r * T, _ *= y, m *= y, t *= y, r *= y), O = A.rotationX, O && (y = Math.cos(O), T = Math.sin(O), x = e * y + i * T, w = n * y + a * T, b = l * y + _ * T, P = c * y + m * T, i = e * -T + i * y, a = n * -T + a * y, _ = l * -T + _ * y, m = c * -T + m * y, e = x, n = w, l = b, c = P), 1 !== I && (i *= I, a *= I, _ *= I, m *= I), 1 !== D && (e *= D, n *= D, l *= D, c *= D), 1 !== M && (t *= M, r *= M, h *= M, f *= M), g && (u -= g, s = i * u, o = a * u, u = _ * u + g), s = (x = (s += A.x) - (s |= 0)) ? (0 | x * v + (0 > x ? -.5 : .5)) / v + s : s, o = (x = (o += A.y) - (o |= 0)) ? (0 | x * v + (0 > x ? -.5 : .5)) / v + o : o, u = (x = (u += A.z) - (u |= 0)) ? (0 | x * v + (0 > x ? -.5 : .5)) / v + u : u, C[yt] = "matrix3d(" + [(0 | t * v) / v, (0 | r * v) / v, (0 | h * v) / v, (0 | f * v) / v, (0 | e * v) / v, (0 | n * v) / v, (0 | l * v) / v, (0 | c * v) / v, (0 | i * v) / v, (0 | a * v) / v, (0 | _ * v) / v, (0 | m * v) / v, s, o, u, d ? 1 + -u / d : 1].join(",") + ")"
                    },
                    Rt = function() {
                        var t, e, i, s, r, n, a, o, h, l = this.data,
                            _ = this.t,
                            u = _.style;
                        p && (t = u.top ? "top" : u.bottom ? "bottom" : parseFloat(W(_, "top", null, !1)) ? "bottom" : "top", e = W(_, t, null, !1), i = parseFloat(e) || 0, s = e.substr((i + "").length) || "px", l._ffFix = !l._ffFix, u[t] = (l._ffFix ? i + .05 : i - .05) + s), l.rotation || l.skewX ? (r = l.rotation, n = r - l.skewX, a = 1e5, o = l.scaleX * a, h = l.scaleY * a, u[yt] = "matrix(" + (0 | Math.cos(r) * o) / a + "," + (0 | Math.sin(r) * o) / a + "," + (0 | Math.sin(n) * -h) / a + "," + (0 | Math.cos(n) * h) / a + "," + l.x + "," + l.y + ")") : u[yt] = "matrix(" + l.scaleX + ",0,0," + l.scaleY + "," + l.x + "," + l.y + ")"
                    };
                dt("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,transformPerspective,directionalRotation,parseTransform,force3D", {
                    parser: function(t, e, i, s, n, a, o) {
                        if (s._transform) return n;
                        var h, l, _, u, p, f, c, m = s._transform = bt(t, r, !0, o.parseTransform),
                            d = t.style,
                            g = 1e-6,
                            v = vt.length,
                            y = o,
                            T = {};
                        if ("string" == typeof y.transform && yt) _ = d.cssText, d[yt] = y.transform, d.display = "block", h = bt(t, null, !1), d.cssText = _;
                        else if ("object" == typeof y) {
                            if (h = {
                                    scaleX: st(null != y.scaleX ? y.scaleX : y.scale, m.scaleX),
                                    scaleY: st(null != y.scaleY ? y.scaleY : y.scale, m.scaleY),
                                    scaleZ: st(null != y.scaleZ ? y.scaleZ : y.scale, m.scaleZ),
                                    x: st(y.x, m.x),
                                    y: st(y.y, m.y),
                                    z: st(y.z, m.z),
                                    perspective: st(y.transformPerspective, m.perspective)
                                }, c = y.directionalRotation, null != c)
                                if ("object" == typeof c)
                                    for (_ in c) y[_] = c[_];
                                else y.rotation = c;
                            h.rotation = rt("rotation" in y ? y.rotation : "shortRotation" in y ? y.shortRotation + "_short" : "rotationZ" in y ? y.rotationZ : m.rotation * I, m.rotation, "rotation", T), wt && (h.rotationX = rt("rotationX" in y ? y.rotationX : "shortRotationX" in y ? y.shortRotationX + "_short" : m.rotationX * I || 0, m.rotationX, "rotationX", T), h.rotationY = rt("rotationY" in y ? y.rotationY : "shortRotationY" in y ? y.shortRotationY + "_short" : m.rotationY * I || 0, m.rotationY, "rotationY", T)), h.skewX = null == y.skewX ? m.skewX : rt(y.skewX, m.skewX), h.skewY = null == y.skewY ? m.skewY : rt(y.skewY, m.skewY), (l = h.skewY - m.skewY) && (h.skewX += l, h.rotation += l)
                        }
                        for (null != y.force3D && (m.force3D = y.force3D, f = !0), p = m.force3D || m.z || m.rotationX || m.rotationY || h.z || h.rotationX || h.rotationY || h.perspective, p || null == y.scale || (h.scaleZ = 1); --v > -1;) i = vt[v], u = h[i] - m[i], (u > g || -g > u || null != F[i]) && (f = !0, n = new pt(m, i, m[i], u, n), i in T && (n.e = T[i]), n.xs0 = 0, n.plugin = a, s._overwriteProps.push(n.n));
                        return u = y.transformOrigin, (u || wt && p && m.zOrigin) && (yt ? (f = !0, i = xt, u = (u || W(t, i, r, !1, "50% 50%")) + "", n = new pt(d, i, 0, 0, n, (-1), "transformOrigin"), n.b = d[i], n.plugin = a, wt ? (_ = m.zOrigin, u = u.split(" "), m.zOrigin = (u.length > 2 && (0 === _ || "0px" !== u[2]) ? parseFloat(u[2]) : _) || 0, n.xs0 = n.e = d[i] = u[0] + " " + (u[1] || "50%") + " 0px", n = new pt(m, "zOrigin", 0, 0, n, (-1), n.n), n.b = _, n.xs0 = n.e = m.zOrigin) : n.xs0 = n.e = d[i] = u) : et(u + "", m)), f && (s._transformType = p || 3 === this._transformType ? 3 : 2), n
                    },
                    prefix: !0
                }), dt("boxShadow", {
                    defaultValue: "0px 0px 0px 0px #999",
                    prefix: !0,
                    color: !0,
                    multi: !0,
                    keyword: "inset"
                }), dt("borderRadius", {
                    defaultValue: "0px",
                    parser: function(t, e, i, n, a) {
                        e = this.format(e);
                        var o, h, l, _, u, p, f, c, m, d, g, v, y, T, x, w, b = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"],
                            P = t.style;
                        for (m = parseFloat(t.offsetWidth), d = parseFloat(t.offsetHeight), o = e.split(" "), h = 0; b.length > h; h++) this.p.indexOf("border") && (b[h] = q(b[h])), u = _ = W(t, b[h], r, !1, "0px"), -1 !== u.indexOf(" ") && (_ = u.split(" "), u = _[0], _ = _[1]), p = l = o[h], f = parseFloat(u), v = u.substr((f + "").length), y = "=" === p.charAt(1), y ? (c = parseInt(p.charAt(0) + "1", 10), p = p.substr(2), c *= parseFloat(p), g = p.substr((c + "").length - (0 > c ? 1 : 0)) || "") : (c = parseFloat(p), g = p.substr((c + "").length)), "" === g && (g = s[i] || v), g !== v && (T = $(t, "borderLeft", f, v), x = $(t, "borderTop", f, v), "%" === g ? (u = 100 * (T / m) + "%", _ = 100 * (x / d) + "%") : "em" === g ? (w = $(t, "borderLeft", 1, "em"), u = T / w + "em", _ = x / w + "em") : (u = T + "px", _ = x + "px"), y && (p = parseFloat(u) + c + g, l = parseFloat(_) + c + g)), a = ft(P, b[h], u + " " + _, p + " " + l, !1, "0px", a);
                        return a
                    },
                    prefix: !0,
                    formatter: lt("0px 0px 0px 0px", !1, !0)
                }), dt("backgroundPosition", {
                    defaultValue: "0 0",
                    parser: function(t, e, i, s, n, a) {
                        var o, h, l, _, u, p, f = "background-position",
                            m = r || Z(t, null),
                            d = this.format((m ? c ? m.getPropertyValue(f + "-x") + " " + m.getPropertyValue(f + "-y") : m.getPropertyValue(f) : t.currentStyle.backgroundPositionX + " " + t.currentStyle.backgroundPositionY) || "0 0"),
                            g = this.format(e);
                        if (-1 !== d.indexOf("%") != (-1 !== g.indexOf("%")) && (p = W(t, "backgroundImage").replace(R, ""), p && "none" !== p)) {
                            for (o = d.split(" "), h = g.split(" "), L.setAttribute("src", p), l = 2; --l > -1;) d = o[l], _ = -1 !== d.indexOf("%"), _ !== (-1 !== h[l].indexOf("%")) && (u = 0 === l ? t.offsetWidth - L.width : t.offsetHeight - L.height, o[l] = _ ? parseFloat(d) / 100 * u + "px" : 100 * (parseFloat(d) / u) + "%");
                            d = o.join(" ")
                        }
                        return this.parseComplex(t.style, d, g, n, a)
                    },
                    formatter: et
                }), dt("backgroundSize", {
                    defaultValue: "0 0",
                    formatter: et
                }), dt("perspective", {
                    defaultValue: "0px",
                    prefix: !0
                }), dt("perspectiveOrigin", {
                    defaultValue: "50% 50%",
                    prefix: !0
                }), dt("transformStyle", {
                    prefix: !0
                }), dt("backfaceVisibility", {
                    prefix: !0
                }), dt("margin", {
                    parser: _t("marginTop,marginRight,marginBottom,marginLeft")
                }), dt("padding", {
                    parser: _t("paddingTop,paddingRight,paddingBottom,paddingLeft")
                }), dt("clip", {
                    defaultValue: "rect(0px,0px,0px,0px)",
                    parser: function(t, e, i, s, n, a) {
                        var o, h, l;
                        return 9 > c ? (h = t.currentStyle, l = 8 > c ? " " : ",", o = "rect(" + h.clipTop + l + h.clipRight + l + h.clipBottom + l + h.clipLeft + ")", e = this.format(e).split(",").join(l)) : (o = this.format(W(t, this.p, r, !1, this.dflt)), e = this.format(e)), this.parseComplex(t.style, o, e, n, a)
                    }
                }), dt("textShadow", {
                    defaultValue: "0px 0px 0px #999",
                    color: !0,
                    multi: !0
                }), dt("autoRound,strictUnits", {
                    parser: function(t, e, i, s, r) {
                        return r
                    }
                }), dt("border", {
                    defaultValue: "0px solid #000",
                    parser: function(t, e, i, s, n, a) {
                        return this.parseComplex(t.style, this.format(W(t, "borderTopWidth", r, !1, "0px") + " " + W(t, "borderTopStyle", r, !1, "solid") + " " + W(t, "borderTopColor", r, !1, "#000")), this.format(e), n, a)
                    },
                    color: !0,
                    formatter: function(t) {
                        var e = t.split(" ");
                        return e[0] + " " + (e[1] || "solid") + " " + (t.match(ht) || ["#000"])[0]
                    }
                }), dt("float,cssFloat,styleFloat", {
                    parser: function(t, e, i, s, r) {
                        var n = t.style,
                            a = "cssFloat" in n ? "cssFloat" : "styleFloat";
                        return new pt(n, a, 0, 0, r, (-1), i, (!1), 0, n[a], e)
                    }
                });
                var kt = function(t) {
                    var e, i = this.t,
                        s = i.filter || W(this.data, "filter"),
                        r = 0 | this.s + this.c * t;
                    100 === r && (-1 === s.indexOf("atrix(") && -1 === s.indexOf("radient(") ? (i.removeAttribute("filter"), e = !W(this.data, "filter")) : (i.filter = s.replace(w, ""), e = !0)), e || (this.xn1 && (i.filter = s = s || "alpha(opacity=" + r + ")"), -1 === s.indexOf("opacity") ? 0 === r && this.xn1 || (i.filter += " alpha(opacity=" + r + ")") : i.filter = s.replace(T, "opacity=" + r))
                };
                dt("opacity,alpha,autoAlpha", {
                    defaultValue: "1",
                    parser: function(t, e, i, s, n, a) {
                        var o = parseFloat(W(t, "opacity", r, !1, "1")),
                            h = t.style,
                            l = "autoAlpha" === i;
                        return e = parseFloat(e), l && 1 === o && "hidden" === W(t, "visibility", r) && 0 !== e && (o = 0), Y ? n = new pt(h, "opacity", o, e - o, n) : (n = new pt(h, "opacity", 100 * o, 100 * (e - o), n), n.xn1 = l ? 1 : 0, h.zoom = 1, n.type = 2, n.b = "alpha(opacity=" + n.s + ")", n.e = "alpha(opacity=" + (n.s + n.c) + ")", n.data = t, n.plugin = a, n.setRatio = kt), l && (n = new pt(h, "visibility", 0, 0, n, (-1), null, (!1), 0, 0 !== o ? "inherit" : "hidden", 0 === e ? "hidden" : "inherit"), n.xs0 = "inherit", s._overwriteProps.push(n.n)), n
                    }
                });
                var At = function(t, e) {
                        e && (t.removeProperty ? t.removeProperty(e.replace(P, "-$1").toLowerCase()) : t.removeAttribute(e))
                    },
                    Ct = function(t) {
                        if (this.t._gsClassPT = this, 1 === t || 0 === t) {
                            this.t.className = 0 === t ? this.b : this.e;
                            for (var e = this.data, i = this.t.style; e;) e.v ? i[e.p] = e.v : At(i, e.p), e = e._next;
                            1 === t && this.t._gsClassPT === this && (this.t._gsClassPT = null)
                        } else this.t.className !== this.e && (this.t.className = this.e)
                    };
                dt("className", {
                    parser: function(t, e, s, n, a, o, h) {
                        var l, _, u, p, f, c = t.className,
                            m = t.style.cssText;
                        if (a = n._classNamePT = new pt(t, s, 0, 0, a, 2), a.setRatio = Ct, a.pr = -11, i = !0, a.b = c, _ = Q(t, r), u = t._gsClassPT) {
                            for (p = {}, f = u.data; f;) p[f.p] = 1, f = f._next;
                            u.setRatio(1)
                        }
                        return t._gsClassPT = a, a.e = "=" !== e.charAt(1) ? e : c.replace(RegExp("\\s*\\b" + e.substr(2) + "\\b"), "") + ("+" === e.charAt(0) ? " " + e.substr(2) : ""), n._tween._duration && (t.className = a.e, l = H(t, _, Q(t), h, p), t.className = c, a.data = l.firstMPT, t.style.cssText = m, a = a.xfirst = n.parse(t, l.difs, a, o)), a
                    }
                });
                var Ot = function(t) {
                    if ((1 === t || 0 === t) && this.data._totalTime === this.data._totalDuration) {
                        if ("all" === this.e) return this.t.style.cssText = "", void(this.t._gsTransform && delete this.t._gsTransform);
                        for (var e, i = this.t.style, s = this.e.split(","), r = s.length, n = o.transform.parse; --r > -1;) e = s[r], o[e] && (e = o[e].parse === n ? yt : o[e].p), At(i, e)
                    }
                };
                for (dt("clearProps", {
                        parser: function(t, e, s, r, n) {
                            return n = new pt(t, s, 0, 0, n, 2), n.setRatio = Ot, n.e = e, n.pr = -10, n.data = r._tween, i = !0, n
                        }
                    }), h = "bezier,throwProps,physicsProps,physics2D".split(","), ct = h.length; ct--;) gt(h[ct]);
                h = a.prototype, h._firstPT = null, h._onInitTween = function(t, e, o) {
                    if (!t.nodeType) return !1;
                    this._target = t, this._tween = o, this._vars = e, l = e.autoRound, i = !1, s = e.suffixMap || a.suffixMap, r = Z(t, ""), n = this._overwriteProps;
                    var h, p, c, m, d, g, v, y, T, w = t.style;
                    if (_ && "" === w.zIndex && (h = W(t, "zIndex", r), ("auto" === h || "" === h) && (w.zIndex = 0)), "string" == typeof e && (m = w.cssText, h = Q(t, r), w.cssText = m + ";" + e, h = H(t, h, Q(t)).difs, !Y && x.test(e) && (h.opacity = parseFloat(RegExp.$1)), e = h, w.cssText = m), this._firstPT = p = this.parse(t, e, null), this._transformType) {
                        for (T = 3 === this._transformType, yt ? u && (_ = !0, "" === w.zIndex && (v = W(t, "zIndex", r), ("auto" === v || "" === v) && (w.zIndex = 0)), f && (w.WebkitBackfaceVisibility = this._vars.WebkitBackfaceVisibility || (T ? "visible" : "hidden"))) : w.zoom = 1, c = p; c && c._next;) c = c._next;
                        y = new pt(t, "transform", 0, 0, null, 2), this._linkCSSP(y, null, c), y.setRatio = T && wt ? St : yt ? Rt : Pt, y.data = this._transform || bt(t, r, !0), n.pop()
                    }
                    if (i) {
                        for (; p;) {
                            for (g = p._next, c = m; c && c.pr > p.pr;) c = c._next;
                            (p._prev = c ? c._prev : d) ? p._prev._next = p: m = p, (p._next = c) ? c._prev = p : d = p, p = g
                        }
                        this._firstPT = m
                    }
                    return !0
                }, h.parse = function(t, e, i, n) {
                    var a, h, _, u, p, f, c, m, d, g, v = t.style;
                    for (a in e) f = e[a], h = o[a], h ? i = h.parse(t, f, a, this, i, n, e) : (p = W(t, a, r) + "", d = "string" == typeof f, "color" === a || "fill" === a || "stroke" === a || -1 !== a.indexOf("Color") || d && b.test(f) ? (d || (f = ot(f), f = (f.length > 3 ? "rgba(" : "rgb(") + f.join(",") + ")"), i = ft(v, a, p, f, !0, "transparent", i, 0, n)) : !d || -1 === f.indexOf(" ") && -1 === f.indexOf(",") ? (_ = parseFloat(p), c = _ || 0 === _ ? p.substr((_ + "").length) : "", ("" === p || "auto" === p) && ("width" === a || "height" === a ? (_ = tt(t, a, r), c = "px") : "left" === a || "top" === a ? (_ = G(t, a, r), c = "px") : (_ = "opacity" !== a ? 0 : 1, c = "")), g = d && "=" === f.charAt(1), g ? (u = parseInt(f.charAt(0) + "1", 10), f = f.substr(2), u *= parseFloat(f), m = f.replace(y, "")) : (u = parseFloat(f), m = d ? f.substr((u + "").length) || "" : ""), "" === m && (m = s[a] || c), f = u || 0 === u ? (g ? u + _ : u) + m : e[a], c !== m && "" !== m && (u || 0 === u) && (_ || 0 === _) && (_ = $(t, a, _, c), "%" === m ? (_ /= $(t, a, 100, "%") / 100, _ > 100 && (_ = 100), e.strictUnits !== !0 && (p = _ + "%")) : "em" === m ? _ /= $(t, a, 1, "em") : (u = $(t, a, u, m), m = "px"), g && (u || 0 === u) && (f = u + _ + m)), g && (u += _), !_ && 0 !== _ || !u && 0 !== u ? void 0 !== v[a] && (f || "NaN" != f + "" && null != f) ? (i = new pt(v, a, u || _ || 0, 0, i, (-1), a, (!1), 0, p, f), i.xs0 = "none" !== f || "display" !== a && -1 === a.indexOf("Style") ? f : p) : B("invalid " + a + " tween value: " + e[a]) : (i = new pt(v, a, _, u - _, i, 0, a, l !== !1 && ("px" === m || "zIndex" === a), 0, p, f), i.xs0 = m)) : i = ft(v, a, p, f, !0, null, i, 0, n)), n && i && !i.plugin && (i.plugin = n);
                    return i
                }, h.setRatio = function(t) {
                    var e, i, s, r = this._firstPT,
                        n = 1e-6;
                    if (1 !== t || this._tween._time !== this._tween._duration && 0 !== this._tween._time)
                        if (t || this._tween._time !== this._tween._duration && 0 !== this._tween._time || this._tween._rawPrevTime === -1e-6)
                            for (; r;) {
                                if (e = r.c * t + r.s, r.r ? e = e > 0 ? 0 | e + .5 : 0 | e - .5 : n > e && e > -n && (e = 0), r.type)
                                    if (1 === r.type)
                                        if (s = r.l, 2 === s) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2;
                                        else if (3 === s) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3;
                                else if (4 === s) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3 + r.xn3 + r.xs4;
                                else if (5 === s) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3 + r.xn3 + r.xs4 + r.xn4 + r.xs5;
                                else {
                                    for (i = r.xs0 + e + r.xs1, s = 1; r.l > s; s++) i += r["xn" + s] + r["xs" + (s + 1)];
                                    r.t[r.p] = i
                                } else -1 === r.type ? r.t[r.p] = r.xs0 : r.setRatio && r.setRatio(t);
                                else r.t[r.p] = e + r.xs0;
                                r = r._next
                            } else
                                for (; r;) 2 !== r.type ? r.t[r.p] = r.b : r.setRatio(t), r = r._next;
                        else
                            for (; r;) 2 !== r.type ? r.t[r.p] = r.e : r.setRatio(t), r = r._next
                }, h._enableTransforms = function(t) {
                    this._transformType = t || 3 === this._transformType ? 3 : 2, this._transform = this._transform || bt(this._target, r, !0)
                }, h._linkCSSP = function(t, e, i, s) {
                    return t && (e && (e._prev = t), t._next && (t._next._prev = t._prev), t._prev ? t._prev._next = t._next : this._firstPT === t && (this._firstPT = t._next, s = !0), i ? i._next = t : s || null !== this._firstPT || (this._firstPT = t), t._next = e, t._prev = i), t
                }, h._kill = function(e) {
                    var i, s, r, n = e;
                    if (e.autoAlpha || e.alpha) {
                        n = {};
                        for (s in e) n[s] = e[s];
                        n.opacity = 1, n.autoAlpha && (n.visibility = 1)
                    }
                    return e.className && (i = this._classNamePT) && (r = i.xfirst, r && r._prev ? this._linkCSSP(r._prev, i._next, r._prev._prev) : r === this._firstPT && (this._firstPT = i._next), i._next && this._linkCSSP(i._next, i._next._next, r._prev), this._classNamePT = null), t.prototype._kill.call(this, n)
                };
                var Mt = function(t, e, i) {
                    var s, r, n, a;
                    if (t.slice)
                        for (r = t.length; --r > -1;) Mt(t[r], e, i);
                    else
                        for (s = t.childNodes, r = s.length; --r > -1;) n = s[r], a = n.type, n.style && (e.push(Q(n)), i && i.push(n)), 1 !== a && 9 !== a && 11 !== a || !n.childNodes.length || Mt(n, e, i)
                };
                return a.cascadeTo = function(t, i, s) {
                    var r, n, a, o = e.to(t, i, s),
                        h = [o],
                        l = [],
                        _ = [],
                        u = [],
                        p = e._internals.reservedProps;
                    for (t = o._targets || o.target, Mt(t, l, u), o.render(i, !0), Mt(t, _), o.render(0, !0), o._enabled(!0), r = u.length; --r > -1;)
                        if (n = H(u[r], l[r], _[r]), n.firstMPT) {
                            n = n.difs;
                            for (a in s) p[a] && (n[a] = s[a]);
                            h.push(e.to(u[r], i, n))
                        }
                    return h
                }, t.activate([a]), a
            }, !0),
            function() {
                var t = window._gsDefine.plugin({
                        propName: "roundProps",
                        priority: -1,
                        API: 2,
                        init: function(t, e, i) {
                            return this._tween = i, !0
                        }
                    }),
                    e = t.prototype;
                e._onInitAllProps = function() {
                    for (var t, e, i, s = this._tween, r = s.vars.roundProps instanceof Array ? s.vars.roundProps : s.vars.roundProps.split(","), n = r.length, a = {}, o = s._propLookup.roundProps; --n > -1;) a[r[n]] = 1;
                    for (n = r.length; --n > -1;)
                        for (t = r[n], e = s._firstPT; e;) i = e._next, e.pg ? e.t._roundProps(a, !0) : e.n === t && (this._add(e.t, t, e.s, e.c), i && (i._prev = e._prev), e._prev ? e._prev._next = i : s._firstPT === e && (s._firstPT = i),
                            e._next = e._prev = null, s._propLookup[t] = o), e = i;
                    return !1
                }, e._add = function(t, e, i, s) {
                    this._addTween(t, e, i, i + s, e, !0), this._overwriteProps.push(e)
                }
            }(), window._gsDefine.plugin({
                propName: "attr",
                API: 2,
                init: function(t, e) {
                    var i;
                    if ("function" != typeof t.setAttribute) return !1;
                    this._target = t, this._proxy = {};
                    for (i in e) this._addTween(this._proxy, i, parseFloat(t.getAttribute(i)), e[i], i) && this._overwriteProps.push(i);
                    return !0
                },
                set: function(t) {
                    this._super.setRatio.call(this, t);
                    for (var e, i = this._overwriteProps, s = i.length; --s > -1;) e = i[s], this._target.setAttribute(e, this._proxy[e] + "")
                }
            }), window._gsDefine.plugin({
                propName: "directionalRotation",
                API: 2,
                init: function(t, e) {
                    "object" != typeof e && (e = {
                        rotation: e
                    }), this.finals = {};
                    var i, s, r, n, a, o, h = e.useRadians === !0 ? 2 * Math.PI : 360,
                        l = 1e-6;
                    for (i in e) "useRadians" !== i && (o = (e[i] + "").split("_"), s = o[0], r = parseFloat("function" != typeof t[i] ? t[i] : t[i.indexOf("set") || "function" != typeof t["get" + i.substr(3)] ? i : "get" + i.substr(3)]()), n = this.finals[i] = "string" == typeof s && "=" === s.charAt(1) ? r + parseInt(s.charAt(0) + "1", 10) * Number(s.substr(2)) : Number(s) || 0, a = n - r, o.length && (s = o.join("_"), -1 !== s.indexOf("short") && (a %= h, a !== a % (h / 2) && (a = 0 > a ? a + h : a - h)), -1 !== s.indexOf("_cw") && 0 > a ? a = (a + 9999999999 * h) % h - (0 | a / h) * h : -1 !== s.indexOf("ccw") && a > 0 && (a = (a - 9999999999 * h) % h - (0 | a / h) * h)), (a > l || -l > a) && (this._addTween(t, i, r, r + a, i), this._overwriteProps.push(i)));
                    return !0
                },
                set: function(t) {
                    var e;
                    if (1 !== t) this._super.setRatio.call(this, t);
                    else
                        for (e = this._firstPT; e;) e.f ? e.t[e.p](this.finals[e.p]) : e.t[e.p] = this.finals[e.p], e = e._next
                }
            })._autoCSS = !0, window._gsDefine("easing.Back", ["easing.Ease"], function(t) {
                var e, i, s, r = window.GreenSockGlobals || window,
                    n = r.com.greensock,
                    a = 2 * Math.PI,
                    o = Math.PI / 2,
                    h = n._class,
                    l = function(e, i) {
                        var s = h("easing." + e, function() {}, !0),
                            r = s.prototype = new t;
                        return r.constructor = s, r.getRatio = i, s
                    },
                    _ = t.register || function() {},
                    u = function(t, e, i, s) {
                        var r = h("easing." + t, {
                            easeOut: new e,
                            easeIn: new i,
                            easeInOut: new s
                        }, !0);
                        return _(r, t), r
                    },
                    p = function(t, e, i) {
                        this.t = t, this.v = e, i && (this.next = i, i.prev = this, this.c = i.v - e, this.gap = i.t - t)
                    },
                    f = function(e, i) {
                        var s = h("easing." + e, function(t) {
                                this._p1 = t || 0 === t ? t : 1.70158, this._p2 = 1.525 * this._p1
                            }, !0),
                            r = s.prototype = new t;
                        return r.constructor = s, r.getRatio = i, r.config = function(t) {
                            return new s(t)
                        }, s
                    },
                    c = u("Back", f("BackOut", function(t) {
                        return (t -= 1) * t * ((this._p1 + 1) * t + this._p1) + 1
                    }), f("BackIn", function(t) {
                        return t * t * ((this._p1 + 1) * t - this._p1)
                    }), f("BackInOut", function(t) {
                        return 1 > (t *= 2) ? .5 * t * t * ((this._p2 + 1) * t - this._p2) : .5 * ((t -= 2) * t * ((this._p2 + 1) * t + this._p2) + 2)
                    })),
                    m = h("easing.SlowMo", function(t, e, i) {
                        e = e || 0 === e ? e : .7, null == t ? t = .7 : t > 1 && (t = 1), this._p = 1 !== t ? e : 0, this._p1 = (1 - t) / 2, this._p2 = t, this._p3 = this._p1 + this._p2, this._calcEnd = i === !0
                    }, !0),
                    d = m.prototype = new t;
                return d.constructor = m, d.getRatio = function(t) {
                    var e = t + (.5 - t) * this._p;
                    return this._p1 > t ? this._calcEnd ? 1 - (t = 1 - t / this._p1) * t : e - (t = 1 - t / this._p1) * t * t * t * e : t > this._p3 ? this._calcEnd ? 1 - (t = (t - this._p3) / this._p1) * t : e + (t - e) * (t = (t - this._p3) / this._p1) * t * t * t : this._calcEnd ? 1 : e
                }, m.ease = new m(.7, .7), d.config = m.config = function(t, e, i) {
                    return new m(t, e, i)
                }, e = h("easing.SteppedEase", function(t) {
                    t = t || 1, this._p1 = 1 / t, this._p2 = t + 1
                }, !0), d = e.prototype = new t, d.constructor = e, d.getRatio = function(t) {
                    return 0 > t ? t = 0 : t >= 1 && (t = .999999999), (this._p2 * t >> 0) * this._p1
                }, d.config = e.config = function(t) {
                    return new e(t)
                }, i = h("easing.RoughEase", function(e) {
                    e = e || {};
                    for (var i, s, r, n, a, o, h = e.taper || "none", l = [], _ = 0, u = 0 | (e.points || 20), f = u, c = e.randomize !== !1, m = e.clamp === !0, d = e.template instanceof t ? e.template : null, g = "number" == typeof e.strength ? .4 * e.strength : .4; --f > -1;) i = c ? Math.random() : 1 / u * f, s = d ? d.getRatio(i) : i, "none" === h ? r = g : "out" === h ? (n = 1 - i, r = n * n * g) : "in" === h ? r = i * i * g : .5 > i ? (n = 2 * i, r = .5 * n * n * g) : (n = 2 * (1 - i), r = .5 * n * n * g), c ? s += Math.random() * r - .5 * r : f % 2 ? s += .5 * r : s -= .5 * r, m && (s > 1 ? s = 1 : 0 > s && (s = 0)), l[_++] = {
                        x: i,
                        y: s
                    };
                    for (l.sort(function(t, e) {
                            return t.x - e.x
                        }), o = new p(1, 1, null), f = u; --f > -1;) a = l[f], o = new p(a.x, a.y, o);
                    this._prev = new p(0, 0, 0 !== o.t ? o : o.next)
                }, !0), d = i.prototype = new t, d.constructor = i, d.getRatio = function(t) {
                    var e = this._prev;
                    if (t > e.t) {
                        for (; e.next && t >= e.t;) e = e.next;
                        e = e.prev
                    } else
                        for (; e.prev && e.t >= t;) e = e.prev;
                    return this._prev = e, e.v + (t - e.t) / e.gap * e.c
                }, d.config = function(t) {
                    return new i(t)
                }, i.ease = new i, u("Bounce", l("BounceOut", function(t) {
                    return 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
                }), l("BounceIn", function(t) {
                    return 1 / 2.75 > (t = 1 - t) ? 1 - 7.5625 * t * t : 2 / 2.75 > t ? 1 - (7.5625 * (t -= 1.5 / 2.75) * t + .75) : 2.5 / 2.75 > t ? 1 - (7.5625 * (t -= 2.25 / 2.75) * t + .9375) : 1 - (7.5625 * (t -= 2.625 / 2.75) * t + .984375)
                }), l("BounceInOut", function(t) {
                    var e = .5 > t;
                    return t = e ? 1 - 2 * t : 2 * t - 1, t = 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375, e ? .5 * (1 - t) : .5 * t + .5
                })), u("Circ", l("CircOut", function(t) {
                    return Math.sqrt(1 - (t -= 1) * t)
                }), l("CircIn", function(t) {
                    return -(Math.sqrt(1 - t * t) - 1)
                }), l("CircInOut", function(t) {
                    return 1 > (t *= 2) ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
                })), s = function(e, i, s) {
                    var r = h("easing." + e, function(t, e) {
                            this._p1 = t || 1, this._p2 = e || s, this._p3 = this._p2 / a * (Math.asin(1 / this._p1) || 0)
                        }, !0),
                        n = r.prototype = new t;
                    return n.constructor = r, n.getRatio = i, n.config = function(t, e) {
                        return new r(t, e)
                    }, r
                }, u("Elastic", s("ElasticOut", function(t) {
                    return this._p1 * Math.pow(2, -10 * t) * Math.sin((t - this._p3) * a / this._p2) + 1
                }, .3), s("ElasticIn", function(t) {
                    return -(this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * a / this._p2))
                }, .3), s("ElasticInOut", function(t) {
                    return 1 > (t *= 2) ? -.5 * this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * a / this._p2) : .5 * this._p1 * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - this._p3) * a / this._p2) + 1
                }, .45)), u("Expo", l("ExpoOut", function(t) {
                    return 1 - Math.pow(2, -10 * t)
                }), l("ExpoIn", function(t) {
                    return Math.pow(2, 10 * (t - 1)) - .001
                }), l("ExpoInOut", function(t) {
                    return 1 > (t *= 2) ? .5 * Math.pow(2, 10 * (t - 1)) : .5 * (2 - Math.pow(2, -10 * (t - 1)))
                })), u("Sine", l("SineOut", function(t) {
                    return Math.sin(t * o)
                }), l("SineIn", function(t) {
                    return -Math.cos(t * o) + 1
                }), l("SineInOut", function(t) {
                    return -.5 * (Math.cos(Math.PI * t) - 1)
                })), h("easing.EaseLookup", {
                    find: function(e) {
                        return t.map[e]
                    }
                }, !0), _(r.SlowMo, "SlowMo", "ease,"), _(i, "RoughEase", "ease,"), _(e, "SteppedEase", "ease,"), c
            }, !0)
    }),
    function(t) {
        "use strict";
        var e, i, s, r, n, a = t.GreenSockGlobals || t,
            o = function(t) {
                var e, i = t.split("."),
                    s = a;
                for (e = 0; i.length > e; e++) s[i[e]] = s = s[i[e]] || {};
                return s
            },
            h = o("com.greensock"),
            l = [].slice,
            _ = function() {},
            u = {},
            p = function(e, i, s, r) {
                this.sc = u[e] ? u[e].sc : [], u[e] = this, this.gsClass = null, this.func = s;
                var n = [];
                this.check = function(h) {
                    for (var l, _, f, c, m = i.length, d = m; --m > -1;)(l = u[i[m]] || new p(i[m], [])).gsClass ? (n[m] = l.gsClass, d--) : h && l.sc.push(this);
                    if (0 === d && s)
                        for (_ = ("com.greensock." + e).split("."), f = _.pop(), c = o(_.join("."))[f] = this.gsClass = s.apply(s, n), r && (a[f] = c, "function" == typeof define && define.amd ? define((t.GreenSockAMDPath ? t.GreenSockAMDPath + "/" : "") + e.split(".").join("/"), [], function() {
                                return c
                            }) : "undefined" != typeof module && module.exports && (module.exports = c)), m = 0; this.sc.length > m; m++) this.sc[m].check()
                }, this.check(!0)
            },
            f = t._gsDefine = function(t, e, i, s) {
                return new p(t, e, i, s)
            },
            c = h._class = function(t, e, i) {
                return e = e || function() {}, f(t, [], function() {
                    return e
                }, i), e
            };
        f.globals = a;
        var m = [0, 0, 1, 1],
            d = [],
            g = c("easing.Ease", function(t, e, i, s) {
                this._func = t, this._type = i || 0, this._power = s || 0, this._params = e ? m.concat(e) : m
            }, !0),
            v = g.map = {},
            y = g.register = function(t, e, i, s) {
                for (var r, n, a, o, l = e.split(","), _ = l.length, u = (i || "easeIn,easeOut,easeInOut").split(","); --_ > -1;)
                    for (n = l[_], r = s ? c("easing." + n, null, !0) : h.easing[n] || {}, a = u.length; --a > -1;) o = u[a], v[n + "." + o] = v[o + n] = r[o] = t.getRatio ? t : t[o] || new t
            };
        for (s = g.prototype, s._calcEnd = !1, s.getRatio = function(t) {
                if (this._func) return this._params[0] = t, this._func.apply(null, this._params);
                var e = this._type,
                    i = this._power,
                    s = 1 === e ? 1 - t : 2 === e ? t : .5 > t ? 2 * t : 2 * (1 - t);
                return 1 === i ? s *= s : 2 === i ? s *= s * s : 3 === i ? s *= s * s * s : 4 === i && (s *= s * s * s * s), 1 === e ? 1 - s : 2 === e ? s : .5 > t ? s / 2 : 1 - s / 2
            }, e = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"], i = e.length; --i > -1;) s = e[i] + ",Power" + i, y(new g(null, null, 1, i), s, "easeOut", !0), y(new g(null, null, 2, i), s, "easeIn" + (0 === i ? ",easeNone" : "")), y(new g(null, null, 3, i), s, "easeInOut");
        v.linear = h.easing.Linear.easeIn, v.swing = h.easing.Quad.easeInOut;
        var T = c("events.EventDispatcher", function(t) {
            this._listeners = {}, this._eventTarget = t || this
        });
        s = T.prototype, s.addEventListener = function(t, e, i, s, a) {
            a = a || 0;
            var o, h, l = this._listeners[t],
                _ = 0;
            for (null == l && (this._listeners[t] = l = []), h = l.length; --h > -1;) o = l[h], o.c === e && o.s === i ? l.splice(h, 1) : 0 === _ && a > o.pr && (_ = h + 1);
            l.splice(_, 0, {
                c: e,
                s: i,
                up: s,
                pr: a
            }), this !== r || n || r.wake()
        }, s.removeEventListener = function(t, e) {
            var i, s = this._listeners[t];
            if (s)
                for (i = s.length; --i > -1;)
                    if (s[i].c === e) return void s.splice(i, 1)
        }, s.dispatchEvent = function(t) {
            var e, i, s, r = this._listeners[t];
            if (r)
                for (e = r.length, i = this._eventTarget; --e > -1;) s = r[e], s.up ? s.c.call(s.s || i, {
                    type: t,
                    target: i
                }) : s.c.call(s.s || i)
        };
        var x = t.requestAnimationFrame,
            w = t.cancelAnimationFrame,
            b = Date.now || function() {
                return (new Date).getTime()
            },
            P = b();
        for (e = ["ms", "moz", "webkit", "o"], i = e.length; --i > -1 && !x;) x = t[e[i] + "RequestAnimationFrame"], w = t[e[i] + "CancelAnimationFrame"] || t[e[i] + "CancelRequestAnimationFrame"];
        c("Ticker", function(t, e) {
            var i, s, a, o, h, l = this,
                u = b(),
                p = e !== !1 && x,
                f = function(t) {
                    P = b(), l.time = (P - u) / 1e3;
                    var e, r = l.time - h;
                    (!i || r > 0 || t === !0) && (l.frame++, h += r + (r >= o ? .004 : o - r), e = !0), t !== !0 && (a = s(f)), e && l.dispatchEvent("tick")
                };
            T.call(l), this.time = this.frame = 0, this.tick = function() {
                f(!0)
            }, this.sleep = function() {
                null != a && (p && w ? w(a) : clearTimeout(a), s = _, a = null, l === r && (n = !1))
            }, this.wake = function() {
                null !== a && l.sleep(), s = 0 === i ? _ : p && x ? x : function(t) {
                    return setTimeout(t, 0 | 1e3 * (h - l.time) + 1)
                }, l === r && (n = !0), f(2)
            }, this.fps = function(t) {
                return arguments.length ? (i = t, o = 1 / (i || 60), h = this.time + o, void l.wake()) : i
            }, this.useRAF = function(t) {
                return arguments.length ? (l.sleep(), p = t, void l.fps(i)) : p
            }, l.fps(t), setTimeout(function() {
                p && (!a || 5 > l.frame) && l.useRAF(!1)
            }, 1500)
        }), s = h.Ticker.prototype = new h.events.EventDispatcher, s.constructor = h.Ticker;
        var S = c("core.Animation", function(t, e) {
            if (this.vars = e = e || {}, this._duration = this._totalDuration = t || 0, this._delay = Number(e.delay) || 0, this._timeScale = 1, this._active = e.immediateRender === !0, this.data = e.data, this._reversed = e.reversed === !0, E) {
                n || r.wake();
                var i = this.vars.useFrames ? L : E;
                i.add(this, i._time), this.vars.paused && this.paused(!0)
            }
        });
        r = S.ticker = new h.Ticker, s = S.prototype, s._dirty = s._gc = s._initted = s._paused = !1, s._totalTime = s._time = 0, s._rawPrevTime = -1, s._next = s._last = s._onUpdate = s._timeline = s.timeline = null, s._paused = !1;
        var R = function() {
            b() - P > 2e3 && r.wake(), setTimeout(R, 2e3)
        };
        R(), s.play = function(t, e) {
            return arguments.length && this.seek(t, e), this.reversed(!1).paused(!1)
        }, s.pause = function(t, e) {
            return arguments.length && this.seek(t, e), this.paused(!0)
        }, s.resume = function(t, e) {
            return arguments.length && this.seek(t, e), this.paused(!1)
        }, s.seek = function(t, e) {
            return this.totalTime(Number(t), e !== !1)
        }, s.restart = function(t, e) {
            return this.reversed(!1).paused(!1).totalTime(t ? -this._delay : 0, e !== !1, !0)
        }, s.reverse = function(t, e) {
            return arguments.length && this.seek(t || this.totalDuration(), e), this.reversed(!0).paused(!1)
        }, s.render = function() {}, s.invalidate = function() {
            return this
        }, s._enabled = function(t, e) {
            return n || r.wake(), this._gc = !t, this._active = t && !this._paused && this._totalTime > 0 && this._totalTime < this._totalDuration, e !== !0 && (t && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !t && this.timeline && this._timeline._remove(this, !0)), !1
        }, s._kill = function() {
            return this._enabled(!1, !1)
        }, s.kill = function(t, e) {
            return this._kill(t, e), this
        }, s._uncache = function(t) {
            for (var e = t ? this : this.timeline; e;) e._dirty = !0, e = e.timeline;
            return this
        }, s._swapSelfInParams = function(t) {
            for (var e = t.length, i = t.concat(); --e > -1;) "{self}" === t[e] && (i[e] = this);
            return i
        }, s.eventCallback = function(t, e, i, s) {
            if ("on" === (t || "").substr(0, 2)) {
                var r = this.vars;
                if (1 === arguments.length) return r[t];
                null == e ? delete r[t] : (r[t] = e, r[t + "Params"] = i instanceof Array && -1 !== i.join("").indexOf("{self}") ? this._swapSelfInParams(i) : i, r[t + "Scope"] = s), "onUpdate" === t && (this._onUpdate = e)
            }
            return this
        }, s.delay = function(t) {
            return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + t - this._delay), this._delay = t, this) : this._delay
        }, s.duration = function(t) {
            return arguments.length ? (this._duration = this._totalDuration = t, this._uncache(!0), this._timeline.smoothChildTiming && this._time > 0 && this._time < this._duration && 0 !== t && this.totalTime(this._totalTime * (t / this._duration), !0), this) : (this._dirty = !1, this._duration)
        }, s.totalDuration = function(t) {
            return this._dirty = !1, arguments.length ? this.duration(t) : this._totalDuration
        }, s.time = function(t, e) {
            return arguments.length ? (this._dirty && this.totalDuration(), this.totalTime(t > this._duration ? this._duration : t, e)) : this._time
        }, s.totalTime = function(t, e, i) {
            if (n || r.wake(), !arguments.length) return this._totalTime;
            if (this._timeline) {
                if (0 > t && !i && (t += this.totalDuration()), this._timeline.smoothChildTiming) {
                    this._dirty && this.totalDuration();
                    var s = this._totalDuration,
                        a = this._timeline;
                    if (t > s && !i && (t = s), this._startTime = (this._paused ? this._pauseTime : a._time) - (this._reversed ? s - t : t) / this._timeScale, a._dirty || this._uncache(!1), a._timeline)
                        for (; a._timeline;) a._timeline._time !== (a._startTime + a._totalTime) / a._timeScale && a.totalTime(a._totalTime, !0), a = a._timeline
                }
                this._gc && this._enabled(!0, !1), this._totalTime !== t && this.render(t, e, !1)
            }
            return this
        }, s.startTime = function(t) {
            return arguments.length ? (t !== this._startTime && (this._startTime = t, this.timeline && this.timeline._sortChildren && this.timeline.add(this, t - this._delay)), this) : this._startTime
        }, s.timeScale = function(t) {
            if (!arguments.length) return this._timeScale;
            if (t = t || 1e-6, this._timeline && this._timeline.smoothChildTiming) {
                var e = this._pauseTime,
                    i = e || 0 === e ? e : this._timeline.totalTime();
                this._startTime = i - (i - this._startTime) * this._timeScale / t
            }
            return this._timeScale = t, this._uncache(!1)
        }, s.reversed = function(t) {
            return arguments.length ? (t != this._reversed && (this._reversed = t, this.totalTime(this._totalTime, !0)), this) : this._reversed
        }, s.paused = function(t) {
            if (!arguments.length) return this._paused;
            if (t != this._paused && this._timeline) {
                n || t || r.wake();
                var e = this._timeline,
                    i = e.rawTime(),
                    s = i - this._pauseTime;
                !t && e.smoothChildTiming && (this._startTime += s, this._uncache(!1)), this._pauseTime = t ? i : null, this._paused = t, this._active = !t && this._totalTime > 0 && this._totalTime < this._totalDuration, t || 0 === s || 0 === this._duration || this.render(e.smoothChildTiming ? this._totalTime : (i - this._startTime) / this._timeScale, !0, !0)
            }
            return this._gc && !t && this._enabled(!0, !1), this
        };
        var k = c("core.SimpleTimeline", function(t) {
            S.call(this, 0, t), this.autoRemoveChildren = this.smoothChildTiming = !0
        });
        s = k.prototype = new S, s.constructor = k, s.kill()._gc = !1, s._first = s._last = null, s._sortChildren = !1, s.add = s.insert = function(t, e) {
            var i, s;
            if (t._startTime = Number(e || 0) + t._delay, t._paused && this !== t._timeline && (t._pauseTime = t._startTime + (this.rawTime() - t._startTime) / t._timeScale), t.timeline && t.timeline._remove(t, !0), t.timeline = t._timeline = this, t._gc && t._enabled(!0, !0), i = this._last, this._sortChildren)
                for (s = t._startTime; i && i._startTime > s;) i = i._prev;
            return i ? (t._next = i._next, i._next = t) : (t._next = this._first, this._first = t), t._next ? t._next._prev = t : this._last = t, t._prev = i, this._timeline && this._uncache(!0), this
        }, s._remove = function(t, e) {
            return t.timeline === this && (e || t._enabled(!1, !0), t.timeline = null, t._prev ? t._prev._next = t._next : this._first === t && (this._first = t._next), t._next ? t._next._prev = t._prev : this._last === t && (this._last = t._prev), this._timeline && this._uncache(!0)), this
        }, s.render = function(t, e, i) {
            var s, r = this._first;
            for (this._totalTime = this._time = this._rawPrevTime = t; r;) s = r._next, (r._active || t >= r._startTime && !r._paused) && (r._reversed ? r.render((r._dirty ? r.totalDuration() : r._totalDuration) - (t - r._startTime) * r._timeScale, e, i) : r.render((t - r._startTime) * r._timeScale, e, i)), r = s
        }, s.rawTime = function() {
            return n || r.wake(), this._totalTime
        };
        var A = c("TweenLite", function(e, i, s) {
                if (S.call(this, i, s), this.render = A.prototype.render, null == e) throw "Cannot tween a null target.";
                this.target = e = "string" != typeof e ? e : A.selector(e) || e;
                var r, n, a, o = e.jquery || e.length && e !== t && e[0] && (e[0] === t || e[0].nodeType && e[0].style && !e.nodeType),
                    h = this.vars.overwrite;
                if (this._overwrite = h = null == h ? N[A.defaultOverwrite] : "number" == typeof h ? h >> 0 : N[h], (o || e instanceof Array) && "number" != typeof e[0])
                    for (this._targets = a = l.call(e, 0), this._propLookup = [], this._siblings = [], r = 0; a.length > r; r++) n = a[r], n ? "string" != typeof n ? n.length && n !== t && n[0] && (n[0] === t || n[0].nodeType && n[0].style && !n.nodeType) ? (a.splice(r--, 1), this._targets = a = a.concat(l.call(n, 0))) : (this._siblings[r] = z(n, this, !1), 1 === h && this._siblings[r].length > 1 && Y(n, this, null, 1, this._siblings[r])) : (n = a[r--] = A.selector(n), "string" == typeof n && a.splice(r + 1, 1)) : a.splice(r--, 1);
                else this._propLookup = {}, this._siblings = z(e, this, !1), 1 === h && this._siblings.length > 1 && Y(e, this, null, 1, this._siblings);
                (this.vars.immediateRender || 0 === i && 0 === this._delay && this.vars.immediateRender !== !1) && this.render(-this._delay, !1, !0)
            }, !0),
            C = function(e) {
                return e.length && e !== t && e[0] && (e[0] === t || e[0].nodeType && e[0].style && !e.nodeType)
            },
            O = function(t, e) {
                var i, s = {};
                for (i in t) X[i] || i in e && "x" !== i && "y" !== i && "width" !== i && "height" !== i && "className" !== i && "border" !== i || !(!D[i] || D[i] && D[i]._autoCSS) || (s[i] = t[i], delete t[i]);
                t.css = s
            };
        s = A.prototype = new S, s.constructor = A, s.kill()._gc = !1, s.ratio = 0, s._firstPT = s._targets = s._overwrittenProps = s._startAt = null, s._notifyPluginsOfEnabled = !1, A.version = "1.10.2", A.defaultEase = s._ease = new g(null, null, 1, 1), A.defaultOverwrite = "auto", A.ticker = r, A.autoSleep = !0, A.selector = t.$ || t.jQuery || function(e) {
            return t.$ ? (A.selector = t.$, t.$(e)) : t.document ? t.document.getElementById("#" === e.charAt(0) ? e.substr(1) : e) : e
        };
        var M = A._internals = {},
            D = A._plugins = {},
            I = A._tweenLookup = {},
            F = 0,
            X = M.reservedProps = {
                ease: 1,
                delay: 1,
                overwrite: 1,
                onComplete: 1,
                onCompleteParams: 1,
                onCompleteScope: 1,
                useFrames: 1,
                runBackwards: 1,
                startAt: 1,
                onUpdate: 1,
                onUpdateParams: 1,
                onUpdateScope: 1,
                onStart: 1,
                onStartParams: 1,
                onStartScope: 1,
                onReverseComplete: 1,
                onReverseCompleteParams: 1,
                onReverseCompleteScope: 1,
                onRepeat: 1,
                onRepeatParams: 1,
                onRepeatScope: 1,
                easeParams: 1,
                yoyo: 1,
                immediateRender: 1,
                repeat: 1,
                repeatDelay: 1,
                data: 1,
                paused: 1,
                reversed: 1,
                autoCSS: 1
            },
            N = {
                none: 0,
                all: 1,
                auto: 2,
                concurrent: 3,
                allOnStart: 4,
                preexisting: 5,
                "true": 1,
                "false": 0
            },
            L = S._rootFramesTimeline = new k,
            E = S._rootTimeline = new k;
        E._startTime = r.time, L._startTime = r.frame, E._active = L._active = !0, S._updateRoot = function() {
            if (E.render((r.time - E._startTime) * E._timeScale, !1, !1), L.render((r.frame - L._startTime) * L._timeScale, !1, !1), !(r.frame % 120)) {
                var t, e, i;
                for (i in I) {
                    for (e = I[i].tweens, t = e.length; --t > -1;) e[t]._gc && e.splice(t, 1);
                    0 === e.length && delete I[i]
                }
                if (i = E._first, (!i || i._paused) && A.autoSleep && !L._first && 1 === r._listeners.tick.length) {
                    for (; i && i._paused;) i = i._next;
                    i || r.sleep()
                }
            }
        }, r.addEventListener("tick", S._updateRoot);
        var z = function(t, e, i) {
                var s, r, n = t._gsTweenID;
                if (I[n || (t._gsTweenID = n = "t" + F++)] || (I[n] = {
                        target: t,
                        tweens: []
                    }), e && (s = I[n].tweens, s[r = s.length] = e, i))
                    for (; --r > -1;) s[r] === e && s.splice(r, 1);
                return I[n].tweens
            },
            Y = function(t, e, i, s, r) {
                var n, a, o, h;
                if (1 === s || s >= 4) {
                    for (h = r.length, n = 0; h > n; n++)
                        if ((o = r[n]) !== e) o._gc || o._enabled(!1, !1) && (a = !0);
                        else if (5 === s) break;
                    return a
                }
                var l, _ = e._startTime + 1e-10,
                    u = [],
                    p = 0,
                    f = 0 === e._duration;
                for (n = r.length; --n > -1;)(o = r[n]) === e || o._gc || o._paused || (o._timeline !== e._timeline ? (l = l || U(e, 0, f), 0 === U(o, l, f) && (u[p++] = o)) : _ >= o._startTime && o._startTime + o.totalDuration() / o._timeScale + 1e-10 > _ && ((f || !o._initted) && 2e-10 >= _ - o._startTime || (u[p++] = o)));
                for (n = p; --n > -1;) o = u[n], 2 === s && o._kill(i, t) && (a = !0), (2 !== s || !o._firstPT && o._initted) && o._enabled(!1, !1) && (a = !0);
                return a
            },
            U = function(t, e, i) {
                for (var s = t._timeline, r = s._timeScale, n = t._startTime, a = 1e-10; s._timeline;) {
                    if (n += s._startTime, r *= s._timeScale, s._paused) return -100;
                    s = s._timeline
                }
                return n /= r, n > e ? n - e : i && n === e || !t._initted && 2 * a > n - e ? a : (n += t.totalDuration() / t._timeScale / r) > e + a ? 0 : n - e - a
            };
        s._init = function() {
            var t, e, i, s, r = this.vars,
                n = this._overwrittenProps,
                a = this._duration,
                o = r.immediateRender,
                h = r.ease;
            if (r.startAt) {
                if (this._startAt && this._startAt.render(-1, !0), r.startAt.overwrite = 0, r.startAt.immediateRender = !0, this._startAt = A.to(this.target, 0, r.startAt), o)
                    if (this._time > 0) this._startAt = null;
                    else if (0 !== a) return
            } else if (r.runBackwards && r.immediateRender && 0 !== a)
                if (this._startAt) this._startAt.render(-1, !0), this._startAt = null;
                else if (0 === this._time) {
                i = {};
                for (s in r) X[s] && "autoCSS" !== s || (i[s] = r[s]);
                return i.overwrite = 0, void(this._startAt = A.to(this.target, 0, i))
            }
            if (this._ease = h ? h instanceof g ? r.easeParams instanceof Array ? h.config.apply(h, r.easeParams) : h : "function" == typeof h ? new g(h, r.easeParams) : v[h] || A.defaultEase : A.defaultEase, this._easeType = this._ease._type, this._easePower = this._ease._power, this._firstPT = null, this._targets)
                for (t = this._targets.length; --t > -1;) this._initProps(this._targets[t], this._propLookup[t] = {}, this._siblings[t], n ? n[t] : null) && (e = !0);
            else e = this._initProps(this.target, this._propLookup, this._siblings, n);
            if (e && A._onPluginEvent("_onInitAllProps", this), n && (this._firstPT || "function" != typeof this.target && this._enabled(!1, !1)), r.runBackwards)
                for (i = this._firstPT; i;) i.s += i.c, i.c = -i.c, i = i._next;
            this._onUpdate = r.onUpdate, this._initted = !0
        }, s._initProps = function(e, i, s, r) {
            var n, a, o, h, l, _;
            if (null == e) return !1;
            this.vars.css || e.style && e !== t && e.nodeType && D.css && this.vars.autoCSS !== !1 && O(this.vars, e);
            for (n in this.vars) {
                if (_ = this.vars[n], X[n]) _ instanceof Array && -1 !== _.join("").indexOf("{self}") && (this.vars[n] = _ = this._swapSelfInParams(_, this));
                else if (D[n] && (h = new D[n])._onInitTween(e, this.vars[n], this)) {
                    for (this._firstPT = l = {
                            _next: this._firstPT,
                            t: h,
                            p: "setRatio",
                            s: 0,
                            c: 1,
                            f: !0,
                            n: n,
                            pg: !0,
                            pr: h._priority
                        }, a = h._overwriteProps.length; --a > -1;) i[h._overwriteProps[a]] = this._firstPT;
                    (h._priority || h._onInitAllProps) && (o = !0), (h._onDisable || h._onEnable) && (this._notifyPluginsOfEnabled = !0)
                } else this._firstPT = i[n] = l = {
                    _next: this._firstPT,
                    t: e,
                    p: n,
                    f: "function" == typeof e[n],
                    n: n,
                    pg: !1,
                    pr: 0
                }, l.s = l.f ? e[n.indexOf("set") || "function" != typeof e["get" + n.substr(3)] ? n : "get" + n.substr(3)]() : parseFloat(e[n]), l.c = "string" == typeof _ && "=" === _.charAt(1) ? parseInt(_.charAt(0) + "1", 10) * Number(_.substr(2)) : Number(_) - l.s || 0;
                l && l._next && (l._next._prev = l)
            }
            return r && this._kill(r, e) ? this._initProps(e, i, s, r) : this._overwrite > 1 && this._firstPT && s.length > 1 && Y(e, this, i, this._overwrite, s) ? (this._kill(i, e), this._initProps(e, i, s, r)) : o
        }, s.render = function(t, e, i) {
            var s, r, n, a = this._time;
            if (t >= this._duration) this._totalTime = this._time = this._duration, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1, this._reversed || (s = !0, r = "onComplete"), 0 === this._duration && ((0 === t || 0 > this._rawPrevTime) && this._rawPrevTime !== t && (i = !0, this._rawPrevTime > 0 && (r = "onReverseComplete", e && (t = -1))), this._rawPrevTime = t);
            else if (1e-7 > t) this._totalTime = this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== a || 0 === this._duration && this._rawPrevTime > 0) && (r = "onReverseComplete", s = this._reversed), 0 > t ? (this._active = !1, 0 === this._duration && (this._rawPrevTime >= 0 && (i = !0), this._rawPrevTime = t)) : this._initted || (i = !0);
            else if (this._totalTime = this._time = t, this._easeType) {
                var o = t / this._duration,
                    h = this._easeType,
                    l = this._easePower;
                (1 === h || 3 === h && o >= .5) && (o = 1 - o), 3 === h && (o *= 2), 1 === l ? o *= o : 2 === l ? o *= o * o : 3 === l ? o *= o * o * o : 4 === l && (o *= o * o * o * o), this.ratio = 1 === h ? 1 - o : 2 === h ? o : .5 > t / this._duration ? o / 2 : 1 - o / 2
            } else this.ratio = this._ease.getRatio(t / this._duration);
            if (this._time !== a || i) {
                if (!this._initted) {
                    if (this._init(), !this._initted) return;
                    this._time && !s ? this.ratio = this._ease.getRatio(this._time / this._duration) : s && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
                }
                for (this._active || !this._paused && this._time !== a && t >= 0 && (this._active = !0), 0 === a && (this._startAt && (t >= 0 ? this._startAt.render(t, e, i) : r || (r = "_dummyGS")), this.vars.onStart && (0 !== this._time || 0 === this._duration) && (e || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || d))), n = this._firstPT; n;) n.f ? n.t[n.p](n.c * this.ratio + n.s) : n.t[n.p] = n.c * this.ratio + n.s, n = n._next;
                this._onUpdate && (0 > t && this._startAt && this._startAt.render(t, e, i), e || this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || d)), r && (this._gc || (0 > t && this._startAt && !this._onUpdate && this._startAt.render(t, e, i), s && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[r] && this.vars[r].apply(this.vars[r + "Scope"] || this, this.vars[r + "Params"] || d)))
            }
        }, s._kill = function(t, e) {
            if ("all" === t && (t = null), null == t && (null == e || e === this.target)) return this._enabled(!1, !1);
            e = "string" != typeof e ? e || this._targets || this.target : A.selector(e) || e;
            var i, s, r, n, a, o, h, l;
            if ((e instanceof Array || C(e)) && "number" != typeof e[0])
                for (i = e.length; --i > -1;) this._kill(t, e[i]) && (o = !0);
            else {
                if (this._targets) {
                    for (i = this._targets.length; --i > -1;)
                        if (e === this._targets[i]) {
                            a = this._propLookup[i] || {}, this._overwrittenProps = this._overwrittenProps || [], s = this._overwrittenProps[i] = t ? this._overwrittenProps[i] || {} : "all";
                            break
                        }
                } else {
                    if (e !== this.target) return !1;
                    a = this._propLookup, s = this._overwrittenProps = t ? this._overwrittenProps || {} : "all"
                }
                if (a) {
                    h = t || a, l = t !== s && "all" !== s && t !== a && (null == t || t._tempKill !== !0);
                    for (r in h)(n = a[r]) && (n.pg && n.t._kill(h) && (o = !0), n.pg && 0 !== n.t._overwriteProps.length || (n._prev ? n._prev._next = n._next : n === this._firstPT && (this._firstPT = n._next), n._next && (n._next._prev = n._prev), n._next = n._prev = null), delete a[r]), l && (s[r] = 1);
                    !this._firstPT && this._initted && this._enabled(!1, !1)
                }
            }
            return o
        }, s.invalidate = function() {
            return this._notifyPluginsOfEnabled && A._onPluginEvent("_onDisable", this), this._firstPT = null, this._overwrittenProps = null, this._onUpdate = null, this._startAt = null, this._initted = this._active = this._notifyPluginsOfEnabled = !1, this._propLookup = this._targets ? {} : [], this
        }, s._enabled = function(t, e) {
            if (n || r.wake(), t && this._gc) {
                var i, s = this._targets;
                if (s)
                    for (i = s.length; --i > -1;) this._siblings[i] = z(s[i], this, !0);
                else this._siblings = z(this.target, this, !0)
            }
            return S.prototype._enabled.call(this, t, e), !(!this._notifyPluginsOfEnabled || !this._firstPT) && A._onPluginEvent(t ? "_onEnable" : "_onDisable", this)
        }, A.to = function(t, e, i) {
            return new A(t, e, i)
        }, A.from = function(t, e, i) {
            return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, new A(t, e, i)
        }, A.fromTo = function(t, e, i, s) {
            return s.startAt = i, s.immediateRender = 0 != s.immediateRender && 0 != i.immediateRender, new A(t, e, s)
        }, A.delayedCall = function(t, e, i, s, r) {
            return new A(e, 0, {
                delay: t,
                onComplete: e,
                onCompleteParams: i,
                onCompleteScope: s,
                onReverseComplete: e,
                onReverseCompleteParams: i,
                onReverseCompleteScope: s,
                immediateRender: !1,
                useFrames: r,
                overwrite: 0
            })
        }, A.set = function(t, e) {
            return new A(t, 0, e)
        }, A.killTweensOf = A.killDelayedCallsTo = function(t, e) {
            for (var i = A.getTweensOf(t), s = i.length; --s > -1;) i[s]._kill(e, t)
        }, A.getTweensOf = function(t) {
            if (null == t) return [];
            t = "string" != typeof t ? t : A.selector(t) || t;
            var e, i, s, r;
            if ((t instanceof Array || C(t)) && "number" != typeof t[0]) {
                for (e = t.length, i = []; --e > -1;) i = i.concat(A.getTweensOf(t[e]));
                for (e = i.length; --e > -1;)
                    for (r = i[e], s = e; --s > -1;) r === i[s] && i.splice(e, 1)
            } else
                for (i = z(t).concat(), e = i.length; --e > -1;) i[e]._gc && i.splice(e, 1);
            return i
        };
        var B = c("plugins.TweenPlugin", function(t, e) {
            this._overwriteProps = (t || "").split(","), this._propName = this._overwriteProps[0], this._priority = e || 0, this._super = B.prototype
        }, !0);
        if (s = B.prototype, B.version = "1.10.1", B.API = 2, s._firstPT = null, s._addTween = function(t, e, i, s, r, n) {
                var a, o;
                return null != s && (a = "number" == typeof s || "=" !== s.charAt(1) ? Number(s) - i : parseInt(s.charAt(0) + "1", 10) * Number(s.substr(2))) ? (this._firstPT = o = {
                    _next: this._firstPT,
                    t: t,
                    p: e,
                    s: i,
                    c: a,
                    f: "function" == typeof t[e],
                    n: r || e,
                    r: n
                }, o._next && (o._next._prev = o), o) : void 0
            }, s.setRatio = function(t) {
                for (var e, i = this._firstPT, s = 1e-6; i;) e = i.c * t + i.s, i.r ? e = 0 | e + (e > 0 ? .5 : -.5) : s > e && e > -s && (e = 0), i.f ? i.t[i.p](e) : i.t[i.p] = e, i = i._next
            }, s._kill = function(t) {
                var e, i = this._overwriteProps,
                    s = this._firstPT;
                if (null != t[this._propName]) this._overwriteProps = [];
                else
                    for (e = i.length; --e > -1;) null != t[i[e]] && i.splice(e, 1);
                for (; s;) null != t[s.n] && (s._next && (s._next._prev = s._prev), s._prev ? (s._prev._next = s._next, s._prev = null) : this._firstPT === s && (this._firstPT = s._next)), s = s._next;
                return !1
            }, s._roundProps = function(t, e) {
                for (var i = this._firstPT; i;)(t[this._propName] || null != i.n && t[i.n.split(this._propName + "_").join("")]) && (i.r = e), i = i._next
            }, A._onPluginEvent = function(t, e) {
                var i, s, r, n, a, o = e._firstPT;
                if ("_onInitAllProps" === t) {
                    for (; o;) {
                        for (a = o._next, s = r; s && s.pr > o.pr;) s = s._next;
                        (o._prev = s ? s._prev : n) ? o._prev._next = o: r = o, (o._next = s) ? s._prev = o : n = o, o = a
                    }
                    o = e._firstPT = r
                }
                for (; o;) o.pg && "function" == typeof o.t[t] && o.t[t]() && (i = !0), o = o._next;
                return i
            }, B.activate = function(t) {
                for (var e = t.length; --e > -1;) t[e].API === B.API && (D[(new t[e])._propName] = t[e]);
                return !0
            }, f.plugin = function(t) {
                if (!(t && t.propName && t.init && t.API)) throw "illegal plugin definition.";
                var e, i = t.propName,
                    s = t.priority || 0,
                    r = t.overwriteProps,
                    n = {
                        init: "_onInitTween",
                        set: "setRatio",
                        kill: "_kill",
                        round: "_roundProps",
                        initAll: "_onInitAllProps"
                    },
                    a = c("plugins." + i.charAt(0).toUpperCase() + i.substr(1) + "Plugin", function() {
                        B.call(this, i, s), this._overwriteProps = r || []
                    }, t.global === !0),
                    o = a.prototype = new B(i);
                o.constructor = a, a.API = t.API;
                for (e in n) "function" == typeof t[e] && (o[n[e]] = t[e]);
                return a.version = t.version, B.activate([a]), a
            }, e = t._gsQueue) {
            for (i = 0; e.length > i; i++) e[i]();
            for (s in u) u[s].func || t.gradle.event("GSAP encountered missing dependency: com.greensock." + s)
        }
        n = !1
    }(window);
! function() {
    var e = {},
        o = null,
        n = !0,
        t = !1;
    try {
        "undefined" != typeof AudioContext ? o = new AudioContext : "undefined" != typeof webkitAudioContext ? o = new webkitAudioContext : n = !1
    } catch (r) {
        n = !1
    }
    if (!n)
        if ("undefined" != typeof Audio) try {
            new Audio
        } catch (r) {
            t = !0
        } else t = !0;
    if (n) {
        var a = "undefined" == typeof o.createGain ? o.createGainNode() : o.createGain();
        a.gain.value = 1, a.connect(o.destination)
    }
    var i = function(e) {
        this._volume = 1, this._muted = !1, this.usingWebAudio = n, this.ctx = o, this.noAudio = t, this._howls = [], this._codecs = e, this.iOSAutoEnable = !0
    };
    i.prototype = {
        volume: function(e) {
            var o = this;
            if (e = parseFloat(e), e >= 0 && 1 >= e) {
                o._volume = e, n && (a.gain.value = e);
                for (var t in o._howls)
                    if (o._howls.hasOwnProperty(t) && o._howls[t]._webAudio === !1)
                        for (var r = 0; r < o._howls[t]._audioNode.length; r++) o._howls[t]._audioNode[r].volume = o._howls[t]._volume * o._volume;
                return o
            }
            return n ? a.gain.value : o._volume
        },
        mute: function() {
            return this._setMuted(!0), this
        },
        unmute: function() {
            return this._setMuted(!1), this
        },
        _setMuted: function(e) {
            var o = this;
            o._muted = e, n && (a.gain.value = e ? 0 : o._volume);
            for (var t in o._howls)
                if (o._howls.hasOwnProperty(t) && o._howls[t]._webAudio === !1)
                    for (var r = 0; r < o._howls[t]._audioNode.length; r++) o._howls[t]._audioNode[r].muted = e
        },
        codecs: function(e) {
            return this._codecs[e]
        },
        _enableiOSAudio: function() {
            var e = this;
            if (!o || !e._iOSEnabled && /iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                e._iOSEnabled = !1;
                var n = function() {
                    var t = o.createBuffer(1, 1, 22050),
                        r = o.createBufferSource();
                    r.buffer = t, r.connect(o.destination), "undefined" == typeof r.start ? r.noteOn(0) : r.start(0), setTimeout(function() {
                        (r.playbackState === r.PLAYING_STATE || r.playbackState === r.FINISHED_STATE) && (e._iOSEnabled = !0, e.iOSAutoEnable = !1, window.removeEventListener("touchstart", n, !1))
                    }, 0)
                };
                return window.addEventListener("touchstart", n, !1), e
            }
        }
    };
    var u = null,
        d = {};
    t || (u = new Audio, d = {
        mp3: !!u.canPlayType("audio/mpeg;").replace(/^no$/, ""),
        opus: !!u.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, ""),
        ogg: !!u.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
        wav: !!u.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""),
        aac: !!u.canPlayType("audio/aac;").replace(/^no$/, ""),
        m4a: !!(u.canPlayType("audio/x-m4a;") || u.canPlayType("audio/m4a;") || u.canPlayType("audio/aac;")).replace(/^no$/, ""),
        mp4: !!(u.canPlayType("audio/x-mp4;") || u.canPlayType("audio/mp4;") || u.canPlayType("audio/aac;")).replace(/^no$/, ""),
        weba: !!u.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, "")
    });
    var l = new i(d),
        f = function(e) {
            var t = this;
            t._autoplay = e.autoplay || !1, t._buffer = e.buffer || !1, t._duration = e.duration || 0, t._format = e.format || null, t._loop = e.loop || !1, t._loaded = !1, t._sprite = e.sprite || {}, t._src = e.src || "", t._pos3d = e.pos3d || [0, 0, -.5], t._volume = void 0 !== e.volume ? e.volume : 1, t._urls = e.urls || [], t._rate = e.rate || 1, t._model = e.model || null, t._onload = [e.onload || function() {}], t._onloaderror = [e.onloaderror || function() {}], t._onend = [e.onend || function() {}], t._onpause = [e.onpause || function() {}], t._onplay = [e.onplay || function() {}], t._onendTimer = [], t._webAudio = n && !t._buffer, t._audioNode = [], t._webAudio && t._setupAudioNode(), "undefined" != typeof o && o && l.iOSAutoEnable && l._enableiOSAudio(), l._howls.push(t), t.load()
        };
    if (f.prototype = {
            load: function() {
                var e = this,
                    o = null;
                if (t) return void e.on("loaderror");
                for (var n = 0; n < e._urls.length; n++) {
                    var r, a;
                    if (e._format) r = e._format;
                    else {
                        if (a = e._urls[n], r = /^data:audio\/([^;,]+);/i.exec(a), r || (r = /\.([^.]+)$/.exec(a.split("?", 1)[0])), !r) return void e.on("loaderror");
                        r = r[1].toLowerCase()
                    }
                    if (d[r]) {
                        o = e._urls[n];
                        break
                    }
                }
                if (!o) return void e.on("loaderror");
                if (e._src = o, e._webAudio) _(e, o);
                else {
                    var u = new Audio;
                    u.addEventListener("error", function() {
                        u.error && 4 === u.error.code && (i.noAudio = !0), e.on("loaderror", {
                            type: u.error ? u.error.code : 0
                        })
                    }, !1), e._audioNode.push(u), u.src = o, u._pos = 0, u.preload = "auto", u.volume = l._muted ? 0 : e._volume * l.volume();
                    var f = function() {
                        e._duration = Math.ceil(10 * u.duration) / 10, 0 === Object.getOwnPropertyNames(e._sprite).length && (e._sprite = {
                            _default: [0, 1e3 * e._duration]
                        }), e._loaded || (e._loaded = !0, e.on("load")), e._autoplay && e.play(), u.removeEventListener("canplaythrough", f, !1)
                    };
                    u.addEventListener("canplaythrough", f, !1), u.load()
                }
                return e
            },
            urls: function(e) {
                var o = this;
                return e ? (o.stop(), o._urls = "string" == typeof e ? [e] : e, o._loaded = !1, o.load(), o) : o._urls
            },
            play: function(e, n) {
                var t = this;
                return "function" == typeof e && (n = e), e && "function" != typeof e || (e = "_default"), t._loaded ? t._sprite[e] ? (t._inactiveNode(function(r) {
                    r._sprite = e;
                    var a = r._pos > 0 ? r._pos : t._sprite[e][0] / 1e3,
                        i = 0;
                    t._webAudio ? (i = t._sprite[e][1] / 1e3 - r._pos, r._pos > 0 && (a = t._sprite[e][0] / 1e3 + a)) : i = t._sprite[e][1] / 1e3 - (a - t._sprite[e][0] / 1e3);
                    var u, d = !(!t._loop && !t._sprite[e][2]),
                        f = "string" == typeof n ? n : Math.round(Date.now() * Math.random()) + "";
                    if (function() {
                            var o = {
                                id: f,
                                sprite: e,
                                loop: d
                            };
                            u = setTimeout(function() {
                                !t._webAudio && d && t.stop(o.id).play(e, o.id), t._webAudio && !d && (t._nodeById(o.id).paused = !0, t._nodeById(o.id)._pos = 0, t._clearEndTimer(o.id)), t._webAudio || d || t.stop(o.id), t.on("end", f)
                            }, 1e3 * i), t._onendTimer.push({
                                timer: u,
                                id: o.id
                            })
                        }(), t._webAudio) {
                        var _ = t._sprite[e][0] / 1e3,
                            s = t._sprite[e][1] / 1e3;
                        r.id = f, r.paused = !1, p(t, [d, _, s], f), t._playStart = o.currentTime, r.gain.value = t._volume, "undefined" == typeof r.bufferSource.start ? d ? r.bufferSource.noteGrainOn(0, a, 86400) : r.bufferSource.noteGrainOn(0, a, i) : d ? r.bufferSource.start(0, a, 86400) : r.bufferSource.start(0, a, i)
                    } else {
                        if (4 !== r.readyState && (r.readyState || !navigator.isCocoonJS)) return t._clearEndTimer(f),
                            function() {
                                var o = t,
                                    a = e,
                                    i = n,
                                    u = r,
                                    d = function() {
                                        o.play(a, i), u.removeEventListener("canplaythrough", d, !1)
                                    };
                                u.addEventListener("canplaythrough", d, !1)
                            }(), t;
                        r.readyState = 4, r.id = f, r.currentTime = a, r.muted = l._muted || r.muted, r.volume = t._volume * l.volume(), setTimeout(function() {
                            r.play()
                        }, 0)
                    }
                    return t.on("play"), "function" == typeof n && n(f), t
                }), t) : ("function" == typeof n && n(), t) : (t.on("load", function() {
                    t.play(e, n)
                }), t)
            },
            pause: function(e) {
                var o = this;
                if (!o._loaded) return o.on("play", function() {
                    o.pause(e)
                }), o;
                o._clearEndTimer(e);
                var n = e ? o._nodeById(e) : o._activeNode();
                if (n)
                    if (n._pos = o.pos(null, e), o._webAudio) {
                        if (!n.bufferSource || n.paused) return o;
                        n.paused = !0, "undefined" == typeof n.bufferSource.stop ? n.bufferSource.noteOff(0) : n.bufferSource.stop(0)
                    } else n.pause();
                return o.on("pause"), o
            },
            stop: function(e) {
                var o = this;
                if (!o._loaded) return o.on("play", function() {
                    o.stop(e)
                }), o;
                o._clearEndTimer(e);
                var n = e ? o._nodeById(e) : o._activeNode();
                if (n)
                    if (n._pos = 0, o._webAudio) {
                        if (!n.bufferSource || n.paused) return o;
                        n.paused = !0, "undefined" == typeof n.bufferSource.stop ? n.bufferSource.noteOff(0) : n.bufferSource.stop(0)
                    } else isNaN(n.duration) || (n.pause(), n.currentTime = 0);
                return o
            },
            mute: function(e) {
                var o = this;
                if (!o._loaded) return o.on("play", function() {
                    o.mute(e)
                }), o;
                var n = e ? o._nodeById(e) : o._activeNode();
                return n && (o._webAudio ? n.gain.value = 0 : n.muted = !0), o
            },
            unmute: function(e) {
                var o = this;
                if (!o._loaded) return o.on("play", function() {
                    o.unmute(e)
                }), o;
                var n = e ? o._nodeById(e) : o._activeNode();
                return n && (o._webAudio ? n.gain.value = o._volume : n.muted = !1), o
            },
            volume: function(e, o) {
                var n = this;
                if (e = parseFloat(e), e >= 0 && 1 >= e) {
                    if (n._volume = e, !n._loaded) return n.on("play", function() {
                        try {
                            n.volume(e, o)
                        } catch (e) {
                            //gradle.event(e)
                        }
                    }), n;
                    var t = o ? n._nodeById(o) : n._activeNode();
                    return t && (n._webAudio ? t.gain.value = e : t.volume = e * l.volume()), n
                }
                return n._volume
            },
            loop: function(e) {
                var o = this;
                return "boolean" == typeof e ? (o._loop = e, o) : o._loop
            },
            sprite: function(e) {
                var o = this;
                return "object" == typeof e ? (o._sprite = e, o) : o._sprite
            },
            pos: function(e, n) {
                var t = this;
                if (!t._loaded) return t.on("load", function() {
                    t.pos(e)
                }), "number" == typeof e ? t : t._pos || 0;
                e = parseFloat(e);
                var r = n ? t._nodeById(n) : t._activeNode();
                if (r) return e >= 0 ? (t.pause(n), r._pos = e, t.play(r._sprite, n), t) : t._webAudio ? r._pos + (o.currentTime - t._playStart) : r.currentTime;
                if (e >= 0) return t;
                for (var a = 0; a < t._audioNode.length; a++)
                    if (t._audioNode[a].paused && 4 === t._audioNode[a].readyState) return t._webAudio ? t._audioNode[a]._pos : t._audioNode[a].currentTime
            },
            pos3d: function(e, o, n, t) {
                var r = this;
                if (o = "undefined" != typeof o && o ? o : 0, n = "undefined" != typeof n && n ? n : -.5, !r._loaded) return r.on("play", function() {
                    r.pos3d(e, o, n, t)
                }), r;
                if (!(e >= 0 || 0 > e)) return r._pos3d;
                if (r._webAudio) {
                    var a = t ? r._nodeById(t) : r._activeNode();
                    a && (r._pos3d = [e, o, n], a.panner.setPosition(e, o, n), a.panner.panningModel = r._model || "HRTF")
                }
                return r
            },
            fade: function(e, o, n, t, r) {
                var a = this,
                    i = Math.abs(e - o),
                    u = e > o ? "down" : "up",
                    d = i / .01,
                    l = n / d;
                if (!a._loaded) return a.on("load", function() {
                    a.fade(e, o, n, t, r)
                }), a;
                a.volume(e, r);
                for (var f = 1; d >= f; f++) ! function() {
                    var e = a._volume + ("up" === u ? .01 : -.01) * f,
                        n = Math.round(1e3 * e) / 1e3,
                        i = o;
                    setTimeout(function() {
                        a.volume(n, r), n === i && t && t()
                    }, l * f)
                }()
            },
            fadeIn: function(e, o, n) {
                return this.volume(0).play().fade(0, e, o, n)
            },
            fadeOut: function(e, o, n, t) {
                var r = this;
                return r.fade(r._volume, e, o, function() {
                    n && n(), r.pause(t), r.on("end")
                }, t)
            },
            _nodeById: function(e) {
                for (var o = this, n = o._audioNode[0], t = 0; t < o._audioNode.length; t++)
                    if (o._audioNode[t].id === e) {
                        n = o._audioNode[t];
                        break
                    }
                return n
            },
            _activeNode: function() {
                for (var e = this, o = null, n = 0; n < e._audioNode.length; n++)
                    if (!e._audioNode[n].paused) {
                        o = e._audioNode[n];
                        break
                    }
                return e._drainPool(), o
            },
            _inactiveNode: function(e) {
                for (var o = this, n = null, t = 0; t < o._audioNode.length; t++)
                    if (o._audioNode[t].paused && 4 === o._audioNode[t].readyState) {
                        e(o._audioNode[t]), n = !0;
                        break
                    }
                if (o._drainPool(), !n) {
                    var r;
                    if (o._webAudio) r = o._setupAudioNode(), e(r);
                    else {
                        o.load(), r = o._audioNode[o._audioNode.length - 1];
                        var a = navigator.isCocoonJS ? "canplaythrough" : "loadedmetadata",
                            i = function() {
                                r.removeEventListener(a, i, !1), e(r)
                            };
                        r.addEventListener(a, i, !1)
                    }
                }
            },
            _drainPool: function() {
                var e, o = this,
                    n = 0;
                for (e = 0; e < o._audioNode.length; e++) o._audioNode[e].paused && n++;
                for (e = o._audioNode.length - 1; e >= 0 && !(5 >= n); e--) o._audioNode[e].paused && (o._webAudio && o._audioNode[e].disconnect(0), n--, o._audioNode.splice(e, 1))
            },
            _clearEndTimer: function(e) {
                for (var o = this, n = 0, t = 0; t < o._onendTimer.length; t++)
                    if (o._onendTimer[t].id === e) {
                        n = t;
                        break
                    }
                var r = o._onendTimer[n];
                r && (clearTimeout(r.timer), o._onendTimer.splice(n, 1))
            },
            _setupAudioNode: function() {
                var e = this,
                    n = e._audioNode,
                    t = e._audioNode.length;
                return n[t] = "undefined" == typeof o.createGain ? o.createGainNode() : o.createGain(), n[t].gain.value = e._volume, n[t].paused = !0, n[t]._pos = 0, n[t].readyState = 4, n[t].connect(a), n[t].panner = o.createPanner(), n[t].panner.panningModel = e._model || "equalpower", n[t].panner.setPosition(e._pos3d[0], e._pos3d[1], e._pos3d[2]), n[t].panner.connect(n[t]), n[t]
            },
            on: function(e, o) {
                var n = this,
                    t = n["_on" + e];
                if ("function" == typeof o) t.push(o);
                else
                    for (var r = 0; r < t.length; r++) o ? t[r].call(n, o) : t[r].call(n);
                return n
            },
            off: function(e, o) {
                var n = this,
                    t = n["_on" + e],
                    r = o ? o.toString() : null;
                if (r) {
                    for (var a = 0; a < t.length; a++)
                        if (r === t[a].toString()) {
                            t.splice(a, 1);
                            break
                        }
                } else n["_on" + e] = [];
                return n
            },
            unload: function() {
                for (var o = this, n = o._audioNode, t = 0; t < o._audioNode.length; t++) n[t].paused || (o.stop(n[t].id), o.on("end", n[t].id)), o._webAudio ? n[t].disconnect(0) : n[t].src = "";
                for (t = 0; t < o._onendTimer.length; t++) clearTimeout(o._onendTimer[t].timer);
                var r = l._howls.indexOf(o);
                null !== r && r >= 0 && l._howls.splice(r, 1), delete e[o._src], o = null
            }
        }, n) var _ = function(o, n) {
            if (n in e) return o._duration = e[n].duration, void c(o);
            if (/^data:[^;]+;base64,/.test(n)) {
                for (var t = atob(n.split(",")[1]), r = new Uint8Array(t.length), a = 0; a < t.length; ++a) r[a] = t.charCodeAt(a);
                s(r.buffer, o, n)
            } else {
                var i = new XMLHttpRequest;
                i.open("GET", n, !0), i.responseType = "arraybuffer", i.onload = function() {
                    s(i.response, o, n)
                }, i.onerror = function() {
                    o._webAudio && (o._buffer = !0, o._webAudio = !1, o._audioNode = [], delete o._gainNode, delete e[n], o.load())
                };
                try {
                    i.send()
                } catch (u) {
                    i.onerror()
                }
            }
        },
        s = function(n, t, r) {
            o.decodeAudioData(n, function(o) {
                o && (e[r] = o, c(t, o))
            }, function(e) {
                t.on("loaderror")
            })
        },
        c = function(e, o) {
            e._duration = o ? o.duration : e._duration, 0 === Object.getOwnPropertyNames(e._sprite).length && (e._sprite = {
                _default: [0, 1e3 * e._duration]
            }), e._loaded || (e._loaded = !0, e.on("load")), e._autoplay && e.play()
        },
        p = function(n, t, r) {
            var a = n._nodeById(r);
            a.bufferSource = o.createBufferSource(), a.bufferSource.buffer = e[n._src], a.bufferSource.connect(a.panner), a.bufferSource.loop = t[0], t[0] && (a.bufferSource.loopStart = t[1], a.bufferSource.loopEnd = t[1] + t[2]), a.bufferSource.playbackRate.value = n._rate
        };
    "function" == typeof define && define.amd && define(function() {
        return {
            Howler: l,
            Howl: f
        }
    }), "undefined" != typeof exports && (exports.Howler = l, exports.Howl = f), "undefined" != typeof window && (window.Howler = l, window.Howl = f)
}();
var vis = function() {
    var i, e, n = {
        hidden: "visibilitychange",
        webkitHidden: "webkitvisibilitychange",
        mozHidden: "mozvisibilitychange",
        msHidden: "msvisibilitychange"
    };
    for (i in n)
        if (i in document) {
            e = n[i];
            break
        }
    return function(n) {
        return n && document.addEventListener(e, n), !document[i]
    }
}();
vis(function() {
    vis() ? setTimeout(function() {
        visibleResume()
    }, 300) : visiblePause()
});
var notIE = void 0 === document.documentMode,
    isChromium = window.chrome;
notIE && !isChromium || (window.addEventListener ? (window.addEventListener("focus", function(i) {
    setTimeout(function() {
        visibleResume()
    }, 300)
}, !1), window.addEventListener("blur", function(i) {
    visiblePause()
}, !1)) : (window.attachEvent("focus", function(i) {
    setTimeout(function() {
        visibleResume()
    }, 300)
}), window.attachEvent("blur", function(i) {
    visiblePause()
})));

function visibleResume() {
    hasFocus || (userInput && userInput.checkKeyFocus(), muted || "pause" == gameState || (Howler.unmute(), music.play())), hasFocus = !0
}

function visiblePause() {
    hasFocus = !1, Howler.mute(), music.pause()
}

function isStock() {
    var t = window.navigator.userAgent.match(/Android.*AppleWebKit\/([\d.]+)/);
    return t && parseFloat(t[1]) < 537
}

function extGameLoad() {
    loadPreAssets()
}

function initSplash() {
    gameState = "splash";
	resizeCanvas();

	window.gradle_onPauseRequested = function() {
        Howler.mute(), music.pause()
    };
	
	window.gradle_onResumeRequested = function() {
        muted || "pause" == gameState || (Howler.unmute(), music.play())
    };
	
    if (localStorage) {
    	localStorage.getItem("muted") && (muted = !1, toggleMute(!0));
    }
	1 != audioType || muted || music.play();

	initStartScreen();
}

function initStartScreen() {
    gameState = "start";
    try {
        gradle.event('SCREEN_HOME')
    } catch (t) {}
	
    //userInput.removeHitArea("moreGames");
	
	1 == audioType && (musicTween && musicTween.kill(), musicTween = TweenLite.to(music, .1, {
        volume: .25,
        ease: "Linear.easeNone"
    }));

	highscore = saveDataHandler.getData();
	levelNum = 0;
	background = new Elements.Background(0);
	
    var e = {
            oImgData: assetLib.getData("uiButs"),
            aPos: [0, 0],
            align: [.5, .7],
            id: oImageIds.playBut
        },
        a = {
            oImgData: assetLib.getData("moreGamesBut"),
            aPos: [100, 245],
            align: [0, 1],
            id: "none",
            scale: .3,
            noMove: !0
        },
        i = {
            oImgData: assetLib.getData("uiButs"),
            aPos: [-98, 37],
            align: [1, 0],
            id: oImageIds.infoBut,
            noMove: !0
        };
		
    userInput.addHitArea("startGame", butEventHandler, null, "image", e);
	//userInput.addHitArea("moreGames", butEventHandler, null, "image", a);
	userInput.addHitArea("credits", butEventHandler, null, "image", i);
    var s = new Array(e, a, i);
    addMuteBut(s), panel = new Elements.Panel(gameState, s), panel.startTween1(), previousTime = (new Date).getTime(), aFallingGems = new Array;
    for (var h = 0; h < 20; h++) {
        var o = new Elements.FallingGem;
        aFallingGems.push(o)
    }
    updateStartScreenEvent()
}

function addMuteBut(t) {
    if (1 == audioType) {
        var e = oImageIds.muteBut0;
        muted && (e = oImageIds.muteBut1);
        var a = {
            oImgData: assetLib.getData("uiButs"),
            aPos: [-33, 37],
            align: [1, 0],
            id: e,
            noMove: !0
        };
        userInput.addHitArea("mute", butEventHandler, null, "image", a, !0), t.push(a)
    }
}

function initCreditsScreen() {
    gameState = "credits";
    try {
        gradle.event('SCREEN_CREDITS')
    } catch (t) {}
    background = new Elements.Background(1);
    var e = {
            oImgData: assetLib.getData("uiButs"),
            aPos: [-98, 37],
            align: [1, 0],
            id: oImageIds.backBut,
            noMove: !0
        },
        a = {
            oImgData: assetLib.getData("uiButs"),
            aPos: [35, -31],
            align: [0, 1],
            id: oImageIds.resetBut,
            noMove: !0
        };
    userInput.addHitArea("backFromCredits", butEventHandler, null, "image", e), userInput.addHitArea("resetData", butEventHandler, null, "image", a);
    var i = new Array(e, a);
    addMuteBut(i), panel = new Elements.Panel(gameState, i), panel.startTween1(), previousTime = (new Date).getTime(), updateCreditsScreenEvent()
}

function initGame() {
    gameState = "game", gradle.event('SCREEN_LEVEL'), curTime = 12e3, score = 0, gradle.event("EVENT_LIVESCORE", {
        liveScore: score
    }), levelNum = 0, hints = 0, levelState = 0, 1 == audioType && (musicTween.kill(), musicTween = TweenLite.to(music, 1, {
        volume: .5,
        ease: "Linear.easeNone"
    })), aFireworks = new Array, aFloatScores = new Array, background = new Elements.Background(0);
    var t = {
        oImgData: assetLib.getData("uiButs"),
        aPos: [-98, 37],
        align: [1, 0],
        id: oImageIds.pauseBut,
        noMove: !0
    };
    userInput.addHitArea("pause", butEventHandler, null, "image", t, !0);
    var e = new Array(t);
    addMuteBut(e), panel = new Elements.Panel(gameState, e), hexTarget = new Elements.HexTarget, hud = new Elements.Hud, userInput.addHitArea("gameTouch", butEventHandler, {
        isDraggable: !0,
        multiTouch: !0
    }, "rect", {
        aRect: [0, 0, canvas.width, canvas.height]
    }, !0), levelStart(), firstRun && (hud.tutAnimReset(), hud.tutAnim()), panel.startTween1(), previousTime = (new Date).getTime(), updateGameEvent()
}

function togglePauseAndMuteButs(t) {
    if (t) {
        var e = {
            oImgData: assetLib.getData("uiButs"),
            aPos: [-98, 37],
            align: [1, 0],
            id: oImageIds.pauseBut,
            noMove: !0
        };
        userInput.addHitArea("pause", butEventHandler, null, "image", e, !0), panel.aButs = new Array(e), addMuteBut(panel.aButs), userInput.removeHitArea("gameTouch"), userInput.addHitArea("gameTouch", butEventHandler, {
            isDraggable: !0,
            multiTouch: !0
        }, "rect", {
            aRect: [0, 0, canvas.width, canvas.height]
        }, !0)
    } else userInput.removeHitArea("pause"), userInput.removeHitArea("mute")
}

function initPause() {
    gameState = "pause";
    try {
        gradle.event('SCREEN_PAUSE')
    } catch (t) {}
    var e = {
            oImgData: assetLib.getData("uiButs"),
            aPos: [-98, 37],
            align: [1, 0],
            id: oImageIds.backBut,
            noMove: !0
        },
        a = {
            oImgData: assetLib.getData("uiButs"),
            aPos: [75, 0],
            align: [.5, .5],
            id: oImageIds.quitBut,
            noMove: !0
        },
        i = {
            oImgData: assetLib.getData("uiButs"),
            aPos: [-75, 0],
            align: [.5, .5],
            id: oImageIds.restartBut,
            noMove: !0
        };
    userInput.addHitArea("resumeGameFromPause", butEventHandler, null, "image", e), userInput.addHitArea("quitGameFromPause", butEventHandler, null, "image", a), userInput.addHitArea("restartGameFromPause", butEventHandler, null, "image", i);
    var s = new Array(e, a, i);
    panel = new Elements.Panel(gameState, s), panel.startTween1(), previousTime = (new Date).getTime(), background = new Elements.Background(1), updatePauseEvent()
}

function resumeGame() {
    gameState = "game", background = new Elements.Background(0);
    var t = {
        oImgData: assetLib.getData("uiButs"),
        aPos: [-98, 37],
        align: [1, 0],
        id: oImageIds.pauseBut,
        noMove: !0
    };
    userInput.addHitArea("pause", butEventHandler, null, "image", t);
    var e = new Array(t);
    addMuteBut(e), panel = new Elements.Panel(gameState, e), userInput.addHitArea("gameTouch", butEventHandler, {
        isDraggable: !0,
        multiTouch: !0
    }, "rect", {
        aRect: [0, 0, canvas.width, canvas.height]
    }, !0), panel.startTween1(), previousTime = (new Date).getTime(), updateGameEvent()
}

function butEventHandler(t, e) {
    switch (t) {
        case "langSelect":
            curLang = e.lang, ctx.clearRect(0, 0, canvas.width, canvas.height), userInput.removeHitArea("langSelect"), preAssetLib = new Utils.AssetLoader(curLang, [{
                id: "preloadImage",
                file: "images/preloadImage.jpg"
            }], ctx, canvas.width, canvas.height, (!1)), preAssetLib.onReady(initLoadAssets);
            break;
        case "credits":
            playSound("click"), userInput.removeHitArea("startGame"), userInput.removeHitArea("moreGames"), userInput.removeHitArea("credits"), userInput.removeHitArea("mute"), initCreditsScreen();
            break;
        case "backFromCredits":
            playSound("click"), userInput.removeHitArea("backFromCredits"), userInput.removeHitArea("resetData"), userInput.removeHitArea("mute"), initStartScreen();
            break;
        case "moreGames":
        case "moreGamesPause":
            playSound("click");
            try {
                gradle.moreGames();
            } catch (a) {}
            break;
        case "resetData":
            playSound("click"), userInput.removeHitArea("backFromCredits"), userInput.removeHitArea("resetData"), userInput.removeHitArea("mute"), firstRun = !0, saveDataHandler.resetData(), highscore = saveDataHandler.getData(), initStartScreen();
            break;
        case "startGame":
            playSound("click");
            try {
                gradle.event('EVENT_LEVELSTART', {
                    levelName: ""
                })
            } catch (a) {}
            userInput.removeHitArea("startGame"), userInput.removeHitArea("moreGames"), userInput.removeHitArea("credits"), initGame();
            break;
        case "gameTouch":
            0 == levelState && (e.isDown && !e.isBeingDragged ? e.x > hud.hintX - 45 && e.x < hud.hintX + 45 && e.y > hud.hintY - 45 && e.y < hud.hintY + 45 && hints > 0 ? (hexTarget.hintUsed(), hud.resetHintTimer(), hints--, playSound("useHint")) : (hexPieces.checkTouch(e.x, e.y), touchX = e.x, touchY = e.y) : e.isBeingDragged && !e.hasLeft ? (touchX = e.x, touchY = e.y) : hexPieces.checkDrop());
            break;
        case "restartFromEnd":
            playSound("click");
            try {
                gradle.event('EVENT_LEVELRESTART', {
                    levelName: ""
                })
            } catch (a) {}
            userInput.removeHitArea("restartFromEnd"), userInput.removeHitArea("quitFromEnd"), initGame(), 0 == giftType ? score += 0 == giftNum ? 100 : 1 == giftNum ? 150 : 200 : 1 == giftType ? curTime += 0 == giftNum ? 1e3 : 1 == giftNum ? 1500 : 2e3 : 2 == giftType && (hints += 0 == giftNum ? 2 : 1 == giftNum ? 3 : 4);
            break;
        case "quitFromEnd":
            playSound("click"), userInput.removeHitArea("giftFromEnd"), userInput.removeHitArea("quitFromEnd"), initStartScreen();
            break;
        case "giftFromEnd":
            playSound("click"), playSound("openGift"), userInput.removeHitArea("giftFromEnd"), userInput.removeHitArea("quitFromEnd"), initGift();
            break;
        case "mute":
            playSound("click"), toggleMute(), muted ? panel.switchBut(oImageIds.muteBut0, oImageIds.muteBut1) : panel.switchBut(oImageIds.muteBut1, oImageIds.muteBut0);
            break;
        case "pause":
            0 == levelState && (playSound("click"), 1 == audioType ? (Howler.mute(), music.pause()) : 2 == audioType && music.pause(), userInput.removeHitArea("pause"), userInput.removeHitArea("gameTouch"), userInput.removeHitArea("mute"), initPause());
            break;
        case "resumeGameFromPause":
            playSound("click");
            try {
                gradle.event('SCREEN_LEVEL')
            } catch (a) {}
            1 == audioType ? muted || (Howler.unmute(), music.play()) : 2 == audioType && (muted || music.play()), userInput.removeHitArea("quitGameFromPause"), userInput.removeHitArea("resumeGameFromPause"), userInput.removeHitArea("restartGameFromPause"), resumeGame();
            break;
        case "quitGameFromPause":
            playSound("click");
            try {
                gradle.event('EVENT_LEVELFAIL', {
                    levelName: "",
                    reason: "quit"
                })
            } catch (a) {}
            1 == audioType ? muted || (Howler.unmute(), music.play()) : 2 == audioType && (muted || music.play()), userInput.removeHitArea("quitGameFromPause"), userInput.removeHitArea("resumeGameFromPause"), userInput.removeHitArea("restartGameFromPause"), score = 0, gradle.event("EVENT_LIVESCORE", {
                liveScore: score
            }), initStartScreen();
            break;
        case "restartGameFromPause":
            playSound("click");
            try {
                gradle.event('EVENT_LEVELRESTART', {
                    levelName: ""
                })
            } catch (a) {}
            1 == audioType ? muted || (Howler.unmute(), music.play()) : 2 == audioType && (muted || music.play()), userInput.removeHitArea("quitGameFromPause"), userInput.removeHitArea("resumeGameFromPause"), userInput.removeHitArea("restartGameFromPause"), initGame()
    }
}

function levelComplete() {
    playSound("levelComplete"), background.zoomIn(), hexplode = new Elements.Hexplode(0), hud.jiggle(), levelState = 1, hud.resetHintTimer(), levelNum++, firstRun = !1, hud.addEnergy(hexPieces.aPieceData.length / 10);
    for (var t = 0; t < hexPieces.aPieceData.length; t++)
        if (!hexPieces.aPieceData[t].isWrong) {
            var e = hexPieces.aPieces[t].length + hexPieces.aPieceData[t].tryCount,
                a = new Elements.FloatScore(hexTarget.aHex[hexPieces.aPieces[t][0][0]][hexPieces.aPieces[t][0][1]].x, hexTarget.aHex[hexPieces.aPieces[t][0][0]][hexPieces.aPieces[t][0][1]].y, e, t);
            aFloatScores.push(a), updateScore(Math.min(10 * e, 100))
        }
}

function gameComplete() {
    background = new Elements.Background(2), 1 == audioType && (musicTween.kill(), musicTween = TweenLite.to(music, .01, {
        volume: .01,
        ease: "Linear.easeNone"
    })), hexplode = new Elements.Hexplode(1), levelState = 1, playSound("gameEnd"), hud.resetHintTimer()
}

function levelStart() {
    background.zoomOut(), playSound("levelStart"), hexTarget.createTarget(), hexTarget.createPieces(), hexPieces = new Elements.HexPieces(hexTarget.aPieces), levelState = 0, glint = new Elements.Glint
}

function randomise(t) {
    for (var e = t.length - 1; e > 0; e--) {
        var a = Math.floor(Math.random() * (e + 1)),
            i = t[e];
        t[e] = t[a], t[a] = i
    }
    return t
}

function updateScore(t) {
    score += t, gradle.event("EVENT_LIVESCORE", {
        liveScore: score
    }), score > 99999 && (score = 99999)
}

function updateTime(t) {
    curTime += 100 * t
}

function addFirework(t, e, a, i) {
    if ("undefined" == typeof i && (i = 1), !(aFireworks.length > 10)) {
        var s = "explode",
            h = new Elements.Firework(assetLib.getData("firework" + t), s);
        h.x = e, h.y = a, h.scaleX = h.scaleY = i, aFireworks.push(h)
    }
}

function initGameOver() {
    gameState = "gameOver";
    try {
        gradle.event('SCREEN_GAMERESULT')
    } catch (t) {}
    try {
        gradle.event('EVENT_LEVELFAIL', {
            levelName: "",
            reason: "timeout"
        })
    } catch (t) {}
    try {
        gradle.event('EVENT_TOTALSCORE', {
            totalScore: score
        })
    } catch (t) {}
    playSound("useHint"), playSound("hintFizz"), 1 == audioType && (musicTween.kill(), musicTween = TweenLite.to(music, 2, {
        volume: .25,
        ease: "Linear.easeNone"
    })), background = new Elements.Background(1), score > highscore && (saveDataHandler.setData(score), saveDataHandler.saveData(), highscore = saveDataHandler.getData()), userInput.removeHitArea("pause"), userInput.removeHitArea("gameTouch"), userInput.removeHitArea("mute");
    var e = {
            oImgData: assetLib.getData("uiButs"),
            aPos: [-98, 37],
            align: [1, 0],
            id: oImageIds.backBut,
            noMove: !0
        },
        a = {
            oImgData: assetLib.getData("uiButs"),
            aPos: [0, 150],
            align: [.5, .5],
            id: oImageIds.giftBut
        };
    userInput.addHitArea("giftFromEnd", butEventHandler, null, "image", a), userInput.addHitArea("quitFromEnd", butEventHandler, null, "image", e);
    var i = new Array(a, e);
    addMuteBut(i), panel = new Elements.Panel(gameState, i), panel.startTween1(), aFireworks = new Array, aFallingGems = new Array;
    for (var s = 0; s < 20; s++) {
        var h = new Elements.FallingGem;
        aFallingGems.push(h)
    }
    previousTime = (new Date).getTime(), updateGameOver()
}

function initGift() {
    gameState = "gift", background = new Elements.Background(2);
    var t = {
            oImgData: assetLib.getData("uiButs"),
            aPos: [-98, 37],
            align: [1, 0],
            id: oImageIds.backBut,
            noMove: !0
        },
        e = {
            oImgData: assetLib.getData("uiButs"),
            aPos: [0, 150],
            align: [.5, .5],
            id: oImageIds.playBut
        };
    userInput.addHitArea("restartFromEnd", butEventHandler, null, "image", e), userInput.addHitArea("quitFromEnd", butEventHandler, null, "image", t);
    var a = new Array(e, t);
    addMuteBut(a), panel = new Elements.Panel(gameState, a), panel.startTween1(), giftType = Math.floor(3 * Math.random()), giftNum = Math.floor(3 * Math.random()), aFireworks = new Array, aFallingGems = new Array;
    for (var i = 0; i < 20; i++) {
        var s = new Elements.FallingGem;
        aFallingGems.push(s)
    }
    addFirework(1, canvas.width / 2, canvas.height / 2 + 150, 2.5), previousTime = (new Date).getTime(), updateGift()
}

function updateGameEvent() {
    if ("game" == gameState) {
        delta = getDelta(), background.render(), hud.render(), 0 == levelState ? (curTime = Math.max(Math.round(curTime - 100 * delta), 0), curTime <= 0 && gameComplete(), curTime > 59900 && (curTime = 59900), hexTarget.render(), hexPieces.render(), glint.render()) : hexplode.render(), hud.tutIsOn && hud.renderTut(), panel.render();
        for (var t = 0; t < aFireworks.length; t++) aFireworks[t].update(), aFireworks[t].render(ctx), aFireworks[t].removeMe && (aFireworks.splice(t, 1), t -= 1);
        for (var t = 0; t < aFloatScores.length; t++) aFloatScores[t].update(), aFloatScores[t].render(), aFloatScores[t].removeMe && (aFloatScores.splice(t, 1), t -= 1);
        requestAnimFrame(updateGameEvent)
    }
}

function updateCreditsScreenEvent() {
    "credits" == gameState && (delta = getDelta(), background.render(), panel.update(), panel.render(), ctx.fillStyle = "#ffffff", ctx.textAlign = "right", ctx.font = "15px Helvetica", ctx.fillText("v1.0.3", canvas.width - 20, canvas.height - 20), requestAnimFrame(updateCreditsScreenEvent))
}

function updateGameOver() {
    if ("gameOver" == gameState) {
        delta = getDelta(), background.render();
        for (var t = 0; t < aFallingGems.length; t++) aFallingGems[t].update(), aFallingGems[t].render();
        panel.update(), panel.render(), Math.random() < .05 && addFirework(0, Math.random() * canvas.width, Math.random() * canvas.height, .5 * Math.random() + 1);
        for (var t = 0; t < aFireworks.length; t++) aFireworks[t].update(), aFireworks[t].render(ctx), aFireworks[t].removeMe && (aFireworks.splice(t, 1), t -= 1);
        requestAnimFrame(updateGameOver)
    }
}

function updateGift() {
    if ("gift" == gameState) {
        delta = getDelta(), background.render();
        for (var t = 0; t < aFallingGems.length; t++) aFallingGems[t].update(), aFallingGems[t].render();
        panel.update(), panel.render(), Math.random() < .05 && addFirework(1, Math.random() * canvas.width, Math.random() * canvas.height, .5 * Math.random() + 2);
        for (var t = 0; t < aFireworks.length; t++) aFireworks[t].update(), aFireworks[t].render(ctx), aFireworks[t].removeMe && (aFireworks.splice(t, 1), t -= 1);
        requestAnimFrame(updateGift)
    }
}

function updateSplashScreenEvent() {
    if ("splash" == gameState) {
        if (delta = getDelta(), splashTimer += delta, splashTimer > 2.5) return 1 != audioType || muted || music.play(), void initStartScreen();
        background.render(), panel.update(), panel.render(), requestAnimFrame(updateSplashScreenEvent)
    }
}

function updateStartScreenEvent() {
    if ("start" == gameState) {
        delta = getDelta(), background.render();
        for (var t = 0; t < aFallingGems.length; t++) aFallingGems[t].update(), aFallingGems[t].render();
        panel.update(), panel.render(), requestAnimFrame(updateStartScreenEvent)
    }
}

function updateLoaderEvent() {
    "load" == gameState && (delta = getDelta(), assetLib.render(), requestAnimFrame(updateLoaderEvent))
}

function updatePauseEvent() {
    "pause" == gameState && (delta = getDelta(), background.render(), panel.render(), requestAnimFrame(updatePauseEvent))
}

function getDelta() {
    var t = (new Date).getTime(),
        e = (t - previousTime) / 1e3;
    return previousTime = t, e > .5 && (e = 0), e
}

function checkSpriteCollision(t, e) {
    var a = t.x,
        i = t.y,
        s = e.x,
        h = e.y,
        o = (a - s) * (a - s) + (i - h) * (i - h),
        n = t.radius * e.radius;
    return o < n
}

function getScaleImageToMax(t, e) {
    var a;
    return a = t.isSpriteSheet ? e[0] / t.oData.spriteWidth < e[1] / t.oData.spriteHeight ? Math.min(e[0] / t.oData.spriteWidth, 1) : Math.min(e[1] / t.oData.spriteHeight, 1) : e[0] / t.img.width < e[1] / t.img.height ? Math.min(e[0] / t.img.width, 1) : Math.min(e[1] / t.img.height, 1)
}

function getCentreFromTopLeft(t, e, a) {
    var i = new Array;
    return i.push(t[0] + e.oData.spriteWidth / 2 * a), i.push(t[1] + e.oData.spriteHeight / 2 * a), i
}

function loadPreAssets() {
    if (aLangs.length > 1) {
        for (var t = new Array, e = 0; e < aLangs.length; e++) t.push({
            id: "lang" + aLangs[e],
            file: "images/lang" + aLangs[e] + ".png"
        });
        preAssetLib = new Utils.AssetLoader(curLang, t, ctx, canvas.width, canvas.height, (!1)), preAssetLib.onReady(initLangSelect)
    } else curLang = aLangs[0], preAssetLib = new Utils.AssetLoader(curLang, [{
        id: "loader",
        file: "images/loader.png"
    }, {
        id: "loadSpinner",
        file: "images/loadSpinner.png"
    }], ctx, canvas.width, canvas.height, (!1)), preAssetLib.onReady(initLoadAssets)
}

function initLangSelect() {
    for (var t, e, a, i = 10, s = 0, h = 0, o = 1, n = 0; n < aLangs.length && (t = preAssetLib.getData("lang" + aLangs[n]), (n + 1) * (t.img.width * o) + (n + 2) * i < canvas.width); n++) s++;
    h = Math.ceil(aLangs.length / s);
    for (var n = 0; n < aLangs.length; n++) {
        t = preAssetLib.getData("lang" + aLangs[n]), e = canvas.width / 2 - s / 2 * (t.img.width * o) - (s - 1) / 2 * i, e += n % s * (t.img.width * o + i), a = canvas.height / 2 - h / 2 * (t.img.height * o) - (h - 1) / 2 * i, a += Math.floor(n / s) % h * (t.img.height * o + i), ctx.drawImage(t.img, 0, 0, t.img.width, t.img.height, e, a, t.img.width * o, t.img.height * o);
        var r = {
            oImgData: t,
            aPos: [e + t.img.width * o / 2, a + t.img.height * o / 2],
            scale: o,
            id: "none",
            noMove: !0
        };
        userInput.addHitArea("langSelect", butEventHandler, {
            lang: aLangs[n]
        }, "image", r)
    }
}

function initLoadAssets() {
    loadAssets()
}

function loadAssets() {
    var t;
    
    t = "images/trans_pix.png";
    
    assetLib = new Utils.AssetLoader(curLang, [{
        id: "background0",
        file: "images/bgMain0.jpg"
    }, {
        id: "background1",
        file: "images/bgMain1.jpg"
    }, {
        id: "splashLogo",
        file: "images/splashLogo.png"
    }, {
        id: "background2",
        file: "images/bgMain2.jpg"
    }, {
        id: "flare",
        file: "images/flare.png"
    }, {
        id: "linesVert",
        file: "images/linesVert.png"
    }, {
        id: "linesHoriz",
        file: "images/linesHoriz.png"
    }, {
        id: "uiButs",
        file: "images/uiButs.png",
        oAtlasData: {
            id0: {
                x: 0,
                y: 234,
                width: 131,
                height: 130
            },
            id1: {
                x: 273,
                y: 132,
                width: 61,
                height: 60
            },
            id10: {
                x: 0,
                y: 0,
                width: 166,
                height: 159
            },
            id2: {
                x: 265,
                y: 256,
                width: 61,
                height: 60
            },
            id3: {
                x: 300,
                y: 0,
                width: 61,
                height: 60
            },
            id4: {
                x: 168,
                y: 0,
                width: 130,
                height: 130
            },
            id5: {
                x: 133,
                y: 234,
                width: 130,
                height: 130
            },
            id6: {
                x: 0,
                y: 161,
                width: 145,
                height: 71
            },
            id7: {
                x: 265,
                y: 194,
                width: 61,
                height: 60
            },
            id8: {
                x: 147,
                y: 161,
                width: 61,
                height: 60
            },
            id9: {
                x: 210,
                y: 132,
                width: 61,
                height: 60
            }
        }
    }, {
        id: "uiElements",
        file: "images/uiElements.png",
        oAtlasData: {
            id0: {
                x: 0,
                y: 594,
                width: 414,
                height: 244
            },
            id1: {
                x: 823,
                y: 421,
                width: 87,
                height: 271
            },
            id10: {
                x: 416,
                y: 594,
                width: 405,
                height: 277
            },
            id11: {
                x: 273,
                y: 932,
                width: 48,
                height: 49
            },
            id12: {
                x: 508,
                y: 421,
                width: 99,
                height: 139
            },
            id13: {
                x: 0,
                y: 0,
                width: 506,
                height: 592
            },
            id2: {
                x: 0,
                y: 873,
                width: 271,
                height: 87
            },
            id3: {
                x: 823,
                y: 694,
                width: 57,
                height: 244
            },
            id4: {
                x: 273,
                y: 873,
                width: 244,
                height: 57
            },
            id5: {
                x: 369,
                y: 932,
                width: 43,
                height: 49
            },
            id6: {
                x: 323,
                y: 932,
                width: 44,
                height: 45
            },
            id7: {
                x: 609,
                y: 421,
                width: 92,
                height: 92
            },
            id8: {
                x: 519,
                y: 873,
                width: 92,
                height: 92
            },
            id9: {
                x: 508,
                y: 0,
                width: 479,
                height: 419
            }
        }
    }, {
        id: "gameElements",
        file: "images/gameElements.png",
        oAtlasData: {
            id0: {
                x: 206,
                y: 522,
                width: 91,
                height: 82
            },
            id1: {
                x: 391,
                y: 489,
                width: 90,
                height: 81
            },
            id10: {
                x: 314,
                y: 0,
                width: 155,
                height: 155
            },
            id11: {
                x: 157,
                y: 314,
                width: 155,
                height: 155
            },
            id12: {
                x: 157,
                y: 0,
                width: 155,
                height: 155
            },
            id13: {
                x: 0,
                y: 314,
                width: 155,
                height: 155
            },
            id14: {
                x: 157,
                y: 157,
                width: 155,
                height: 155
            },
            id15: {
                x: 483,
                y: 460,
                width: 78,
                height: 79
            },
            id16: {
                x: 406,
                y: 284,
                width: 83,
                height: 42
            },
            id17: {
                x: 406,
                y: 240,
                width: 83,
                height: 42
            },
            id18: {
                x: 471,
                y: 88,
                width: 82,
                height: 42
            },
            id19: {
                x: 406,
                y: 416,
                width: 83,
                height: 42
            },
            id2: {
                x: 299,
                y: 522,
                width: 90,
                height: 81
            },
            id20: {
                x: 406,
                y: 328,
                width: 83,
                height: 42
            },
            id21: {
                x: 471,
                y: 0,
                width: 83,
                height: 42
            },
            id22: {
                x: 471,
                y: 44,
                width: 83,
                height: 42
            },
            id23: {
                x: 406,
                y: 372,
                width: 83,
                height: 42
            },
            id24: {
                x: 0,
                y: 515,
                width: 112,
                height: 42
            },
            id25: {
                x: 0,
                y: 471,
                width: 112,
                height: 42
            },
            id26: {
                x: 0,
                y: 559,
                width: 110,
                height: 42
            },
            id27: {
                x: 112,
                y: 559,
                width: 92,
                height: 49
            },
            id28: {
                x: 114,
                y: 471,
                width: 92,
                height: 49
            },
            id29: {
                x: 208,
                y: 471,
                width: 90,
                height: 49
            },
            id3: {
                x: 314,
                y: 240,
                width: 90,
                height: 81
            },
            id30: {
                x: 498,
                y: 184,
                width: 65,
                height: 49
            },
            id31: {
                x: 498,
                y: 132,
                width: 65,
                height: 50
            },
            id32: {
                x: 491,
                y: 390,
                width: 66,
                height: 49
            },
            id33: {
                x: 483,
                y: 541,
                width: 68,
                height: 70
            },
            id34: {
                x: 491,
                y: 312,
                width: 67,
                height: 76
            },
            id35: {
                x: 491,
                y: 240,
                width: 68,
                height: 70
            },
            id4: {
                x: 314,
                y: 157,
                width: 90,
                height: 81
            },
            id5: {
                x: 314,
                y: 406,
                width: 90,
                height: 81
            },
            id6: {
                x: 314,
                y: 323,
                width: 90,
                height: 81
            },
            id7: {
                x: 406,
                y: 157,
                width: 90,
                height: 81
            },
            id8: {
                x: 0,
                y: 0,
                width: 155,
                height: 155
            },
            id9: {
                x: 0,
                y: 157,
                width: 155,
                height: 155
            }
        }
    }, {
        id: "hintNumbers",
        file: "images/hintNumbers_35x39.png"
    }, {
        id: "scoreNumbers",
        file: "images/scoreNumbers_39x45.png"
    }, {
        id: "timerNumbers",
        file: "images/timerNumbers_39x45.png"
    }, {
        id: "firework0",
        file: "images/firework0_150x150.png",
        oAnims: {
            explode: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
        }
    }, {
        id: "firework1",
        file: "images/firework1_175x175.png",
        oAnims: {
            explode: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29]
        }
    }, {
        id: "moreGamesBut",
        file: t
    }], ctx, canvas.width, canvas.height), oImageIds.playBut = "id0", oImageIds.backBut = "id1", oImageIds.infoBut = "id2", oImageIds.resetBut = "id3", oImageIds.quitBut = "id4", oImageIds.restartBut = "id5", oImageIds.moreGamesBut = "id6", oImageIds.muteBut0 = "id7", oImageIds.muteBut1 = "id8", oImageIds.pauseBut = "id9", oImageIds.giftBut = "id10", oImageIds.titleLogo = "id0", oImageIds.barBgVert = "id1", oImageIds.barBgHoriz = "id2", oImageIds.barVert = "id3", oImageIds.barHoriz = "id4", oImageIds.timerIcon = "id5", oImageIds.scoreIcon = "id6", oImageIds.hintBut1 = "id7", oImageIds.hintBut0 = "id8", oImageIds.bgGrid = "id9", oImageIds.endPanel = "id10", oImageIds.highscoreIcon = "id11", oImageIds.tutHand = "id12", oImageIds.giftOpen = "id13", oImageIds.hexEmpty = "id0", oImageIds.hex00 = "id1", oImageIds.hex01 = "id2", oImageIds.hex02 = "id3", oImageIds.hex03 = "id4", oImageIds.hex04 = "id5", oImageIds.hex05 = "id6", oImageIds.hex06 = "id7", oImageIds.hex10 = "id8", oImageIds.hex11 = "id9", oImageIds.hex12 = "id10", oImageIds.hex13 = "id11", oImageIds.hex14 = "id12", oImageIds.hex15 = "id13", oImageIds.hex16 = "id14", oImageIds.glint = "id15", oImageIds.score20 = "id16", oImageIds.score30 = "id17", oImageIds.score40 = "id18", oImageIds.score50 = "id19", oImageIds.score60 = "id20", oImageIds.score70 = "id21", oImageIds.score80 = "id22", oImageIds.score90 = "id23", oImageIds.score100 = "id24", oImageIds.score150 = "id25", oImageIds.score200 = "id26", oImageIds.time10 = "id27", oImageIds.time15 = "id28", oImageIds.time20 = "id29", oImageIds.hint2 = "id30", oImageIds.hint3 = "id31", oImageIds.hint4 = "id32", oImageIds.giftIconScore = "id33", oImageIds.giftIconTime = "id34", oImageIds.giftIconHint = "id35", assetLib.onReady(initSplash), gameState = "load", previousTime = (new Date).getTime(), updateLoaderEvent()
}

function resizeCanvas() {
    var t = window.innerWidth,
        e = window.innerHeight;
    canvas.height = e, canvas.width = t, canvas.style.width = t + "px", canvas.style.height = e + "px", t > e ? canvas.height < minSquareSize ? (canvas.height = minSquareSize, canvas.width = minSquareSize * (t / e), canvasScale = minSquareSize / e) : canvas.height > maxSquareSize ? (canvas.height = maxSquareSize, canvas.width = maxSquareSize * (t / e), canvasScale = maxSquareSize / e) : canvasScale = 1 : canvas.width < minSquareSize ? (canvas.width = minSquareSize, canvas.height = minSquareSize * (e / t), canvasScale = minSquareSize / t) : canvas.width > maxSquareSize ? (canvas.width = maxSquareSize, canvas.height = maxSquareSize * (e / t), canvasScale = maxSquareSize / t) : canvasScale = 1, "game" == gameState && (userInput.addHitArea("gameTouch", butEventHandler, {
        isDraggable: !0,
        multiTouch: !0
    }, "rect", {
        aRect: [0, 0, canvas.width, canvas.height]
    }, !0), hud.tutIsOn && (hud.tutAnimReset(), hud.tutAnim()))
}

function playSound(t) {
    1 == audioType && sound.play(t)
}

function toggleMuteExtraSet() {
    if (localStorage) {
        localStorage.setItem("muted", "1")
    }
}

function toggleMuteExtraRemove() {
    if (localStorage) {
        localStorage.removeItem("muted")
    }
}

function toggleMute(t) {
    muted = !muted, 1 == audioType ? muted ? (Howler.mute(), music.pause(), musicTween && musicTween.kill(), t || (gradle.event('EVENT_VOLUMECHANGE', {
        bgmVolume: 0,
        sfxVolume: 0
    }), toggleMuteExtraSet())) : (Howler.unmute(), music.play(), musicTween && musicTween.kill(), "game" == gameState ? music.volume = .5 : music.volume = .25, t || (gradle.event('EVENT_VOLUMECHANGE', {
        bgmVolume: 1,
        sfxVolume: 1
    }), toggleMuteExtraRemove())) : 2 == audioType && (muted ? music.pause() : music.play())
}
var Utils;
! function(t) {
    var e = function() {
        function t(t, e, a, i, s, h) {
            "undefined" == typeof h && (h = !0), this.oAssetData = {}, this.assetsLoaded = 0, this.textData = {}, this.spinnerRot = 0, this.totalAssets = e.length, this.showBar = h;
            for (var o = 0; o < e.length; o++) e[o].file.indexOf(".json") != -1 ? this.loadJSON(e[o]) : this.loadImage(e[o]);
            h && (this.oLoaderImgData = preAssetLib.getData("loader"), this.oLoadSpinnerImgData = preAssetLib.getData("loadSpinner"))
        }
        return t.prototype.render = function() {
            ctx.fillStyle = "rgba(0, 0, 0, 1)", ctx.fillRect(0, 0, canvas.width, canvas.height), ctx.fillStyle = "#FFFFFF", ctx.fillRect(canvas.width / 2 - 150, canvas.height / 2 + 20, 300 / this.totalAssets * this.assetsLoaded, 30), ctx.drawImage(this.oLoaderImgData.img, canvas.width / 2 - this.oLoaderImgData.img.width / 2, canvas.height / 2 - this.oLoaderImgData.img.height / 2), this.spinnerRot += 3 * delta, ctx.save(), ctx.translate(canvas.width / 2 - 33, canvas.height / 2 - 20), ctx.rotate(this.spinnerRot), ctx.drawImage(this.oLoadSpinnerImgData.img, -this.oLoadSpinnerImgData.img.width / 2, -this.oLoadSpinnerImgData.img.height / 2), ctx.restore(), this.displayNumbers()
        }, t.prototype.displayNumbers = function() {
            ctx.textAlign = "left", ctx.font = "bold 40px arial", ctx.fillStyle = "#ffffff", ctx.fillText(Math.round(this.assetsLoaded / this.totalAssets * 100) + "%", canvas.width / 2 + 0, canvas.height / 2 - 6)
        }, t.prototype.loadExtraAssets = function(t, e) {
            this.showBar = !1, this.totalAssets = e.length, this.assetsLoaded = 0, this.loadedCallback = t;
            for (var a = 0; a < e.length; a++) e[a].file.indexOf(".json") != -1 ? this.loadJSON(e[a]) : this.loadImage(e[a])
        }, t.prototype.loadJSON = function(t) {
            var e = this,
                a = new XMLHttpRequest;
            a.open("GET", t.file, !0), a.onreadystatechange = function() {
                4 == a.readyState && 200 == a.status && (e.textData[t.id] = JSON.parse(a.responseText), ++e.assetsLoaded, e.checkLoadComplete())
            }, a.send(null)
        }, t.prototype.loadImage = function(t) {
            var e = this,
                a = new Image;
            a.onload = function() {
                e.oAssetData[t.id] = {}, e.oAssetData[t.id].img = a, e.oAssetData[t.id].oData = {};
                var i = e.getSpriteSize(t.file);
                0 != i[0] ? (e.oAssetData[t.id].oData.spriteWidth = i[0], e.oAssetData[t.id].oData.spriteHeight = i[1]) : (e.oAssetData[t.id].oData.spriteWidth = e.oAssetData[t.id].img.width, e.oAssetData[t.id].oData.spriteHeight = e.oAssetData[t.id].img.height), t.oAnims && (e.oAssetData[t.id].oData.oAnims = t.oAnims), t.oAtlasData ? e.oAssetData[t.id].oData.oAtlasData = t.oAtlasData : e.oAssetData[t.id].oData.oAtlasData = {
                    none: {
                        x: 0,
                        y: 0,
                        width: e.oAssetData[t.id].oData.spriteWidth,
                        height: e.oAssetData[t.id].oData.spriteHeight
                    }
                }, ++e.assetsLoaded, e.checkLoadComplete()
            }, a.src = t.file
        }, t.prototype.getSpriteSize = function(t) {
            for (var e = new Array, a = "", i = "", s = 0, h = t.lastIndexOf("."), o = !0; o;) h--, 0 == s && this.isNumber(t.charAt(h)) ? a = t.charAt(h) + a : 0 == s && a.length > 0 && "x" == t.charAt(h) ? (h--, s = 1, i = t.charAt(h) + i) : 1 == s && this.isNumber(t.charAt(h)) ? i = t.charAt(h) + i : 1 == s && i.length > 0 && "_" == t.charAt(h) ? (o = !1, e = [parseInt(i), parseInt(a)]) : (o = !1, e = [0, 0]);
            return e
        }, t.prototype.isNumber = function(t) {
            return !isNaN(parseFloat(t)) && isFinite(t)
        }, t.prototype.checkLoadComplete = function() {
            this.assetsLoaded == this.totalAssets && this.loadedCallback()
        }, t.prototype.onReady = function(t) {
            this.loadedCallback = t
        }, t.prototype.getImg = function(t) {
            return this.oAssetData[t].img
        }, t.prototype.getData = function(t) {
            return this.oAssetData[t]
        }, t
    }();
    t.AssetLoader = e
}(Utils || (Utils = {}));
var Utils;
! function(t) {
    var e = function() {
        function t(t, e, a, i) {
            this.x = 0, this.y = 0, this.rotation = 0, this.radius = 10, this.removeMe = !1, this.frameInc = 0, this.animType = "loop", this.offsetX = 0, this.offsetY = 0, this.scaleX = 1, this.scaleY = 1, this.alpha = 1, this.oImgData = t, this.oAnims = this.oImgData.oData.oAnims, this.fps = e, this.radius = a, this.animId = i, this.centreX = Math.round(this.oImgData.oData.spriteWidth / 2), this.centreY = Math.round(this.oImgData.oData.spriteHeight / 2)
        }
        return t.prototype.updateAnimation = function(t) {
            this.frameInc += this.fps * t
        }, t.prototype.changeImgData = function(t, e) {
            this.oImgData = t, this.oAnims = this.oImgData.oData.oAnims, this.animId = e, this.centreX = Math.round(this.oImgData.oData.spriteWidth / 2), this.centreY = Math.round(this.oImgData.oData.spriteHeight / 2), this.resetAnim()
        }, t.prototype.resetAnim = function() {
            this.frameInc = 0
        }, t.prototype.setFrame = function(t) {
            this.fixedFrame = t
        }, t.prototype.setAnimType = function(t, e, a) {
            switch ("undefined" == typeof a && (a = !0), this.animId = e, this.animType = t, a && this.resetAnim(), t) {
                case "loop":
                    break;
                case "once":
                    this.maxIdx = this.oAnims[this.animId].length - 1
            }
        }, t.prototype.render = function(t) {
            if (t.save(), t.translate(this.x, this.y), t.rotate(this.rotation), t.scale(this.scaleX, this.scaleY), t.globalAlpha = this.alpha, null != this.animId) {
                var e = this.oAnims[this.animId].length,
                    a = Math.floor(this.frameInc);
                this.curFrame = this.oAnims[this.animId][a % e];
                var i = this.curFrame * this.oImgData.oData.spriteWidth % this.oImgData.img.width,
                    s = Math.floor(this.curFrame / (this.oImgData.img.width / this.oImgData.oData.spriteWidth)) * this.oImgData.oData.spriteHeight;
                if ("once" == this.animType && a > this.maxIdx) {
                    this.fixedFrame = this.oAnims[this.animId][e - 1], this.animId = null, null != this.animEndedFunc && this.animEndedFunc();
                    var i = this.fixedFrame * this.oImgData.oData.spriteWidth % this.oImgData.img.width,
                        s = Math.floor(this.fixedFrame / (this.oImgData.img.width / this.oImgData.oData.spriteWidth)) * this.oImgData.oData.spriteHeight
                }
            } else var i = this.fixedFrame * this.oImgData.oData.spriteWidth % this.oImgData.img.width,
                s = Math.floor(this.fixedFrame / (this.oImgData.img.width / this.oImgData.oData.spriteWidth)) * this.oImgData.oData.spriteHeight;
            t.drawImage(this.oImgData.img, i, s, this.oImgData.oData.spriteWidth, this.oImgData.oData.spriteHeight, -this.centreX + this.offsetX, -this.centreY + this.offsetY, this.oImgData.oData.spriteWidth, this.oImgData.oData.spriteHeight), t.restore()
        }, t.prototype.renderSimple = function(t) {
            if (null != this.animId) {
                var e = this.oAnims[this.animId].length,
                    a = Math.floor(this.frameInc);
                this.curFrame = this.oAnims[this.animId][a % e];
                var i = this.curFrame * this.oImgData.oData.spriteWidth % this.oImgData.img.width,
                    s = Math.floor(this.curFrame / (this.oImgData.img.width / this.oImgData.oData.spriteWidth)) * this.oImgData.oData.spriteHeight;
                if ("once" == this.animType && a > this.maxIdx) {
                    this.fixedFrame = this.oAnims[this.animId][e - 1], this.animId = null, null != this.animEndedFunc && this.animEndedFunc();
                    var i = this.fixedFrame * this.oImgData.oData.spriteWidth % this.oImgData.img.width,
                        s = Math.floor(this.fixedFrame / (this.oImgData.img.width / this.oImgData.oData.spriteWidth)) * this.oImgData.oData.spriteHeight
                }
            } else var i = this.fixedFrame * this.oImgData.oData.spriteWidth % this.oImgData.img.width,
                s = Math.floor(this.fixedFrame / (this.oImgData.img.width / this.oImgData.oData.spriteWidth)) * this.oImgData.oData.spriteHeight;
            t.drawImage(this.oImgData.img, i, s, this.oImgData.oData.spriteWidth, this.oImgData.oData.spriteHeight, this.x - (this.centreX - this.offsetX) * this.scaleX, this.y - (this.centreY - this.offsetY) * this.scaleY, this.oImgData.oData.spriteWidth * this.scaleX, this.oImgData.oData.spriteHeight * this.scaleY)
        }, t
    }();
    t.AnimSprite = e
}(Utils || (Utils = {}));
var Utils;
! function(t) {
    var e = function() {
        function t(t, e, a) {
            "undefined" == typeof a && (a = 0), this.x = 0, this.y = 0, this.rotation = 0, this.radius = 10, this.removeMe = !1, this.offsetX = 0, this.offsetY = 0, this.scaleX = 1, this.scaleY = 1, this.oImgData = t, this.radius = e, this.setFrame(a)
        }
        return t.prototype.setFrame = function(t) {
            this.frameNum = t
        }, t.prototype.render = function(t) {
            t.save(), t.translate(this.x, this.y), t.rotate(this.rotation), t.scale(this.scaleX, this.scaleY);
            var e = this.frameNum * this.oImgData.oData.spriteWidth % this.oImgData.img.width,
                a = Math.floor(this.frameNum / (this.oImgData.img.width / this.oImgData.oData.spriteWidth)) * this.oImgData.oData.spriteHeight;
            t.drawImage(this.oImgData.img, e, a, this.oImgData.oData.spriteWidth, this.oImgData.oData.spriteHeight, -this.oImgData.oData.spriteWidth / 2 + this.offsetX, -this.oImgData.oData.spriteHeight / 2 + this.offsetY, this.oImgData.oData.spriteWidth, this.oImgData.oData.spriteHeight),
                t.restore()
        }, t
    }();
    t.BasicSprite = e
}(Utils || (Utils = {}));
var Utils;
! function(t) {
    var e = function() {
        function t(t, e) {
            var a = this;
            this.prevHitTime = 0, this.pauseIsOn = !1, this.isDown = !1, this.isBugBrowser = e, this.keyDownEvtFunc = function(t) {
                a.keyDown(t)
            }, this.keyUpEvtFunc = function(t) {
                a.keyUp(t)
            }, t.addEventListener("touchstart", function(t) {
                for (var e = 0; e < t.changedTouches.length; e++) a.hitDown(t, t.changedTouches[e].pageX, t.changedTouches[e].pageY, t.changedTouches[e].identifier)
            }, !1), t.addEventListener("touchend", function(t) {
                for (var e = 0; e < t.changedTouches.length; e++) a.hitUp(t, t.changedTouches[e].pageX, t.changedTouches[e].pageY, t.changedTouches[e].identifier)
            }, !1), t.addEventListener("touchcancel", function(t) {
                for (var e = 0; e < t.changedTouches.length; e++) a.hitCancel(t, t.changedTouches[e].pageX, t.changedTouches[e].pageY, t.changedTouches[e].identifier)
            }, !1), t.addEventListener("touchmove", function(t) {
                for (var e = 0; e < t.changedTouches.length; e++) a.move(t, t.changedTouches[e].pageX, t.changedTouches[e].pageY, t.changedTouches[e].identifier, !0)
            }, !1), t.addEventListener("mousedown", function(t) {
                a.isDown = !0, a.hitDown(t, t.pageX, t.pageY, 1)
            }, !1), t.addEventListener("mouseup", function(t) {
                a.isDown = !1, a.hitUp(t, t.pageX, t.pageY, 1)
            }, !1), t.addEventListener("mousemove", function(t) {
                a.move(t, t.pageX, t.pageY, 1, a.isDown)
            }, !1), t.addEventListener("mouseout", function(t) {
                a.isDown = !1, a.hitUp(t, Math.abs(t.pageX), Math.abs(t.pageY), 1)
            }, !1), this.aHitAreas = new Array, this.aKeys = new Array
        }
        return t.prototype.hitDown = function(t, e, a, i) {
            if (t.preventDefault(), t.stopPropagation(), hasFocus || visibleResume(), !this.pauseIsOn) {
                var s = (new Date).getTime();
                e *= canvasScale, a *= canvasScale;
                for (var h = 0; h < this.aHitAreas.length; h++)
                    if (this.aHitAreas[h].rect) {
                        var o = canvas.width * this.aHitAreas[h].align[0],
                            n = canvas.height * this.aHitAreas[h].align[1];
                        if (e > o + this.aHitAreas[h].area[0] && a > n + this.aHitAreas[h].area[1] && e < o + this.aHitAreas[h].area[2] && a < n + this.aHitAreas[h].area[3]) {
                            if (this.aHitAreas[h].aTouchIdentifiers.push(i), this.aHitAreas[h].oData.hasLeft = !1, !this.aHitAreas[h].oData.isDown) {
                                if (this.aHitAreas[h].oData.isDown = !0, this.aHitAreas[h].oData.x = e, this.aHitAreas[h].oData.y = a, s - this.prevHitTime < 500 && ("game" != gameState || "pause" == this.aHitAreas[h].id) && isBugBrowser) return;
                                this.aHitAreas[h].callback(this.aHitAreas[h].id, this.aHitAreas[h].oData)
                            }
                            break
                        }
                    }
                this.prevHitTime = s
            }
        }, t.prototype.hitUp = function(t, e, a, i) {
            if (ios9FirstTouch || (playSound("silence"), ios9FirstTouch = !0), !this.pauseIsOn) {
                t.preventDefault(), t.stopPropagation(), e *= canvasScale, a *= canvasScale;
                for (var s = 0; s < this.aHitAreas.length; s++)
                    if (this.aHitAreas[s].rect) {
                        var h = canvas.width * this.aHitAreas[s].align[0],
                            o = canvas.height * this.aHitAreas[s].align[1];
                        if (e > h + this.aHitAreas[s].area[0] && a > o + this.aHitAreas[s].area[1] && e < h + this.aHitAreas[s].area[2] && a < o + this.aHitAreas[s].area[3]) {
                            for (var n = 0; n < this.aHitAreas[s].aTouchIdentifiers.length; n++) this.aHitAreas[s].aTouchIdentifiers[n] == i && (this.aHitAreas[s].aTouchIdentifiers.splice(n, 1), n -= 1);
                            0 == this.aHitAreas[s].aTouchIdentifiers.length && (this.aHitAreas[s].oData.isDown = !1, this.aHitAreas[s].oData.multiTouch && (this.aHitAreas[s].oData.x = e, this.aHitAreas[s].oData.y = a, this.aHitAreas[s].callback(this.aHitAreas[s].id, this.aHitAreas[s].oData)));
                            break
                        }
                    }
            }
        }, t.prototype.hitCancel = function(t, e, a, i) {
            t.preventDefault(), t.stopPropagation(), e *= canvasScale, a *= canvasScale;
            for (var s = 0; s < this.aHitAreas.length; s++) this.aHitAreas[s].oData.isDown && (this.aHitAreas[s].oData.isDown = !1, this.aHitAreas[s].aTouchIdentifiers = new Array, this.aHitAreas[s].oData.multiTouch && (this.aHitAreas[s].oData.x = e, this.aHitAreas[s].oData.y = a, this.aHitAreas[s].callback(this.aHitAreas[s].id, this.aHitAreas[s].oData)))
        }, t.prototype.move = function(t, e, a, i, s) {
            if (!this.pauseIsOn && s) {
                e *= canvasScale, a *= canvasScale;
                for (var h = 0; h < this.aHitAreas.length; h++)
                    if (this.aHitAreas[h].rect) {
                        var o = canvas.width * this.aHitAreas[h].align[0],
                            n = canvas.height * this.aHitAreas[h].align[1];
                        if (e > o + this.aHitAreas[h].area[0] && a > n + this.aHitAreas[h].area[1] && e < o + this.aHitAreas[h].area[2] && a < n + this.aHitAreas[h].area[3]) this.aHitAreas[h].oData.hasLeft = !1, this.aHitAreas[h].oData.isDraggable && !this.aHitAreas[h].oData.isDown && (this.aHitAreas[h].oData.isDown = !0, this.aHitAreas[h].oData.x = e, this.aHitAreas[h].oData.y = a, this.aHitAreas[h].aTouchIdentifiers.push(i), this.aHitAreas[h].oData.multiTouch && this.aHitAreas[h].callback(this.aHitAreas[h].id, this.aHitAreas[h].oData)), this.aHitAreas[h].oData.isDraggable && (this.aHitAreas[h].oData.isBeingDragged = !0, this.aHitAreas[h].oData.x = e, this.aHitAreas[h].oData.y = a, this.aHitAreas[h].callback(this.aHitAreas[h].id, this.aHitAreas[h].oData), this.aHitAreas[h] && (this.aHitAreas[h].oData.isBeingDragged = !1));
                        else if (this.aHitAreas[h].oData.isDown && !this.aHitAreas[h].oData.hasLeft) {
                            for (var r = 0; r < this.aHitAreas[h].aTouchIdentifiers.length; r++) this.aHitAreas[h].aTouchIdentifiers[r] == i && (this.aHitAreas[h].aTouchIdentifiers.splice(r, 1), r -= 1);
                            0 == this.aHitAreas[h].aTouchIdentifiers.length && (this.aHitAreas[h].oData.hasLeft = !0, this.aHitAreas[h].oData.isBeingDragged || (this.aHitAreas[h].oData.isDown = !1), this.aHitAreas[h].oData.multiTouch && this.aHitAreas[h].callback(this.aHitAreas[h].id, this.aHitAreas[h].oData))
                        }
                    }
            }
        }, t.prototype.keyDown = function(t) {
            for (var e = 0; e < this.aKeys.length; e++) t.keyCode == this.aKeys[e].keyCode && (t.preventDefault(), this.aKeys[e].oData.isDown = !0, this.aKeys[e].callback(this.aKeys[e].id, this.aKeys[e].oData))
        }, t.prototype.keyUp = function(t) {
            for (var e = 0; e < this.aKeys.length; e++) t.keyCode == this.aKeys[e].keyCode && (t.preventDefault(), this.aKeys[e].oData.isDown = !1, this.aKeys[e].callback(this.aKeys[e].id, this.aKeys[e].oData))
        }, t.prototype.checkKeyFocus = function() {
            window.focus(), this.aKeys.length > 0 && (window.removeEventListener("keydown", this.keyDownEvtFunc, !1), window.removeEventListener("keyup", this.keyUpEvtFunc, !1), window.addEventListener("keydown", this.keyDownEvtFunc, !1), window.addEventListener("keyup", this.keyUpEvtFunc, !1))
        }, t.prototype.addKey = function(t, e, a, i) {
            null == a && (a = new Object), this.aKeys.push({
                id: t,
                callback: e,
                oData: a,
                keyCode: i
            }), this.checkKeyFocus()
        }, t.prototype.removeKey = function(t) {
            for (var e = 0; e < this.aKeys.length; e++) this.aKeys[e].id == t && (this.aKeys.splice(e, 1), e -= 1)
        }, t.prototype.addHitArea = function(t, e, a, i, s, h) {
            "undefined" == typeof h && (h = !1), null == a && (a = new Object), h && this.removeHitArea(t), s.scale || (s.scale = 1), s.align || (s.align = [0, 0]);
            var o = new Array;
            switch (i) {
                case "image":
                    var n;
                    n = new Array(s.aPos[0] - s.oImgData.oData.oAtlasData[s.id].width / 2 * s.scale, s.aPos[1] - s.oImgData.oData.oAtlasData[s.id].height / 2 * s.scale, s.aPos[0] + s.oImgData.oData.oAtlasData[s.id].width / 2 * s.scale, s.aPos[1] + s.oImgData.oData.oAtlasData[s.id].height / 2 * s.scale), this.aHitAreas.push({
                        id: t,
                        aTouchIdentifiers: o,
                        callback: e,
                        oData: a,
                        rect: !0,
                        area: n,
                        align: s.align
                    });
                    break;
                case "rect":
                    this.aHitAreas.push({
                        id: t,
                        aTouchIdentifiers: o,
                        callback: e,
                        oData: a,
                        rect: !0,
                        area: s.aRect,
                        align: s.align
                    })
            }
        }, t.prototype.removeHitArea = function(t) {
            for (var e = 0; e < this.aHitAreas.length; e++) this.aHitAreas[e].id == t && (this.aHitAreas.splice(e, 1), e -= 1)
        }, t.prototype.resetAll = function() {
            for (var t = 0; t < this.aHitAreas.length; t++) this.aHitAreas[t].oData.isDown = !1, this.aHitAreas[t].oData.isBeingDragged = !1, this.aHitAreas[t].aTouchIdentifiers = new Array;
            this.isDown = !1
        }, t
    }();
    t.UserInput = e
}(Utils || (Utils = {}));
var Utils;
! function(t) {
    var e = function() {
        function t(t) {
            this.updateFreq = 10, this.updateInc = 0, this.frameAverage = 0, this.display = 1, this.log = "", this.render = function(t) {
                this.frameAverage += this.delta / this.updateFreq, ++this.updateInc >= this.updateFreq && (this.updateInc = 0, this.display = this.frameAverage, this.frameAverage = 0), t.textAlign = "left", ctx.font = "10px Helvetica", t.fillStyle = "#333333", t.beginPath(), t.rect(0, this.canvasHeight - 15, 40, 15), t.closePath(), t.fill(), t.fillStyle = "#ffffff", t.fillText(Math.round(1e3 / (1e3 * this.display)) + " fps " + this.log, 5, this.canvasHeight - 5)
            }, this.canvasHeight = t
        }
        return t.prototype.update = function(t) {
            this.delta = t
        }, t
    }();
    t.FpsMeter = e
}(Utils || (Utils = {}));
var Elements;
! function(t) {
    var e = function() {
        function t(t) {
            this.x = 0, this.y = 0, this.targY = 0, this.incY = 0, this.renderState = null, this.scale = 1, this.oImgData = assetLib.getData("background" + t), this.zoomOut()
        }
        return t.prototype.zoomIn = function() {
            this.scale = 1, TweenLite.to(this, 1, {
                scale: 1.3,
                ease: "Cubic.easeOut"
            })
        }, t.prototype.zoomOut = function() {
            this.scale = 1.3, TweenLite.to(this, 1, {
                scale: 1,
                ease: "Cubic.easeInOut"
            })
        }, t.prototype.render = function() {
            canvas.width > canvas.height ? ctx.drawImage(this.oImgData.img, 0, (1 - canvas.height / canvas.width) / 2 * this.oImgData.img.height, this.oImgData.img.width, canvas.height / canvas.width * this.oImgData.img.height, 0 - (this.scale - 1) * canvas.width / 2, 0 - (this.scale - 1) * canvas.height / 2, canvas.width * this.scale, canvas.height * this.scale) : ctx.drawImage(this.oImgData.img, (1 - canvas.width / canvas.height) / 2 * this.oImgData.img.width, 0, canvas.width / canvas.height * this.oImgData.img.width, this.oImgData.img.width, 0 - (this.scale - 1) * canvas.width / 2, 0 - (this.scale - 1) * canvas.height / 2, canvas.width * this.scale, canvas.height * this.scale)
        }, t
    }();
    t.Background = e
}(Elements || (Elements = {}));
var Elements;
! function(t) {
    var e = function() {
        function t(t, e) {
            this.timer = .3, this.endTime = 0, this.posY = 0, this.numberSpace = 30, this.incY = 0, this.flareRot = 0, this.giftInc = 0, this.oTimerNumbersImgData = assetLib.getData("timerNumbers"), this.oScoreNumbersImgData = assetLib.getData("scoreNumbers"), this.oSplashLogoImgData = assetLib.getData("splashLogo"), this.oUiElementsImgData = assetLib.getData("uiElements"), this.oGameElementsImgData = assetLib.getData("gameElements"), this.panelType = t, this.aButs = e, this.oTopFlareImgData = assetLib.getData("flare")
        }
        return t.prototype.update = function() {
            this.incY += 10 * delta
        }, t.prototype.startTween1 = function() {
            this.posY = 500, TweenLite.to(this, .5, {
                posY: 0,
                ease: "Back.easeOut"
            })
        }, t.prototype.switchBut = function(t, e) {
            for (var a = 0; a < this.aButs.length; a++)
                if (this.aButs[a].id == t) {
                    this.aButs[a].id = e;
                    break
                }
        }, t.prototype.render = function(t) {
            switch ("undefined" == typeof t && (t = !0), t || this.addButs(ctx), this.panelType) {
                case "splash":
                    ctx.fillStyle = "rgba(0, 0, 0, 0.35)", ctx.fillRect(0, 0, canvas.width, canvas.height), ctx.drawImage(this.oSplashLogoImgData.img, canvas.width / 2 - this.oSplashLogoImgData.img.width / 2, canvas.height / 2 - this.oSplashLogoImgData.img.height / 2 - this.posY);
                    break;
                case "start":
                    this.flareRot += delta / 3;
                    var e = .35;
                    ctx.save(), ctx.translate(canvas.width / 2 + this.posY, canvas.height * e), ctx.rotate(this.flareRot), ctx.scale(1.5, 1.5), ctx.drawImage(this.oTopFlareImgData.img, -this.oTopFlareImgData.img.width / 2, -this.oTopFlareImgData.img.height / 2), ctx.translate(-(canvas.width / 2 + this.posY), -(canvas.height * e)), ctx.translate(canvas.width / 2 + this.posY, canvas.height * e), ctx.rotate(2 * -this.flareRot), ctx.drawImage(this.oTopFlareImgData.img, -this.oTopFlareImgData.img.width / 2, -this.oTopFlareImgData.img.height / 2), ctx.restore();
                    var a = this.oUiElementsImgData.oData.oAtlasData[oImageIds.titleLogo].x,
                        i = this.oUiElementsImgData.oData.oAtlasData[oImageIds.titleLogo].y,
                        s = this.oUiElementsImgData.oData.oAtlasData[oImageIds.titleLogo].width,
                        h = this.oUiElementsImgData.oData.oAtlasData[oImageIds.titleLogo].height;
                    ctx.drawImage(this.oUiElementsImgData.img, a, i, s, h, canvas.width / 2 - s / 2 - 20 - this.posY, .35 * canvas.height - h / 2, s, h);
                    for (var o = highscore.toString(); o.length < 5;) o = "0" + o;
                    for (var n = .7, r = 0; r < o.length; r++) {
                        var c = parseFloat(o.charAt(r)),
                            m = c * this.oScoreNumbersImgData.oData.spriteWidth % this.oScoreNumbersImgData.img.width,
                            g = Math.floor(c / (this.oScoreNumbersImgData.img.width / this.oScoreNumbersImgData.oData.spriteWidth)) * this.oScoreNumbersImgData.oData.spriteHeight;
                        ctx.drawImage(this.oScoreNumbersImgData.img, m, g, this.oScoreNumbersImgData.oData.spriteWidth, this.oScoreNumbersImgData.oData.spriteHeight, canvas.width + r * (this.numberSpace * n) - o.length * (this.numberSpace * n) - 12 - this.posY, canvas.height - 46, this.oScoreNumbersImgData.oData.spriteWidth * n, this.oScoreNumbersImgData.oData.spriteHeight * n)
                    }
                    var a = this.oUiElementsImgData.oData.oAtlasData[oImageIds.highscoreIcon].x,
                        i = this.oUiElementsImgData.oData.oAtlasData[oImageIds.highscoreIcon].y,
                        s = this.oUiElementsImgData.oData.oAtlasData[oImageIds.highscoreIcon].width,
                        h = this.oUiElementsImgData.oData.oAtlasData[oImageIds.highscoreIcon].height;
                    ctx.drawImage(this.oUiElementsImgData.img, a, i, s, h, canvas.width - o.length * (this.numberSpace * n) - s - 7 - this.posY, canvas.height - 55, s, h);
                    break;
                case "credits":
                    ctx.fillStyle = "rgba(0, 0, 0, 0.35)", ctx.fillRect(0, 0, canvas.width, canvas.height), ctx.drawImage(this.oSplashLogoImgData.img, canvas.width / 2 - this.oSplashLogoImgData.img.width / 2, canvas.height / 2 - this.oSplashLogoImgData.img.height / 2 - this.posY);
                    break;
                case "gameOver":
                    this.flareRot += delta / 3, ctx.save(), ctx.translate(canvas.width / 2 + this.posY, canvas.height / 2 + 150), ctx.rotate(this.flareRot), ctx.scale(.75, .75), ctx.drawImage(this.oTopFlareImgData.img, -this.oTopFlareImgData.img.width / 2, -this.oTopFlareImgData.img.height / 2), ctx.translate(-(canvas.width / 2 + this.posY), -(canvas.height / 2 + 150)), ctx.translate(canvas.width / 2 + this.posY, canvas.height / 2 + 150), ctx.rotate(2 * -this.flareRot), ctx.drawImage(this.oTopFlareImgData.img, -this.oTopFlareImgData.img.width / 2, -this.oTopFlareImgData.img.height / 2), ctx.restore();
                    var a = this.oUiElementsImgData.oData.oAtlasData[oImageIds.endPanel].x,
                        i = this.oUiElementsImgData.oData.oAtlasData[oImageIds.endPanel].y,
                        s = this.oUiElementsImgData.oData.oAtlasData[oImageIds.endPanel].width,
                        h = this.oUiElementsImgData.oData.oAtlasData[oImageIds.endPanel].height;
                    ctx.drawImage(this.oUiElementsImgData.img, a, i, s, h, canvas.width / 2 - s / 2 - this.posY + 4, canvas.height / 2 - 207, s, h);
                    for (var o = score.toString(); o.length < 5;) o = "0" + o;
                    for (var r = 0; r < o.length; r++) {
                        var c = parseFloat(o.charAt(r)),
                            m = c * this.oTimerNumbersImgData.oData.spriteWidth % this.oTimerNumbersImgData.img.width,
                            g = Math.floor(c / (this.oTimerNumbersImgData.img.width / this.oTimerNumbersImgData.oData.spriteWidth)) * this.oTimerNumbersImgData.oData.spriteHeight;
                        ctx.drawImage(this.oTimerNumbersImgData.img, m, g, this.oTimerNumbersImgData.oData.spriteWidth, this.oTimerNumbersImgData.oData.spriteHeight, canvas.width / 2 + r * this.numberSpace - o.length / 2 * this.numberSpace - this.posY, canvas.height / 2 - 20, this.oTimerNumbersImgData.oData.spriteWidth, this.oTimerNumbersImgData.oData.spriteHeight)
                    }
                    for (var o = highscore.toString(); o.length < 5;) o = "0" + o;
                    for (var n = .7, r = 0; r < o.length; r++) {
                        var c = parseFloat(o.charAt(r)),
                            m = c * this.oScoreNumbersImgData.oData.spriteWidth % this.oScoreNumbersImgData.img.width,
                            g = Math.floor(c / (this.oScoreNumbersImgData.img.width / this.oScoreNumbersImgData.oData.spriteWidth)) * this.oScoreNumbersImgData.oData.spriteHeight;
                        ctx.drawImage(this.oScoreNumbersImgData.img, m, g, this.oScoreNumbersImgData.oData.spriteWidth, this.oScoreNumbersImgData.oData.spriteHeight, canvas.width + r * (this.numberSpace * n) - o.length * (this.numberSpace * n) - 12 - this.posY, canvas.height - 46, this.oScoreNumbersImgData.oData.spriteWidth * n, this.oScoreNumbersImgData.oData.spriteHeight * n)
                    }
                    var a = this.oUiElementsImgData.oData.oAtlasData[oImageIds.highscoreIcon].x,
                        i = this.oUiElementsImgData.oData.oAtlasData[oImageIds.highscoreIcon].y,
                        s = this.oUiElementsImgData.oData.oAtlasData[oImageIds.highscoreIcon].width,
                        h = this.oUiElementsImgData.oData.oAtlasData[oImageIds.highscoreIcon].height;
                    ctx.drawImage(this.oUiElementsImgData.img, a, i, s, h, canvas.width - o.length * (this.numberSpace * n) - s - 7 - this.posY, canvas.height - 55, s, h);
                    break;
                case "game":
                    break;
                case "gift":
                    var a = this.oUiElementsImgData.oData.oAtlasData[oImageIds.giftOpen].x,
                        i = this.oUiElementsImgData.oData.oAtlasData[oImageIds.giftOpen].y,
                        s = this.oUiElementsImgData.oData.oAtlasData[oImageIds.giftOpen].width,
                        h = this.oUiElementsImgData.oData.oAtlasData[oImageIds.giftOpen].height;
                    if (ctx.drawImage(this.oUiElementsImgData.img, a, i, s, h, canvas.width / 2 - s / 2 + 23, canvas.height / 2 - 400 + this.posY, s, h), this.flareRot += delta / 3, ctx.save(), ctx.translate(canvas.width / 2 + this.posY, canvas.height / 2 + 150), ctx.rotate(this.flareRot), ctx.scale(.75, .75), ctx.drawImage(this.oTopFlareImgData.img, -this.oTopFlareImgData.img.width / 2, -this.oTopFlareImgData.img.height / 2), ctx.translate(-(canvas.width / 2 + this.posY), -(canvas.height / 2 + 150)), ctx.translate(canvas.width / 2 + this.posY, canvas.height / 2 + 150), ctx.rotate(2 * -this.flareRot), ctx.drawImage(this.oTopFlareImgData.img, -this.oTopFlareImgData.img.width / 2, -this.oTopFlareImgData.img.height / 2), ctx.restore(), this.giftInc += 7 * delta, 0 == giftType) {
                        var d = 100;
                        1 == giftNum ? d = 150 : 2 == giftNum && (d = 200);
                        var a = this.oGameElementsImgData.oData.oAtlasData[oImageIds["score" + d]].x,
                            i = this.oGameElementsImgData.oData.oAtlasData[oImageIds["score" + d]].y,
                            s = this.oGameElementsImgData.oData.oAtlasData[oImageIds["score" + d]].width,
                            h = this.oGameElementsImgData.oData.oAtlasData[oImageIds["score" + d]].height;
                        ctx.drawImage(this.oGameElementsImgData.img, a, i, s, h, canvas.width / 2, canvas.height / 2 - h / 2 * 1.2 - 125 + this.posY / 4 + 5 * Math.sin(this.giftInc), 1.2 * s, 1.2 * h);
                        var a = this.oGameElementsImgData.oData.oAtlasData[oImageIds.giftIconScore].x,
                            i = this.oGameElementsImgData.oData.oAtlasData[oImageIds.giftIconScore].y,
                            s = this.oGameElementsImgData.oData.oAtlasData[oImageIds.giftIconScore].width,
                            h = this.oGameElementsImgData.oData.oAtlasData[oImageIds.giftIconScore].height;
                        ctx.drawImage(this.oGameElementsImgData.img, a, i, s, h, canvas.width / 2 - 65, canvas.height / 2 - h / 2 - 128 + this.posY / 4 + 5 * Math.sin(this.giftInc), s, h)
                    } else if (1 == giftType) {
                        var d = 10;
                        1 == giftNum ? d = 15 : 2 == giftNum && (d = 20);
                        var a = this.oGameElementsImgData.oData.oAtlasData[oImageIds["time" + d]].x,
                            i = this.oGameElementsImgData.oData.oAtlasData[oImageIds["time" + d]].y,
                            s = this.oGameElementsImgData.oData.oAtlasData[oImageIds["time" + d]].width,
                            h = this.oGameElementsImgData.oData.oAtlasData[oImageIds["time" + d]].height;
                        ctx.drawImage(this.oGameElementsImgData.img, a, i, s, h, canvas.width / 2, canvas.height / 2 - h / 2 * 1.2 - 125 + this.posY / 4 + 5 * Math.sin(this.giftInc), 1.2 * s, 1.2 * h);
                        var a = this.oGameElementsImgData.oData.oAtlasData[oImageIds.giftIconTime].x,
                            i = this.oGameElementsImgData.oData.oAtlasData[oImageIds.giftIconTime].y,
                            s = this.oGameElementsImgData.oData.oAtlasData[oImageIds.giftIconTime].width,
                            h = this.oGameElementsImgData.oData.oAtlasData[oImageIds.giftIconTime].height;
                        ctx.drawImage(this.oGameElementsImgData.img, a, i, s, h, canvas.width / 2 - 65, canvas.height / 2 - h / 2 - 128 + this.posY / 4 + 5 * Math.sin(this.giftInc), s, h)
                    } else if (2 == giftType) {
                        var d = 2;
                        1 == giftNum ? d = 3 : 2 == giftNum && (d = 4);
                        var a = this.oGameElementsImgData.oData.oAtlasData[oImageIds["hint" + d]].x,
                            i = this.oGameElementsImgData.oData.oAtlasData[oImageIds["hint" + d]].y,
                            s = this.oGameElementsImgData.oData.oAtlasData[oImageIds["hint" + d]].width,
                            h = this.oGameElementsImgData.oData.oAtlasData[oImageIds["hint" + d]].height;
                        ctx.drawImage(this.oGameElementsImgData.img, a, i, s, h, canvas.width / 2, canvas.height / 2 - h / 2 * 1.2 - 125 + this.posY / 4 + 5 * Math.sin(this.giftInc), 1.2 * s, 1.2 * h);
                        var a = this.oGameElementsImgData.oData.oAtlasData[oImageIds.giftIconHint].x,
                            i = this.oGameElementsImgData.oData.oAtlasData[oImageIds.giftIconHint].y,
                            s = this.oGameElementsImgData.oData.oAtlasData[oImageIds.giftIconHint].width,
                            h = this.oGameElementsImgData.oData.oAtlasData[oImageIds.giftIconHint].height;
                        ctx.drawImage(this.oGameElementsImgData.img, a, i, s, h, canvas.width / 2 - 65, canvas.height / 2 - h / 2 - 128 + this.posY / 4 + 5 * Math.sin(this.giftInc), s, h)
                    }
                    break;
                case "pause":
                    ctx.fillStyle = "rgba(0, 0, 0, 0.75)", ctx.fillRect(0, 0, canvas.width, canvas.height)
            }
            t && this.addButs(ctx)
        }, t.prototype.addButs = function(t) {
            for (var e = 0; e < this.aButs.length; e++) {
                var a = this.posY,
                    i = 0;
                0 == this.incY || this.aButs[e].noMove || (i = 3 * Math.sin(this.incY + 45 * e)), this.aButs[e].scale || (this.aButs[e].scale = 1);
                var s = this.aButs[e].oImgData.oData.oAtlasData[this.aButs[e].id].x,
                    h = this.aButs[e].oImgData.oData.oAtlasData[this.aButs[e].id].y,
                    o = this.aButs[e].oImgData.oData.oAtlasData[this.aButs[e].id].width,
                    n = this.aButs[e].oImgData.oData.oAtlasData[this.aButs[e].id].height,
                    r = canvas.width * this.aButs[e].align[0],
                    c = canvas.height * this.aButs[e].align[1];
                t.drawImage(this.aButs[e].oImgData.img, s, h, o, n, r + this.aButs[e].aPos[0] - o / 2 * this.aButs[e].scale + a - i / 2, c + this.aButs[e].aPos[1] - n / 2 * this.aButs[e].scale + i / 2, o * this.aButs[e].scale + i, n * this.aButs[e].scale - i)
            }
        }, t
    }();
    t.Panel = e
}(Elements || (Elements = {}));
var Utils;
! function(t) {
    var e = function() {
        function t() {
            this.oTextData = {}, this.inc = 0, this.createTextObjects()
        }
        return t.prototype.createTextObjects = function() {
            for (var t in assetLib.textData.langText.text[curLang]) this.oTextData[t] = {}, this.oTextData[t].aLineData = this.getCharData(assetLib.textData.langText.text[curLang][t]["@text"], assetLib.textData.langText.text[curLang][t]["@fontId"]), this.oTextData[t].aLineWidths = this.getLineWidths(this.oTextData[t].aLineData), this.oTextData[t].blockWidth = this.getBlockWidth(this.oTextData[t].aLineData), this.oTextData[t].blockHeight = this.getBlockHeight(this.oTextData[t].aLineData, assetLib.textData.langText.text[curLang][t]["@fontId"]), this.oTextData[t].lineHeight = parseInt(assetLib.textData["fontData" + assetLib.textData.langText.text[curLang][t]["@fontId"]].text.common["@lineHeight"]), this.oTextData[t].oFontImgData = assetLib.getData("font" + assetLib.textData.langText.text[curLang][t]["@fontId"])
        }, t.prototype.getLineWidths = function(t) {
            for (var e, a = new Array, i = 0; i < t.length; i++) {
                e = 0;
                for (var s = 0; s < t[i].length; s++) e += parseInt(t[i][s]["@xadvance"]), 0 == s ? e -= parseInt(t[i][s]["@xoffset"]) : s == t[i].length - 1 && (e += parseInt(t[i][s]["@xoffset"]));
                a.push(e)
            }
            return a
        }, t.prototype.getBlockWidth = function(t) {
            for (var e, a = 0, i = 0; i < t.length; i++) {
                e = 0;
                for (var s = 0; s < t[i].length; s++) e += parseInt(t[i][s]["@xadvance"]), 0 == s ? e -= parseInt(t[i][s]["@xoffset"]) : s == t[i].length - 1 && (e += parseInt(t[i][s]["@xoffset"]));
                e > a && (a = e)
            }
            return a
        }, t.prototype.getBlockHeight = function(t, e) {
            return t.length * parseInt(assetLib.textData["fontData" + e].text.common["@lineHeight"])
        }, t.prototype.getCharData = function(t, e) {
            for (var a = new Array, i = 0; i < t.length; i++) {
                a[i] = new Array;
                for (var s = 0; s < t[i].length; s++)
                    for (var h = 0; h < assetLib.textData["fontData" + e].text.chars["char"].length; h++) t[i][s].charCodeAt() == assetLib.textData["fontData" + e].text.chars["char"][h]["@id"] && a[i].push(assetLib.textData["fontData" + e].text.chars["char"][h])
            }
            return a
        }, t.prototype.renderText = function(t) {
            var e, a = this.oTextData[t.text].aLineData,
                i = this.oTextData[t.text].oFontImgData,
                s = 0,
                h = 0,
                o = 0,
                n = 1,
                r = 0;
            t.lineOffsetY && (o = t.lineOffsetY), t.scale && (n = t.scale);
            var c = 1 * n;
            t.maxWidth && this.oTextData[t.text].blockWidth * n > t.maxWidth && (c = t.maxWidth / this.oTextData[t.text].blockWidth), t.anim && (this.inc += 7 * delta);
            for (var m = 0; m < a.length; m++) {
                e = 0, "centre" == t.alignX && (s = this.oTextData[t.text].aLineWidths[m] / 2), "centre" == t.alignY && (h = this.oTextData[t.text].blockHeight / 2 + o * (a.length - 1) / 2);
                for (var g = 0; g < a[m].length; g++) {
                    var d = a[m][g]["@x"],
                        l = a[m][g]["@y"],
                        u = a[m][g]["@width"],
                        D = a[m][g]["@height"];
                    t.anim && (r = Math.sin(this.inc + g / 2) * (D / 15 * c)), ctx.drawImage(i.img, d, l, u, D, t.x + (e + parseInt(a[m][g]["@xoffset"]) - s) * c, t.y + (parseInt(a[m][g]["@yoffset"]) + m * this.oTextData[t.text].lineHeight + m * o - h) * c + r, u * c, D * c), e += parseInt(a[m][g]["@xadvance"])
                }
            }
        }, t
    }();
    t.TextDisplay = e
}(Utils || (Utils = {}));
var Elements;
! function(t) {
    var e = function() {
        function t() {
            this.oGameElementsImgData = assetLib.getData("gameElements"), this.oUiElementsImgData = assetLib.getData("uiElements"), this.createTarget()
        }
        return t.prototype.hintUsed = function() {
            try {
                gradle.event("EVENT_CUSTOM", {
                    event: "HINT_USED"
                })
            } catch (t) {}
            this.clearWrongGridPieces(), hexPieces.hintPiece(this.aPiecesCanHint[Math.floor(Math.random() * this.aPiecesCanHint.length)])
        }, t.prototype.clearWrongGridPieces = function() {
            this.aPiecesCanHint = new Array;
            for (var t = 0; t < this.aPieces.length; t++)
                if (hexPieces.aPieceData[t].isWrong || this.aPiecesCanHint.push(t), hexPieces.aPieceData[t].inGrid) {
                    for (var e = !1, a = 0; a < this.aPieces[t].length; a++)
                        if (hexPieces.aPieceData[t].aHexPos[a].aHex && this.aPieces[t][a][0] == hexPieces.aPieceData[t].aHexPos[a].aHex[0] && this.aPieces[t][a][1] == hexPieces.aPieceData[t].aHexPos[a].aHex[1]) {
                            e = !0, this.aPiecesCanHint.pop();
                            break
                        }
                    e && !hexPieces.aPieceData[t].isWrong || hexPieces.removePiece(t)
                }
        }, t.prototype.createPieces = function() {
            var t;
            t = 0 == levelNum && firstRun ? 1 : 1 == levelNum ? 3 : Math.min(Math.max(Math.round(this.hexActualCount / 5), 3), 5), this.aPieces = new Array, this.hexToAddToPieces = this.hexActualCount, this.wrongPiece = null, this.aHexClone = new Array;
            for (var e = 0; e < this.aHex.length; e++) {
                this.aHexClone[e] = new Array;
                for (var a = 0; a < this.aHex[e].length; a++) this.aHexClone[e][a] = {
                    id: this.aHex[e][a].id
                }
            }
            for (var i = 0; this.hexToAddToPieces > 0;) {
                0 == levelNum && firstRun ? this.hexForPiece = 3 : this.hexForPiece = Math.max(Math.floor(this.hexActualCount / t + 2 * Math.random() - 1), 2);
                var s = new Array;
                this.aPieces.push(s);
                for (var h = !1, o = new Array, a = Math.floor(cols / 2) - 1; a < Math.floor(cols / 2) + 1; a++) {
                    for (var n = Math.floor(rows / 2) - 1; n < Math.floor(rows / 2) + 1 && (h = this.checkHexAtPos(a, n), o = [a, n], !h); n++);
                    if (h) break
                }
                if (!h)
                    for (var a = 0; a < this.aHexClone.length; a++) {
                        for (var n = 0; n < this.aHexClone[a].length && (h = this.checkHexAtPos(a, n), o = [a, n], !h); n++);
                        if (h) break
                    }
                1 == this.aPieces[this.aPieces.length - 1].length && (this.aHex[o[0]][o[1]].id = 0, this.aPieces.pop()), ++i > 300 && (this.hexToAddToPieces = 0);
                for (var i = 0, e = 0; e < this.aHex.length; e++)
                    for (var a = 0; a < this.aHex[e].length; a++) 0 == this.aHex[e][a].id && (this.aHex[e][a].tweenX = canvas.width / 2 + 200 * (a - cols / 2), i++, this.aHex[e][a].tweenY = -650, TweenLite.to(this.aHex[e][a], .3, {
                        delay: i / 50,
                        tweenX: 0,
                        tweenY: 0,
                        ease: "Quad.easeOut"
                    }))
            }
            this.aPieces.length < 5 && levelNum > 6 && (this.addRandomPiece(Math.floor(this.hexActualCount / t)), this.wrongPiece = this.aPieces[this.aPieces.length - 1]), this.aPieces = randomise(this.aPieces)
        }, t.prototype.addRandomPiece = function(t) {
            for (var e = new Array, a = 0; a < rows; a++) {
                var i = new Array;
                e.push(i);
                for (var s = 0; s < cols; s++) e[a].push({
                    id: 1
                })
            }
            var i = new Array;
            this.aPieces.push(i), this.aPieces[this.aPieces.length - 1].push([Math.floor(cols / 2), Math.floor(rows / 2)]), this.aPieces[this.aPieces.length - 1] = this.findConnectedHex(this.aPieces[this.aPieces.length - 1], t, e)
        }, t.prototype.checkHexAtPos = function(t, e) {
            var a = !1;
            return 1 == this.aHexClone[t][e].id && (this.aHexClone[t][e].id = 0, this.hexToAddToPieces--, this.aPieces[this.aPieces.length - 1].push([t, e]), this.hexForPiece > 1 && (this.hexForPiece--, this.aPieces[this.aPieces.length - 1] = this.findConnectedHex(this.aPieces[this.aPieces.length - 1], this.hexForPiece, this.aHexClone)), a = !0), a
        }, t.prototype.findConnectedHex = function(t, e, a) {
            for (var i = 0; e > 0;) {
                for (var s = new Array, h = 0; h < t.length; h++) t[h][0] - 1 >= 0 && 1 == a[t[h][0] - 1][t[h][1]].id && s.push([t[h][0] - 1, t[h][1]]), t[h][1] + 1 < cols && 1 == a[t[h][0]][t[h][1] + 1].id && s.push([t[h][0], t[h][1] + 1]), t[h][1] % 2 == 0 ? (t[h][0] + 1 < rows && t[h][1] + 1 < cols && 1 == a[t[h][0] + 1][t[h][1] + 1].id && s.push([t[h][0] + 1, t[h][1] + 1]), t[h][0] + 1 < rows && t[h][1] - 1 >= 0 && 1 == a[t[h][0] + 1][t[h][1] - 1].id && s.push([t[h][0] + 1, t[h][1] - 1])) : (t[h][0] - 1 >= 0 && t[h][1] + 1 < cols && 1 == a[t[h][0] - 1][t[h][1] + 1].id && s.push([t[h][0] - 1, t[h][1] + 1]), t[h][0] - 1 >= 0 && t[h][1] - 1 >= 0 && 1 == a[t[h][0] - 1][t[h][1] - 1].id && s.push([t[h][0] - 1, t[h][1] - 1])), t[h][0] + 1 < rows && 1 == a[t[h][0] + 1][t[h][1]].id && s.push([t[h][0] + 1, t[h][1]]), t[h][1] - 1 >= 0 && 1 == a[t[h][0]][t[h][1] - 1].id && s.push([t[h][0], t[h][1] - 1]);
                if (!(s.length > 0)) break;
                var o = s[Math.floor(Math.random() * s.length)].splice(0);
                a[o[0]][o[1]].id = 0, t.push(o), this.hexToAddToPieces--, e--, ++i > 300 && (e = 0)
            }
            return t
        }, t.prototype.createTarget = function() {
            this.aHex = new Array;
            for (var t = 0; t < rows; t++) {
                var e = new Array;
                this.aHex.push(e);
                for (var a = 0; a < cols; a++) 3 == t && 4 == a ? this.aHex[t].push({
                    id: 1
                }) : this.aHex[t].push({
                    id: 0
                })
            }
            0 == levelNum && firstRun ? this.hexTargCount = 3 : this.hexTargCount = Math.floor(Math.random() * Math.min(20, 1.5 * levelNum) + 6), this.hexActualCount = 1;
            for (var i = Math.floor(4 * Math.random()), s = 0, t = 0; t < this.hexTargCount; t++) {
                if (s++, i++, i %= 4, 0 == i) {
                    for (var e = new Array, a = 0; a < cols; a++) e.push(a);
                    for (var h = !1; !h;) {
                        var o = Math.floor(Math.random() * e.length),
                            n = e[o];
                        e.splice(o, 1);
                        for (var a = 0; a < rows; a++)
                            if (1 == this.aHex[a][n].id) {
                                a > 0 && (this.aHex[a - 1][n].id = 1, h = !0, this.hexActualCount++);
                                break
                            }(!h || e.length < 1) && (t--, h = !0)
                    }
                }
                if (1 == i) {
                    for (var e = new Array, a = 0; a < rows; a++) e.push(a);
                    for (var h = !1; !h;) {
                        var o = Math.floor(Math.random() * e.length),
                            n = e[o];
                        e.splice(o, 1);
                        for (var a = cols - 1; a >= 0; a--)
                            if (1 == this.aHex[n][a].id) {
                                a < cols - 1 && (this.aHex[n][a + 1].id = 1, h = !0, this.hexActualCount++);
                                break
                            }(!h || e.length < 1) && (t--, h = !0)
                    }
                }
                if (2 == i) {
                    for (var e = new Array, a = 0; a < cols; a++) e.push(a);
                    for (var h = !1; !h;) {
                        var o = Math.floor(Math.random() * e.length),
                            n = e[o];
                        e.splice(o, 1);
                        for (var a = rows - 1; a >= 0; a--)
                            if (1 == this.aHex[a][n].id) {
                                a < rows - 1 && (this.aHex[a + 1][n].id = 1, h = !0, this.hexActualCount++);
                                break
                            }(!h || e.length < 1) && (t--, h = !0)
                    }
                }
                if (3 == i) {
                    for (var e = new Array, a = 0; a < rows; a++) e.push(a);
                    for (var h = !1; !h;) {
                        var o = Math.floor(Math.random() * e.length),
                            n = e[o];
                        e.splice(o, 1);
                        for (var a = 0; a < cols; a++)
                            if (1 == this.aHex[n][a].id) {
                                a > 0 && (this.aHex[n][a - 1].id = 1, h = !0, this.hexActualCount++);
                                break
                            }(!h || e.length < 1) && (t--, h = !0)
                    }
                }
                if (s > 300) break
            }
        }, t.prototype.render = function() {
            canvas.width > canvas.height ? (canvas.width / 2 < canvas.height ? this.scale = canvas.width / 2 / canvas.height * 1 : this.scale = 1, this.posX = 50 + cols / 2 * hexWidth * this.scale, this.posY = canvas.height / 2 + 25) : (canvas.height / 2 < canvas.width ? this.scale = canvas.height / 2 / canvas.width * 1 : this.scale = 1, this.posX = canvas.width / 2, this.posY = 90 + rows / 2 * hexHeight * this.scale);
            var t = this.oUiElementsImgData.oData.oAtlasData[oImageIds.bgGrid].x,
                e = this.oUiElementsImgData.oData.oAtlasData[oImageIds.bgGrid].y,
                a = this.oUiElementsImgData.oData.oAtlasData[oImageIds.bgGrid].width,
                i = this.oUiElementsImgData.oData.oAtlasData[oImageIds.bgGrid].height,
                s = this.oGameElementsImgData.oData.oAtlasData[oImageIds.hexEmpty].x,
                h = this.oGameElementsImgData.oData.oAtlasData[oImageIds.hexEmpty].y,
                o = this.oGameElementsImgData.oData.oAtlasData[oImageIds.hexEmpty].width,
                n = this.oGameElementsImgData.oData.oAtlasData[oImageIds.hexEmpty].height;
            ctx.drawImage(this.oUiElementsImgData.img, t, e, a, i, this.posX - (0 + (cols / 2 - 0 - .5) * hexWidth) * this.scale - o / 2 * this.scale, this.posY - (0 + (rows / 2 - 0) * hexHeight - 0 - n / 4) * this.scale - n / 2 * this.scale, a * this.scale, i * this.scale);
            for (var r = 0; r < this.aHex.length; r++)
                for (var c = 0; c < this.aHex[r].length; c++) {
                    var m = 0;
                    c % 2 == 0 && (m = hexHeight / 2), this.aHex[r][c].x = this.posX - (0 + (cols / 2 - c - .5) * hexWidth) * this.scale, this.aHex[r][c].y = this.posY - (0 + (rows / 2 - r) * hexHeight - m - n / 4) * this.scale, 0 == this.aHex[r][c].id && ctx.drawImage(this.oGameElementsImgData.img, s, h, o, n, this.aHex[r][c].x - o / 2 * this.scale + this.aHex[r][c].tweenX, this.aHex[r][c].y - n / 2 * this.scale + this.aHex[r][c].tweenY, o * this.scale, n * this.scale)
                }
        }, t
    }();
    t.HexTarget = e
}(Elements || (Elements = {}));
var Elements;
! function(t) {
    var e = function() {
        function t(t) {
            this.gutter = 30, this.heldPieceId = -1, this.lineJiggleInc = 0, this.oGameElementsImgData = assetLib.getData("gameElements"), this.aPieces = t, this.aPieceData = new Array, this.getPieceSizes()
        }
        return t.prototype.hintPiece = function(t) {
            for (var e = this, a = 0; a < this.aPieceData[t].aHexPos.length; a++) this.aPieceData[t].aHexPos[a].gridHex = hexTarget.aHex[this.aPieces[t][a][0]][this.aPieces[t][a][1]], this.aPieceData[t].aHexPos[a].aHex = [this.aPieces[t][a][0], this.aPieces[t][a][1]];
            this.aPieceData[t].inGrid = !0;
            for (var i = 0; i < this.aPieceData[t].aHexPos.length; i++) this.aPieceData[t].aHexPos[i].prevPosX = this.aPieceData[t].aHexPos[i].x, this.aPieceData[t].aHexPos[i].prevPosY = this.aPieceData[t].aHexPos[i].y;
            this.aPieceData[t].posTween && this.aPieceData[t].posTween.kill(), this.aPieceData[t].tryCount = 0, this.aPieceData[t].posInc = 0, this.aPieceData[t].posTween = TweenLite.to(this.aPieceData[t], .2, {
                posInc: 1,
                ease: "Quad.easeOut",
                onComplete: function() {
                    for (var a = 0; a < e.aPieceData[t].aHexPos.length; a++) hexTarget.aHex[e.aPieceData[t].aHexPos[a].aHex[0]][e.aPieceData[t].aHexPos[a].aHex[1]].id = 2;
                    for (var i = !0, a = 0; a < hexTarget.aHex.length; a++)
                        for (var s = 0; s < hexTarget.aHex[a].length; s++) 1 == hexTarget.aHex[a][s].id && (i = !1);
                    i && levelComplete()
                }
            })
        }, t.prototype.removePiece = function(t) {
            this.aPieceData[t].inGrid = !1;
            for (var e = 0; e < this.aPieceData[t].aHexPos.length; e++) this.aPieceData[t].aHexPos[e].prevPosX = this.aPieceData[t].aHexPos[e].x, this.aPieceData[t].aHexPos[e].prevPosY = this.aPieceData[t].aHexPos[e].y;
            this.aPieceData[t].prevScale = this.aPieceData[t].scale, this.aPieceData[t].posTween && this.aPieceData[t].posTween.kill(), this.aPieceData[t].posInc = 0, this.aPieceData[t].posTween = TweenLite.to(this.aPieceData[t], .3, {
                posInc: 1,
                ease: "Quad.easeOut"
            });
            for (var a = 0; a < this.aPieceData[t].aHexPos.length; a++) hexTarget.aHex[this.aPieceData[t].aHexPos[a].aHex[0]][this.aPieceData[t].aHexPos[a].aHex[1]].id = 1, this.aPieceData[t].aHexPos[a].aHex = new Array
        }, t.prototype.checkDrop = function() {
            if (this.heldPieceId != -1) {
                togglePauseAndMuteButs(!0);
                for (var t = !0, e = 0; e < this.aPieceData[this.heldPieceId].aHexPos.length; e++) {
                    this.aPieceData[this.heldPieceId].colourState = 0,
                        this.aPieceData[this.heldPieceId].aHexPos[e].gridHex = null;
                    for (var a = 0; a < hexTarget.aHex.length; a++)
                        for (var i = 0; i < hexTarget.aHex[a].length; i++) 1 == hexTarget.aHex[a][i].id && this.aPieceData[this.heldPieceId].aHexPos[e].x > hexTarget.aHex[a][i].x - hexWidth * hexTarget.scale * .5 && this.aPieceData[this.heldPieceId].aHexPos[e].x < hexTarget.aHex[a][i].x + hexWidth * hexTarget.scale * .5 && this.aPieceData[this.heldPieceId].aHexPos[e].y > hexTarget.aHex[a][i].y - hexHeight * hexTarget.scale * .5 && this.aPieceData[this.heldPieceId].aHexPos[e].y < hexTarget.aHex[a][i].y + hexHeight * hexTarget.scale * .5 && (this.aPieceData[this.heldPieceId].aHexPos[e].gridHex = hexTarget.aHex[a][i], this.aPieceData[this.heldPieceId].aHexPos[e].aHex = [a, i]);
                    null == this.aPieceData[this.heldPieceId].aHexPos[e].gridHex && (t = !1)
                }
                if (t) {
                    this.aPieceData[this.heldPieceId].inGrid = !0;
                    for (var e = 0; e < this.aPieceData[this.heldPieceId].aHexPos.length; e++) hexTarget.aHex[this.aPieceData[this.heldPieceId].aHexPos[e].aHex[0]][this.aPieceData[this.heldPieceId].aHexPos[e].aHex[1]].id = 2;
                    playSound("placePiece" + Math.floor(3 * Math.random()))
                } else {
                    this.aPieceData[this.heldPieceId].inGrid = !1, playSound("pieceBack");
                    for (var a = 0; a < this.aPieceData[this.heldPieceId].aHexPos.length; a++) this.aPieceData[this.heldPieceId].aHexPos[a].prevPosX = this.aPieceData[this.heldPieceId].aHexPos[a].x, this.aPieceData[this.heldPieceId].aHexPos[a].prevPosY = this.aPieceData[this.heldPieceId].aHexPos[a].y;
                    this.aPieceData[this.heldPieceId].prevScale = this.aPieceData[this.heldPieceId].scale, this.aPieceData[this.heldPieceId].posTween && this.aPieceData[this.heldPieceId].posTween.kill(), this.aPieceData[this.heldPieceId].posInc = 0, this.aPieceData[this.heldPieceId].posTween = TweenLite.to(this.aPieceData[this.heldPieceId], .3, {
                        posInc: 1,
                        ease: "Back.easeOut"
                    }), firstRun && (hud.tutAnimReset(), hud.tutAnim())
                }
                this.heldPieceId = -1
            }
            for (var s = !0, e = 0; e < hexTarget.aHex.length; e++)
                for (var a = 0; a < hexTarget.aHex[e].length; a++) 1 == hexTarget.aHex[e][a].id && (s = !1);
            s && levelComplete()
        }, t.prototype.checkTouch = function(t, e) {
            for (var a = !1, i = .5, s = 0; s < this.aPieces.length; s++)
                if (this.aPieceData[s].inGrid) {
                    for (var h = 0; h < this.aPieces[s].length; h++) {
                        var o = this.aPieceData[s].scale;
                        if (this.aPieceData[s].inGrid && (o = hexTarget.scale), e < this.aPieceData[s].aHexPos[h].y + hexHeight * o * i && e > this.aPieceData[s].aHexPos[h].y - hexHeight * o * i && t < this.aPieceData[s].aHexPos[h].x + hexWidth * o * i && t > this.aPieceData[s].aHexPos[h].x - hexWidth * o * i) {
                            a = !0, this.setHeldPiece(s), this.aPieceData[s].tryCount = Math.max(this.aPieceData[s].tryCount - 1, 0), playSound("holdPiece"), togglePauseAndMuteButs(!1);
                            break
                        }
                    }
                    if (a) break
                } else {
                    var n = this.aPieceData[s].centrePosX - (this.aPieceData[s].pieceWidth * hexWidth / 2 + 1.5 * hexWidth) * this.aPieceData[s].scale + this.aPieceData[s].tweenPos,
                        r = this.aPieceData[s].centrePosY - hexHeight / 2 * this.aPieceData[s].scale,
                        c = this.aPieceData[s].centrePosX + (this.aPieceData[s].pieceWidth * hexWidth / 2 + 1.5 * hexWidth) * this.aPieceData[s].scale + this.aPieceData[s].tweenPos,
                        m = this.aPieceData[s].centrePosY + (this.aPieceData[s].pieceHeight * hexHeight + hexHeight / 2) * this.aPieceData[s].scale;
                    if (canvas.width < canvas.height && (n = this.aPieceData[s].centrePosX - hexWidth / 2 * this.aPieceData[s].scale, r = this.aPieceData[s].centrePosY - (this.aPieceData[s].pieceHeight * hexHeight / 2 + 1.5 * hexHeight) * this.aPieceData[s].scale + this.aPieceData[s].tweenPos, c = this.aPieceData[s].centrePosX + (this.aPieceData[s].pieceWidth * hexWidth + hexWidth / 2) * this.aPieceData[s].scale, m = this.aPieceData[s].centrePosY + (this.aPieceData[s].pieceHeight * hexHeight / 2 + 1.5 * hexHeight) * this.aPieceData[s].scale + this.aPieceData[s].tweenPos), t > n && t < c && e > r && e < m) {
                        this.setHeldPiece(s), playSound("holdPiece"), togglePauseAndMuteButs(!1), this.aPieceData[s].tryCount = Math.max(this.aPieceData[s].tryCount - 1, 0), hud.cancelTutAnim();
                        break
                    }
                }
        }, t.prototype.setHeldPiece = function(t) {
            if (this.heldPieceId = t, this.aPieceData[this.heldPieceId].inGrid)
                for (var e = 0; e < this.aPieceData[this.heldPieceId].aHexPos.length; e++) hexTarget.aHex[this.aPieceData[this.heldPieceId].aHexPos[e].aHex[0]][this.aPieceData[this.heldPieceId].aHexPos[e].aHex[1]].id = 1, this.aPieceData[this.heldPieceId].aHexPos[e].aHex = new Array;
            for (var a = 0; a < this.aPieceData[t].aHexPos.length; a++) this.aPieceData[t].aHexPos[a].prevPosX = this.aPieceData[t].aHexPos[a].x, this.aPieceData[t].aHexPos[a].prevPosY = this.aPieceData[t].aHexPos[a].y;
            this.aPieceData[t].prevScale = this.aPieceData[t].scale, this.aPieceData[this.heldPieceId].gridHex = null, this.aPieceData[this.heldPieceId].inGrid = !1, this.aPieceData[this.heldPieceId].colourState = 1, this.aPieceData[this.heldPieceId].posInc = 0, this.aPieceData[this.heldPieceId].posTween && this.aPieceData[this.heldPieceId].posTween.kill(), this.aPieceData[this.heldPieceId].posTween = TweenLite.to(this.aPieceData[this.heldPieceId], .2, {
                posInc: 1,
                ease: "Quad.easeOut"
            })
        }, t.prototype.getPieceSizes = function() {
            this.totalPiecesHeight = 0, this.totalPiecesWidth = 0, this.tallestPiece = 0, this.widestPiece = 0, this.colourOrder = Math.round(20 * Math.random());
            for (var t = 0; t < this.aPieces.length; t++) {
                this.aPieceData[t] = {}, this.aPieceData[t].aHexPos = new Array, this.aPieceData[t].gridHex = null, this.aPieceData[t].inGrid = !1, this.aPieceData[t].scale = 0, this.aPieceData[t].prevScale = 0, this.aPieceData[t].centrePosY = 0, this.aPieceData[t].centrePosX = 0, this.aPieceData[t].posInc = 1, this.aPieceData[t].colourState = 0, this.aPieceData[t].isWrong = !0, this.aPieceData[t].tryCount = 4;
                for (var e = cols, a = 0, i = rows, s = 0, h = 0; h < this.aPieces[t].length; h++) hexTarget.wrongPiece ? this.aPieces[t][h][0] == hexTarget.wrongPiece[h][0] && this.aPieces[t][h][1] == hexTarget.wrongPiece[h][1] || (this.aPieceData[t].isWrong = !1) : this.aPieceData[t].isWrong = !1, this.aPieceData[t].aHexPos[h] = {}, this.aPieceData[t].aHexPos[h].prevPosX = canvas.width, this.aPieceData[t].aHexPos[h].prevPosY = canvas.height / 2, this.aPieces[t][h][1] < e && (this.aPieceData[t].leftHexX = this.aPieces[t][h][1], e = this.aPieces[t][h][1]), this.aPieces[t][h][1] > a && (this.aPieceData[t].rightHexX = this.aPieces[t][h][1], a = this.aPieces[t][h][1]), this.aPieces[t][h][0] < i && (this.aPieceData[t].topHexY = this.aPieces[t][h][0], i = this.aPieces[t][h][0]), this.aPieces[t][h][0] > s && (this.aPieceData[t].bottomHexY = this.aPieces[t][h][0], s = this.aPieces[t][h][0]);
                this.aPieceData[t].pieceWidth = a - e + 1, this.aPieceData[t].pieceHeight = s - i + 1, this.tallestPiece < this.aPieceData[t].pieceHeight && (this.tallestPiece = this.aPieceData[t].pieceHeight), this.widestPiece < this.aPieceData[t].pieceWidth && (this.widestPiece = this.aPieceData[t].pieceWidth), this.totalPiecesWidth += this.aPieceData[t].pieceWidth, this.totalPiecesHeight += this.aPieceData[t].pieceHeight, this.aPieceData[t].tweenPos = 500, TweenLite.to(this.aPieceData[t], .5, {
                    delay: .4 + t / 15,
                    tweenPos: 0,
                    ease: "Back.easeOut"
                })
            }
            this.totalPiecesWidth += 1 * (this.aPieces.length - 1), this.totalPiecesHeight += 1 * (this.aPieces.length - 1)
        }, t.prototype.render = function() {
            var t, e, a, i, s = hexTarget.posX + cols / 2 * hexWidth * hexTarget.scale,
                h = hexTarget.posY + rows / 2 * hexHeight * hexTarget.scale + hexHeight / 2 * hexTarget.scale;
            this.lineJiggleInc += delta;
            for (var o = 0; o < this.aPieces.length; o++) {
                t = this.oGameElementsImgData.oData.oAtlasData[oImageIds["hex" + this.aPieceData[o].colourState + (o + this.colourOrder) % 7]].x, e = this.oGameElementsImgData.oData.oAtlasData[oImageIds["hex" + this.aPieceData[o].colourState + (o + this.colourOrder) % 7]].y, a = this.oGameElementsImgData.oData.oAtlasData[oImageIds["hex" + this.aPieceData[o].colourState + (o + this.colourOrder) % 7]].width, i = this.oGameElementsImgData.oData.oAtlasData[oImageIds["hex" + this.aPieceData[o].colourState + (o + this.colourOrder) % 7]].height;
                var n;
                canvas.width > canvas.height ? (n = Math.min((canvas.height - 2 * this.gutter) / (this.totalPiecesHeight * hexHeight), hexTarget.scale), n * (this.widestPiece * hexWidth) > canvas.width - 100 - s - 20 && (n = (canvas.width - 100 - s - 20) / (this.widestPiece * hexWidth)), this.aPieceData[o].centrePosX = (canvas.width - 100 - s) / 2 + s, 0 == o ? this.aPieceData.length > 1 ? this.aPieceData[o].centrePosY = this.gutter : this.aPieceData[o].centrePosY = canvas.height / 2 - this.aPieceData[o].pieceHeight * hexHeight * n / 2 : this.aPieceData[o].centrePosY = this.aPieceData[o - 1].centrePosY + (canvas.height - 2 * this.gutter) / (this.totalPiecesHeight * hexHeight * n) * ((this.aPieceData[o - 1].pieceHeight + 1) * hexHeight * n)) : (n = Math.min((canvas.width - 2 * this.gutter) / (this.totalPiecesWidth * hexWidth), hexTarget.scale), n * (this.tallestPiece * hexHeight) > canvas.height - 100 - h - 20 && (n = (canvas.height - 100 - h - 20) / (this.tallestPiece * hexHeight)), this.aPieceData[o].centrePosY = (canvas.height - 100 - h) / 2 + h, 0 == o ? this.aPieceData.length > 1 ? this.aPieceData[o].centrePosX = this.gutter : this.aPieceData[o].centrePosX = canvas.width / 2 - this.aPieceData[o].pieceWidth * hexWidth * n / 2 : this.aPieceData[o].centrePosX = this.aPieceData[o - 1].centrePosX + (canvas.width - 2 * this.gutter) / (this.totalPiecesWidth * hexWidth * n) * ((this.aPieceData[o - 1].pieceWidth + 1) * hexWidth * n)), this.lineJiggle = 6 * Math.sin(5 * this.lineJiggleInc + 10 * this.aPieceData[o].centrePosX + 10 * this.aPieceData[o].centrePosY);
                for (var r = 0; r < this.aPieces[o].length; r++) {
                    var c = 0;
                    if (this.aPieces[o][r][1] % 2 == 0 && (c = hexHeight / 2), o != this.heldPieceId)
                        if (this.aPieceData[o].inGrid) {
                            this.aPieceData[o].scale = hexTarget.scale;
                            var m = this.aPieceData[o].aHexPos[r].gridHex.x,
                                g = this.aPieceData[o].aHexPos[r].gridHex.y;
                            this.aPieceData[o].aHexPos[r].x = this.aPieceData[o].aHexPos[r].prevPosX + (m - this.aPieceData[o].aHexPos[r].prevPosX) * this.aPieceData[o].posInc, this.aPieceData[o].aHexPos[r].y = this.aPieceData[o].aHexPos[r].prevPosY + (g - this.aPieceData[o].aHexPos[r].prevPosY) * this.aPieceData[o].posInc, ctx.drawImage(this.oGameElementsImgData.img, t, e, a, i, this.aPieceData[o].aHexPos[r].x - a / 2 * this.aPieceData[o].scale, this.aPieceData[o].aHexPos[r].y - i / 2 * this.aPieceData[o].scale, a * this.aPieceData[o].scale, i * this.aPieceData[o].scale)
                        } else if (canvas.width > canvas.height) {
                        this.aPieceData[o].scale = this.aPieceData[o].prevScale + (n - this.aPieceData[o].prevScale) * this.aPieceData[o].posInc;
                        var m = this.aPieceData[o].centrePosX - (this.aPieceData[o].pieceWidth / 2 - this.aPieces[o][r][1] - .5 + this.aPieceData[o].leftHexX) * hexWidth * n,
                            g = this.aPieceData[o].centrePosY + (i / 2 + (this.aPieces[o][r][0] - this.aPieceData[o].topHexY) * hexHeight + c - i / 4) * n;
                        this.aPieceData[o].aHexPos[r].x = this.aPieceData[o].aHexPos[r].prevPosX + (m - this.aPieceData[o].aHexPos[r].prevPosX) * this.aPieceData[o].posInc, this.aPieceData[o].aHexPos[r].y = this.aPieceData[o].aHexPos[r].prevPosY + (g - this.aPieceData[o].aHexPos[r].prevPosY) * this.aPieceData[o].posInc, ctx.drawImage(this.oGameElementsImgData.img, t, e, a, i, this.aPieceData[o].aHexPos[r].x - (a / 2 + this.lineJiggle) * this.aPieceData[o].scale + this.aPieceData[o].tweenPos, this.aPieceData[o].aHexPos[r].y - i / 2 * this.aPieceData[o].scale, a * this.aPieceData[o].scale, i * this.aPieceData[o].scale)
                    } else {
                        this.aPieceData[o].scale = this.aPieceData[o].prevScale + (n - this.aPieceData[o].prevScale) * this.aPieceData[o].posInc;
                        var m = this.aPieceData[o].centrePosX + (a / 2 + (this.aPieces[o][r][1] - this.aPieceData[o].leftHexX) * hexWidth) * n,
                            g = this.aPieceData[o].centrePosY - (0 + (this.aPieceData[o].pieceHeight / 2 - this.aPieces[o][r][0] - .5 + this.aPieceData[o].topHexY) * hexHeight - c + i / 4) * n;
                        this.aPieceData[o].aHexPos[r].x = this.aPieceData[o].aHexPos[r].prevPosX + (m - this.aPieceData[o].aHexPos[r].prevPosX) * this.aPieceData[o].posInc, this.aPieceData[o].aHexPos[r].y = this.aPieceData[o].aHexPos[r].prevPosY + (g - this.aPieceData[o].aHexPos[r].prevPosY) * this.aPieceData[o].posInc, ctx.drawImage(this.oGameElementsImgData.img, t, e, a, i, this.aPieceData[o].aHexPos[r].x - a / 2 * this.aPieceData[o].scale, this.aPieceData[o].aHexPos[r].y - (i / 2 + this.lineJiggle) * this.aPieceData[o].scale + this.aPieceData[o].tweenPos, a * this.aPieceData[o].scale, i * this.aPieceData[o].scale)
                    }
                }
            }
            if (this.heldPieceId != -1) {
                var o = this.heldPieceId;
                t = this.oGameElementsImgData.oData.oAtlasData[oImageIds["hex" + this.aPieceData[o].colourState + (o + this.colourOrder) % 7]].x, e = this.oGameElementsImgData.oData.oAtlasData[oImageIds["hex" + this.aPieceData[o].colourState + (o + this.colourOrder) % 7]].y, a = this.oGameElementsImgData.oData.oAtlasData[oImageIds["hex" + this.aPieceData[o].colourState + (o + this.colourOrder) % 7]].width, i = this.oGameElementsImgData.oData.oAtlasData[oImageIds["hex" + this.aPieceData[o].colourState + (o + this.colourOrder) % 7]].height;
                var n;
                canvas.width > canvas.height ? (n = (canvas.height - 2 * this.gutter) / (this.totalPiecesHeight * hexHeight), this.aPieceData[o].centrePosX = .75 * canvas.width, 0 == o ? this.aPieceData[o].centrePosY = this.gutter : this.aPieceData[o].centrePosY = this.aPieceData[o - 1].centrePosY + (canvas.height - 2 * this.gutter) / (this.totalPiecesHeight * hexHeight * n) * ((this.aPieceData[o - 1].pieceHeight + 1) * hexHeight * n)) : (n = (canvas.width - 2 * this.gutter) / (this.totalPiecesWidth * hexWidth), this.aPieceData[o].centrePosY = .75 * canvas.height, 0 == o ? this.aPieceData[o].centrePosX = this.gutter : this.aPieceData[o].centrePosX = this.aPieceData[o - 1].centrePosX + (canvas.width - 2 * this.gutter) / (this.totalPiecesWidth * hexWidth * n) * ((this.aPieceData[o - 1].pieceWidth + 1) * hexWidth * n));
                for (var r = 0; r < this.aPieces[o].length; r++) {
                    var c = 0;
                    this.aPieces[o][r][1] % 2 == 0 && (c = hexHeight / 2);
                    var d = 0;
                    isMobile && (d = -50), this.heldPosX = touchX, this.heldPosY = touchY + d, this.aPieceData[o].scale = this.aPieceData[o].prevScale + (hexTarget.scale - this.aPieceData[o].prevScale) * this.aPieceData[o].posInc;
                    var m = this.heldPosX - (this.aPieceData[o].pieceWidth / 2 - this.aPieces[o][r][1] - .5 + this.aPieceData[o].leftHexX) * hexWidth * hexTarget.scale,
                        g = this.heldPosY - (0 + (this.aPieceData[o].pieceHeight / 2 - this.aPieces[o][r][0] - .5 + this.aPieceData[o].topHexY) * hexHeight - c + i / 4) * hexTarget.scale;
                    this.aPieceData[o].aHexPos[r].x = this.aPieceData[o].aHexPos[r].prevPosX + (m - this.aPieceData[o].aHexPos[r].prevPosX) * this.aPieceData[o].posInc, this.aPieceData[o].aHexPos[r].y = this.aPieceData[o].aHexPos[r].prevPosY + (g - this.aPieceData[o].aHexPos[r].prevPosY) * this.aPieceData[o].posInc, ctx.drawImage(this.oGameElementsImgData.img, t, e, a, i, this.aPieceData[o].aHexPos[r].x - a / 2 * this.aPieceData[o].scale, this.aPieceData[o].aHexPos[r].y - i / 2 * this.aPieceData[o].scale, a * this.aPieceData[o].scale, i * this.aPieceData[o].scale)
                }
            }
        }, t
    }();
    t.HexPieces = e
}(Elements || (Elements = {}));
var Elements;
! function(t) {
    var e = function() {
        function t() {
            this.x = 0, this.y = 0, this.rotation = 0, this.oGameElementsImgData = assetLib.getData("gameElements"), this.reset(), this.y = Math.random() * canvas.height - canvas.height / 2
        }
        return t.prototype.reset = function() {
            this.x = Math.random() * canvas.width - canvas.width / 2, this.y = -(canvas.height / 2 + 200), this.incY = 150 * Math.random() + 100, this.id = Math.floor(7 * Math.random()), this.rotation = 3.14 * Math.random(), this.rotInc = 4 * Math.random() - 2, this.scale = .3 * Math.random() + .4
        }, t.prototype.update = function() {
            this.y += delta * this.incY, this.rotation += delta * this.rotInc, this.y > canvas.height / 2 + 200 && this.reset()
        }, t.prototype.render = function() {
            ctx.save(), ctx.translate(canvas.width / 2 + this.x, canvas.height / 2 + this.y), ctx.rotate(this.rotation);
            var t = (this.id, this.oGameElementsImgData.oData.oAtlasData[oImageIds["hex0" + this.id]].x),
                e = this.oGameElementsImgData.oData.oAtlasData[oImageIds["hex0" + this.id]].y,
                a = this.oGameElementsImgData.oData.oAtlasData[oImageIds["hex0" + this.id]].width,
                i = this.oGameElementsImgData.oData.oAtlasData[oImageIds["hex0" + this.id]].height;
            ctx.drawImage(this.oGameElementsImgData.img, t, e, a, i, -(a / 2) * this.scale, -(i / 2) * this.scale, a * this.scale, i * this.scale), ctx.restore()
        }, t
    }();
    t.FallingGem = e
}(Elements || (Elements = {}));
var Elements;
! function(t) {
    var e = function() {
        function t() {
            this.numberSpace = 30, this.scoreJiggle = 0, this.prevSecs = 0, this.tutAnimStep = 0, this.tutIsOn = !1, this.energyInc = 0, this.energy = .75, this.hintJiggle = 0, this.hintScale = 1, this.hintJiggleInc = 0, this.linesInc = 0, this.oTimerNumbersImgData = assetLib.getData("timerNumbers"), this.oScoreNumbersImgData = assetLib.getData("scoreNumbers"), this.oHintNumbersImgData = assetLib.getData("hintNumbers"), this.oUiElementsImgData = assetLib.getData("uiElements"), this.oLineVertImgData = assetLib.getData("linesVert"), this.oLineHorizImgData = assetLib.getData("linesHoriz"), this.resetHintTimer()
        }
        return t.prototype.resetHintTimer = function() {
            this.hintTimer = 0
        }, t.prototype.initMatchAnim = function(t, e) {
            this.timerBonus = t, this.scoreBonus = e, this.bonusX = 0, this.bonusY = 0, this.jiggle()
        }, t.prototype.addEnergy = function(t) {
            var e = this.energy + t / Math.max(1, hints);
            e >= 1 && (hints < 9 ? (playSound("newHint"), e -= 1, hints++, canvas.width > canvas.height ? addFirework(1, canvas.width - 70, canvas.height - 125, 3) : addFirework(1, canvas.width - 130, canvas.height - 80, 3), this.jiggleHint()) : e = 1), TweenLite.to(this, .2, {
                energy: e,
                ease: "Quad.easeInOut"
            })
        }, t.prototype.jiggle = function() {
            this.scoreJiggle = 30, TweenLite.to(this, 1, {
                scoreJiggle: 0,
                ease: "Elastic.easeOut"
            })
        }, t.prototype.jiggleHint = function() {
            this.hintTween && this.hintTween.kill(), this.hintScale = 2, this.hintTween = TweenLite.to(this, 1, {
                hintScale: 1,
                ease: "Bounce.easeOut"
            })
        }, t.prototype.highlightHint = function() {
            this.hintTween && this.hintTween.kill(), this.hintScale = 1.3, playSound("hintFizz"), this.hintTween = TweenLite.to(this, 3, {
                hintScale: 1,
                ease: "Elastic.easeOut"
            }), canvas.width > canvas.height ? addFirework(0, canvas.width - 70, canvas.height - 125, 1) : addFirework(0, canvas.width - 130, canvas.height - 80, 1)
        }, t.prototype.render = function() {
            if (this.linesInc -= 2e3 * delta, canvas.width > canvas.height) {
                this.linesInc <= -canvas.height && (this.linesInc = 0);
                var t = hexTarget.posX + cols / 2 * hexWidth * hexTarget.scale;
                ctx.drawImage(this.oLineVertImgData.img, 0, 0, this.oLineVertImgData.img.width, this.oLineVertImgData.img.height, (canvas.width - 100 - t) / 2 + t - this.oLineVertImgData.img.width / 2, this.linesInc, this.oLineVertImgData.img.width, 2 * canvas.height)
            } else {
                this.linesInc <= -canvas.width && (this.linesInc = 0);
                var e = hexTarget.posY + rows / 2 * hexHeight * hexTarget.scale + hexHeight / 2 * hexTarget.scale;
                ctx.drawImage(this.oLineHorizImgData.img, 0, 0, this.oLineHorizImgData.img.width, this.oLineHorizImgData.img.height, -canvas.width - this.linesInc, (canvas.height - 100 - e) / 2 + e - this.oLineHorizImgData.img.height / 2, 2 * canvas.width, this.oLineHorizImgData.img.height)
            }
            var a = 0;
            hints > 0 && (a = 1), this.hintX = canvas.width - 110, this.hintY = canvas.height - 55;
            var i = 45,
                s = -17;
            canvas.width > canvas.height && (this.hintX = canvas.width - 55, this.hintY = canvas.height - 100, i = -27, s = 50), 1 == a ? (this.hintJiggleInc += 10 * delta, this.hintJiggle = 2 * Math.sin(this.hintJiggleInc), this.hintTimer += delta, this.hintTimer > 12 && (this.highlightHint(), this.hintTimer = 0)) : this.hintJiggle = 0;
            var h = this.oUiElementsImgData.oData.oAtlasData[oImageIds["hintBut" + a]].x,
                o = this.oUiElementsImgData.oData.oAtlasData[oImageIds["hintBut" + a]].y,
                n = this.oUiElementsImgData.oData.oAtlasData[oImageIds["hintBut" + a]].width,
                r = this.oUiElementsImgData.oData.oAtlasData[oImageIds["hintBut" + a]].height;
            ctx.drawImage(this.oUiElementsImgData.img, h, o, n, r, this.hintX - n / 2 * this.hintScale - this.hintJiggle / 2, this.hintY - r / 2 * this.hintScale + panel.posY + this.hintJiggle / 2, n * this.hintScale + this.hintJiggle, r * this.hintScale - this.hintJiggle);
            var c = 10,
                m = c * this.oHintNumbersImgData.oData.spriteWidth % this.oHintNumbersImgData.img.width,
                g = Math.floor(c / (this.oHintNumbersImgData.img.width / this.oHintNumbersImgData.oData.spriteWidth)) * this.oHintNumbersImgData.oData.spriteHeight;
            ctx.drawImage(this.oHintNumbersImgData.img, m, g, this.oHintNumbersImgData.oData.spriteWidth, this.oHintNumbersImgData.oData.spriteHeight, this.hintX + i, this.hintY + s + panel.posY, this.oHintNumbersImgData.oData.spriteWidth, this.oHintNumbersImgData.oData.spriteHeight);
            var c = hints,
                m = c * this.oHintNumbersImgData.oData.spriteWidth % this.oHintNumbersImgData.img.width,
                g = Math.floor(c / (this.oHintNumbersImgData.img.width / this.oHintNumbersImgData.oData.spriteWidth)) * this.oHintNumbersImgData.oData.spriteHeight;
            ctx.drawImage(this.oHintNumbersImgData.img, m, g, this.oHintNumbersImgData.oData.spriteWidth, this.oHintNumbersImgData.oData.spriteHeight, this.hintX + i + 23, this.hintY + s + panel.posY, this.oHintNumbersImgData.oData.spriteWidth, this.oHintNumbersImgData.oData.spriteHeight), this.energyInc += 10 * delta;
            var d = Math.max(Math.min(this.energy + Math.sin(this.energyInc) / 100, 1), 0);
            if (canvas.width > canvas.height) {
                var h = this.oUiElementsImgData.oData.oAtlasData[oImageIds.barBgVert].x,
                    o = this.oUiElementsImgData.oData.oAtlasData[oImageIds.barBgVert].y,
                    n = this.oUiElementsImgData.oData.oAtlasData[oImageIds.barBgVert].width,
                    r = this.oUiElementsImgData.oData.oAtlasData[oImageIds.barBgVert].height;
                ctx.drawImage(this.oUiElementsImgData.img, h, o, n, r, canvas.width - 97, canvas.height - 425 + panel.posY, n, r);
                var h = this.oUiElementsImgData.oData.oAtlasData[oImageIds.barVert].x,
                    o = this.oUiElementsImgData.oData.oAtlasData[oImageIds.barVert].y,
                    n = this.oUiElementsImgData.oData.oAtlasData[oImageIds.barVert].width,
                    r = this.oUiElementsImgData.oData.oAtlasData[oImageIds.barVert].height;
                ctx.drawImage(this.oUiElementsImgData.img, h, o + Math.min((1 - d) * r, r - .01), n, Math.max(d * r, .01), canvas.width - 87, canvas.height - 316 + (r / 2 - r * d) + 25 + panel.posY, n, Math.max(d * r, .01))
            } else {
                var h = this.oUiElementsImgData.oData.oAtlasData[oImageIds.barBgHoriz].x,
                    o = this.oUiElementsImgData.oData.oAtlasData[oImageIds.barBgHoriz].y,
                    n = this.oUiElementsImgData.oData.oAtlasData[oImageIds.barBgHoriz].width,
                    r = this.oUiElementsImgData.oData.oAtlasData[oImageIds.barBgHoriz].height;
                ctx.drawImage(this.oUiElementsImgData.img, h, o, n, r, canvas.width - 435, canvas.height - 95 + panel.posY, n, r);
                var h = this.oUiElementsImgData.oData.oAtlasData[oImageIds.barHoriz].x,
                    o = this.oUiElementsImgData.oData.oAtlasData[oImageIds.barHoriz].y,
                    n = this.oUiElementsImgData.oData.oAtlasData[oImageIds.barHoriz].width,
                    r = this.oUiElementsImgData.oData.oAtlasData[oImageIds.barHoriz].height;
                ctx.drawImage(this.oUiElementsImgData.img, h, o, Math.max(d * n, .01), r, canvas.width - 298 - n / 2, canvas.height - 85 + panel.posY, Math.max(d * n, .01), r)
            }
            var l = 15,
                u = 1,
                D = -60;
            canvas.width > canvas.height && (D = -35);
            var h = this.oUiElementsImgData.oData.oAtlasData[oImageIds.scoreIcon].x,
                o = this.oUiElementsImgData.oData.oAtlasData[oImageIds.scoreIcon].y,
                n = this.oUiElementsImgData.oData.oAtlasData[oImageIds.scoreIcon].width,
                r = this.oUiElementsImgData.oData.oAtlasData[oImageIds.scoreIcon].height;
            ctx.drawImage(this.oUiElementsImgData.img, h, o, n, r, D + 70 + panel.posY, l - this.scoreJiggle, n, r);
            for (var I = score.toString(); I.length < 5;) I = "0" + I;
            for (var p = 0; p < I.length; p++) {
                var c = parseFloat(I.charAt(p)),
                    m = c * this.oScoreNumbersImgData.oData.spriteWidth % this.oScoreNumbersImgData.img.width,
                    g = Math.floor(c / (this.oScoreNumbersImgData.img.width / this.oScoreNumbersImgData.oData.spriteWidth)) * this.oScoreNumbersImgData.oData.spriteHeight;
                ctx.drawImage(this.oScoreNumbersImgData.img, m, g, this.oScoreNumbersImgData.oData.spriteWidth, this.oScoreNumbersImgData.oData.spriteHeight, D + 112 + p * this.numberSpace * u + panel.posY, l - this.scoreJiggle, this.oScoreNumbersImgData.oData.spriteWidth * u, this.oScoreNumbersImgData.oData.spriteHeight * u)
            }
            var h = this.oUiElementsImgData.oData.oAtlasData[oImageIds.timerIcon].x,
                o = this.oUiElementsImgData.oData.oAtlasData[oImageIds.timerIcon].y,
                n = this.oUiElementsImgData.oData.oAtlasData[oImageIds.timerIcon].width,
                r = this.oUiElementsImgData.oData.oAtlasData[oImageIds.timerIcon].height;
            ctx.drawImage(this.oUiElementsImgData.img, h, o, n, r, D + 280 + panel.posY, l - 3, n, r);
            var v = Math.floor(curTime / 6e3),
                x = (v.toString(), Math.floor((curTime - 6e3 * Math.floor(curTime / 6e3)) / 100)),
                P = x.toString();
            x < 6 && 0 == v && x < this.prevSecs && playSound("beep"), this.prevSecs = x, P.length < 2 && (P = "0" + P);
            var c = v,
                m = c * this.oTimerNumbersImgData.oData.spriteWidth % this.oTimerNumbersImgData.img.width,
                g = Math.floor(c / (this.oTimerNumbersImgData.img.width / this.oTimerNumbersImgData.oData.spriteWidth)) * this.oTimerNumbersImgData.oData.spriteHeight;
            ctx.drawImage(this.oTimerNumbersImgData.img, m, g, this.oTimerNumbersImgData.oData.spriteWidth, this.oTimerNumbersImgData.oData.spriteHeight, D + 321 + panel.posY, l, Math.round(this.oTimerNumbersImgData.oData.spriteWidth * u), Math.round(this.oTimerNumbersImgData.oData.spriteHeight * u));
            var c = 10,
                m = c * this.oTimerNumbersImgData.oData.spriteWidth % this.oTimerNumbersImgData.img.width,
                g = Math.floor(c / (this.oTimerNumbersImgData.img.width / this.oTimerNumbersImgData.oData.spriteWidth)) * this.oTimerNumbersImgData.oData.spriteHeight;
            ctx.drawImage(this.oTimerNumbersImgData.img, m, g, this.oTimerNumbersImgData.oData.spriteWidth, this.oTimerNumbersImgData.oData.spriteHeight, D + 342 + panel.posY, l, Math.round(this.oTimerNumbersImgData.oData.spriteWidth * u), Math.round(this.oTimerNumbersImgData.oData.spriteHeight * u));
            for (var p = 0; p < 2; p++) {
                var c = parseFloat(P.charAt(p)),
                    m = c * this.oTimerNumbersImgData.oData.spriteWidth % this.oTimerNumbersImgData.img.width,
                    g = Math.floor(c / (this.oTimerNumbersImgData.img.width / this.oTimerNumbersImgData.oData.spriteWidth)) * this.oTimerNumbersImgData.oData.spriteHeight;
                ctx.drawImage(this.oTimerNumbersImgData.img, m, g, this.oTimerNumbersImgData.oData.spriteWidth, this.oTimerNumbersImgData.oData.spriteHeight, D + 363 + p * this.numberSpace * u + panel.posY, l, this.oTimerNumbersImgData.oData.spriteWidth * u, this.oTimerNumbersImgData.oData.spriteHeight * u)
            }
        }, t.prototype.renderTut = function() {
            if (this.tutIsOn) {
                ctx.save(), ctx.globalAlpha = this.tutHandAlpha, ctx.translate(this.tutHandX, this.tutHandY);
                var t = this.oUiElementsImgData.oData.oAtlasData[oImageIds.tutHand].x,
                    e = this.oUiElementsImgData.oData.oAtlasData[oImageIds.tutHand].y,
                    a = this.oUiElementsImgData.oData.oAtlasData[oImageIds.tutHand].width,
                    i = this.oUiElementsImgData.oData.oAtlasData[oImageIds.tutHand].height;
                ctx.drawImage(this.oUiElementsImgData.img, t, e, a, i, -a / 2, -i / 2, a, i), ctx.restore()
            }
        }, t.prototype.tutAnimReset = function() {
            this.tutTween && this.tutTween.kill(), this.tutAnimStep = 0
        }, t.prototype.tutAnim = function() {
            var t = this;
            this.tutIsOn = !0;
            var e, a;
            switch (this.tutAnimStep) {
                case 0:
                    this.tutHandAlpha = 0, this.tutTween = TweenLite.to(this, 1.5, {
                        tutHandAlpha: 0,
                        ease: "Quad.easeOut",
                        onComplete: function() {
                            t.tutAnim()
                        }
                    });
                    break;
                case 1:
                    canvas.width > canvas.height ? (e = 0, a = 120) : (e = 60, a = 60), this.tutHandX = hexPieces.aPieceData[0].centrePosX + e, this.tutHandY = hexPieces.aPieceData[0].centrePosY + a, this.tutTween = TweenLite.to(this, .5, {
                        tutHandAlpha: 1,
                        ease: "Quad.easeOut",
                        onComplete: function() {
                            t.tutAnim()
                        }
                    });
                    break;
                case 2:
                    canvas.width > canvas.height ? (e = 30, a = 60) : (e = 30, a = 60), this.tutTween = TweenLite.to(this, .5, {
                        tutHandX: hexTarget.aHex[hexPieces.aPieces[0][0][0]][hexPieces.aPieces[0][0][1]].x + e,
                        tutHandY: hexTarget.aHex[hexPieces.aPieces[0][0][0]][hexPieces.aPieces[0][0][1]].y + a,
                        ease: "Quad.easeIn",
                        onComplete: function() {
                            t.tutAnim()
                        }
                    });
                    break;
                case 3:
                    this.tutTween = TweenLite.to(this, .3, {
                        tutHandAlpha: 0,
                        ease: "Quad.easeOut",
                        onComplete: function() {
                            t.tutAnim()
                        }
                    })
            }++this.tutAnimStep > 3 && (this.tutAnimStep = 0)
        }, t.prototype.cancelTutAnim = function() {
            var t = this;
            this.tutTween && this.tutTween.kill(), this.tutTween = TweenLite.to(this, .1, {
                tutHandAlpha: 0,
                ease: "Quad.easeIn",
                onComplete: function() {
                    t.tutIsOn = !1
                }
            })
        }, t
    }();
    t.Hud = e
}(Elements || (Elements = {}));
var Elements;
! function(t) {
    var e = function() {
        function t(t) {
            this.oGameElementsImgData = assetLib.getData("gameElements"), this.oUiElementsImgData = assetLib.getData("uiElements"), this.scale = hexTarget.scale, this.aHex = hexTarget.aHex, this.delay = 0, this.gridScale = 1.2, TweenLite.to(this, .75, {
                gridScale: 1,
                ease: "Bounce.easeOut"
            }), this.type = t;
            for (var e = 0; e < this.aHex.length; e++)
                for (var a = 0; a < this.aHex[e].length; a++) this.aHex[e][a].vX = 0, this.aHex[e][a].vY = 0, canvas.width > canvas.height ? (this.aHex[e][a].incX = 400 * a + 500 * Math.random() - 250, this.aHex[e][a].incY = 400 * (e - rows / 2) + 500 * Math.random() - 250) : (this.aHex[e][a].incX = 400 * (a - cols / 2) + 500 * Math.random() - 250, this.aHex[e][a].incY = 400 * (e - rows / 2) + 500 * Math.random() - 250)
        }
        return t.prototype.render = function() {
            canvas.width > canvas.height ? (canvas.width / 2 < canvas.height ? this.scale = canvas.width / 2 / canvas.height * 1 : this.scale = 1, this.posX = 50 + cols / 2 * hexWidth * this.scale - panel.posY, this.posY = canvas.height / 2 + 25) : (canvas.height / 2 < canvas.width ? this.scale = canvas.height / 2 / canvas.width * 1 : this.scale = 1, this.posX = canvas.width / 2 - panel.posY, this.posY = 90 + rows / 2 * hexHeight * this.scale), this.delay += delta, this.delay >= 1 && (0 == this.type ? levelStart() : initGameOver());
            var t = 0,
                e = this.oGameElementsImgData.oData.oAtlasData[oImageIds["hex0" + t]].x,
                a = this.oGameElementsImgData.oData.oAtlasData[oImageIds["hex0" + t]].y,
                i = this.oGameElementsImgData.oData.oAtlasData[oImageIds["hex0" + t]].width,
                s = this.oGameElementsImgData.oData.oAtlasData[oImageIds["hex0" + t]].height,
                h = this.oUiElementsImgData.oData.oAtlasData[oImageIds.bgGrid].x,
                o = this.oUiElementsImgData.oData.oAtlasData[oImageIds.bgGrid].y,
                n = this.oUiElementsImgData.oData.oAtlasData[oImageIds.bgGrid].width,
                r = this.oUiElementsImgData.oData.oAtlasData[oImageIds.bgGrid].height;
            ctx.drawImage(this.oUiElementsImgData.img, h, o, n, r, this.posX - (0 + (cols / 2 - 0 - .5) * hexWidth) * this.scale * this.gridScale - i / 2 * this.scale * this.gridScale, this.posY - (0 + (rows / 2 - 0) * hexHeight - 0 - s / 4) * this.scale * this.gridScale - s / 2 * this.scale * this.gridScale, n * this.scale * this.gridScale, r * this.scale * this.gridScale);
            for (var c = 0; c < this.aHex.length; c++)
                for (var m = 0; m < this.aHex[c].length; m++) {
                    0 == this.type ? (t = Math.abs(Math.round((this.aHex[c][m].x + this.aHex[c][m].y) / 50) % 7), e = this.oGameElementsImgData.oData.oAtlasData[oImageIds["hex1" + t]].x, a = this.oGameElementsImgData.oData.oAtlasData[oImageIds["hex1" + t]].y, i = this.oGameElementsImgData.oData.oAtlasData[oImageIds["hex1" + t]].width, s = this.oGameElementsImgData.oData.oAtlasData[oImageIds["hex1" + t]].height) : (e = this.oGameElementsImgData.oData.oAtlasData[oImageIds.hexEmpty].x, a = this.oGameElementsImgData.oData.oAtlasData[oImageIds.hexEmpty].y, i = this.oGameElementsImgData.oData.oAtlasData[oImageIds.hexEmpty].width, s = this.oGameElementsImgData.oData.oAtlasData[oImageIds.hexEmpty].height);
                    var g = 0;
                    m % 2 == 0 && (g = hexHeight / 2), this.aHex[c][m].incY += 2e3 * delta, this.aHex[c][m].vX += this.aHex[c][m].incX * delta, this.aHex[c][m].vY += this.aHex[c][m].incY * delta, this.aHex[c][m].x = this.aHex[c][m].vX + this.posX - (0 + (cols / 2 - m - .5) * hexWidth) * this.scale, this.aHex[c][m].y = this.aHex[c][m].vY + this.posY - (0 + (rows / 2 - c) * hexHeight - g - s / 4) * this.scale, ctx.drawImage(this.oGameElementsImgData.img, e, a, i, s, this.aHex[c][m].x - i / 2 * this.scale, this.aHex[c][m].y - s / 2 * this.scale, i * this.scale, s * this.scale)
                }
        }, t
    }();
    t.Hexplode = e
}(Elements || (Elements = {}));
var __extends = this.__extends || function(t, e) {
        function a() {
            this.constructor = t
        }
        a.prototype = e.prototype, t.prototype = new a
    },
    Elements;
! function(t) {
    var e = function(t) {
        function e(e, a) {
            t.call(this, e, 25, 45, a), this.setAnimType("once", a), this.animEndedFunc = function() {
                this.removeMe = !0
            }
        }
        return __extends(e, t), e.prototype.update = function() {
            t.prototype.updateAnimation.call(this, delta), this.y += 100 * delta
        }, e.prototype.render = function() {
            t.prototype.renderSimple.call(this, ctx)
        }, e
    }(Utils.AnimSprite);
    t.Firework = e
}(Elements || (Elements = {}));
var Elements;
! function(t) {
    var e = function() {
        function t() {
            this.x = 0, this.y = 0, this.scale = 0, this.inc = 0, this.oGameElementsImgData = assetLib.getData("gameElements"), this.reset()
        }
        return t.prototype.reset = function() {
            this.targPieceId = Math.floor(Math.random() * hexPieces.aPieceData.length), this.targetHexId = Math.floor(Math.random() * hexPieces.aPieceData[this.targPieceId].aHexPos.length), this.incRate = 3 * Math.random() + 1
        }, t.prototype.render = function() {
            this.x = hexPieces.aPieceData[this.targPieceId].aHexPos[this.targetHexId].x, this.y = hexPieces.aPieceData[this.targPieceId].aHexPos[this.targetHexId].y, this.inc += this.incRate * delta, this.scale = 2 * Math.sin(this.inc), this.inc > 3.14 && (this.inc = 0, this.reset());
            var t = this.oGameElementsImgData.oData.oAtlasData[oImageIds.glint].x,
                e = this.oGameElementsImgData.oData.oAtlasData[oImageIds.glint].y,
                a = this.oGameElementsImgData.oData.oAtlasData[oImageIds.glint].width,
                i = this.oGameElementsImgData.oData.oAtlasData[oImageIds.glint].height;
            canvas.width > canvas.height ? ctx.drawImage(this.oGameElementsImgData.img, t, e, a, i, this.x - (a / 2 * this.scale + 20) * hexPieces.aPieceData[this.targPieceId].scale + hexPieces.aPieceData[this.targPieceId].tweenPos, this.y - (i / 2 * this.scale + 20) * hexPieces.aPieceData[this.targPieceId].scale, a * this.scale * hexPieces.aPieceData[this.targPieceId].scale, i * this.scale * hexPieces.aPieceData[this.targPieceId].scale) : ctx.drawImage(this.oGameElementsImgData.img, t, e, a, i, this.x - (a / 2 * this.scale + 20) * hexPieces.aPieceData[this.targPieceId].scale, this.y - (i / 2 * this.scale + 20) * hexPieces.aPieceData[this.targPieceId].scale + hexPieces.aPieceData[this.targPieceId].tweenPos, a * this.scale * hexPieces.aPieceData[this.targPieceId].scale, i * this.scale * hexPieces.aPieceData[this.targPieceId].scale)
        }, t
    }();
    t.Glint = e
}(Elements || (Elements = {}));
var Elements;
! function(t) {
    var e = function() {
        function t(t, e, a, i) {
            this.explodeStage = 0, this.incY = 0, this.removeMe = !1, this.oGameElementsImgData = assetLib.getData("gameElements"), this.x = t, this.startY = e, this.id = i, this.score = Math.max(Math.min(100, 10 * a), 20)
        }
        return t.prototype.update = function() {
            var t = this;
            if (0 == this.explodeStage && (this.incY += delta, this.y = this.startY + 8 * Math.sin(6 * this.incY + this.x + this.startY),
                    this.incY > .6 + this.id / 10)) {
                var e = canvas.width / 2 - 250 + 100;
                canvas.width > canvas.height && (e = 100), TweenLite.to(this, .5, {
                    x: e,
                    y: -200,
                    ease: "Back.easeIn",
                    onComplete: function() {
                        t.removeMe = !0
                    }
                }), this.explodeStage = 1
            }
        }, t.prototype.render = function() {
            var t = this.oGameElementsImgData.oData.oAtlasData[oImageIds["score" + this.score]].x,
                e = this.oGameElementsImgData.oData.oAtlasData[oImageIds["score" + this.score]].y,
                a = this.oGameElementsImgData.oData.oAtlasData[oImageIds["score" + this.score]].width,
                i = this.oGameElementsImgData.oData.oAtlasData[oImageIds["score" + this.score]].height;
            ctx.drawImage(this.oGameElementsImgData.img, t, e, a, i, this.x - a / 2, this.y - i / 2, a, i)
        }, t
    }();
    t.FloatScore = e
}(Elements || (Elements = {}));
var Utils;
! function(t) {
    var e = function() {
        function t(t) {
            this.dataGroupNum = 2, this.saveDataId = t, localStorage = (localStorage ? localStorage : window.localStorage), this.clearData(), this.setInitialData()
        }
        return t.prototype.clearData = function() {
            this.aLevelStore = new Array, this.aLevelStore.push(0)
        }, t.prototype.resetData = function() {
            this.aLevelStore = new Array, this.aLevelStore.push(0), this.saveData()
        }, t.prototype.setInitialData = function() {
            if (localStorage) {
                console.log('localStorage available');
                if (null != localStorage.getItem(this.saveDataId) && "" != localStorage.getItem(this.saveDataId)) {
                    this.aLevelStore = localStorage.getItem(this.saveDataId).split(",");
                    for (var t in this.aLevelStore) this.aLevelStore[t] = parseInt(this.aLevelStore[t])
                } else this.saveData()
            } else {
                console.log('localStorage NOT available');
                this.saveData()
            }
        }, t.prototype.setData = function(t) {
            this.aLevelStore[0] = t
        }, t.prototype.getData = function() {
            return this.aLevelStore[0]
        }, t.prototype.saveData = function() {
            for (var t = "", e = 0; e < this.aLevelStore.length; e++) t += this.aLevelStore[e], e < this.aLevelStore.length - 1 && (t += ",");
            if (localStorage) {
                localStorage.setItem(this.saveDataId, t)
            }
        }, t
    }();
    t.SaveDataHandler = e
}(Utils || (Utils = {}));
var requestAnimFrame = function() {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(t) {
            window.setTimeout(t, 1e3 / 60, (new Date).getTime())
        }
    }(),
    previousTime, canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    minSquareSize = 500,
    maxSquareSize = 600,
    canvasX, canvasY, canvasScale, div = document.getElementById("canvas-wrapper"),
    sound, music, audioType = 0,
    muted = !1,
    splashTimer = 0,
    assetLib, preAssetLib, isMobile = !1,
    gameState = "loading",
    aLangs = new Array("EN"),
    curLang = "",
    isBugBrowser = !1,
    isIE10 = !1,
    delta, radian = Math.PI / 180,
    ios9FirstTouch = !1,
    hasFocus = !0;
navigator.userAgent.match(/MSIE\s([\d]+)/) && (isIE10 = !0);
var deviceAgent = navigator.userAgent.toLowerCase();
(deviceAgent.match(/(iphone|ipod|ipad)/) || deviceAgent.match(/(android)/) || deviceAgent.match(/(iemobile)/) || deviceAgent.match(/iphone/i) || deviceAgent.match(/ipad/i) || deviceAgent.match(/ipod/i) || deviceAgent.match(/blackberry/i) || deviceAgent.match(/bada/i)) && (isMobile = !0, deviceAgent.match(/(android)/) && !/Chrome/.test(navigator.userAgent) && (isBugBrowser = !0));
var userInput = new Utils.UserInput(canvas, isBugBrowser);
resizeCanvas(), window.onresize = function() {
    setTimeout(function() {
        resizeCanvas()
    }, 1)
}, window.onpageshow = function() {
    hasFocus || (userInput && userInput.checkKeyFocus(), muted || "pause" == gameState || (Howler.unmute(), music.play())), hasFocus = !0
}, window.onpagehide = function() {
    hasFocus = !1, Howler.mute(), music.pause()
}, window.addEventListener("load", function() {
    setTimeout(function() {
        resizeCanvas()
    }, 0), window.addEventListener("orientationchange", function() {
        setTimeout(function() {
            resizeCanvas()
        }, 500), setTimeout(function() {
            resizeCanvas()
        }, 2e3)
    }, !1)
});
var ua = navigator.userAgent,
    isSharpStock = /SHL24|SH-01F/i.test(ua) && isStock(),
    isXperiaAStock = /SO-04E/i.test(ua) && isStock(),
    isFujitsuStock = /F-01F/i.test(ua) && isStock();
isIE10 || isSharpStock || isXperiaAStock || isFujitsuStock || "undefined" == typeof window.AudioContext && "undefined" == typeof window.webkitAudioContext && navigator.userAgent.indexOf("Android") != -1 ? audioType = 0 : (audioType = 1, sound = new Howl({
    urls: ["audio/sound.ogg", "audio/sound.m4a"],
    sprite: {
        beep: [0, 500],
        levelStart: [1e3, 1500],
        pieceBack: [3e3, 700],
        placePiece0: [4e3, 800],
        placePiece1: [5e3, 800],
        placePiece2: [6e3, 800],
        levelComplete: [7e3, 2200],
        useHint: [9500, 1100],
        openGift: [11e3, 1500],
        newHint: [13e3, 1e3],
        gameEnd: [14500, 2e3],
        holdPiece: [17e3, 500],
        hintFizz: [18e3, 1200],
        click: [2e4, 400]
    }
}), music = new Howl({
    urls: ["audio/music.ogg", "audio/music.m4a"],
    volume: .01,
    loop: !0
}));
var panel, hud, background, score, levelNum = 0,
    musicTween, oImageIds = {},
    hexTarget, hexPieces, hexWidth = 65,
    hexHeight = 75,
    rows = 5,
    cols = 7,
    touchX = 0,
    touchY = 0,
    aFallingGems, curTime, hints, levelState, hexplode, saveDataHandler = new Utils.SaveDataHandler("superhexgems1"),
    highscore, firstRun = !0,
    aFireworks, glint, aFloatScores, giftType, giftNum;



