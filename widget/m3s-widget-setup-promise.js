﻿window.addEventListener('DOMContentLoaded', function () {
  let script = document.getElementById('m3s-wgl-widget');
  var path = script.src.split('?')[0];
  var mydir = path.split('/').slice(0, -1).join('/') + '/';

  insertStyle(mydir + "css/wgl-widget.css");
  insertStyle(mydir + "css/modal.css");

  loadCommon()
    .then(() => { insertHTML(); })
    .then(() => { insertScript(mydir + "m3s-widget-babylon.js"); })
    .then(loadBabylon)
    .then(loadExtensions)
    .then(() => { doWidgetBabylon(mydir); });


  function loadCommon() {
    function isCommonLoaded() { return typeof setRandom !== "undefined"; }

    return new Promise((resolve, reject) => {
      insertScript(mydir + "m3s-common.js");
      waitForPromise(resolve, reject, isCommonLoaded);
    });
  }

  function loadBabylon() {
    function isBabylonLoaded() { return typeof BABYLON !== "undefined"; }

    return new Promise((resolve, reject) => {
      insertScript('https://cdn.babylonjs.com/babylon.max.js');
      waitForPromise(resolve, reject, isBabylonLoaded);
    });
  }

  function loadExtensions() {
    insertScript('https://cdn.babylonjs.com/loaders/babylon.glTF2FileLoader.min.js');

    function isLoaderAvailable() { return BABYLON.SceneLoader.IsPluginForExtensionAvailable(".glb"); }

    return new Promise((resolve, reject) => {
      insertScript('https://preview.babylonjs.com/serializers/babylonjs.serializers.min.js');
      waitForPromise(resolve, reject, isLoaderAvailable);
    });
  }

  function insertScript(script) {
    var s = document.createElement('script');
    s.setAttribute('src', script);
    document.head.appendChild(s);
  }

  function waitForPromise(resolve, reject, condition) {
    var wait = 0;

    (function waitFor(condition) {
      wait += 10;
      if (wait > 100000) reject();

      setTimeout(function () {
        if (condition())
          resolve();
        else
          waitFor(condition);
      }, 10);
    })(condition);
  }

  function insertStyle(style) {
    var s = document.createElement('link');
    s.setAttribute('href', style);
    s.setAttribute('rel', "stylesheet");
    document.head.appendChild(s);
  }
});
