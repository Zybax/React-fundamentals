import React, { Component } from 'react';
import PropTypes from 'prop-types';
const api = require('../utils/api');

// MENU COMPONENT

const SelectLanguage = (props) => {
    const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
    return(
            <ul className='languages'>
                {languages.map((lang,index) => {
                
                    return (
                        <li className='language'
                        style={lang === props.selectedLanguage ? {color: '#d0021b'}: null }
                        key={lang+index}
                        onClick={props.onSelect.bind(null, lang)}>
                            {lang}
                        </li>
                    )
                })}
            </ul>
    ) 
}

SelectLanguage.propTypes = {
     selectedLanguage: PropTypes.string.isRequired,
     onSelect: PropTypes.func.isRequired
}

// REPO GRID COMPONENT

const RepoGrid = (props) => {
    return (
        <ul className="popular-list">

            {props.repos.map((repo,index) => {
                return(
                <li className='popular-item' key={repo.name + repo.index}>
                    <div className='popular-rank'>
                        #{index + 1}
                    </div>
                    <ul className='space-list-items'>
                        <li className="avatar">
                            <img 
                            src={repo.owner.avatar_url}
                            alt={'Avatar for ' + repo.owner.login} />
                        </li>

                        <li className="">
                            <a href={repo.html_url}>{repo.name}</a>
                        </li>

                        <li className="">
                            @{repo.owner.login}
                        </li>

                        <li className="">
                            {repo.stargazers_count} stars 
                        </li>
                    </ul>
                </li>
                )
            })}
        </ul>
    )
}

RepoGrid.propTypes={
    repos: PropTypes.array.isRequired,
}

// POPULAR SECTION

class Popular extends Component {
    constructor (props){
        super(props);
        this.state = {
            selectedLanguage: 'All',
            repos:[]
        }
        this.updateLanguage = this.updateLanguage.bind(this);
    }


componentDidMount() {
    this.updateLanguage(this.selectedLanguage);
}

updateLanguage(lang){
    this.setState( () => {
       return {
            selectedLanguage : lang,
            repos:null
        }
    })
 
    api.fetchPopularRepos(lang)
    .then((repos)=>{
        
        this.setState( () => {
            return { 
                repos:repos
            }
        });

    });
    //.then(() =>{
    //     console.log(this.state.selectedLanguage)
    //     console.log(this.state.repos)
    //     }
    // )
}

  render() {   
    return (
        <div>
            <SelectLanguage
            selectedLanguage={this.state.selectedLanguage}
            onSelect={this.updateLanguage} />
            
            {!this.state.repos 
            ? <p>LOADING... </p>
            : <RepoGrid repos={this.state.repos} /> } 
        </div>
    )
  }
}

export default Popular
