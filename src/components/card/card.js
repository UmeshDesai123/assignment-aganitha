import React from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';

function Card({title, description}) {
  const navigate = useNavigate();

  return (
    <div
      className="card"
      onClick={() => navigate(`/${title}`)}
    >
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  )
}

export default Card;