//import { useEffect } from 'react'
// import { useContext } from 'react'
// import { ThemeContext } from '../../../../context/ThemeContext'
import MailchimpSubscribe from 'react-mailchimp-subscribe'
import SubscribeForm from './SubscribeForm'
// import style from './Subscribe.module.scss'

const Subscribe = () => {
    //   const [themeState] = useContext(ThemeContext)
    //   const dark = themeState.dark
    const url =
        'https://afengroup.us5.list-manage.com/subscribe/post?u=7bc3b4d151be407f269099f21&amp;id=ad4beb6d6a'
    return (
        <div
        //   className={`${style.subsContainer} ${
        //     dark === 'true' ? 'darkTheme' : 'lightTheme'
        //   }`}
        //   id="box"
        >
            <div
            //className={style.subsContent} 
            //id="join"
            >

                <MailchimpSubscribe
                    url={url}
                    render={({ subscribe, status, message }) => (
                        <div>
                            <SubscribeForm
                                status={status}
                                message={message}
                                onValidated={(formData) => subscribe(formData)}
                            />
                        </div>
                    )}
                />
            </div>
        </div>
    )
}

export default Subscribe
