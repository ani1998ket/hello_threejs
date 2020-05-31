let velocity = new THREE.Vector3(0, 0, 0);
let gravity = new THREE.Vector3(0, -0.007, 0);
let friction = 0.99;
let BALL_SPEED = 0.05;

let jump_pressed = false;
function keydownHandler(e){
  let code = e.key;
  switch( code ){
    case 'w':
      velocity.z = -BALL_SPEED;
    break;
    case 's':
      velocity.z = BALL_SPEED;
    break;
    case 'a':
      velocity.x = -BALL_SPEED;
    break;
    case 'd':
      velocity.x = BALL_SPEED;
    break;
    case ' ':
      jump_pressed = true;
    break;
    default:
    break;
  }
}
function keyupHandler(e){
  let code = e.key;
  switch( code ){
    case 'w':
      velocity.z = 0.0;
    break;
    case 's':
      velocity.z = 0.0;
    break;
    case 'a':
      velocity.x = 0.0;
    break;
    case 'd':
      velocity.x = 0.0;
    break;
    case ' ':
      jump_pressed = false;
    break;
    default:
    break;
  }
}
function touchdownHandler(e){
  e.preventDefault();
  for( i in e.targetTouches ){
    let touch = e.targetTouches[i];
    if( touch.clientX > window.innerWidth / 2){
      jump_pressed = true;
    }
  }

}
function update(){
  if( jump_pressed && velocity.y == 0){
    velocity.y = 3.4 * BALL_SPEED;
    jump_pressed = false;
  }
  if( joystick.up() ){
    velocity.z = -BALL_SPEED;
  }else if( joystick.down() ){
    velocity.z = BALL_SPEED;
  }else{
    velocity.z = 0;
  }
  if( joystick.left() ){
    velocity.x = -BALL_SPEED;
  }else if( joystick.right() ){
    velocity.x = BALL_SPEED;
  }else{
    velocity.x = 0;
  }
  sphere.position.add(velocity);
  if( sphere.position.y > 0)
    velocity.add( gravity );
  else {
    sphere.position.y = 0;
    velocity.y = 0;
  }
  camera.position.z = sphere.position.z + 4;
  camera.position.x = sphere.position.x + 1;
  //camera.lookAt( sphere.position );

  cube.rotation.y = 4 *  3.14 * Math.sin( clock.getElapsedTime()  );
}
function render(){
  renderer.render( scene, camera );
}
function loop(){
  requestAnimationFrame( loop );
  update();
  render();
}
function start(){
    init();
    loop();
}
start();
