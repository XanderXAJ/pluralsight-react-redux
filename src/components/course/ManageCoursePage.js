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
  }

  render() {
    const {authors} = this.props;
    const {course, errors} = this.state;

    return (
        <CourseForm
            allAuthors={authors}
            course={course}
            errors={errors}
        />
    );
  }
}

ManageCoursePage.propTypes = {
  actions: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  course : PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  const course = {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''};

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
