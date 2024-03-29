import { ButtonHTMLAttributes } from "react"

import "../styles/button.scss"

type buttonProps = ButtonHTMLAttributes<HTMLButtonElement>

export function Button(props: buttonProps){
  return (
    <button className="button" { ...props } >

    </button>
  )
}