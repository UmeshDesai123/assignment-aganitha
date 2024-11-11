import React from 'react'
import Card from '../../components/card/card';
import './style.css';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className='home-container'>
      <Card title='Book Finder' description='Build app for searching books'/>
      <Card title='Weather Now' description='Check the current weather conditions quickly for any city'/>
      <Card title='Recipe Ideas' description='Suggest idea using available ingredients'/>
      <Card title='Earthquake Visualizer' description='visualize recent earthquake activity around the world '/>
    </div>
  )
}

export default HomePage;