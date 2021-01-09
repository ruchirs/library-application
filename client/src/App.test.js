import React from 'react';
import { shallow } from 'enzyme'
import App from './App'
import { findByTestAttr } from '../test/testUtils'

const appSetup = () => shallow(<App />)

test('renders without crashing', () => {
  const wrapper = appSetup();
  expect(wrapper).toBeTruthy();
});

test('renders app container', () => {
  const wrapper = appSetup();
  const appWrapper = findByTestAttr(wrapper, 'auth-component')
  expect(appWrapper.length).toBe(1)
})