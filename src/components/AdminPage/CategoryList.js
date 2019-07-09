import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as resourceAction from '../../action/resourceDataAction';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import Collapsible from 'react-collapsible';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export class CategoryList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: []
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(selected) {
    let { selectedCategory } = this.state;
    let index = selectedCategory.indexOf(selected);
    index !== -1 ? selectedCategory.splice(index, 1) : selectedCategory.push(selected);
    let filteredResource = this.props.resource.filter(resource => {
      return this.state.selectedCategory.some(searchCategory => resource.categories.split(',').map(item => item.trim()).includes(searchCategory));
    });
    this.props.actions.filterByCategories(selectedCategory.length > 0 ? filteredResource : this.props.resource);
  }

  categoryMenuItems() {
    return this.props.categories.map((cat) =>
      <FormGroup key={cat} check>
        <Input type="checkbox" key={cat} onChange={() => this.handleChange(cat)} />{cat}
      </FormGroup>);
  }
  render() {
    return (
      <Collapsible trigger={<label>Filter by Category <FontAwesomeIcon icon={'angle-down'}/></label>}
                   triggerWhenOpen={<label>Filter by Category <FontAwesomeIcon icon={'angle-up'}/></label>}
                   open={true}
                   transitionTime={100}>
        <Form>
          {this.categoryMenuItems()}
        </Form>
      </Collapsible>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    categories: state.categories,
    resource: state.resource
  }
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(resourceAction, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
