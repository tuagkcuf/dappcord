const { expect } = require("chai")
const { ethers } = require("hardhat")

const tokens = (n) => {
    return ethers.utils.parseUnits(n.toString(), "ether")
}

describe("Dappcord", function () {
    let dappcord

    const NAME = "Dappcord"
    const SYMBOL = "DC"

    beforeEach(async () => {
        const Dappcord = await ethers.getContractFactory("Dappcord")
        dappcord = await Dappcord.deploy(NAME, SYMBOL)
    })

    describe("Deployment", function () {
        it("Sets the name", async () => {
            let result = await dappcord.name()
            expect(result).to.equal(NAME)
        })

        it("Sets the symbol", async () => {
            let result = await dappcord.symbol()
            expect(result).to.equal(SYMBOL)
        })
    })
})
