var JsScriptChecker = (function (exports) {
  'use strict';

  

  var ScriptDefinitionRegistry = /** @class */ (function () {
      function ScriptDefinitionRegistry() {
      }
      ScriptDefinitionRegistry.register = function (name, definition) {
          this.registry[name] = definition;
      };
      ScriptDefinitionRegistry.get = function (name) {
          return this.registry[name];
      };
      ScriptDefinitionRegistry.getAll = function () {
          return this.registry;
      };
      ScriptDefinitionRegistry.registry = {};
      return ScriptDefinitionRegistry;
  }());

  var TrackingPixel = /** @class */ (function () {
      function TrackingPixel() {
      }
      TrackingPixel.setBaseUrl = function (url) {
          this.baseUrl = url;
      };
      TrackingPixel.create = function (name) {
          var baseUrl = this.baseUrl[-1] === "/" ? this.baseUrl : this.baseUrl + "/";
          var imgEl = document.createElement("img");
          imgEl.src = baseUrl + name;
      };
      TrackingPixel.baseUrl = "";
      return TrackingPixel;
  }());

  function getPresences(names) {
      var _a;
      if (names === void 0) { names = []; }
      if (typeof names === "string") {
          var scriptDefinition = ScriptDefinitionRegistry.get(names);
          return _a = {}, _a[names] = getPresenceNumber(scriptDefinition), _a;
      }
      if (names instanceof Array) {
          var presences = {};
          var nameArray = names.length > 0 ? names : Object.keys(ScriptDefinitionRegistry.getAll());
          for (var _i = 0, nameArray_1 = nameArray; _i < nameArray_1.length; _i++) {
              var name_1 = nameArray_1[_i];
              if (typeof name_1 !== "string") {
                  return;
              }
              var scriptDefinition = ScriptDefinitionRegistry.get(name_1);
              presences[name_1] = getPresenceNumber(scriptDefinition);
          }
          return presences;
      }
  }
  function reportPresences(presences) {
      for (var presenceName in presences) {
          if (presences.hasOwnProperty(presenceName)) {
              var presenceValue = presences[presenceName];
              var reversedName = presenceName
                  .split("")
                  .reverse()
                  .join("");
              var pixelName = reversedName + ".gif?r=" + presenceValue;
              TrackingPixel.create(pixelName);
          }
      }
  }
  function getPresencesAndReport(names) {
      if (names === void 0) { names = []; }
      var presences = getPresences();
      reportPresences(presences);
  }
  var doAutoReport = true;
  function getPresenceNumber(scriptDefinition) {
      if (scriptDefinition) {
          return Number(scriptDefinition.isPresent());
      }
      return -1;
  }
  TrackingPixel.setBaseUrl("https://example.com");
  window.addEventListener("load", function () {
      setTimeout(function () {
          getPresencesAndReport();
      }, 3000);
  });

  var AdRoll = /** @class */ (function () {
      function AdRoll() {
      }
      AdRoll.prototype.isPresent = function () {
          var wnd = window;
          return Boolean(wnd.__adroll && wnd.__adroll._loaded && wnd.__adroll.track);
      };
      return AdRoll;
  }());
  ScriptDefinitionRegistry.register("adroll", new AdRoll());

  var GoogleAnalytics = /** @class */ (function () {
      function GoogleAnalytics() {
      }
      GoogleAnalytics.prototype.isPresent = function () {
          var wnd = window;
          var ga = wnd[wnd.GoogleAnalyticsObject || "ga"];
          return Boolean(ga && ga.loaded && ga.answer === 42 && ga.getAll && ga.getAll().length > 0);
      };
      return GoogleAnalytics;
  }());
  ScriptDefinitionRegistry.register("ga", new GoogleAnalytics());

  var GoogleTagManager = /** @class */ (function () {
      function GoogleTagManager() {
      }
      GoogleTagManager.prototype.isPresent = function () {
          var wnd = window;
          return Boolean(wnd.google_tag_manager && wnd.google_tag_data);
      };
      return GoogleTagManager;
  }());
  ScriptDefinitionRegistry.register("gtm", new GoogleTagManager());

  var Marketo = /** @class */ (function () {
      function Marketo() {
      }
      Marketo.prototype.isPresent = function () {
          var wnd = window;
          return Boolean(wnd.Munchkin && wnd.MunchkinTracker);
      };
      return Marketo;
  }());
  ScriptDefinitionRegistry.register("marketo", new Marketo());

  var Pardot = /** @class */ (function () {
      function Pardot() {
      }
      Pardot.prototype.isPresent = function () {
          var wnd = window;
          return Boolean(wnd.getPardotUrl && wnd.pi && wnd.piTracker);
      };
      return Pardot;
  }());
  ScriptDefinitionRegistry.register("pardot", new Pardot());

  

  exports.doAutoReport = doAutoReport;
  exports.getPresences = getPresences;
  exports.getPresencesAndReport = getPresencesAndReport;
  exports.reportPresences = reportPresences;

  return exports;

}({}));
