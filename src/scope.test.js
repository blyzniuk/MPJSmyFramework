import Scope from './scope.js';

describe('Scope', () => {
    let sut;
    beforeEach(() => {
        sut = new Scope({});
    });
    describe('#constructor', () => {
        it('should have watchers', () => {
            sut = new Scope({});
            expect(sut.$$watchers).toEqual([]);
        });

        it('should have childrens', () => {
            sut = new Scope({});
            expect(sut.$$children).toEqual([]);
        });

        it('should have parent', () => {
            sut = new Scope({});
            expect(sut.$parent).toEqual({});
        });
    });
});
