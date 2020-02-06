import React, { Component } from 'react'
import { BrowserRouter as Router, MemoryRouter, Route, Switch, withRouter } from 'react-router-dom'
import './App.scss'
import Generator from './component/Generator/generator'

class App extends Component {

    render() {
        return (
            <React.Fragment>

                <Route component={Generator} />
            </React.Fragment >
    )}

}

export default withRouter(App)