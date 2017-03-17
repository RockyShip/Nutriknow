import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as TodoActions from '../actions';
import Home from '../components/Home';
// import Login from "../components/Login";

const socket = require('socket.io-client')();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    socket.on('data_update', (input) => {
      const data = {
        macros: [{ name: 'Protein', quantity: input[0] },
                { name: 'Fat', quantity: input[1] },
                { name: 'Carbs', quantity: input[2] },
                { name: 'Calories', quantity: input[3] },
                { name: 'Sugar', quantity: input[4] },
                { name: 'Fiber', quantity: input[5] }],
        micros: [{ name: 'Calcium', quantity: input[6] },
                { name: 'Iron', quantity: input[7] },
                { name: 'Magnesium', quantity: input[8] },
                { name: 'Phosphorus', quantity: input[9] },
                { name: 'Potassium', quantity: input[10] },
                { name: 'Sodium', quantity: input[11] },
                { name: 'Zinc', quantity: input[12] },
                { name: 'Copper', quantity: input[13] },
                { name: 'Fluoride', quantity: input[14] },
                { name: 'Manganese', quantity: input[15] },
                { name: 'Selenium', quantity: input[16] },
                { name: 'Vitamin A', quantity: input[17] },
                { name: 'Vitamin E', quantity: input[19] },
                { name: 'Vitamin D2', quantity: input[20] },
                { name: 'Vitamin D3', quantity: input[21] },
                { name: 'Vitamin D', quantity: input[22] },
                { name: 'Vitamin C', quantity: input[23] },
                { name: 'Vitamin B6', quantity: input[24] },
                { name: 'Vitamin B12', quantity: input[25] },
                { name: 'Vitamin K', quantity: input[26] },
                { name: 'Vitamin E', quantity: input[27] },
                { name: 'Cholesterol', quantity: input[29] }],
      };
      this.setState(data);
      console.log('recieved');
    });
  }

  render() {
    return (
      <div>
        <Home data={this.state} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  page: state.page,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(TodoActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
