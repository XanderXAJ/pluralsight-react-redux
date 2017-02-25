import expect from 'expect';
import React from 'react';
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
  const renderer = TestUtils.createRenderer();
  renderer.render(<CourseForm {...props} />);
  const output = renderer.getRenderOutput();

  return {
    props,
    output,
    renderer
  };
}

describe('CourseForm via React Test Utils', () => {
  it('renders form and h1', () => {
    const {output} = setup();
    expect(output.type).toBe('form');

    let [h1] = output.props.children;
    expect(h1.type).toBe('h1');
  });

  it('labels submit button "Save" when not saving', () => {
    const {output} = setup(false);
    let submitButton = output.props.children[5];
    expect(submitButton.props.value).toBe('Save');
    expect(submitButton.props.disabled).toBe(false);
  });

  it('labels submit button "Saving..." when saving', () => {
    const {output} = setup(true);
    let submitButton = output.props.children[5];
    expect(submitButton.props.value).toBe('Saving...');
    expect(submitButton.props.disabled).toBe(true);
  });
});
