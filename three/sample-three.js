import { VRButton } from './VRButton.js';

window.addEventListener('load', init, false);

let scene, camera, renderer;
let geometry, material, mesh;

function init() {
    createScene();
    createCamera();
    createLight();
    createObject();
    createRenderer();

    render();
}

function createScene() {
    scene = new THREE.Scene();
}

function createCamera() {
    // PerspectiveCamera(fieldOfView, aspectRatio, near, far)
    camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 5;
}

function createLight() {
    const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.5);
    directionalLight.position.set(1, 10, 10);

    const ambientLight = new THREE.AmbientLight(0x4CC3D9);

    scene.add(directionalLight, ambientLight);
}

function createObject() {
    geometry = new THREE.BoxGeometry();
    material = new THREE.MeshLambertMaterial({color: "rgb(255, 0, 0)"});
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
}

function createRenderer() {
    renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('renderCanvas').appendChild(renderer.domElement);

    // VRButton.createButton() does two important things:
    // -> It creates a button which indicates VR compatibility. 
    // -> Besides, it initiates a VR session if the user activates the button.
    document.body.appendChild( VRButton.createButton(renderer) );

    // Tell your instance of WebGLRenderer to enable XR rendering
    renderer.xr.enabled = true;
}

function render() {
    renderer.render(scene, camera);
    mesh.rotation.x += 0.02;
    mesh.rotation.y += 0.02;

    // Use setAnimationLoop for VR projects
    renderer.setAnimationLoop(render);
}