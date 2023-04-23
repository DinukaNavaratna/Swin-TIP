import React from 'react';
import { shallow } from 'enzyme';
import LoginEmp from "../components/login.component";


test('should render LoginEmp Component correctly', () => {
    const wrapper = shallow(<LoginEmp />);
    expect(wrapper).toMatchSnapshot();
});


