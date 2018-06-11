import React from 'react'
import {Gateway} from 'react-gateway'

import Lock from '@/containers/shared/Orientation/Locked'
import Shell, {Section, Footer} from '@/components/shared/Shell'
import LoadingView from '@/components/shared/Shell/LoadingView'
import Header from './Header'
import Navigation from './Navigation'

function renderElement(Element, props = {}) {
  if (React.isValidElement(Element)) return Element
  return <Element {...props} />
}

export default function ShellApp({lock, children, header, footer, ...props}) {
  return (
    <Lock to={lock}>
      <Shell {...props}>
        {children}
        {header && (
          <Gateway into="header">{renderElement(header, props)}</Gateway>
        )}
        {footer && (
          <Gateway into="footer">{renderElement(footer, props)}</Gateway>
        )}
      </Shell>
    </Lock>
  )
}

ShellApp.defaultProps = {
  lock: 'portrait',
  header: Header,
  footer: Navigation
}

export {Section, Header, Footer, Navigation, LoadingView}
