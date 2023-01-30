import {
    WebGL1Renderer,
    AmbientLight,
    Scene,
    PerspectiveCamera,
    AxesHelper,
    GridHelper,
    CubeTextureLoader,
    sRGBEncoding,
} from 'three';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui';
import { SkyLineSpotLight } from './components/SkyLineSpotLight';
import { Plane } from './components/Plane';
import fuji from './pictures/fuji1.jpg';

const renderer = new WebGL1Renderer();
renderer.shadowMap.enabled = true;

document.body.appendChild(renderer.domElement);

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
const gridHelper = new GridHelper(35);

// MAKE THE COLOR SETABLE FROM THE BROWSER FOR DEBUG
const gui = new dat.GUI();
const options = {
    wireframe: true,
    angle: 0.1,
    penumbra: 0,
    intensity: 1,
};
const ambientLight = new AmbientLight(0x333333);

const skyLineSpotLight = new SkyLineSpotLight();
gui.add(options, 'angle', 0, 0.1);
gui.add(options, 'penumbra', 0, 1);

const plane = new Plane();
const background = new Plane(35, 13, 'vertical', fuji);
background.translateZ(17.5);
background.translateY(6.5);

// You can add object to the scene, by default they are added in the center
scene.add(
    axesHelper,
    gridHelper,
    plane,
    background,
    ambientLight,
    skyLineSpotLight.spotLight,
    skyLineSpotLight.helper
);
gui.add(options, 'intensity', 0, 1);

//! randomly create skyscrapers
const buildingArr = [];
function createSkyScrapers(amount = 5) {
    console.log(typeof amount);
    if (typeof amount !== 'number') {
        alert('Something went wrong, amount is supposed to be a number');
        return 1;
    }
    for (let i = 0; i < amount; i++) {
        // Creating random numbers for the x,y,z
        let x = 1;
        let y = 10;
        let z = 10;

        let width = Math.abs(THREE.MathUtils.randFloatSpread(3));
        let height = Math.abs(THREE.MathUtils.randFloatSpread(8));
        let depth = Math.abs(THREE.MathUtils.randFloatSpread(5));

        if (buildingArr.length !== 0) {
            x = THREE.MathUtils.randFloatSpread(
                plane.geometry.parameters.width / 2
            );
            y = Math.abs(THREE.MathUtils.randFloatSpread(35));
            z = THREE.MathUtils.randFloatSpread(35);

            const lastBuilding = buildingArr[buildingArr.length - 1];
            const lastBuildingX = lastBuilding.geometry.parameters.width;
            const lastBuildingZ = lastBuilding.geometry.parameters.depth;
            console.log('X', lastBuildingX, 'Z', lastBuildingZ);

            x += lastBuildingX + lastBuilding.geometry.parameters.width;
            z += lastBuildingZ + lastBuilding.geometry.parameters.depth;
        }

        const buildingGeo = new THREE.BoxGeometry(width, height, depth);
        console.log({ buildingGeo });
        const buildingMesh = new THREE.MeshBasicMaterial({
            color: 0x0000ff,
            wireframe: false,
        });
        const building = new THREE.Mesh(buildingGeo, buildingMesh);
        // !find out how to set the position on the base of the plane
        const baseHeight = buildingGeo.parameters.height / 2;

        building.position.set(x, baseHeight, z);
        scene.add(building);
        buildingArr.push(building);
        // console.log(building.position.x);
        // need to be able to figure out the x and y position of the plane so we can place the building randomly on the plane
    }
    // ? I returned the building array in case we can do something with that data
    return buildingArr;
}

createSkyScrapers(50);
console.log(buildingArr);

function animate() {
    skyLineSpotLight.angle = options.angle;
    skyLineSpotLight.penumbra = options.penumbra;
    skyLineSpotLight.intensity = options.intensity;
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
