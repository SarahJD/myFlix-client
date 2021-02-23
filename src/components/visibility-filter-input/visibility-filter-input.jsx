import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';

import { setFilter } from '../../actions/actions';
import './visibility-filter-input.scss'; 
import { propTypes } from 'react-bootstrap/esm/Image';

function VisibilityFilterInput(props) {
  return <Form.Control className="input-filter"
    onChange={e => props.setFilter(e.target.value)}
    value={props.visibilityFilter}
    placeholder="Search for a Movie Title" 
  />;
}

export default connect(
  null,
  { setFilter }
) (VisibilityFilterInput);

VisibilityFilterInput.propTypes = {
  setFilter: propTypes.func,
  visibilityFilter: propTypes.func
}

