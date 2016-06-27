/* jshint expr:true */
import Ember from 'ember';
import { expect } from 'chai';
import { describe, beforeEach, it } from 'mocha';
import sinon from 'sinon';
import { MicroState } from 'ember-microstates';

describe('Microstates', function() {
  let onState = null;
  let onCustom = null;
  let onStateEvent = null;
  let onCustomEvent = null;
  let onRecompute = null;
  let onInit = null;
  beforeEach(function() {
    let spy = sinon.spy.bind(sinon);
    [onState, onCustom, onStateEvent, onCustomEvent, onRecompute, onInit] = [
      spy(), spy(), spy(), spy(), spy(), spy()
    ];

    this.microstate = MicroState.create({
      default: {initial: 'state'},
      recompute: onRecompute
    });
    Ember.addListener(this.microstate, 'init', this, onInit);
    Ember.addListener(this.microstate, 'state', this, onStateEvent);
    Ember.addListener(this.microstate, 'custom', this, onCustomEvent);
    this.value = this.microstate.compute([], {'on-state': onState, 'on-custom': onCustom});
  });

  it("computes to the initial state ", function() {
    expect(this.value).to.deep.equal({initial: 'state'});
  });
  it("fires the init event", function() {
    expect(onInit.called).to.equal(true);
  });

  describe("setting the state without a custom event", function() {
    beforeEach(function() {
      onInit.reset();
      this.next =  this.microstate.setState(()=> ({average: 'joe'}));
      this.value = this.microstate.compute([], {'on-state': onState, 'on-custom': onCustom});
    });
    it("sets the new state", function() {
      expect(this.microstate.value).to.deep.equal({average: 'joe'});
    });
    it("returns the new state from the setState() function", function() {
      expect(this.next).to.deep.equal({average: 'joe'});
    });
    it("does not call the init event a second time.", function() {
      expect(onInit.called).to.equal(false);
    });
  });


  describe("setting the state with a custom event", function() {
    beforeEach(function() {
      this.next = this.microstate.setState('custom', ()=> ({totally: 'custom'}));
    });

    it("sets the new state", function() {
      expect(this.microstate.value).to.deep.equal({totally: 'custom'});
    });

    it("returns the new state from the setState() function", function() {
      expect(this.next).to.deep.equal({totally: 'custom'});
    });

    it("fires the 'state' event", function() {
      expect(onStateEvent.called).to.equal(true);
    });

    it("invokes the on-state callback", function() {
      expect(onState.calledWith({totally: 'custom'})).to.equal(true);
    });

    it("fires the 'custom' event", function() {
      expect(onCustomEvent.calledWith({totally: 'custom'})).to.equal(true);
    });

    it("invokes the on-custom callback", function() {
      expect(onCustom.calledWith({totally: 'custom'})).to.equal(true);
    });
  });
});
