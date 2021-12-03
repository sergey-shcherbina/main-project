import React, {useEffect, useContext} from "react"
import {fetchUsers} from "../http/userAPI"
import {observer} from "mobx-react-lite"
import {Context} from "../index"

const Admin = observer(() => {
  const {user} = useContext(Context)
  // const [tag, setTag] = useState("")
  useEffect(() => {
    fetchUsers().then(data => user.setUsersData(data))
  }, [])
  console.log(user.usersData)
  return (
    <div>
      {user.usersData.map(one => 
        <div key={one.id}>{one.id} {one.email} {one.password} {one.role}</div>
      )}
    </div>
  )
})

export default Admin
