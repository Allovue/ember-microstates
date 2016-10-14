/*jshint -W053 */
import { MicroState } from 'ember-microstates';

export default MicroState.extend({

  wrap(value) {
    let wrapped = new Number(value);

    Object.defineProperties(wrapped, {
      toString : {
        value() {
          return String(value);
        }
      },
      valueOf: {
        value() {
          return Number(value);
        }
      }
    });

    return wrapped;
  },

  actions: {
    add(current, amount) {
      return current + amount;
    },
    subtract(current, amount) {
      return current - amount;
    }
  }
});
