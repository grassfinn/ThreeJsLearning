import * as THREE from 'three';

export class SkyLineSpotLight {
    spotLight;
    helper;

    constructor() {
        this.spotLight = new THREE.DirectionalLight();
        this.spotLight.position.set(10, 20, 50);
        this.spotLight.castShadow = true;
        this.setShadowSize(this.spotLight, 50.0,1024);
        this.helper = new THREE.DirectionalLightHelper(this.spotLight);
    }

    setShadowSize=(light1, sz, mapSz)=>{
        light1.shadow.camera.left = sz;
        light1.shadow.camera.bottom = sz;
        light1.shadow.camera.right = -sz;
        light1.shadow.camera.top = -sz;
        if(mapSz){
            light1.shadow.mapSize.set(mapSz,mapSz)
        }
    }
}

