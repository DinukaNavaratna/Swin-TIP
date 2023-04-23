import React from 'react';
import { shallow } from 'enzyme';
import SearchPackageList from "../components/searchPackageList.component";


test('should render SearchPackageList Component correctly', () => {
    const wrapper = shallow(<SearchPackageList />);
    expect(wrapper).toMatchSnapshot();
});

test('should render SearchPackageList Component without Carousel', () => {
    const wrapper = shallow(<SearchPackageList/>);
    expect(wrapper.find('Carousel')).toHaveLength(0);
});

test('should render SearchPackageList Component without Add Package functionality', () => {
    const wrapper = shallow(<SearchPackageList />);
    expect(wrapper.find('AddPackage')).toHaveLength(0);
});

test('should render SearchPackageList Component with display package functionality', () => {
    const wrapper = shallow(<SearchPackageList />);
    expect(wrapper.find('Package')).toHaveLength(1);
});
