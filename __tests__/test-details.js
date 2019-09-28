import 'react-native';
import React from 'react';
import Details from '../src/components/Details';

import renderer from 'react-test-renderer';
import item from '../src/classes/Item';

import { lists } from '../config/jest/mockData';
var data = lists;

it('render correctly', () => {
	//const tree = renderer.create(<Details data={data[0].items[0]} itemIndex={0} listIndex={0} />).toJSON();
	//expect(tree).toMatchSnapshot();
});
