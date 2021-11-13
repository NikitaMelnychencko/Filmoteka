import { setTheme } from './modal_theme';

export function palitre() {
  const palitre = document.querySelector('.palitre');
  const palitreHolst = document.querySelectorAll('.palitre__holst');

  const graph = {
    ringRadius: 80,
    setRadius: 120,
    ringLineWidth: 30,
    setLineWidth: 20,
    holst: 280,
    ringHolst: 180 / 2,
    centerPosition() {
      return this.holst / 2;
    },
    tablet() {
      this.holst = 350;
      this.ringRadius = 100;
      this.setRadius = 145;
      this.ringLineWidth = 35;
      this.setLineWidth = 25;
      this.ringHolst = 250 / 2;
    },
    desktop() {
      this.holst = 600;
      this.ringRadius = 190;
      this.setRadius = 260;
      this.ringLineWidth = 45;
      this.setLineWidth = 35;
      this.ringHolst = 450 / 2;
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

  //br 219-313=94 /do not delete
  //sat 47-133=86 /do not delete

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

  function initPalitre() {
    setCurrentColor();
    setDot(25, '#palitre-ring-dot');
    setDot(267, '#palitre__brightness-dot');
    setDot(133, '#palitre__saturation-dot');
    return;
  }

  initPalitre();

  palitre.onclick = function (e) {
    console.dir(e.target);
    if (e.target.id === 'palitre__ring') {
      setRingColor(e);
    } else if (e.target.id === 'palitre-ring-dot') {
      console.log('mm');
    } else if (
      e.target.id === 'palitre__saturation' ||
      e.target.id === 'palitre__brightness'
    ) {
      satBrColor(e);
    }
    return;
  };

  function setCurrentColor() {
    sessionStorage.setItem(
      'accent',
      JSON.stringify(
        `--button: hsl(${setColor.h}deg, ${setColor.s}%, ${setColor.l}%);--clear-accent-color: hsl(${setColor.h}deg, 100%, 50%);`,
      ),
    );
    setTheme();
    return;
  }

  function setRingColor(e) {
    const srgc = degBlock(e, graph.ringHolst);
    const palitre_ring_dot = document.querySelector('#palitre-ring-dot');
    palitre_ring_dot.style.transform = `rotate(${srgc + 45}deg)`;
    setDot(srgc, '#palitre-ring-dot');
    setColor.set_h(srgc);
    setCurrentColor();
    return;
  }

  function satBrColor(e) {
    const sbc = degBlock(e, graph.holst / 2);
    if (sbc > 220 && sbc < 314) {
      setColor.set_l(sbc);
      satBr(sbc, '#palitre__brightness-dot');
      return;
    }
    if (sbc > 48 && sbc < 134) {
      setColor.set_s(sbc);
      satBr(sbc, '#palitre__saturation-dot');
      return;
    }

    return;
  }

  function satBr(e, id) {
    setColor.set_s(e);
    setDot(e, id);
    setCurrentColor();
    return;
  }

  function setDot(srgc, id) {
    const _dot = document.querySelector(id);
    _dot.style.transform = `rotate(${srgc + 45}deg)`;
    return;
  }

  function degBlock(e, holst) {
    let X = -(holst - e.offsetX) / holst;
    let Y = (holst - e.offsetY) / holst;
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
}
