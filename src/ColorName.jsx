import React, { memo } from 'react';
import { Handle } from 'react-flow-renderer';
import './ColorName.css'
export default memo(({ data, isConnectable }) => {
  return (
    <div className='ColorName'>
      <Handle
        type="target"
        position="left"
        id="m"
        style={{ background: '#ff1414' }}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />
      <div>
        <label htmlFor="text"> You have picked </label>
        <strong>{data.label} color</strong>
        
      </div>
      
    </div>
  );
});
