import expect from 'expect';
import {createStore} from 'redux';
import rootReducer from '../reducers';
import initialState from '../reducers/initialState';
import * as courseActions from '../actions/courseActions';

// These tests act alike integration tests, combining the store, reducers and action creators to allow
// us to test that all of these pieces are co-operating together.
describe('Store', () => {
  it('Should handle creating courses', () => {
    const store = createStore(rootReducer, initialState);
    const course = {
      title: 'Clean Code'
    };

    const action = courseActions.createCourseSuccess(course);
    store.dispatch(action);

    const actualCourse = store.getState().courses[0];
    const expectedCourse = course;
    expect(expectedCourse).toEqual(actualCourse);
  });
});
