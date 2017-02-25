import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from '../../actions/courseActions';
import CourseForm from './CourseForm';

class ManageCoursePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      course: Object.assign({}, this.props.course),
      errors: {}
    };

    this.updateCourseState = this.updateCourseState.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.course.id !== nextProps.course.id) {
      // Necessary to populate form when existing course URL is loaded directly
      this.setState({course: Object.assign({}, nextProps.course)});
    }
  }

  updateCourseState(event) {
    const field = event.target.name;
    let course = this.state.course;
    course[field] = event.target.value;
    return this.setState({course});
  }

  saveCourse(event) {
    event.preventDefault();
    this.props.actions.saveCourse(this.state.course);
    this.context.router.push('/courses');
  }

  render() {
    const {authors} = this.props;
    const {course, errors} = this.state;

    return (
        <CourseForm
            allAuthors={authors}
            course={course}
            errors={errors}
            onChange={this.updateCourseState}
            onSave={this.saveCourse}
        />
    );
  }
}

ManageCoursePage.propTypes = {
  actions: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  course : PropTypes.object.isRequired
};

// Context becomes available in this.context
ManageCoursePage.contextTypes = {
  router: PropTypes.object
};

function getCourseById(courses, id) {
  return courses.find(course => course.id === id);
}

function mapStateToProps(state, ownProps) {
  const courseId = ownProps.params.id; // Corresponds to `:id` in route configuration

  let course = {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''};
  if (courseId && state.courses.length > 0) {
    course = getCourseById(state.courses, courseId);
  }

  const formatAuthorsForSelectInput = state.authors.map(author => {
    return {
      value: author.id,
      text: author.firstName + ' ' + author.lastName
    };
  });

  return {
    course,
    authors: formatAuthorsForSelectInput
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
