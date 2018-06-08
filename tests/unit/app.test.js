import React from 'react'
import LoadImage from '../../src/renderer_process/app/components/objectManager/LoadImage.jsx'

import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })

describe('<Tabs />', () => {
    it('should render three children', () => {
        const wrapper = shallow(<LoadImage onClick={()=>{}}/>)
        expect(wrapper.children()).toHaveLength(1)
    })
})
