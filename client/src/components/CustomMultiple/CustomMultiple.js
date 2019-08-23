import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleSpecialNeeds } from '../../actions/project';
import './CustomMultiple.scss';

class CustomMultiple extends Component { 

  constructor(props) {
    super(props);
    this.state = {
      inputs: ['input-0']
    }
  }

  addNewField = () => {
    const newInput = `input-${this.state.inputs.length}`;
    this.setState(prevState => ({
      inputs: [...prevState.inputs, newInput]
    }));
  }

  render() {
    const {
      mainDivClasses,
      controlClasses, 
      label
    } = this.props;
    const { inputs } = this.state;
    
    return (
      <div className="custom-multiple">
        <label className="label">{label}</label>
        <div className={`custom-multiple__wrapper field ${mainDivClasses}`}>
          {inputs.map((input, i) => {
            return (
              <div 
                key={input} 
                className={`custom-multiple__control control ${controlClasses}`}
              >
                <span className="custom-multiple__numbering">
                  {`${i + 1}.`}
                </span>
                <input 
                  name="specialNeeds"
                  onChange={(e) => this.props.handleMultipleInput(input, e.target.value)}
                  className="custom-multiple__input" 
                  type="text"
                  placeholder={`Opção ${ i + 1}`} 
                />
              </div>
            );
          })}
        </div>
        <span className="custom-multiple__numbering-btn">
          {`${this.state.inputs.length + 1}.`}
        </span>
        <button 
          className="custom-multiple__btn"
          type="button"
          onClick={this.addNewField}
        >
          Adicionar mais um campo
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  projectForm: state.project
})

const mapDispatchToProps = dispatch => ({
  handleMultipleInput: (id, value) => {
    dispatch(handleSpecialNeeds(id, value));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomMultiple);