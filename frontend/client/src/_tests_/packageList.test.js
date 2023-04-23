import React from 'react';
import { shallow } from 'enzyme';
import PackageList from "../components/packageList.component";


test('should render PackageList Component correctly', () => {
    const wrapper = shallow(<PackageList />);
    expect(wrapper).toMatchSnapshot();
});

test('should render PackageList Component with Carousel', () => {
    const wrapper = shallow(<PackageList/>);
    expect(wrapper.find('Carousel')).toHaveLength(1);
});

test('should render PackageList Component without Add Package functionality', () => {
    const wrapper = shallow(<PackageList />);
    expect(wrapper.find('AddPackage')).toHaveLength(0);
});

test('should render PackageList Component with display package functionality', () => {
    const wrapper = shallow(<PackageList />);
    expect(wrapper.find('Package')).toHaveLength(1);
});
