import {
    WebGL1Renderer,
    AmbientLight,
    Scene,
    PerspectiveCamera,
    AxesHelper,
    GridHelper,
} from 'three';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui';
import { SkyLineSpotLight } from './components/SkyLineSpotLight';
import { Plane } from './components/Plane';
import {RandomBuiding} from './components/RandomBuilding';
import fuji from './pictures/fuji1.jpg';

const renderer = new WebGL1Renderer();
renderer.shadowMap.enabled = true;

document.body.appendChild(renderer.domElement);
const SCENE_SIZE=35;
const BUILDING_MAX_WIDTH = 2;
const BUILDING_MAX_DEPTH = 2;

const scene = new Scene();

const camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(40, 5, 5);

const orbit = new OrbitControls(camera, renderer.domElement);
orbit.update();

const axesHelper = new AxesHelper(5);
const gridHelper = new GridHelper(SCENE_SIZE);

// MAKE THE COLOR SETABLE FROM THE BROWSER FOR DEBUG
const gui = new dat.GUI();
const options = {
    wireframe: true,
    angle: 0.1,
    penumbra: 0,
    intensity: 1,
};
const ambientLight = new AmbientLight(0xFFFFf0);
ambientLight.intensity = 0.2;

const skyLineSpotLight = new SkyLineSpotLight();
gui.add(options, 'angle', 0, 0.1);
gui.add(options, 'penumbra', 0, 1);

const plane = new Plane({receiveShadow: true});
const background = new Plane({width: SCENE_SIZE, height: 13, orientation: 'vertical', image: fuji});
background.translateZ(17.5);
background.translateY(6.5);

// You can add object to the scene, by default they are added in the center
scene.add(
    axesHelper,
    gridHelper,
    background,
    skyLineSpotLight.spotLight,
    skyLineSpotLight.helper,
    ambientLight,
    plane
);
gui.add(options, 'intensity', 0, 1);

//! randomly create skyscrapers
const buildingArr = [];
function createSkyScrapers(amount = 50) {
    console.log(typeof amount);
    if (typeof amount !== 'number') {
        alert('Something went wrong, amount is supposed to be a number');
        return 1;
    }
    for (let i = 0; i < amount; i++) {
        // Creating random numbers for the x,y,z
        let x = THREE.MathUtils.randFloat(-((SCENE_SIZE / 2) - BUILDING_MAX_DEPTH), (SCENE_SIZE / 2) - BUILDING_MAX_DEPTH);
        let y = THREE.MathUtils.randFloat(-((SCENE_SIZE / 2) - BUILDING_MAX_WIDTH), (SCENE_SIZE / 2) - BUILDING_MAX_WIDTH);
        let z = 0;

        let width = Math.abs(THREE.MathUtils.randFloat(1, BUILDING_MAX_WIDTH));
        let height = Math.abs(THREE.MathUtils.randFloat(3, 8));
        let depth = Math.abs(THREE.MathUtils.randFloat(1, BUILDING_MAX_DEPTH));

        const building = new RandomBuiding({width, height, depth, x, y, z});
        scene.add(building);
        buildingArr.push(building);
        // need to be able to figure out the x and y position of the plane so we can place the building randomly on the plane
    }
    // ? I returned the building array in case we can do something with that data
    return buildingArr;
}

createSkyScrapers(50);

function animate() {
    skyLineSpotLight.spotLight.position.y = 30 * Math.sin(Date.now() / 10000);
    skyLineSpotLight.spotLight.position.z = 30 * Math.cos(Date.now() / 10000);

    skyLineSpotLight.helper.update();

    renderer.render(scene, camera);
}

renderer.setSize(window.innerWidth, window.innerHeight);
window.addEventListener('resize', (e) => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
renderer.setAnimationLoop(animate);
renderer.setClearColor(0x6fb5f7);
