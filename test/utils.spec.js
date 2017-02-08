var mocha = require('mocha');
var chai = require('chai');
var Utils = require('../app/utils/Utils');

var expect = chai.expect;

describe('Utils function test', function() {
    it('sortedIndexBy', function() {
        let sortedIndexBy = Utils.sortedIndexBy;
        expect(sortedIndexBy([{start: 3, end: 3}, {start: 5, end: 7}, {start: 9, end: 9}], {start: 1}, 'start')).to.be.equal(0);
        expect(sortedIndexBy([{start: 3, end: 3}, {start: 5, end: 7}, {start: 9, end: 9}], {start: 3}, 'start')).to.be.equal(0);
        expect(sortedIndexBy([{start: 3, end: 3}, {start: 5, end: 7}, {start: 9, end: 9}], {start: 4}, 'start')).to.be.equal(1);
        expect(sortedIndexBy([{start: 3, end: 3}, {start: 5, end: 7}, {start: 9, end: 9}], {start: 8}, 'start')).to.be.equal(2);
        expect(sortedIndexBy([{start: 3, end: 3}, {start: 5, end: 7}, {start: 9, end: 9}], {start: 10}, 'start')).to.be.equal(3);
    });
});
