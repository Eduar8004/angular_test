import { Calculator } from "./caculator";


describe('Test for calculator',()=>{
    describe('Test for multiply',()=>{
        it('#multiply should return a nine', () => {
            //Arrange
            const calculator = new Calculator();
            //Act 
            const rta = calculator.multiply(3,3);
            //Assert
            expect(rta).toEqual(9);
    
        });
    
        it('#multiply should return a three', () => {
            //Arrange
            const calculator = new Calculator();
            //Act 
            const rta = calculator.multiply(1,3);
            //Assert
            expect(rta).toEqual(3);
        });

    });
    
    describe('Test for multiply',()=>{
        it('#divide should return some numbers', () => {
            //Arrange
            const calculator = new Calculator();
            //Act 
            expect(calculator.divide(6,3)).toEqual(2);
            expect(calculator.divide(5,2)).toEqual(2.5);
        });
    
        it('#divide for zero', () => {
            //Arrange
            const calculator = new Calculator();
            //Act 
            expect(calculator.divide(6,0)).toBeNull();
        });
    
    });

    describe('Test for matchers',()=>{
        it('tests matchers', () => {
            let name ='Juan';
            let name2;
            expect(name).toBeDefined();
            expect(name2).toBeUndefined();
            expect(1+3 === 4).toBeTruthy();
            expect(1+1 === 3).toBeFalse();
            expect(5).toBeLessThan(10);
            expect('123456').toMatch(/123/);
            expect(['apples','oranges','pears']).toContain('oranges');
            
    
        });
    });
    
   
});

