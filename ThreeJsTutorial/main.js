import * as three from 'three';
import * as dat from 'dat.gui';
import { MeshBasicMaterial } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
const renderer = new three.WebGLRenderer();

// set size of canvas
renderer.setSize(window.innerWidth, window.innerHeight);

// inject space into the dom
document.body.appendChild(renderer.domElement);

const scene = new three.Scene();

const aspectRatio = window.innerWidth / window.innerHeight;

// cameras
// perspective camera(fov, aspectRatio,near,far) most FoV is between 40-80
const camera = new three.PerspectiveCamera(75, aspectRatio, 0.1, 1000);

// !orbitControls
// control with mouse
const orbitControls = new OrbitControls(camera, renderer.domElement);
// must update every time we change the camera position
orbitControls.update();

const axesHelper = new three.AxesHelper();
scene.add(axesHelper);

// camera position default is 0,0,0
camera.position.set(0, 2, 5);
// camera.position.x
// camera.position.y

// !CREATION OF SHAPES
// geo-skeleton/shape
const boxGeo = new three.BoxGeometry();
// skin-material/skin
const boxMaterial = new three.MeshBasicMaterial({ color: 0x00ff00 });
// cover shape with material
const box = new three.Mesh(boxGeo, boxMaterial);
scene.add(box);

const plainGeo = new three.PlaneGeometry(30, 30);
// check for other material properties
const plainMaterial = new three.MeshBasicMaterial({
  color: 0xffffff,
  side: three.DoubleSide,
});
const plain = new three.Mesh(plainGeo, plainMaterial);
scene.add(plain);

// ? find eqution or why the numbers add this way?
plain.rotation.x = -0.5 * Math.PI;

const sphereGeo = new three.SphereGeometry(2, 5, 5);
// standard mesh needs a light source, if its black it need light
const sphereMaterial = new MeshBasicMaterial({
  color: 0x0000ff,
  wireframe: false,
});
const sphere = new three.Mesh(sphereGeo, sphereMaterial);
scene.add(sphere);
sphere.position.set(2, 2);
// !Grid Helper
const gridHelper = new three.GridHelper(30);
scene.add(gridHelper);

// ! Dat.gui
const gui = new dat.GUI();

const options = {
  sphereColor: '#ffea00',
  wireframe: false,
  speed: 0.01
};

gui.addColor(options, 'sphereColor').onChange((e) => {
  sphere.material.color.set(e);
});

gui.add(options, 'wireframe').onChange((e) => {
  sphere.material.wireframe = e;
});

gui.add(options, 'speed',0.01,0.05).onChange((e) => {
  sphere.material.wireframe = e;
});
// ! bounce
let step = 0;

// ?need a function that will tell the box to rotate
function animate(x, y) {
  box.rotation.x += x;
  box.rotation.y += y;

  step += options.speed;
  // look out how this formula works
  sphere.position.y = 10 * Math.abs(Math.sin(step))

  renderer.render(scene, camera);
}

// !setAnimatinoLoop loops the function that is envokes
// if you want to use params you must make it an Anonymous function so that it is calling the function rather than running it
// ?render the scene and camera
renderer.setAnimationLoop(() => animate(0.01, 0.01));

// orthographic camera(left,right,up,down,near,far) 2dscenes
// most apsect ratio is cavasWidth/canvasHeight1
