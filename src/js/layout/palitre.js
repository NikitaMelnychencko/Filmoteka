export function palitre() {
  viewPort();
  initPalitre();
  initDots();
  const palitre = document.querySelector('.palitre');

  palitre.onclick = function (e) {
    moveDot(e);
  };

  palitre.onmousedown = function (e) {
    document.addEventListener('mousemove', moveDot);

    function removelistener() {
      document.removeEventListener('mousemove', moveDot);
      palitre.onmouseup = null;
    }
    document.onmouseup = function () {
      removelistener();
    };
    palitre.onmouseleave = function () {
      removelistener();
    };
  };
}

function moveDot(e) {
  if (e.target.id === 'palitre__ring' || e.target.id === 'palitre-ring-dot') {
    setRingColor(e);
  } else if (
    e.target.id === 'palitre__saturation' ||
    e.target.id === 'palitre__brightness' ||
    e.target.id === 'palitre__brightness-dot' ||
    e.target.id === 'palitre__saturation-dot'
  ) {
    satBrColor(e);
  }
}

const graph = {
  holst: 280,
  ringHolst: 180 / 2,
  centerPosition() {
    return this.holst / 2;
  },
  tablet() {
    this.holst = 350;
    this.ringHolst = 250 / 2;
  },
  desktop() {
    this.holst = 600;
    this.ringHolst = 450 / 2;
  },
};

function viewPort() {
  const palitreHolst = document.querySelectorAll('.palitre__holst-js');
  if (
    window.visualViewport.width >= 768 &&
    window.visualViewport.width < 1024
  ) {
    graph.tablet();
    palitreHolst.forEach(e => {
      holstSetAttribute(e, 350);
    });
    return;
  } else if (window.visualViewport.width >= 1024) {
    graph.desktop();
    palitreHolst.forEach(e => {
      holstSetAttribute(e, 600);
    });
    return;
  }
}

function holstSetAttribute(e, hh) {
  e.setAttribute('width', `${hh}px`);
  e.setAttribute('height', `${hh}px`);
}

const setColor = {
  h: 25,
  s: 100,
  l: 50,
  set_h(val) {
    this.h = val;
  },
  set_s(evt) {
    this.s = ((evt - 48) / 86) * 100;
  },
  set_l(evt) {
    this.l = ((evt - 220) / 94) * 100;
  },
};

export function defaultAccent() {
  localStorage.removeItem('colorAccent');
  setDot(25, '#palitre-ring-dot'); //25
  setDot(133, '#palitre__saturation-dot'); //267
  setDot(267, '#palitre__brightness-dot'); //133
  setColor.h = 25;
  setColor.s = 100;
  setColor.l = 50;
}

export function saveAccent() {
  localStorage.setItem(
    'colorAccent',
    JSON.stringify({
      h: setColor.h,
      s: setColor.s,
      l: setColor.l,
    }),
  );
}

function initPalitre() {
  const setCurrentColor = JSON.parse(localStorage.getItem('colorAccent'));
  if (setCurrentColor !== null) {
    setColor.h = setCurrentColor.h;
    setColor.s = setCurrentColor.s;
    setColor.l = setCurrentColor.l;
    return;
  }
  return;
}

function initDots() {
  setDot(setColor.h, '#palitre-ring-dot'); //25
  setDot((setColor.s / 100) * 86 + 48, '#palitre__saturation-dot'); //267
  setDot((setColor.l / 100) * 94 + 220, '#palitre__brightness-dot'); //133
  return;
}

function setCurrentColor() {
  saveAccent();
  return;
}

function setRingColor(e) {
  const srgc = degBlock(e, graph.ringHolst, '.palitre__ring');
  const palitre_ring_dot = document.querySelector('#palitre-ring-dot');
  palitre_ring_dot.style.transform = `rotate(${srgc + 45}deg)`;
  setDot(srgc, '#palitre-ring-dot');
  setColor.set_h(srgc);
  setCurrentColor();
  return;
}

function satBrColor(e) {
  const sbc = degBlock(e, graph.holst / 2, '.palitre');
  console.log(sbc);
  if (sbc > 220 && sbc < 314) {
    setColor.set_l(sbc);
    satBr(sbc, '#palitre__brightness-dot');
    return;
  } else if (sbc > 48 && sbc < 134) {
    setColor.set_s(sbc);
    satBr(sbc, '#palitre__saturation-dot');
    return;
  }

  return;
}

function satBr(e, id) {
  setDot(e, id);
  setCurrentColor();
  return;
}

function setDot(srgc, id) {
  const _dot = document.querySelector(id);
  _dot.style.transform = `rotate(${srgc + 45}deg)`;
  return;
}

function degBlock(e, holst, selector) {
  const offsetElement = document.querySelector(`${selector}`);
  let c = offsetElement.getBoundingClientRect();
  let X = -(holst - (e.clientX - c.left)) / holst;
  let Y = (holst - (e.clientY - c.top)) / holst;
  let atanCursor = Math.atan(X / Y);
  let atanBlock = (atanCursor * 180) / Math.PI;
  function degB() {
    if (X > 0 && Y < 0) {
      return atanBlock + 180;
    } else if (X < 0 && Y < 0) {
      return atanBlock + 180;
    } else if (X < 0 && Y >= 0) {
      return atanBlock + 360;
    } else if (X >= 0 && Y >= 0) {
      return atanBlock;
    }
    return atanBlock;
  }
  return degB();
}
