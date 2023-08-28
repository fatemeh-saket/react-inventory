import Persion from '../Data/ir.json'
import English from '../Data/en.json'
import { useState } from 'react'
import { IntlProvider } from 'react-intl'
import ThemeContext from './ThemeContext'
const ContextProviderWrapper = (props) => {

    if (!window.localStorage.getItem("language")) {
        window.localStorage.setItem("language", "fa")
    }
    if (!window.localStorage.getItem("skin")) {
        window.localStorage.setItem("skin", "Light")
    }

    const menuMessages = {
        en: { ...English },
        fa: { ...Persion }
    }
    const [locale, setLocale] = useState(window.localStorage.getItem("language"))
    const [message, setMessage] = useState(menuMessages[locale])
    const [skin, setSkin] = useState(window.localStorage.getItem("skin"))
    const [isRtl, setIsRtl] = useState(window.localStorage.getItem("language") === "fa")

    const handleChangeLanguage = (value) => {

        if (value === "en") {
            setMessage(English)
            setLocale("en")
            setIsRtl(false)
            window.localStorage.setItem("language", "en")
        }
        if (value === "fa") {
            setMessage(Persion)
            setLocale("fa")
            setIsRtl(true)
            window.localStorage.setItem("language", "fa")
        }
    }
    const handleChangeColor = (value) => {
        if (value === "Light") {
            setSkin("Dark")
            window.localStorage.setItem("skin", "Dark")
            console.log("222")
        }
        if (value === "Dark") {
            setSkin("Light")
            window.localStorage.setItem("skin", "Light")
            console.log("1111")
        }
    }

    let ThemeValue = {
        locale: locale,
        skin: skin,
        isRtl: isRtl,
        changeLanguage: handleChangeLanguage,
        changeColor: handleChangeColor
    }
    return (
        <ThemeContext.Provider value={ThemeValue}  >
            <IntlProvider locale={locale} messages={message}>
                {props.children}
            </IntlProvider>
        </ThemeContext.Provider>

    )
}

export default ContextProviderWrapper