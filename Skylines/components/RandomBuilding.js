import * as THREE from 'three';
import { TextureLoader } from 'three';
import { randFloat } from 'three/src/math/mathutils';
import one from '../pictures/buildingSkins/1.jpg';
import two from '../pictures/buildingSkins/2.jpg';
import three from '../pictures/buildingSkins/3.jpg';
import four from '../pictures/buildingSkins/4.jpg';
import five from '../pictures/buildingSkins/5.jpg';


const skins = [one, two, four];
export class RandomBuilding {
    mesh;
    geometry;
    
    constructor(options) {
        const randomSkin = THREE.MathUtils.randInt(0, skins.length - 1)
        this.geometry = new THREE.BoxGeometry(
            options.width,
            options.height,
            options.depth
        );
        const material = new THREE.MeshStandardMaterial({
            wireframe: false,
            map: new TextureLoader().load(skins[randomSkin]),
        });
        this.mesh = new THREE.Mesh(this.geometry, material);
        const baseHeight = this.geometry.parameters.height / 2;
        this.mesh.position.set(options.x, baseHeight, options.y);
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;
        return this.mesh;
    }
}
