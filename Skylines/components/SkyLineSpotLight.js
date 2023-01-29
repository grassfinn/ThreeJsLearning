import * as THREE from 'three';

export class SkyLineSpotLight {
    spotLight;
    helper;

    constructor() {
        this.spotLight = new THREE.SpotLight();
        this.spotLight.position.set(100, 100, 0);
        this.spotLight.castShadow = true;
        this.helper = new THREE.SpotLightHelper(this.spotLight);
    }
}
