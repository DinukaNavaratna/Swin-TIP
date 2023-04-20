import React from 'react';
import { shallow } from 'enzyme';
import AddPackage from "../components/addPackage.component";


test('should render AddPackage Component correctly', () => {
    const wrapper = shallow(<AddPackage />);
    expect(wrapper).toMatchSnapshot();
});

test('should render AddPackage Component with Carousel', () => {
    const wrapper = shallow(<AddPackage />);
    expect(wrapper.find('Carousel')).toHaveLength(0);
});

test('should render AddPackage Component with display package functionality', () => {
    const wrapper = shallow(<AddPackage />);
    expect(wrapper.find('Package')).toHaveLength(0);
});
