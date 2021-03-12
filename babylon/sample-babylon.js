window.addEventListener('load', init, false)

function init() {
    // Initialize Engine with canvas element
    const canvas = document.getElementById('renderCanvas');
    const engine = new BABYLON.Engine(canvas, true);

    let box;

    const createScene = () => {
        const scene = new BABYLON.Scene(engine);
        scene.clearColor = new BABYLON.Color3(1.0, 1.0, 1.0); // background color

        // Create camera with the name 'sceneCamera'
        const camera = new BABYLON.FreeCamera('sceneCamera', new BABYLON.Vector3(0, 0, -10), scene);
        camera.setTarget(BABYLON.Vector3.Zero());
        camera.attachControl(canvas, true); // Attach camera to canvas

        // Hemispheric light is an easy way to simulate an ambient environment light.
        // This is defined by a direction, usually 'up' towards the sky.
        const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0));

        // Add box to scene
        box = BABYLON.MeshBuilder.CreateBox("box", {height: 2, width: 2, depth: 2}, scene);
        box.position = new BABYLON.Vector3(2, 2, 0);
        // box.position = BABYLON.Vector3.Zero();

        // Set material to box
        let material = new BABYLON.StandardMaterial("mat", scene);
        material.diffuseColor = new BABYLON.Color3(0, 0, 1);
        // material.specularColor = new BABYLON.Color3(0.5, 0.6, 0.87);
        // material.emissiveColor = new BABYLON.Color3(1, 1, 1);
        // material.ambientColor = new BABYLON.Color3(0.23, 0.98, 0.53);
        box.material = material;

        return scene;
    }

    // Create scene
    const scene = createScene();

    // Enable WebVR interaction
    const vrHelper = scene.createDefaultVRExperience();
    vrHelper.enableInteractions();

    // Render scene
    engine.runRenderLoop(() => {
        box.rotation.x  +=  0.02;
        box.rotation.y  +=  0.02;

        scene.render();
    });

    // Resize func
    window.addEventListener('resize', function () {
        engine.resize();
    });
}

