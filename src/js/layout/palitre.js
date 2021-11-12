const palitre__saturation = document.querySelector('.palitre__saturation');
const palitre__brightness = document.querySelector('.palitre__brightness');
const palitre__ring = document.querySelector('.palitre__ring');
const palitre = document.querySelector('.palitre');
const current_color = document.querySelector('.palitre__current-color');
const brightness = palitre__brightness.getContext('2d');
const palitreHolst = document.querySelectorAll('.palitre__holst');
const palitre_ring_dot = document.querySelector('.palitre__dot');
const graph = {
  ringRadius: 80,
  setRadius: 120,
  ringLineWidth: 30,
  setLineWidth: 20,
  holst: 280,
  centerPosition() {
    return this.holst / 2;
  },
  // mobile() {
  //   this.holst = 280,
  //   this.ringRadius = 120,
  // },
  tablet() {
    this.holst = 350;
    this.ringRadius = 100;
    this.setRadius = 145;
    this.ringLineWidth = 35;
    this.setLineWidth = 25;
  },
  desktop() {
    this.holst = 600;
    this.ringRadius = 190;
    this.setRadius = 260;
    this.ringLineWidth = 45;
    this.setLineWidth = 35;
  },
};

function viewPort() {
  if (
    window.visualViewport.width >= 768 &&
    window.visualViewport.width < 1024
  ) {
    graph.tablet();
    palitreHolst.forEach(e => {
      e.setAttribute('width', '350px');
      e.setAttribute('height', '350px');
    });
    return;
  } else if (window.visualViewport.width >= 1024) {
    graph.desktop();
    palitreHolst.forEach(e => {
      e.setAttribute('width', '600px');
      e.setAttribute('height', '600px');
    });
    return;
  }
}

viewPort();

brightness.lineWidth = graph.setLineWidth; // толщина линии
brightness.arc(
  graph.centerPosition(),
  graph.centerPosition(),
  graph.setRadius,
  (3 * Math.PI) / 4,
  (5 * Math.PI) / 4,
);
brightness.stroke();

const saturation = palitre__saturation.getContext('2d');
saturation.lineWidth = graph.setLineWidth; // толщина линии
saturation.arc(
  graph.centerPosition(),
  graph.centerPosition(),
  graph.setRadius,
  (7 * Math.PI) / 4,
  Math.PI / 4,
);
saturation.stroke();

const ring = palitre__ring.getContext('2d');
ring.lineWidth = graph.ringLineWidth; // толщина линии

ring.arc(
  graph.centerPosition(),
  graph.centerPosition(),
  graph.ringRadius,
  0,
  2 * Math.PI,
);

ring.strokeStyle = '#fff000';
// ring.stroke();

palitre.onclick = function (e) {
  // показывает координаты точки клика
  // console.log((300 - e.offsetX) / 300, (300 - e.offsetY) / 300);
  let X = -(300 - e.offsetX) / 300;
  let Y = (300 - e.offsetY) / 300;
  let atanCursor = Math.atan(X / Y);
  let zz = (atanCursor * 180) / Math.PI;

  function lz() {
    if (X > 0 && Y < 0) {
      return zz + 180;
    } else if (X < 0 && Y < 0) {
      return zz + 180;
    } else if (X < 0 && Y >= 0) {
      return zz + 360;
    } else if (X >= 0 && Y >= 0) {
      return zz;
    }
    return zz;
  }

  console.log(lz());

  const mg = lz();

  function setCurrentColor(mg) {
    current_color.style.backgroundColor = `hsl(${mg}, 100%, 50%)`;
  }

  setCurrentColor(mg);

  // palitre_ring_dot.style.transform = `translate(-50%, -230px), rotate(${mg}deg)`;
  palitre_ring_dot.style.transform = `rotate(${mg + 45}deg)`;
  palitre_ring_dot.style.backgroundColor = `hsl(${mg}, 100%, 50%)`;
};
