import React, { Component } from 'react'

const TextField = (props) => {
  let id = ""
  let label = ""
  if(props.className != undefined){
    id = props.className
    label = "label-group-new"
  }
  if(props.id == "comment"){
    id = props.id
    label = "label-comment"
  }
  return (
    <div>
      <label htmlFor={props.name} className={label}>{props.label}</label>
      <span>
        <input
          type="text"
          className="textField"
          name={props.name}
          value={props.content}
          onChange={props.handleChange}
          id={id}
        />
      </span>
    </div>
  )
}

export default TextField;
