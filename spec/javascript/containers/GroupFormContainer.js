import GroupFormContainer from '../../../app/javascript/react/containers/GroupFormContainer'
import TextField from '../../../app/javascript/react/components/TextField'
import fetchMock from 'fetch-mock'
import { shallow } from 'enzyme';
import sinon from 'sinon';


describe('BikeFormContainer', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<GroupFormContainer/>);
  })

  describe('<GroupFormContainer /> text field children rendering and changing state', () => {
    it('should render 3 TextField children', (done) =>{
      setTimeout(() => {
        expect(wrapper.find(TextField).length).toEqual(3)
        done()
      }, 0)
    });

    it('name input should record state', (done) =>{
      setTimeout(() => {
        wrapper.find('#group-name-input').simulate('change', { target: { value: 'Hello' } })
        expect(wrapper.state().name).toEqual("Hello");
        done()
      }, 0)
    });

    it('interest input should record state', (done) =>{
      setTimeout(() => {
        wrapper.find('#group-interest-input').simulate('change', { target: { value: 'Hello' } })
        expect(wrapper.state().interest).toEqual("Hello");
        done()
      }, 0)
    });

    it('description input should record state', (done) =>{
      setTimeout(() => {
        wrapper.find('#group-description-input').simulate('change', { target: { value: 'Hello' } })
        expect(wrapper.state().description).toEqual("Hello");
        done()
      }, 0)
    });
  })
})
