import React from 'react';
import { shallow } from 'enzyme';
import LogoutEmp from "../components/logout.component";


test('should render LogoutEmp Component correctly', () => {
    const wrapper = shallow(<LogoutEmp />);
    expect(wrapper).toMatchSnapshot();
});


