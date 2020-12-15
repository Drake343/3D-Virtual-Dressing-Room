const LOADER = document.getElementById('js-loader');

const TRAY = document.getElementById('js-tray-slide');
const DRAG_NOTICE = document.getElementById('js-drag-notice');

var theModel;

const MODEL_PATH = "untitled.glb";

var activeOption = 'legs';
var loaded = false;

const colors = [{
  
    texture: '../../../texture/jens/1.jpg',
    size: [6, 6, 6],
    shininess: 0
  },
  {
    texture: '../../../texture/jens/2.jpg',
    size: [6, 6, 6],
    shininess: 0
  },
  {
    texture: '../../../texture/jens/3.jpg',
    size: [6, 6, 6],
    shininess: 0
  },
  {
    texture: '../../../texture/jens/4.jpg',
    size: [6, 6, 6],
    shininess: 0
  },
  {
    texture: '../../../texture/jens/5.jpg',
    size: [6, 6, 6],
    shininess: 0
  },
  {
    texture: '../../../texture/jens/6.jpg',
    size: [6, 6, 6],
    shininess: 0
  },
  {
    texture: '../../../texture/jens/7.jpg',
    size: [6, 6, 6],
    shininess: 0
  },
  {
    texture: '../../../texture/jens/8.jpg',
    size: [6, 6, 6],
    shininess: 0
  },
  {
    texture: '../../../texture/jens/9.jpg',
    size: [6, 6, 6],
    shininess: 0
  },
  {
    texture: '../../../texture/jens/10.jpg',
    size: [6, 6, 6],
    shininess: 0
  },
  {
    texture: '../../../texture/pattern/1.jpg',
    size: [6, 6, 6],
    shininess: 0
  },
  {
    texture: '../../../texture/pattern/2.jpg',
    size: [6, 6, 6],
    shininess: 0
  },
  {
    texture: '../../../texture/pattern/3.jpg',
    size: [6, 6, 6],
    shininess: 0
  },
  {
    texture: '../../../texture/pattern/4.jpg',
    size: [6, 6, 6],
    shininess: 0
  },
  {
    texture: '../../../texture/dresses/1.jepg',
    size: [6, 6, 6],
    shininess: 0
  },
  {
    texture: '../../../texture/dresses/2.jpeg',
    size: [6, 6, 6],
    shininess: 0
  },
  {
    texture: '../../../texture/dresses/3.jpg',
    size: [6, 6, 6],
    shininess: 0
  },
  {
    texture: '../../../texture/dresses/4.jpg',
    size: [6, 6, 6],
    shininess: 0
  },
  {
    texture: '../../../texture/dresses/5.jpg',
    size: [6, 6, 6],
    shininess: 0
  },
  {
    texture: '../../../texture/dresses/6.jpg',
    size: [6, 6, 6],
    shininess: 0
  },{
    texture: '../../../texture/dresses/7.jpg',
    size: [6, 6, 6],
    shininess: 0
  },{
    texture: '../../../texture/dresses/8.jpg',
    size: [6, 6, 6],
    shininess: 0
  },{
    texture: '../../../texture/dresses/9.jpg',
    size: [6, 6, 6],
    shininess: 0
  },{
    texture: '../../../texture/dresses/11.jpg',
    size: [6, 6, 6],
    shininess: 0
  },
  {
    texture: '../../../texture/dresses/14.jpg',
    size: [6, 6, 6],
    shininess: 0
  },
  {
    texture: '../../../texture/dresses/15.jpg',
    size: [6, 6, 6],
    shininess: 0
  },
  {
    texture: '../../../texture/dresses/16.jpg',
    size: [6, 6, 6],
    shininess: 0
  },
  {
    texture: '../../../texture/shoes/1.jpg',
    size: [6, 6, 6],
    shininess: 0
  },
  {
    texture: '../../../texture/shoes/2.jpeg',
    size: [6, 6, 6],
    shininess: 0
  },
  {
    texture: '../../../texture/shoes/3.jpg',
    size: [6, 6, 6],
    shininess: 0
  },
  {
    texture: '../../../texture/shoes/4.jpg',
    size: [6, 6, 6],
    shininess: 0
  },
  {
    color: '131417'
  },

  {
    color: '374047'
  },

  {
    color: '5f6e78'
  },

  {
    color: '7f8a93'
  },

  {
    color: '97a1a7'
  },

  {
    color: 'acb4b9'
  },

  {
    color: 'DF9998'
  },

  {
    color: '7C6862'
  },

  {
    color: 'A3AB84'
  },

  {
    color: 'D6CCB1'
  },

  {
    color: 'F8D5C4'
  },

  {
    color: 'A3AE99'
  },
];




const BACKGROUND_COLOR = 0xf1f1f1;
// Init the scene
const scene = new THREE.Scene();
// Set background
scene.background = new THREE.Color(BACKGROUND_COLOR);
scene.fog = new THREE.Fog(BACKGROUND_COLOR, 20, 100);

const canvas = document.querySelector('#model-canvas');

// Init the renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true
});

// renderer.shadowMap.enabled = true;
renderer.setPixelRatio(window.devicePixelRatio);

