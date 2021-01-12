import Books from './Books'
import { shallow } from 'enzyme'
import { findByTestAttr } from '../../../test/testUtils'

const setup = (props={}) => shallow(<Books />)

test("renders the main container", () => {
    const booksContainer = setup();
    expect(booksContainer).toBeTruthy();
})

describe("renders the components of Books Page", () => {
    it("renders the Outer DIV", () => {
        const wrapper = setup();
        const outerDiv = findByTestAttr(wrapper, 'outer-container')
        expect(outerDiv.length).toBe(1)
    })

    it("renders the Error Container", () => {
        const wrapper = setup();
        const errorContainer = findByTestAttr(wrapper, 'error-container')
        expect(errorContainer.length).toBe(1)
    })

    it("renders the book-list container", () => {
        const wrapper = setup();
        const bookListContainer = findByTestAttr(wrapper, 'book-list-container')
        expect(bookListContainer.length).toBe(1)
    })
})