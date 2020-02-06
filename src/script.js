let myModel;
function preload() {
  myFont = loadFont("fonts/Roboto/Roboto-Medium.ttf")
  myModel = loadModel('obj/fish.obj', true);
}

function setup() {
  createCanvas(600, 600, WEBGL);
  textFont(myFont)
  textSize(12)
}

function draw() {
  background(20);
  // camera
  // settingMouseCamera(400);
  settingRotationCamera(400);
  // rotateZ(radians(rotationZ));
  // rotateX(radians(rotationX));
  // rotateY(radians(rotationY));
  // axes
  showAxes()

  // stage
  showStage()
}

function giroscope(){

}

function settingMouseCamera(proximity) {
  let nMouse = getNormalizedMouse();
  let nVect = get3DVector(nMouse.x, nMouse.y)
  nVect.mult(proximity)
  camera(nVect.x, nVect.y, nVect.z, 0, 0, 0, 0, 1, 0);
}

function settingRotationCamera(proximity) {
  let xRotNorm = map(rotationX, -180, 180, -1, 1)
  let yRotNorm = map(rotationY, -180, 180, -1, 1)
  let nVect = get3DVector(xRotNorm, yRotNorm)
  nVect.mult(proximity)
  camera(nVect.x, nVect.y, nVect.z, 0, 0, 0, 0, 1, 0);
}

function getNormalizedMouse() {
  let mVector = createVector(map(mouseX, 0, width, -1, 1), map(mouseY, 0, height, -1, 1))
  return mVector;
}

/** This method reduces the scale of the object if the xy coordinate proyection on the sphere falls infinite*/
function get3DVector(x, y) {
  let xComp = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
  let azimuth = Math.acos(xComp);
  let z = Math.sin(azimuth);
  return createVector(x, y, z)
}

/** This method returns infinite if the xy coordinate proyection on the sphere falls infinite*/
function get3DVectorAngles(x, y) {
  // polar coord
  let polar = atan2(y, x);
  // azimuth
  let xComp = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
  let azimuth = Math.acos(xComp);
  return p5.Vector.fromAngles(polar, azimuth)
}

function showStage() {
  stroke(255);
  fill(255, 102, 94, 20);
  //box(90);
  normalMaterial();
  rotateZ(PI/2)
  model(myModel);
  translate(0, 0, 400)
  model(myModel);
  noStroke()
  //rect(10, 10, 200, 200)
}

function showAxes(rotation) {
  strokeWeight(1)
  // Z
  stroke('blue')
  fill('blue')
  line(0, 0, 0, 0, 0, 200)
  if (rotation) {
    text("Z rotation: " + rotationZ, 0, 10, 40)
  } else {
    text("Z", 0, 10, 40)
  }
  // X
  stroke('red')
  fill('red')
  line(0, 0, 0, 200, 0, 0)
  if (rotation) {
    text("X rotation: " + rotationX, 40, 10, 0)
  } else {
    text("X", 40, 10, 0)
  }
  // Y
  stroke('green')
  fill('green')
  line(0, 0, 0, 0, 200, 0)
  if (rotation) {
    text("Y rotation: " + rotationY, 10, 40, 0)
  } else {
    text("Y", 10, 40, 0)
  }
}