var cameraFar = 5;

document.body.appendChild(renderer.domElement);

// Add a camerra
var camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = cameraFar;
camera.position.x = 0;




document.addEventListener('keydown', keyboard, false)

function keyboard() {
  var speed = 0.5;
  if (event.keyCode == 37) {
    theModel.rotation.y -= speed;
  } else if (event.keyCode == 40) {
    camera.position.y += speed;
  } else if (event.keyCode == 38) {
    camera.position.y -= speed;
  } else if (event.keyCode == 39) {
    theModel.rotation.y += speed;
  }
}

function moveUp() {
  var speed = 0.5;
  theModel.rotation.x += speed;
}

function moveRight() {
  var speed = 0.5;
  theModel.rotation.y += speed;
}

function moveLeft() {
  var speed = 0.5;
  theModel.rotation.y -= speed;
}

function moveDown() {
  var speed = 0.5;
  theModel.rotation.y += speed;
}


// Initial material
const INITIAL_MTL = new THREE.MeshPhongMaterial({
  color: 0xf1f1f1,
  shininess: 10
});

const INITIAL_MAP = [
  // { childID: "back", mtl: INITIAL_MTL },
  // { childID: "base", mtl: INITIAL_MTL },
  // { childID: "cushions", mtl: INITIAL_MTL },
  {
    childID: "value1",
    mtl: INITIAL_MTL
  },
  {
    childID: "value2",
    mtl: INITIAL_MTL
  }
];

function heyBaby() {
  let clickBaby = document.querySelector('.abbas')
  clickBaby.addEventListener('click', () => {

    INITIAL_MAP[0].childID = 'up'
    INITIAL_MAP[1].childID = 'down'
    
    // Before update
    // objIndex = INITIAL_MAP.findIndex((obj => obj.childID));
    // console.log("Before update: ", INITIAL_MAP[objIndex])

    // // After update
    // INITIAL_MAP[objIndex].childID = "up"
    // console.log("After update: ", INITIAL_MAP[objIndex])

    // console.log(MODEL_PATH)

    // Remove Model before add a new one
    scene.remove(theModel);
    var loader = new THREE.GLTFLoader();

    loader.load(MODEL_PATH, function (gltf) {
      theModel = gltf.scene;

      theModel.traverse(o => {
        if (o.isMesh) {
          o.castShadow = true;
          o.receiveShadow = true;
        }
      });

      // Set the models initial scale
      theModel.scale.set(1, 1, 1);


      theModel.rotation.y = Math.PI;

      // Offset the y position a bit
      theModel.position.y = -1;

      // Set initial textures
      for (let object of INITIAL_MAP) {
        initColor(theModel, object.childID, object.mtl);
      }
      // Add the model to the scene
      scene.add(theModel);

      // Remove the loader
      LOADER.remove();

    }, undefined, function (error) {
      console.error(error);
    });

  })
}

heyBaby();
// const loader = new THREE.TextureLoader();
 
// const materials = [
//   new THREE.MeshBasicMaterial({map: loader.load('texturesBelt_baseColor.jpeg')}),
//   new THREE.MeshBasicMaterial({map: loader.load('textures/Belt_metallicRoughness.png')}),
//   new THREE.MeshBasicMaterial({map: loader.load('Belt_normal.png')}),
//   new THREE.MeshBasicMaterial({map: loader.load('textures/pant_baseColor.jpeg')}),
//   new THREE.MeshBasicMaterial({map: loader.load('textures/pant_metallicRoughness.png')}),
//   new THREE.MeshBasicMaterial({map: loader.load('textures/flower-6.jpg')}),
// ];

// Init the object loader
var loader = new THREE.GLTFLoader();

loader.load(MODEL_PATH, function (gltf) {
  theModel = gltf.scene;

  theModel.traverse(o => {
    if (o.isMesh) {
      o.castShadow = true;
      o.receiveShadow = true;
    }
  });

  // Set the models initial scale   
  theModel.scale.set(1, 1, 1);


  theModel.rotation.y = Math.PI;

  // Offset the y position a bit
  theModel.position.y = -1;

  // Set initial textures
  for (let object of INITIAL_MAP) {
    initColor(theModel, object.childID, object.mtl);
  }

  // Add the model to the scene
  scene.add(theModel);

  // Remove the loader
  LOADER.remove();

}, undefined, function (error) {
  console.error(error);
});

// Function - Add the textures to the models
function initColor(parent, type, mtl) {
  parent.traverse(o => {
    if (o.isMesh) {
      if (o.name.includes(type)) {
        o.material = mtl;
        o.nameID = type; // Set a new property to identify this object
      }
    }
  });
}

// Add lights
var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.61);
hemiLight.position.set(0, 50, 0);
// Add hemisphere light to scene   
scene.add(hemiLight);

var dirLight = new THREE.DirectionalLight(0xffffff, 0.54);
dirLight.position.set(-8, 12, 8);
dirLight.castShadow = true;
dirLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
// Add directional Light to scene    
scene.add(dirLight);

// Floor
var floorGeometry = new THREE.PlaneGeometry(5000, 5000, 1, 1);
var floorMaterial = new THREE.MeshPhongMaterial({
  color: 0xeeeeee,
  shininess: 0
});


var floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -0.5 * Math.PI;
floor.receiveShadow = true;
floor.position.y = -1;
scene.add(floor);

// Add controls
var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.maxPolarAngle = Math.PI / 2;
controls.minPolarAngle = Math.PI / 3;
controls.enableDamping = true;
controls.enablePan = false;
controls.dampingFactor = 0.1;
controls.autoRotate = false; // Toggle this if you'd like the chair to automatically rotate
controls.autoRotateSpeed = 0.2; // 30

function animate() {

  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);

  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }

  if (theModel != null && loaded == false) {
    initialRotation();
    DRAG_NOTICE.classList.add('start');
  }
}

animate();

// Function - New resizing method
function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  var width = window.innerWidth;
  var height = window.innerHeight;
  var canvasPixelWidth = canvas.width / window.devicePixelRatio;
  var canvasPixelHeight = canvas.height / window.devicePixelRatio;

  const needResize = canvasPixelWidth !== width || canvasPixelHeight !== height;
  if (needResize) {

    renderer.setSize(width, height, false);
  }
  return needResize;
}

// Function - Build Colors

function buildColors(colors) {
  for (let [i, color] of colors.entries()) {
    let swatch = document.createElement('div');
    swatch.classList.add('tray__swatch');

    if (color.texture) {
      swatch.style.backgroundImage = "url(" + color.texture + ")";
    } else {
      swatch.style.background = "#" + color.color;
    }

    swatch.setAttribute('data-key', i);
    TRAY.append(swatch);
  }
}

buildColors(colors);

// Select Option
const options = document.querySelectorAll(".option");

for (const option of options) {
  option.addEventListener('click', selectOption);
}

function selectOption(e) {
  let option = e.target;
  activeOption = e.target.dataset.option;
  for (const otherOption of options) {
    otherOption.classList.remove('--is-active');
  }
  option.classList.add('--is-active');
}

// Swatches
const swatches = document.querySelectorAll(".tray__swatch");

for (const swatch of swatches) {
  swatch.addEventListener('click', selectSwatch);
}

function selectSwatch(e) {
  let color = colors[parseInt(e.target.dataset.key)];
  let new_mtl;

  if (color.texture) {

    let txt = new THREE.TextureLoader().load(color.texture);

    txt.repeat.set(color.size[0], color.size[1], color.size[2]);
    txt.wrapS = THREE.RepeatWrapping;
    txt.wrapT = THREE.RepeatWrapping;

    new_mtl = new THREE.MeshPhongMaterial({
      map: txt,
      shininess: color.shininess ? color.shininess : 10
    });

  } else

  {
    new_mtl = new THREE.MeshPhongMaterial({
      color: parseInt('0x' + color.color),
      shininess: color.shininess ? color.shininess : 10
    });


  }

  setMaterial(theModel, activeOption, new_mtl);
}

function setMaterial(parent, type, mtl) {
  parent.traverse(o => {
    if (o.isMesh && o.nameID != null) {
      if (o.nameID == type) {
        o.material = mtl;
      }
    }
  });
}

// Function - Opening rotate
let initRotate = 0;

function initialRotation() {
  initRotate++;
  if (initRotate <= 120) {
    theModel.rotation.y += Math.PI / 60;
  } else {
    loaded = true;
  }
}

var slider = document.getElementById('js-tray'),
  sliderItems = document.getElementById('js-tray-slide'),
  difference;

function slide(wrapper, items) {
  var posX1 = 0,
    posX2 = 0,
    posInitial,
    threshold = 20,
    posFinal,
    slides = items.getElementsByClassName('tray__swatch');

  // Mouse events
  items.onmousedown = dragStart;

  // Touch events
  items.addEventListener('touchstart', dragStart);
  items.addEventListener('touchend', dragEnd);
  items.addEventListener('touchmove', dragAction);


  function dragStart(e) {
    e = e || window.event;
    posInitial = items.offsetLeft;
    difference = sliderItems.offsetWidth - slider.offsetWidth;
    difference = difference * -1;

    if (e.type == 'touchstart') {
      posX1 = e.touches[0].clientX;
    } else {
      posX1 = e.clientX;
      document.onmouseup = dragEnd;
      document.onmousemove = dragAction;
    }
  }

  function dragAction(e) {
    e = e || window.event;

    if (e.type == 'touchmove') {
      posX2 = posX1 - e.touches[0].clientX;
      posX1 = e.touches[0].clientX;
    } else {
      posX2 = posX1 - e.clientX;
      posX1 = e.clientX;
    }

    if (items.offsetLeft - posX2 <= 0 && items.offsetLeft - posX2 >= difference) {
      items.style.left = items.offsetLeft - posX2 + "px";
    }
  }

  function dragEnd(e) {
    posFinal = items.offsetLeft;
    if (posFinal - posInitial < -threshold) {

    } else if (posFinal - posInitial > threshold) {

    } else {
      items.style.left = posInitial + "px";
    }

    document.onmouseup = null;
    document.onmousemove = null;
  }

}

slide(slider, sliderItems);