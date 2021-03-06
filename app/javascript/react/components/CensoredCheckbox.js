import React, { Component } from 'react'

const CensoredCheckbox = (props) => {
    let payload = {id: props.id, censored: !props.checked}

    let handleSubmit = () => {
      props.handleCheck(payload)
    }
  return (
    <div>
      <label htmlFor="censored" style={{fontSize: "20px"}}>Censor articles?<br />(performance dramatically decreased)</label>
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
