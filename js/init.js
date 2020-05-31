let scene, camera, renderer;
let control, clock;
let geometry, material;

let ambientLight, directionalLight;
let cube, plane, sphere;

let joystick;
let physicsWorld;

const ASPECT_RATIO = window.innerWidth/ window.innerHeight;
const FOV = 45;
const NP = 0.1, FP = 1000;


function init(){
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(FOV, ASPECT_RATIO, NP, FP);
  renderer = new THREE.WebGLRenderer({ antialias : true});
  //control = new THREE.OrbitControls(camera, renderer.domElement);
  clock = new THREE.Clock();


  camera.position.set(0, 1, 5)
  // camera.rotation.set(0, 0.4 ,0);
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  renderer.setSize( window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
  document.body.appendChild( renderer.domElement );

  addLights();
  addObjects();

  document.addEventListener('keydown', keydownHandler);
  document.addEventListener('keyup', keyupHandler);
  document.addEventListener('touchstart', touchdownHandler);
  joystick = new VirtualJoystick();
  window.addEventListener('resize', function(){
    let width  = window.innerWidth;
    let height = window.innerHeight;
    renderer.setSize( width, height );
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  });
}

function addLights(){
  ambientLight = new THREE.AmbientLight( 0xffffff, 0.3 );
  scene.add( ambientLight );

  directionalLight = new THREE.SpotLight( 0xffffff, 1 );
  directionalLight.position.set(0, 4, 0);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 512;
  directionalLight.shadow.mapSize.height = 512;
  scene.add( directionalLight );
}
function addObjects(){
  geometry = new THREE.BoxGeometry(1, 1, 1);
  material = new THREE.MeshLambertMaterial(
    {
      color : 0xffffff
    }
  );
  cube = new THREE.Mesh( geometry, material );
  cube.position.set(3, 0.0, 0);
  cube.castShadow = true;
  cube.recieveShadow = true;
  scene.add( cube );

  geometry = new THREE.PlaneGeometry( 300, 300, 3 );
  material = new THREE.MeshPhongMaterial( {color: 0x00ffff, side: THREE.DoubleSide} );
  plane = new THREE.Mesh( geometry, material );
  plane.rotation.x = Math.PI / 2;
  plane.position.y = -0.501;
  plane.receiveShadow = true;
  scene.add( plane );

  geometry = new THREE.SphereGeometry( 0.5, 50, 50 );
  material = new THREE.MeshPhongMaterial( {color: 0xffffff, side: THREE.DoubleSide} );
  sphere = new THREE.Mesh( geometry, material );
  sphere.position.set(0, 0, 0);
  sphere.castShadow = true;
  scene.add( sphere );
}
