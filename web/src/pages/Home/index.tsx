import React from 'react';
import { FiLogIn, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './style.css';
import logo from '../../assets/logo.svg';

const Home = () => {
    return (
        <div id="page-home">
            <div className="content">
                <header>
                    <img src={logo} alt="Ecoleta"/>
                </header>
                <main>
                    <h1>Your marketplace of waste collection.</h1>
                    <p>We help people to find points of collection with more efficiency.</p>

                    <Link to="/register">
                        <span>
                            <FiLogIn />
                        </span>
                        <strong>Register a new collect point</strong>
                    </Link>
                    <Link to="/points">
                        <span>
                            <FiArrowRight />
                        </span>
                        <strong>See available points of collection</strong>
                    </Link>
                </main>
            </div>
        </div>
    );
}

export default Home;