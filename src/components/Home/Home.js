import React from 'react';
import { useContext } from 'react/cjs/react.production.min';
import AuthContext from '../../contextStore/auth-context';
import Button from '../UI/Button/Button';
import Card from '../UI/Card/Card';
import classes from './Home.module.css';

const Home = (props) => {
  const conxHk_AuConxObj= useContext(AuthContext);
  return (
    <Card className={classes.home}>
      <h1>Welcome back!</h1>
      <Button onClick={conxHk_AuConxObj.onLogout}>LogOut</Button>
    </Card>
  );
};

export default Home;
