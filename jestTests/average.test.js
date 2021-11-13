const {average} = require('../utils/for_testing');

describe.skip('average', () => {
    test('of one value is de the same value itself', ()=>{
        expect(average([5])).toBe(5);
    })
    test('of many is calculated correctly', ()=>{
        expect(average([1,2,3,4,5,6])).toBe(3.5);
    })
    test('of empty array is zero', ()=>{
        expect(average([])).toBe(0);
    })
   
})