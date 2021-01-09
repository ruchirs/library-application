import { AuthContainer } from './index'
import { Login } from './Login'
import SignUp from './Signup'
import { shallow } from 'enzyme'
import { findByTestAttr } from '../../../test/testUtils'

const setup = (props={}) => shallow(<AuthContainer />)

test("renders the main container", () => {
    const mainContainer = setup();
    expect(mainContainer).toBeTruthy();
})

describe("renders the components of AuthContainer", () => {
    it("renders the OuterContainer", () => {
        const wrapper = setup();
        const outerContainer = findByTestAttr(wrapper, 'outer-container')
        expect(wrapper.length).toBe(1)
    })

    it("renders the Header Container", () => {
        const wrapper = setup();
        const headerContainer = findByTestAttr(wrapper, 'header-container')
        expect(headerContainer.length).toBe(1)
    })

    it("renders the text-style element", () => {
        const wrapper = setup();
        const stylesContainer = findByTestAttr(wrapper, 'text-style')
        expect(stylesContainer.length).toBe(1)
    })

    it("renders the bubble drop", () => {
        const wrapper = setup();
        const bubble = findByTestAttr(wrapper, 'bubble-drop')
        expect(bubble.length).toBe(1)
    })

    it("renders the inner container", () => {
        const wrapper = setup();
        const innerContainer = findByTestAttr(wrapper, 'inner-container')
        expect(innerContainer.length).toBe(1)
    })
})