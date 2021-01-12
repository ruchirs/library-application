import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Dashboard } from './dashboard/Dashboard'
import BookItem from './Books/BookItem'
import Books from './Books/Books'
import AddBook from './Books/AddBook'


export function Main() {
    return(
        <Switch>
            <Route path='/dashboard' component={Dashboard} />
            <Route path='/books' exact component={Books} />
            <Route path='/books/:id' component={BookItem} />
            <Route path='/add-book' component={AddBook} />
        </Switch>
    )
}