let scene, camera, renderer, controls, light, mesh, material;

init();
animate();

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 1000);
  camera.position.z = 3;

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('viewer').appendChild(renderer.domElement);

  light = new THREE.PointLight(0xffffff, 1.2);
  light.position.set(1, 1, 2);
  scene.add(light);

  const loader = new THREE.TextureLoader();
  const texture = loader.load('assets/texture.jpg');
  const displacement = loader.load('assets/depth.png');

  const geometry = new THREE.PlaneGeometry(3, 3, 256, 256);
  material = new THREE.MeshStandardMaterial({
    map: texture,
    displacementMap: displacement,
    displacementScale: 0.3,
    roughness: 0.6,
    metalness: 0.1
  });

  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  controls = new THREE.DeviceOrientationControls(camera);

  document.getElementById('displacement').oninput = (e) => {
    material.displacementScale = parseFloat(e.target.value);
  };
  document.getElementById('lightIntensity').oninput = (e) => {
    light.intensity = parseFloat(e.target.value);
  };
  document.getElementById('lightX').oninput = (e) => {
    light.position.x = parseFloat(e.target.value);
  };
  document.getElementById('lightY').oninput = (e) => {
    light.position.y = parseFloat(e.target.value);
  };
  document.getElementById('lightZ').oninput = (e) => {
    light.position.z = parseFloat(e.target.value);
  };

  document.getElementById('textureUpload').addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      loader.load(url, (tex) => {
        material.map = tex;
        material.needsUpdate = true;
      });
    }
  });

  document.getElementById('depthUpload').addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      loader.load(url, (tex) => {
        material.displacementMap = tex;
        material.needsUpdate = true;
      });
    }
  });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
