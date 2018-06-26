import React, { Component } from 'react';
import queryString from 'query-string';
import api from '../utils/api';
import ReactRouter, { Link } from 'react-router-dom';

class Results extends Component {
  constructor(props) {
    super(props)
    this.state = {
        winner:null,
        loser:null,
        error:null,
        loading:true
    }
  }
  

  componentDidMount(){
    var players = queryString.parse(this.props.location.search);

    api.battle([
        players.playerOneName,
        players.playerTwoName
    ]).then((players)=>{
      if(players === null){
        return this.setState(() => {
          return{
            error:'There was an error, Check that the users do exist on Github',
            loading:false
          }
        });
      }
      

      this.setState(() => {
        return{
          error:'null',
          winner:players[0],
          loser:players[1],
          loading:false
        }
      });

    })
  }

  render() {
    const error = this.state.error;
    const winner = this.state.winner;
    const loser = this.state.loser;
    const loading = this.state.loading;

    if(loading === true){
      return <p>Loading...</p>
    }

    if(error){
      return(
        <div>
          <p>{this.state.error}</p>
          <Link to='/battle'>Reset</Link>
        </div>
      )
    }


    return (
      <div>
        {JSON.stringify(this.state,null,2)}
      </div>
    )
  }
}

export default Results 