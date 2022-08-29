import { metrix } from "@utils/index";

describe("Test abbreviating numbers to metrix", () =>{
    it("Should return a string with 3 numbers with no decimal for numbers less than 1k", () => {
        const val = metrix(589)
        expect(val).toEqual("589")
    })
    it("Should return a string with 3 numbers with no decimal for numbers less than 1k", () => {
        const val = metrix(1589)
        expect(val).toEqual("1.58K")
    })
})