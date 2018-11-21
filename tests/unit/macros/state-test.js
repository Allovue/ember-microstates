/* jshint expr:true */
import { expect } from 'chai';
import { describe, it } from 'mocha';
import { state, create } from '@microstates/ember';
import Object from '@ember/object';

describe('Unit: Macro | state', function() {
  describe('with a value', function() {
    let Container = Object.extend({
      n: state(42)
    });
  
    it('allows to create a number type using state(42)', function() {
      expect(Container.create().get('n.state')).to.equal(42);
    });

    it('allows to increment', function() {
      let c = Container.create();
      c.get('n').increment();
      expect(c.n.state).to.equal(43);
    });

    it('does not share state between multiple instances', function() {
      let c1 = Container.create();
      let c2 = Container.create();
      c1.get('n').increment();
      expect(c1.get('n.state')).to.equal(43);
      expect(c2.get('n.state')).to.equal(42);
    });
  });

  describe('without arguments', function() {
    let Container = Object.extend({
      n: state()
    });

    it('allows to create a value without a Type', function() {
      expect(Container.create().get('n.state')).to.equal(undefined);
    });

    it('allows to set', function() {
      let c = Container.create();
      c.get('n').set('hello world');
      expect(c.n.state).to.equal('hello world');
    });
  });

  describe('with a microstate as an argument', function() {
    let Container = Object.extend({
      n: state(create(Number, 42))
    });
  
    it('allows to create a number type using use(create(Number, 42))', function() {
      expect(Container.create().get('n.state')).to.equal(42);
    });

    it('allows to increment', function() {
      let c = Container.create();
      c.get('n').increment();
      expect(c.n.state).to.equal(43);
    });

    it('does not share state between multiple instances', function() {
      let c1 = Container.create();
      let c2 = Container.create();
      c1.get('n').increment();
      expect(c1.get('n.state')).to.equal(43);
      expect(c2.get('n.state')).to.equal(42);
    });
  });

  describe('with a type as an argument', function() {
    let Container = Object.extend({
      n: state(Number, 42)
    });
  
    it('allows to create a number type using useType(Number, 42)', function() {
      expect(Container.create().get('n.state')).to.equal(42);
    });

    it('allows to increment', function() {
      let c = Container.create();
      c.get('n').increment();
      expect(c.n.state).to.equal(43);
    });

    it('does not share state between multiple instances', function() {
      let c1 = Container.create();
      let c2 = Container.create();
      c1.get('n').increment();
      expect(c1.get('n.state')).to.equal(43);
      expect(c2.get('n.state')).to.equal(42);
    });
  });
});
