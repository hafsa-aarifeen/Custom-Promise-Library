const STATE = {
  FULFILLED: "fulfilled",
  REJECTED: "rejected",
  PENDING: "pending",
};

class Mypromise {
  #thenCbs = [];
  #catchCbs = [];
  #state = STATE.PENDING;
  #value;

  constructor(cb) {
    try {
      cb(this.#onSuccess, this.#onFail);
    } catch (e) {
      this.#onFail(e);
    }
  }

  #runCallbacks() {
    if (this.#state === STATE.FULFILLED) {
      this.#thenCbs.forEach((callback) => {
        callback(this.#value);
      });

      this.#thenCbs = [];
    }

    if (this.#state === STATE.REJECTED) {
      this.#catchCbs.forEach((callback) => {
        callback(this.#value);
      });

      this.#catchCbs = [];
    }
  }

  #onSuccess(value) {
    if (this.#state !== STATE.PENDING) return;
    this.#value = value;
    this.#state = STATE.FULFILLED;
    this.#runCallbacks();
  }

  #onFail(value) {
    if (this.#state !== STATE.PENDING) return;
    this.#value = value;
    this.#state = STATE.REJECTED;
    this.#runCallbacks();
  }

  then(thenCb, catchCb) {
    if (thenCb) this.#thenCbs.push(thenCb);
    if (catchCb) this.#catchCbs.push(catchCb);

    this.#runCallbacks();
  }

  catch(cb) {
    this.then(undefined, cb);
  }

  finally(cb) {}
}

module.exports = Mypromise;

const p = new Mypromise((resolve, reject) => {
  resolve(500);
}).then();
p.then(
  () => {},
  () => {}
);
