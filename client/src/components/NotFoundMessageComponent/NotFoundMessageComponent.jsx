import React from 'react'
import { FaExclamationCircle } from "react-icons/fa";
const NotFoundMessageComponent = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <FaExclamationCircle style={{fontSize:'50px', color:'red'}}/>
      <h3 style={{ marginTop: "10px" }}>Không tìm thấy kết quả nào</h3>
    </div>
  )
}

export default NotFoundMessageComponent