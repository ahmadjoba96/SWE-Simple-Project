class VerificationStrategy {
    verify(code) {
        throw new Error("verify() must be implemented");
    }
}

module.exports = VerificationStrategy;
