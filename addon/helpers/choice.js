import { MultipleChoice, SingleChoice } from '../models/choice';
import { MicroState } from 'ember-microstates';

export default MicroState.extend({
  default: [],
  initialize(values, options) {
    values = values.length >= 0 ? values : [values];
    let Type = !!options.multiple ? MultipleChoice : SingleChoice;
    return Type.create(values, options);
  },

  actions: {
    toggle(choice, option) {
      return choice.toggle(option);
    },
    select(choice, option) {
      return choice.toggle(option, true);
    },
    deselect(choice, option) {
      return choice.toggle(option, false);
    }
  }
});
