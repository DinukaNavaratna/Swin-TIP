import React from 'react';
import { shallow } from 'enzyme';
import RegisterEmp from "../components/register.component";


test('should render RegisterEmp Component correctly', () => {
    const wrapper = shallow(<RegisterEmp />);
    expect(wrapper).toMatchSnapshot();
});


