import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import logo from '../logo.png';
import styled from 'styled-components';
import {ButtonContainer} from './Button';

export default class Navbar extends Component{
    render(){
        return(
            <NavWrapper className='navbar navbar-expand-sm  navbar-dark px-sm-5'>
            <Link to='/'>
            <img src={logo} alt="e-mart" width='200' height='100' color='yellow' className="navbar-brand" />
            </Link>
            <ul className='navbar-nav align-item-center'>
            <li className='nav-item ml-5'>
            <Link to='/' className='nav-link'>
              E-Mart
              </Link>
            </li>

            </ul>
            <Link to='/cart' className='ml-auto'>
            <ButtonContainer>
                <span className='mr-2'>
                <i className='fa fa-cart-plus' />
                </span>
                Cart
            </ButtonContainer>
            </Link>
            </NavWrapper>
        );
    }
}
 
const NavWrapper=styled.nav`
background:var(--mainBlue);
.nav-link{
    color:var(--mainWhite) !important;
    font-size: 1.3rem;
    text-transform:capitalize;
}
`