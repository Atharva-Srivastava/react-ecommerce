import React, { Component, useState, useEffect} from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import Upload from './upload';
import { BrowserRouter as Router, Route} from "react-router-dom";
import Signin from './signup';
import User from "./user";
import Profile from './register'
import { db } from "./firebase";
class App extends Component {
  render() {
    const [items, setItems] = useState([]);
    useEffect(() => {
      // This is where the code runs
      db.collection('items').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
        // every time a new post is added, this code fires up
        setItems(snapshot.docs.map(doc => ({
          id: doc.id,
          post: doc.data()
        })));
       {items.map(({id, post}) => (
        <Users
            lang= {lang}
            postId={id}
            name={items.caption}
            description={items.description}
            price={items.price}
            imageUrl={items.imageUrl}
                        />
       ))}
      })
  }, []);
    return (
      <Router>
      <div className="App">
       <Route exact path="/"  component={Signin}/>
       <Route path="/sign" component={Profile}/>
       <Route path="/upload" component={Upload}/>
       <Route path="/user" component={User}/>
        </div>
       </Router>
    );
  }
}

export default App;
