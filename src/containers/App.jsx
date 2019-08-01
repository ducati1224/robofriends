import React, { Component } from 'react'
import { connect } from 'react-redux' 
import CardList from '../components/CardList'
import SearchBox from '../components/SearchBox'
import Scroll from '../components/Scroll'
import ErrorBoundary from '../components/ErrorBoundary'
import './App.css'
import { setSearchField, requestRobots } from '../action'
import Header from '../components/Header';


const mapStateToProps = state => {
  return {
    searchField: state.searchRobots.searchField,
    robots: state.requestRobots.robots,
    isPending: state.requestRobots.isPending,
    error: state.requestRobots.error
  }
}

const mapDispatchToProps = dispatch => ({
  onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
  onRequestRobots: () => dispatch(requestRobots())
})

class App extends Component {

  componentDidMount() {
    this.props.onRequestRobots()
    // fetch('https://jsonplaceholder.typicode.com/users')
    //   .then(res => res.json())
    //   .then(users =>
    //     this.setState({
    //       robots: users
    //     })
    //   )
  }

  render() {
    const filterRobots = this.props.robots.filter(robot => {
      return robot.name
        .toLocaleLowerCase()
        .includes(this.props.searchField.toLocaleLowerCase())
    })
    if (this.props.isPending) {
      return (
        <div className="tc">
          <h1 className="f1">LOADING...</h1>
        </div>
      )
    } else {
      return (
        <div className="tc">
          <Header />
          <SearchBox searchChange={this.props.onSearchChange} />
          <Scroll>
            <ErrorBoundary>
              <CardList robots={filterRobots} />
            </ErrorBoundary>
          </Scroll>
        </div>
      )
    }
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
