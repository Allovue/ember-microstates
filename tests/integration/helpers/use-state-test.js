import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { click } from '@ember/test-helpers';

describe('Integration | Helper | use-state', function() {
  setupComponentTest('use-state', {
    integration: true
  });

  it('renders', function() {
    this.render(hbs`
    {{#let (use-state) as |$|}}
      {{$.state}}
    {{/let}}
  `);

    expect(this.$().text().trim()).to.equal('');
  });

  it('allows value to be set', async function() {
    this.render(hbs`
      {{#let (use-state) as |$|}}
        <span>{{$.state}}</span>
        <button {{action $.set "hello world"}} />
      {{/let}}
    `);

    expect(this.$('span').text()).to.equal('');

    await click(this.$('button')[0]);

    expect(this.$('span').text()).to.equal('hello world');
  });

  it('allows to create a Number type using ember-import from ember-microstates/types/number', async function() {
    this.render(hbs`
      {{#let (use-state 42) as |$|}}
        <span>{{$.state}}</span>
        <button {{action $.increment}} />
      {{/let}}
    `);

    expect(this.$('span').text()).to.equal('42');

    await click(this.$('button')[0]);

    expect(this.$('span').text()).to.equal('43');
  });

  it('allows to create a Boolean type using ember-import from ember-microstates/types/boolean', async function() {
    this.render(hbs`
      {{#let (use-state true) as |$|}}
        <span>{{if $.state 'true' 'false'}}</span>
        <button {{action $.toggle}} />
      {{/let}}
    `);

    expect(this.$('span').text()).to.equal('true');

    await click(this.$('button')[0]);

    expect(this.$('span').text()).to.equal('false');
  });

  it('allows to create a String type using ember-import from ember-microstates/types/string', async function() {
    this.render(hbs`
      {{#let (use-state 'hello world') as |$|}}
        <span>{{$.state}}</span>
        <button {{action $.concat '!!!'}} />
      {{/let}}
    `);

    expect(this.$('span').text()).to.equal('hello world');

    await click(this.$('button')[0]);

    expect(this.$('span').text()).to.equal('hello world!!!');
  });

  it('allows to create a Object type using ember-import from ember-microstates/types/object', async function() {
    this.set('obj', { dog: 'Santa\'s Little Helper', cat: 'Snowball' })
    this.render(hbs`
      {{#let (use-state obj) as |$|}}
        <ul>
          {{#each-in $ as |pet name|}}
            <li>{{pet}}: {{name.state}}</li>
          {{/each-in}}
        </ul>
        <button {{action $.put 'second cat' 'Snowball II'}} />
      {{/let}}
    `);

    expect(this.$('li:eq(0)').text()).to.equal('dog: Santa\'s Little Helper');
    expect(this.$('li:eq(1)').text()).to.equal('cat: Snowball');

    await click(this.$('button')[0]);

    expect(this.$('li:eq(2)').text()).to.equal('second cat: Snowball');
  });

  it('allows to create an Array type using ember-import from ember-microstates/types/array', async function() {
    this.set('pets', ['dog', 'cat', 'bird']);

    this.render(hbs`
      {{#let (use-state pets) as |$|}}
        <ul>
          {{#each $ as |pet|}}
            <li>{{pet.state}}</li>
          {{/each}}
        </ul>
        <span>{{$.state}}</span>
        <button {{action $.push 'fish'}} />
      {{/let}}
    `);

    expect(this.$('li:eq(0)').text()).to.equal('dog');
    expect(this.$('li:eq(1)').text()).to.equal('cat');
    expect(this.$('li:eq(2)').text()).to.equal('bird');

    await click(this.$('button')[0]);

    expect(this.$('li:eq(3)').text()).to.equal('fish');
  });
});

