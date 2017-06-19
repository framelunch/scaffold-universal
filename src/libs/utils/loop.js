import Cp from '../core/Cp';
import looptime from './looptime';

const cp = Cp();
let id;

export function addToLoop(func) {
  cp.add(func);
  if (!id) {
    id = setInterval(() => { cp.update(); }, looptime);
  }
  return func;
};

export function removeFromLoop(func) {
  cp.remove(func);
  if (!cp.length) {
    clearInterval(id);
    id = null;
  }
};
