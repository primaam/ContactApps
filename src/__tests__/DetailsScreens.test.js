import React from 'react';
import renderer from 'react-test-renderer';
import {Form} from '../components';

it('renders Form component', () => {
  const tree = renderer.create(<Form />).toJSON();
  expect(tree).toMatchSnapshot();
});
