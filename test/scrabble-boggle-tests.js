var assert = require('assert');

const scrabbleBoggle = require('../src/scrabble-boggle');

describe('How many times can you spell that word?!', function() {
  it('single', function() {
    const matches = scrabbleBoggle.handler('here is a test', 'test')
    assert.equal(matches, 1, 'Expected to find one match');
  });

  it('mutli', function () {
    const matches = scrabbleBoggle.handler('should have multiple matches', 'mat')
    assert.equal(matches, 2, 'Expected to find two matches');
  });

  it('none', function () {
    const matches = scrabbleBoggle.handler('no matches here', 'asdfasdf')
    assert.equal(matches, 0, 'Expected to find zero matches');
  });

  it('empty', function () {
    const matches = scrabbleBoggle.handler('', '')
    assert.equal(matches, 0, 'Expected to find zero matches');
  });

  it('needle wrong type', function () {
    const matches = scrabbleBoggle.handler('needle will fail', 9)
    assert.equal(matches, 0, 'Expected to find zero matches');
  });

  it('needle wrong type', function () {
    const matches = scrabbleBoggle.handler('needle will fail', {asdf: 'asdf'})
    assert.equal(matches, 0, 'Expected to find zero matches');
  });

  it('haystack wrong type', function () {
    const matches = scrabbleBoggle.handler(2234, 'haystack will fail')
    assert.equal(matches, 0, 'Expected to find zero matches');
  });

  it('haystack wrong type', function () {
    const matches = scrabbleBoggle.handler({asdf: 'asdf'}, 'haystack will fail')
    assert.equal(matches, 0, 'Expected to find zero matches');
  });

  it('needle too long', function () {
    const matches = scrabbleBoggle.handler('asdfasdf', 'asdfasdfasdf')
    assert.equal(matches, 0, 'Expected to find zero matches');
  });

  it('double characters', function () {
    const matches = scrabbleBoggle.handler('this\'ll still work', 'ill')
    assert.equal(matches, 2, 'Expected to find two matches');
  });

  it('capitalization', function () {
    const matches = scrabbleBoggle.handler('Make Sure We Dont Care About Case', 'abOuT')
    assert.equal(matches, 1, 'Expected to find one match');
  });

  it('repitition', function () {
    const matches = scrabbleBoggle.handler('illillilliliii', 'ill')
    assert.equal(matches, 3, 'Expected to find three matches');
  });

  it('repitition', function () {
    const matches = scrabbleBoggle.handler('aaaaaaaaaaaa', 'a')
    assert.equal(matches, 12, 'Expected to find twelve matches');
  });

  it('bunch of nonsense', function () {
    const matches = scrabbleBoggle.handler('\n\s\b\w"324$%^&*&@^#', '$%^')
    assert.equal(matches, 0, 'Expected to find zero matches');
  });

  it('unicode', function () {
    const matches = scrabbleBoggle.handler('£¥©', '©')
    assert.equal(matches, 0, 'Expected to find zero matches');
  });

  //looked like this might not be necessary, but current implentation will find needle phrases ¯\_(ツ)_/¯
  it('needle phrase', function () {
    const matches = scrabbleBoggle.handler('testing multiple words', 'or test')
    assert.equal(matches, 1, 'Expected to find one match');
  });
});
