const SimpleCodeStrategy = require("../../src/strategies/verification/simple-code.strategy");

describe("SimpleCodeStrategy - Unit Test", () => {

    test("should return true when code matches expected code", () => {
        const strategy = new SimpleCodeStrategy("1234");

        const result = strategy.verify("1234");

        expect(result).toBe(true);
    });

    test("should return false when code does NOT match", () => {
        const strategy = new SimpleCodeStrategy("1234");

        const result = strategy.verify("9999");

        expect(result).toBe(false);
    });

});
