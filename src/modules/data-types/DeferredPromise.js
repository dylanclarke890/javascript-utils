/**
 * @type {WeakMap}
 */
const privateScope = new WeakMap();

export default class DeferredPromise extends Promise {
  constructor(executor = () => {}) {
    let resolve, reject;
    let isSettled = false,
      hasResolved = false,
      hasRejected = false;
    super((resolveFunc, rejectFunc) => {
      resolve = (...args) => {
        if (!isSettled) {
          isSettled = true;
          hasResolved = true;
        }
        resolveFunc(...args);
      };
      reject = (...args) => {
        if (!isSettled) {
          isSettled = true;
          hasRejected = true;
        }
        rejectFunc(...args);
      };
      executor(resolve, reject);
    });
    const priv = {
      resolve,
      reject,
      isSettled: () => isSettled,
      hasResolved: () => hasResolved,
      hasRejected: () => hasRejected,
    };
    privateScope.set(this, priv);
  }

  resolve(...args) {
    return privateScope.get(this).resolve(...args);
  }

  reject(...args) {
    return privateScope.get(this).reject(...args);
  }

  isSettled() {
    return privateScope.get(this).isSettled();
  }

  hasResolved() {
    return privateScope.get(this).hasResolved();
  }

  hasRejected() {
    return privateScope.get(this).hasRejected();
  }
}
