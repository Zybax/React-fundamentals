import React, { Component } from 'react';
import PropTypes from 'prop-types';

 
var styles ={
    content:{
        textAlign: 'center',
        fontsize: '35px'
    }
}

class Loading extends Component {
    constructor(props) {
      super(props)
      this.state = {
         text: props.text
      }
    }

    componentDidMount(){

        var stopper = this.props.text + '...';

        this.interval = window.setInterval(function() {
            if (this.state.text === stopper) {
                this.setState(function () {
                  return {
                    text: this.props.text
                  }
                })
              } else {
                this.setState(function (prevState) {
                  return {
                    text: prevState.text + '.'
                  }
                });
        }
        }.bind(this), 300)
    }
    
  render() {
    return (
      <p style={styles.content}>
          {this.state.text}
      </p>
    )
  }
}

Loading.PropTypes ={
    text: PropTypes.string.isRequired
}

Loading.defaultProps = {
    text: 'Loading.'

}

export default Loading;
