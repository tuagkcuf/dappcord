const { expect } = require("chai")
const { ethers } = require("hardhat")

const tokens = (n) => {
    return ethers.utils.parseUnits(n.toString(), "ether")
}

describe("Dappcord", function () {
    let deployer, user
    let dappcord

    const NAME = "Dappcord"
    const SYMBOL = "DC"

    beforeEach(async () => {
        // Setup accounts
        ;[deployer, user] = await ethers.getSigners()

        // Deploy contract
        const Dappcord = await ethers.getContractFactory("Dappcord")
        dappcord = await Dappcord.deploy(NAME, SYMBOL)

        // Create a channel
        const transaction = await dappcord.createChannel("general", tokens(1))
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

        it("Sets the owner", async () => {
            const result = await dappcord.owner()
            expect(result).to.equal(deployer.address)
        })
    })

    describe("Creating Channels", function () {
        it("Returns total channels", async () => {
            const result = (await dappcord.totalChannels()).toString()
            expect(result).to.be.equal("1")
        })

        it("Returns channel attributes", async () => {
            const channel = await dappcord.getChannel(1)
            expect(channel.id.toNumber()).to.be.equal(1)
            expect(channel.name).to.be.equal("general")
            expect(channel.cost.toString()).to.be.equal(tokens(1).toString())
        })
    })

    describe("Joining Channels", () => {
        const ID = 1
        const AMOUNT = ethers.utils.parseUnits("1", "ether")

        beforeEach(async () => {
            const transaction = await dappcord.connect(user).mint(ID, { value: AMOUNT })
            await transaction.wait()
        })

        it("Joins the user", async () => {
            const result = await dappcord.hasJoined(ID, user.address)
            expect(result).to.be.equal(true)
        })

        it("Increases total supply", async () => {
            const result = (await dappcord.totalSupply()).toString()
            expect(result).to.be.equal(ID.toString())
        })

        it("Updates the contract balance", async () => {
            const result = (await ethers.provider.getBalance(dappcord.address)).toString()
            expect(result).to.be.equal(AMOUNT.toString())
        })
    })
})
