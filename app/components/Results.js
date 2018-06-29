import React, { Component } from 'react';
import queryString from 'query-string';
import api from '../utils/api';
import ReactRouter, { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import PlayerPreview from './PlayerPreview'



const Profile = (props) => {
  const info = props.info;
  return(
      <PlayerPreview 
      avatar={info.avatar_url}
      username={info.login}>

       {info.name && <li>{info.name}</li>}
        {info.location && <li>{info.location}</li>}
        {info.company && <li>{info.company}</li>}
        <li>Followers: {info.followers}</li>
        <li>Following: {info.following}</li>
        <li>Public Repos: {info.public_repos}</li>
      {info.blog && <li><a href={info.blog}>{info.blog}</a></li>}

      </PlayerPreview>
  )
}


const Player = (props) => {
    return(
        <div>
          <h1 className='header'>
              {props.label}
          </h1>
          <h3  style={{textAlign:'center'}}>
             Score: {props.score}
          </h3>
          <Profile info={
            props.profile
          }/>
        </div>
    )
}

Player.PropTypes ={
  score: PropTypes.number.isRequired,
  profile: PropTypes.string.isRequired,
  label: PropTypes.object.isRequired

}


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
          error:null,
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
      <div className='row'>
        <Player
        label='Winner'
        score={winner.score}
        profile={winner.profile}> 
        
        </Player>


       <Player
       label='Loser'
       score={loser.score}
       profile={loser.profile}> 
       
       </Player>
     </div>
    )
  }
}

export default Results 