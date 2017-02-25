import expect from 'expect';
import React from 'react';
import {mount, shallow} from 'enzyme';
import TestUtils from 'react-addons-test-utils';
import CourseForm from './CourseForm';

function setup(saving) {
  const props = {
    course: {},
    saving,
    errors: {},
    onSave: () => {},
    onChange: () => {}
  };
  return shallow(<CourseForm {...props} />);
}

describe('CourseForm via Enzyme', () => {
  it ('renders form and h1', () => {
    const wrapper = setup(false);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('h1').text()).toEqual('Manage Course');
  });

  it('labels submit button "Save" when not saving', () => {
    const wrapper = setup(false);
    expect(wrapper.find('input').props().value).toBe('Save');
    expect(wrapper.find('input').props().disabled).toBe(false);
  });

  it('labels submit button "Saving..." when saving', () => {
    const wrapper = setup(true);
    expect(wrapper.find('input').props().value).toBe('Saving...');
    expect(wrapper.find('input').props().disabled).toBe(true);
  });
});
