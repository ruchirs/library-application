import React from 'react';
import { shallow } from 'enzyme'
import App from './App'



test('renders without crashing', () => {
  const wrapper = shallow(<App />);
  // console.log(wrapper.debug());
  expect(wrapper).toBeTruthy();
});

test('renders login component', () => {
  const loginWrapper = shallow(<App />).find("[data-test='auth-component']");
  expect(loginWrapper.length).toBe(1)
})