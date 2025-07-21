let scene, camera, renderer, controls;

init();
animate();

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 1000);
  camera.position.z = 3;

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('viewer').appendChild(renderer.domElement);

  const light = new THREE.PointLight(0xffffff, 1.2);
  light.position.set(1, 1, 2);
  scene.add(light);

  const loader = new THREE.TextureLoader();
  const texture = loader.load('assets/texture.png');
  const displacement = loader.load('assets/depth.png');

  const geometry = new THREE.PlaneGeometry(3, 3, 256, 256);
  const material = new THREE.MeshStandardMaterial({
    map: texture,
    displacementMap: displacement,
    displacementScale: 0.3,
    roughness: 0.6,
    metalness: 0.1
  });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  controls = new THREE.DeviceOrientationControls(camera);

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
