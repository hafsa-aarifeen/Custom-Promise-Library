class Mypromise {
  constructor(cb) {
    try {
      cb(this.#onSuccess, this.#onFail);
    } catch (e) {
      this.#onFail(e);
    }
  }

  #onSuccess(value) {}

  #onFail(value) {}
}

module.exports = Mypromise;

const p = new Promise(cb);
p.then(() => {}).catch(() => {});
