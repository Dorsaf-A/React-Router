import React from 'react'
import {data} from './ProductsData'
import { Link, Route, Switch } from "react-router-dom";
import { BrowserRouter as Router } from 'react-router-dom'
import Product from './Product'


const Products = ({match}) => {
    const handleUpdate = () => {
        
      };
      var linkList = data.map( (product) => {
        return(<Router >
          <li>
            <Link to={`${match.url}/${product.id}`} onClick={handleUpdate}>
              {product.name}
            </Link>
          </li></Router>
          )
    
        })
    
      return(<Router>
        <div>
            <div>
             <div>
               <h3> Products</h3>
               <ul> {linkList} </ul>
             </div>
            </div>
    
            <Route path={`${match.url}/:productId`}
            render={ (props) => <Product data= {data} {...props}  />}/>
        <Route exact path={match.url}
            render={() => (
            <div>Please select a product.</div>
            )}
        />
           
        </div>
</Router>
      )
    }


      export default Products