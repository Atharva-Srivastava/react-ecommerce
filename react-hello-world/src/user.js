import React from 'react'
import { Link } from 'react-router-dom'

function user(key, postId, name, description, price, imageUrl) {
    return (
        <div>
<nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
           <li className="navbar-item">
               <Link to ="/user" className="nav-link">Show Items</Link>
           </li>
           <li className="navbar-item">
               <Link to ="/upload" className="nav-link">Add New Items</Link>
           </li>
            </ul>
        </div>
        </nav>
       <section className="products bg-light">
      <div className="container text-center" id="products">
        <h1>OUR PRODUCTS</h1>
        <div className="row">
          <div className="col-lg-4 col-md-4 col-sm-12 col-10 d-block m-auto">
            <div className="card">
              <img src={imageUrl} className="card-img img-fluid"/>
              <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p className="card-text">{description}</p>
                <p className="card-text">{price}</p>
              </div>
            </div>
          </div>
       </div>
      </div>
    </section>
        </div>
    )
}

export default user
