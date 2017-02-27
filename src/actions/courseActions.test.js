import expect from "expect";
import * as courseActions from "./courseActions";
import * as types from "./actionTypes";
import thunk from 'redux-thunk';
//import nock from 'nock';
import configureMockStore from 'redux-mock-store';

describe('Course Actions', () => {
  describe('createCourseSuccess', () => {
    it('should create a CREATE_COURSE_SUCCESS action', () => {
      const course = {id: 'clean-code', title: 'Clean Code'};
      const expectedAction = {
        type: types.CREATE_COURSE_SUCCESS,
        course
      };

      const action = courseActions.createCourseSuccess(course);

      expect(action).toEqual(expectedAction);
    });
  });

  describe('Async Actions', () => {
    const middleware = [thunk];
    const mockStore = configureMockStore(middleware);

    //afterEach(() => {
    //  nock.cleanAll();
    //});

    it('should create BEGIN_AJAX_CALL and LOAD_COURSES_SUCCESS when loading courses', (done) => {
      // Here's an example call to nock:
      // nock('http://example.com')
      //   .get('/courses')
      //   .reply(200, { body: { course: [{ id: 1, firstName: 'Cory', lastName: 'House' }] } } );

      const expectedActions = [
        {type: types.BEGIN_AJAX_CALL},
        {type: types.LOAD_COURSES_SUCCESS}
      ];

      const store = mockStore({courses: []}, expectedActions);
      store.dispatch(courseActions.loadCourses()).then(() => {
        // This block is executed after actions have run, allowing state to be asserted
        const actions = store.getActions();
        expect(actions[0].type).toBe(types.BEGIN_AJAX_CALL);
        expect(actions[1].type).toBe(types.LOAD_COURSES_SUCCESS);
        done();
      });
    });
  });
});
