import React from 'react'
import './card.css';

export default function Card(props) {
  return (
    <>
    <div className="row my-2">
    <div className="col-12">
        <div className="card-header border" onClick={() => props.selectPost(props.number)}>
            <h4>{`${props.number}) ${props.title}`}</h4>
        </div>
        <div className="card-body border">
            {props.comment}
        </div>
    </div>
    </div>
    </>
  );
}
