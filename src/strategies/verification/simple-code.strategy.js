const VerificationStrategy = require("./verification.strategy");

class SimpleCodeStrategy extends VerificationStrategy {
    constructor(expectedCode) {
        super();
        this.expectedCode = expectedCode;
    }

    verify(code) {
        return code === this.expectedCode;
    }
}

module.exports = SimpleCodeStrategy;
