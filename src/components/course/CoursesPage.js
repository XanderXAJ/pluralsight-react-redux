import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as courseActions from '../../actions/courseActions';

class CoursesPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      course: {title: ""}
    };

    // Binds could be turned in to arrow functions (whose 'this' is simply the surrounding object as seen in source code)
    // using the following Babel plugin, but it is currently only a proposal:
    // http://babeljs.io/docs/plugins/transform-class-properties/
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
  }

  onTitleChange(event) {
    const course = this.state.course;
    course.title = event.target.value;
    this.setState({course: course});
  }

  onClickSave() {
    this.props.dispatch(courseActions.createCourse(this.state.course));
  }

  render() {
    return (
        <div>
          <h1>Courses</h1>
          <h2>Add Course</h2>
          <input
            type="text"
            onChange={this.onTitleChange}
            value={this.state.course.title} />
          <input
            type="submit"
            value="Save"
            onClick={this.onClickSave} />
        </div>
    );
  }
}

CoursesPage.propTypes = {
  dispatch: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    courses: state.courses
  };
}

export default connect(mapStateToProps)(CoursesPage);
