import React from 'react'
import { shallow } from 'enzyme'
import Tabs from '../../src/renderer_process/app/components/tabs/Tabs.jsx'

describe('<Tabs />', () => {
    it('should render three children', () => {
        const wrapper = shallow(<Tabs tabs={['a', 'b', 'c']} active={2} handler={()=>{}}/>)
        expect(wrapper.children()).toHaveLength(3)
    })
})
