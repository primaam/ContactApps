import React from 'react';
import {ActivityIndicator, Text} from 'react-native';
import renderer from 'react-test-renderer';

// it('renders correctly', () => {
//   const tree = renderer.create(<SplashScreens />).toJSON();
//   expect(tree).toMatchSnapshot();
// });

it('renders the ActivityIndicator component', () => {
  const tree = renderer.create(<ActivityIndicator size="large" />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders the Text component', () => {
  const tree = renderer.create(<Text>Please Wait</Text>).toJSON();
  expect(tree).toMatchSnapshot();
});
