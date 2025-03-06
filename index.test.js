const { test, describe, it, beforeEach, mock, afterEach } = require("node:test");
const assert = require("node:assert");
const add = require('./index');



describe("Spies test: it should call add function with arguments", async () => {
  it("function call test", async (t) => {
    const spy = mock.fn(add);
    assert.strictEqual(spy('1,2'), 3);
    assert.strictEqual(spy.mock.calls.length, 1);

    const call = spy.mock.calls[0];
    assert.deepEqual(call.arguments[0], '1,2');
    assert.strictEqual(call.result, 3);
  });
});

describe("Functionlity test:", async () => {
    let spy
    beforeEach(() => {
        spy = mock.fn(add)
    })
    afterEach(() => {
        spy=null
    })
    it('should return 0 for an empty string', async (t) => {
        assert.strictEqual(spy(''), 0)
    })
    it('It should return a number if single number is given in string', async (t) =>{
        assert.strictEqual(spy('12'), 12)
    })
    it('It should return sum for comma-separated numbers', async (t) => {
        assert.strictEqual(spy('1,2,3,4,5,6'), 21);
    })
    it('should return sum for mixed comma & newline delimiters', async (t) => {
        assert.strictEqual(spy('1,2,3\n4,5\n6'), 21);
    })
    it('should handle the case custom delimiter "//;"', async (t) => {
        assert.strictEqual(add('//;\n1;2;3'), 6);
    });
    it('should return sum for multiple numbers with a custom delimiter', () => {
        assert.strictEqual(add('//-\n10-20-30'), 60);
    })
    it('should return an error message for negative numbers', () => {
        assert.strictEqual(add('1,2,-3,6'), 'negative numbers not allowed <-3>');
    });
    it('should return an error message for multiple negative numbers', () => {
        assert.strictEqual(add('1,2,-3,-4,6'), 'negative numbers not allowed <-3,-4>');
    });
    it('should return an error message for Invalid Input', () => {
        assert.strictEqual(add('1,2,a,6,b'), 'Invalid input');
    })

})