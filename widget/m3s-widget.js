﻿window.addEventListener('DOMContentLoaded', function () {
  let script = document.getElementById('m3s-wgl-widget');
  var path = script.src.split('?')[0];      // remove any ?query
  var mydir = path.split('/').slice(0, -1).join('/') + '/';

  insertStyle(mydir + "css/wgl-widget.css");
  insertStyle(mydir + "css/modal.css");

  insertHTML();
  insertScript(mydir + "common.js");
  insertScript(mydir + "m3s-babylon.js");

  function run() { doWidgetBabylon(mydir); }

  //loadBabylonPromise()
  //  .then(() => { waitFor(isBabylonLoaded); })
  //  .then(loadExtensions)
  //  .then(run);

  loadBabylon()
    .then(loadExtensions)
    .then(run);

  function isCommonLoaded() { return typeof setRandom !== "undefined"; }
  function isBabylonLoaded() { return typeof BABYLON !== "undefined"; }
  function isLoaderAvailable() { return BABYLON.SceneLoader.IsPluginForExtensionAvailable(".glb"); }

  function loadBabylonPromise() {
    return new Promise((resolve, reject) => {
      insertScript('https://cdn.babylonjs.com/babylon.max.js');
      resolve();
    });
  }

  function loadBabylon() {
    return new Promise((resolve, reject) => {
      insertScript('https://cdn.babylonjs.com/babylon.max.js');
      waitForPromise(resolve, reject, isBabylonLoaded);
    });
  }

  function loadExtensions() {
    insertScript('https://cdn.babylonjs.com/loaders/babylon.glTF2FileLoader.min.js');

    return new Promise((resolve, reject) => {
      insertScript('https://preview.babylonjs.com/serializers/babylonjs.serializers.min.js');
      waitForPromise(resolve, reject, isLoaderAvailable);
    });
  }

  function waitFor(condition) {
    var wait = 0;

    return new Promise((resolve, reject) => {
      (function waitForLocal(condition) {
        wait += 10;
        if (wait > 100000) reject();

        setTimeout(function () {
          if (condition())
            resolve();
          else
            waitForLocal(condition);
        }, 10);
      })(condition);
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

  function insertHTML() {
    var section = document.createElement('div');
    section.setAttribute('id', "m3s-wgl-widget");
    section.innerHTML = `
        <div class="m3s-wgl-ui-panel">
          <div class="m3s-wgl-ui-header">
            <p id="company_name">Myriad 3D Studio</p>
            <p id="gizmo_name">WebGL Widget</p>
          </div>

          <div class="m3s-wgl-ui-mainbody">
            <div class="m3s-wgl-ui-cell"></div>
            <div class="m3s-wgl-ui-cell">
              <label class="m3s-wgl-ui-label" for="radius">Radius</label>
              <button class="m3s-wgl-ui-button" onclick="setRandom(this)">Randomise</button>
              <input type="range" min="-2" max="4" step="0.01" value="0" class="m3s-slider" id="radius">
            </div>
            <div class="m3s-wgl-ui-cell">
              <label class="m3s-wgl-ui-label" for="flip">Flip</label>
              <button class="m3s-wgl-ui-button" onclick="setRandom(this)">Randomise</button>
              <input type="range" min="-3.14159" max="3.14159" step="0.4488" class="m3s-slider" id="flip">
            </div>
            <div class="m3s-wgl-ui-cell">
              <label class="m3s-wgl-ui-label" for="spin">Spin</label>
              <button class="m3s-wgl-ui-button" onclick="setRandom(this)">Randomise</button>
              <input type="range" min="-3.14159" max="3.14159" step="0.0349" value="0" class="m3s-slider" id="spin">
            </div>
            <div class="m3s-wgl-ui-cell"></div>
          </div>

          <div class="m3s-wgl-ui-footer">
            <button class="m3s-wgl-button" onclick="showDownloadDialog()">Download</button>
          </div>
        </div>

        <div id="m3s-wgl-renderOutput">
          <canvas id="m3s-wgl-renderCanvas" touch-action="none"></canvas>
        </div>

  <!-- The Modal -->
  <div id="myModal" class="modal">

    <!-- Modal content -->
    <div class="modal-content">
      <div class="modal-header">
        <span class="close">&times;</span>
        <h2>Download Model</h2>
      </div>
      <div class="modal-body">
        <p>Note: The model will be downloaded as two files: <br />
        <span id="fixed">&emsp;widget.gltf
        <br />
        &emsp;widget.bin</span></p>
        <p>Type the name you'd like for your model below:
        <input type="text" name="fileName" maxlength="512" id="m3s-wgl-filename" placeholder="widget"/></p>
      </div>
      <div class="modal-footer">
        <button class="m3s-wgl-button half-width" onclick="download()">Download</button>
        &emsp;
        <button class="m3s-wgl-button half-width" onclick="closeModal()">Cancel</button>
      </div>
    </div>
  </div>`;

    document.getElementById("LogoGenerator").appendChild(section);
  }

});
