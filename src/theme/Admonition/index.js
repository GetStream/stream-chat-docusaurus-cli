import React from "react"

import clsx from "clsx"

import { ThemeClassNames } from "@docusaurus/theme-common"
import Translate from "@docusaurus/Translate"

import "./styles.scss"

function NoteIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M7 13.7A6.7 6.7 0 117 .3a6.7 6.7 0 010 13.4zm0-1.4A5.3 5.3 0 107 1.7a5.3 5.3 0 100 10.6zm-.7-8.6h1.4V5H6.3V3.7zm0 2.6h1.4v4H6.3v-4z" />
    </svg>
  )
}
function TipIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M7.5 14.6A7 7 0 117.5.4a7 7 0 010 14.2zM4.7 8.2a2.8 2.8 0 105.6 0H4.7zm0-1.4a1 1 0 100-2.1 1 1 0 000 2zm5.6 0a1 1 0 100-2.1 1 1 0 000 2z" />
    </svg>
  )
}
function DangerIcon() {
  return (
    <svg
      width="17"
      height="16"
      viewBox="0 0 17 16"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M9 15.3a5 5 0 005-5 5 5 0 00-.4-1.6c-1 1-2 1.6-2.5 1.6 2.7-4.6 1.2-6.6-2.8-9.3.3 3.3-1.9 4.8-2.8 5.7A5 5 0 009 15.3zm.4-11.8c2.2 1.8 2.2 3.2.5 6.2-.5.9.2 2 1.2 2 .5 0 1-.2 1.4-.4a3.7 3.7 0 11-6-3.6l.5-.5.7-.7a7 7 0 001.7-3z" />
    </svg>
  )
}
function InfoIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10 12.7H6c-.4 0-.7-.3-.7-.7v-.3c0-1-.4-1.9-1.1-2.6-1-1.1-1.6-2.5-1.5-4C2.8 2.3 5 .1 7.9 0H8a5.3 5.3 0 013.7 9.1c-.7.7-1 1.6-1 2.6v.3c0 .4-.3.7-.7.7zm-3.3-1.4h2.6a5 5 0 011.5-3.2c.8-.7 1.2-1.7 1.2-2.8a4 4 0 00-4-4 4 4 0 00-4 3.9 4 4 0 001.1 3c1 .9 1.5 2 1.6 3.1z" />
      <path d="M8 16a2.7 2.7 0 01-2.7-2.7V12c0-.4.3-.7.7-.7h4c.4 0 .7.3.7.7v1.3c0 1.5-1.2 2.7-2.7 2.7zm-1.3-3.3v.6c0 .8.6 1.4 1.3 1.4.7 0 1.3-.6 1.3-1.4v-.6H6.7zM6 6c-.4 0-.7-.3-.7-.7C5.3 4 6.5 2.7 8 2.7c.4 0 .7.2.7.6 0 .4-.3.7-.7.7-.7 0-1.3.6-1.3 1.3 0 .4-.3.7-.7.7z" />
    </svg>
  )
}
function CautionIcon() {
  return (
    <svg
      width="17"
      height="16"
      viewBox="0 0 17 16"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M16.3 15.3H1.6A.7.7 0 011 15a.6.6 0 010-.7L8.4 1c.2-.4.9-.4 1.2 0l7.3 13.3v.7c-.1.2-.3.3-.6.3zM2.8 14h12.4L9 2.7 2.8 14z" />
      <path d="M9 10.7c-.4 0-.7-.3-.7-.7V6.7c0-.4.3-.7.7-.7.4 0 .6.3.6.7V10c0 .4-.2.7-.6.7zM9.4 11.5a.7.7 0 11-1 1 .7.7 0 011-1z" />
      <path d="M9 13a1 1 0 01-1-1c0-.5.4-1 1-1 .5 0 1 .5 1 1s-.5 1-1 1zm0-1.3c-.2 0-.4.1-.4.3 0 .2.2.3.4.3s.3-.1.3-.3c0-.2-.1-.3-.3-.3z" />
    </svg>
  )
}
// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
const AdmonitionConfigs = {
  note: {
    infimaClassName: "secondary",
    iconComponent: NoteIcon,
    label: (
      <Translate
        id="theme.admonition.note"
        description="The default label used for the Note admonition (:::note)"
      >
        note
      </Translate>
    ),
  },
  tip: {
    infimaClassName: "success",
    iconComponent: TipIcon,
    label: (
      <Translate
        id="theme.admonition.success"
        description="The default label used for the Tip admonition (:::tip)"
      >
        success
      </Translate>
    ),
  },
  danger: {
    infimaClassName: "danger",
    iconComponent: DangerIcon,
    label: (
      <Translate
        id="theme.admonition.danger"
        description="The default label used for the Danger admonition (:::danger)"
      >
        danger
      </Translate>
    ),
  },
  info: {
    infimaClassName: "info",
    iconComponent: InfoIcon,
    label: (
      <Translate
        id="theme.admonition.tip"
        description="The default label used for the Info admonition (:::info)"
      >
        tip
      </Translate>
    ),
  },
  caution: {
    infimaClassName: "warning",
    iconComponent: CautionIcon,
    label: (
      <Translate
        id="theme.admonition.caution"
        description="The default label used for the Caution admonition (:::caution)"
      >
        caution
      </Translate>
    ),
  },
}
// Legacy aliases, undocumented but kept for retro-compatibility
const aliases = {
  secondary: "note",
  important: "info",
  success: "tip",
  warning: "danger",
}
function getAdmonitionConfig(unsafeType) {
  const type = aliases[unsafeType] ?? unsafeType
  const config = AdmonitionConfigs[type]
  if (config) {
    return config
  }
  console.warn(
    `No admonition config found for admonition type "${type}". Using Info as fallback.`
  )
  return AdmonitionConfigs.info
}
// Workaround because it's difficult in MDX v1 to provide a MDX title as props
// See https://github.com/facebook/docusaurus/pull/7152#issuecomment-1145779682
function extractMDXAdmonitionTitle(children) {
  const items = React.Children.toArray(children)
  const mdxAdmonitionTitle = items.find(
    item =>
      React.isValidElement(item) && item.props?.mdxType === "mdxAdmonitionTitle"
  )
  const rest = <>{items.filter(item => item !== mdxAdmonitionTitle)}</>
  return {
    mdxAdmonitionTitle,
    rest,
  }
}
function processAdmonitionProps(props) {
  const { mdxAdmonitionTitle, rest } = extractMDXAdmonitionTitle(props.children)
  return {
    ...props,
    title: props.title ?? mdxAdmonitionTitle,
    children: rest,
  }
}
export default function Admonition(props) {
  const {
    children,
    type,
    title,
    icon: iconProp,
  } = processAdmonitionProps(props)
  const typeConfig = getAdmonitionConfig(type)
  const titleLabel = title ?? typeConfig.label
  const { iconComponent: IconComponent } = typeConfig
  const icon = iconProp ?? <IconComponent />
  return (
    <div
      className={clsx(
        ThemeClassNames.common.admonition,
        ThemeClassNames.common.admonitionType(props.type),
        "alert",
        `alert--${typeConfig.infimaClassName}`,
        "admonition"
      )}
    >
      <div className="admonitionHeading">
        <span className="admonitionIcon">{icon}</span>
        {titleLabel}
      </div>
      <div className="admonitionContent">{children}</div>
    </div>
  )
}
