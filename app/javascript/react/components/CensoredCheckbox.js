import React, { Component } from 'react'

const CensoredCheckbox = (props) => {
    let payload = {id: props.id, censored: !props.checked}
    
    let handleSubmit = () => {
      props.handleCheck(payload)
    }
  return (
    <div>
      <label htmlFor="censored">Censor articles?</label>
      <input
        type="checkbox"
        name={props.name}
        checked={props.checked}
        onChange={handleSubmit}
      />
    </div>
  )
}

export default CensoredCheckbox;
