import { AuthContainer } from './index'
import { shallow } from 'enzyme'

test("renders the main container", () => {
    const mainContainer = shallow(<AuthContainer />);
    expect(mainContainer).toBeTruthy();
})