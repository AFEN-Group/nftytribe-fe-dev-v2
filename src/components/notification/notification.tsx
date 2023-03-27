import { useContext, useEffect, useState } from "react";
import NotificationIcon from "src/assets/svgs/notification";
import { ChainContext } from "src/context/chain";
import Protected from "src/hooks/AxiosConfig/axiosInstance";
import UseAxios from "src/hooks/AxiosConfig/useAxios";
import style from '../Header/Header.module.scss'

const Notification = (props:any) => {

  const { socketState } = useContext(ChainContext)
  console.log(socketState);
 
  useEffect(() => {
    socketState?.on('notification', (cont: any) => {
    setData([cont,...data])

    })
  }, [socketState])
  // const [hasUnreadNotification, setUnreadNotification] =
  //   useState<boolean>(false);
  const [nots, setNots] = useState(false)
  const not = UseAxios()
  const [data,setData]=useState<any>()
  useEffect(() => {
    not.fetchData({
      url: 'api/notifications',
      method: 'get',
      axiosInstance: Protected(sessionStorage.getItem('token'))
    })
  }, [])
 
  useEffect(()=>{
    setData(not?.Response?.data?.results)
  },[not?.Response])
   
  const hasUnreadNotification= data?.filter((datum :any)=>
    datum.isRead===false
  )
 console.log(hasUnreadNotification);
 
 
  return (
    <div
      onClick={() => {
        
        setNots(!nots)}}
      style={{ cursor: "pointer", position: "relative" }}
      className="notification-icon">
      {hasUnreadNotification?.length>0 && (
        <div
          className="unread-notification"
          style={{
            width: 15,
            height: 15,
            borderRadius: "50%",
            backgroundColor: "#f03738",
            position: "absolute",
            top: -2,
            right: -5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <span
            style={{
              display: "block",
              borderRadius: "50%",
              padding: 3,
              backgroundColor: "white",
            }}></span>
        </div>
      )}
      {nots && <div onClick={() => setNots(!nots)} className={style.notification}>
        <h2>Notifications    <svg width="23" height="25" viewBox="0 0 23 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18.033 6.44332L16.6948 5.026L11.3893 10.645L6.08384 5.026L4.74561 6.44332L10.0511 12.0624L4.74561 17.6814L6.08384 19.0987L11.3893 13.4797L16.6948 19.0987L18.033 17.6814L12.7275 12.0624L18.033 6.44332Z" fill="#1F1F1F" />
        </svg>
        </h2>

        {data?.map((not: any) => (<div className="nots">
          <svg onClick={() => setNots(!nots)} width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.76811 2.91573C8.09721 2.53864 8.05831 1.96616 7.68122 1.63705C7.30413 1.30795 6.73164 1.34685 6.40254 1.72394L4.8416 3.51248C3.95618 4.527 3.45565 5.82054 3.42758 7.16681L3.35909 10.4506C3.34865 10.951 3.74584 11.3652 4.24624 11.3756C4.74664 11.386 5.16076 10.9888 5.17119 10.4884L5.23968 7.2046C5.25889 6.28347 5.60136 5.39842 6.20717 4.70427L7.76811 2.91573Z" fill="#18181B" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.53635 9.30513C7.70419 6.62175 9.92945 4.53132 12.6181 4.53132H13.2916V3.62507C13.2916 2.95772 13.8326 2.41674 14.5 2.41674C15.1673 2.41674 15.7083 2.95772 15.7083 3.62507V4.53132H16.3818C19.0705 4.53132 21.2957 6.62175 21.4636 9.30513L21.7306 13.5747C21.8324 15.2026 22.3789 16.7713 23.3106 18.1101C24.1524 19.3197 23.403 20.9903 21.9398 21.1659L17.8229 21.6599V22.9584C17.8229 24.7936 16.3352 26.2813 14.5 26.2813C12.6648 26.2813 11.177 24.7936 11.177 22.9584V21.6599L7.0601 21.1659C5.59689 20.9903 4.84746 19.3197 5.68928 18.1101C6.62098 16.7713 7.16749 15.2026 7.26931 13.5747L7.53635 9.30513ZM12.6181 6.34382C10.8865 6.34382 9.45341 7.69011 9.34532 9.41828L9.07827 13.6879C8.95576 15.6467 8.29811 17.5344 7.17696 19.1454C7.11612 19.2328 7.17028 19.3536 7.27605 19.3663L11.7924 19.9082C13.591 20.1241 15.4089 20.1241 17.2075 19.9082L21.7239 19.3663C21.8296 19.3536 21.8838 19.2328 21.8229 19.1454C20.7018 17.5344 20.0441 15.6467 19.9216 13.6879L19.6546 9.41827C19.5465 7.69011 18.1134 6.34382 16.3818 6.34382H12.6181ZM14.5 24.4688C13.6658 24.4688 12.9895 23.7926 12.9895 22.9584V22.0522H16.0104V22.9584C16.0104 23.7926 15.3341 24.4688 14.5 24.4688Z" fill="#18181B" />
            <path d="M21.3187 1.63705C20.9416 1.96616 20.9027 2.53864 21.2318 2.91573L22.7927 4.70427C23.3986 5.39842 23.741 6.28347 23.7602 7.2046L23.8287 10.4884C23.8392 10.9888 24.2533 11.386 24.7537 11.3756C25.2541 11.3652 25.6513 10.951 25.6408 10.4506L25.5723 7.16681C25.5443 5.82054 25.0437 4.527 24.1583 3.51248L22.5974 1.72394C22.2683 1.34685 21.6958 1.30795 21.3187 1.63705Z" fill="#18181B" />
          </svg>
          <p>{not.text}</p>
        </div>))}
      </div>}
      <NotificationIcon />
    </div>
  );
};
export default Notification;
