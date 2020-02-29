import React from 'react';
import './style.scss';

function TargetView(props) {

    const {value, target} = props

    const getPercent = (value, target) => ((value * 100) / target || 0).toFixed(2) + '%'

    return (
      <div className="target-view">
        <h1>Já atingimos {getPercent(value, target)} de nossa meta</h1>
        <h2>Obrigado por sua contribuição!</h2>
        <div className='target-container'>
            <div className='view' style={{width:getPercent(value, target)}}></div>
        </div>
      </div>
  );
}

export default TargetView;
