import React, { useState } from 'react'
import { CommentOutlined } from '@ant-design/icons'
import _ from 'lodash'

const button = {
  width: '30ex',
  height: 50,
  fontWeight: 'bold',
  borderRadius: 10,
  fontSize: 18,
  backgroundColor: '#075e54',
  borderWidth: 0,
  color: '#fff',
  margin: 10
}


export default function UserLogin({ setUser }) {

  const [user, setAUser] = useState("")

  function handleSetUser() {
    if (!user) return
    localStorage.setItem("user", user)
    setUser(user)
    localStorage.setItem("avatar", `https://picsum.photos/id/${_.random(1, 1000)}/200/300`)

  }

  return (
    <div style={{
      position: 'absolute', left: '50%', top: '50%',
      transform: 'translate(-50%, -50%)'
    }}>
      <h1 style={{ margin: 10, textAlign: 'center' }}>  Parcharapon Chat </h1>

      <div style={{ display: 'flex', justifyContent: 'center' }}>

        <input
          style={{ margin: 10, height: 50, width: '50ex', borderRadius: 10, borderWidth: 4, fontSize: 17, paddingInline: 5 , borderColor: 'black'}}
          value={user}
          onChange={e => setAUser(e.target.value)}
          placeholder="กรอกชื่อที่ต้องการ"
        ></input>
        <button
          onClick={() => handleSetUser()}
          style={{width: '20ex' , height: '8ex' , fontWeight: 'bold' ,fontSize: 15 , backgroundColor: "black" , borderWidth: '0' , margin: '10px' , color:'white' ,borderRadius: '10px' , cursor: 'pointer'}}
        >
          แชท
        </button>

      </div>

    </div>
  )
}
