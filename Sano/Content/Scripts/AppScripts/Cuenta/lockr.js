﻿!function (root, factory) { "undefined" != typeof exports ? "undefined" != typeof module && module.exports && (exports = module.exports = factory(root, exports)) : "function" == typeof define && define.amd ? define(["exports"], function (exports) { root.Lockr = factory(root, exports) }) : root.Lockr = factory(root, {}) }(this, function (root, Lockr) { "use strict"; return Array.prototype.indexOf || (Array.prototype.indexOf = function (elt) { var len = this.length >>> 0, from = Number(arguments[1]) || 0; for (from = 0 > from ? Math.ceil(from) : Math.floor(from), 0 > from && (from += len) ; len > from; from++) if (from in this && this[from] === elt) return from; return -1 }), Lockr.prefix = "", Lockr._getPrefixedKey = function (key, options) { return options = options || {}, options.noPrefix ? key : this.prefix + key }, Lockr.set = function (key, value, options) { var query_key = this._getPrefixedKey(key, options); try { localStorage.setItem(query_key, JSON.stringify({ data: value })) } catch (e) { console && console.warn("Lockr didn't successfully save the '{" + key + ": " + value + "}' pair, because the localStorage is full.") } }, Lockr.get = function (key, missing, options) { var value, query_key = this._getPrefixedKey(key, options); try { value = JSON.parse(localStorage.getItem(query_key)) } catch (e) { value = localStorage[query_key] ? { data: localStorage.getItem(query_key) } : null } return null === value ? missing : "object" == typeof value && "undefined" != typeof value.data ? value.data : missing }, Lockr.sadd = function (key, value, options) { var json, query_key = this._getPrefixedKey(key, options), values = Lockr.smembers(key); if (values.indexOf(value) > -1) return null; try { values.push(value), json = JSON.stringify({ data: values }), localStorage.setItem(query_key, json) } catch (e) { console.log(e), console && console.warn("Lockr didn't successfully add the " + value + " to " + key + " set, because the localStorage is full.") } }, Lockr.smembers = function (key, options) { var value, query_key = this._getPrefixedKey(key, options); try { value = JSON.parse(localStorage.getItem(query_key)) } catch (e) { value = null } return null === value ? [] : value.data || [] }, Lockr.sismember = function (key, value, options) { this._getPrefixedKey(key, options); return Lockr.smembers(key).indexOf(value) > -1 }, Lockr.keys = function () { var keys = [], allKeys = Object.keys(localStorage); return 0 === Lockr.prefix.length ? allKeys : (allKeys.forEach(function (key) { -1 !== key.indexOf(Lockr.prefix) && keys.push(key.replace(Lockr.prefix, "")) }), keys) }, Lockr.getAll = function () { var keys = Lockr.keys(); return keys.map(function (key) { return Lockr.get(key) }) }, Lockr.srem = function (key, value, options) { var json, index, query_key = this._getPrefixedKey(key, options), values = Lockr.smembers(key, value); index = values.indexOf(value), index > -1 && values.splice(index, 1), json = JSON.stringify({ data: values }); try { localStorage.setItem(query_key, json) } catch (e) { console && console.warn("Lockr couldn't remove the " + value + " from the set " + key) } }, Lockr.rm = function (key) { localStorage.removeItem(key) }, Lockr.flush = function () { Lockr.prefix.length ? Lockr.keys().forEach(function (key) { localStorage.removeItem(Lockr._getPrefixedKey(key)) }) : localStorage.clear() }, Lockr });