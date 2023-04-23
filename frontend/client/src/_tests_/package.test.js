import React from 'react';
import { shallow } from 'enzyme';
import Package from "../components/package.component";


test('should render Package Component correctly', () => {
    const wrapper = shallow(<Package />);
    expect(wrapper).toMatchSnapshot();
});


