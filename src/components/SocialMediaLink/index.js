export default function SocialMediaLink({url, Icon, username, socialMediaName}) {
  return (
    <a href={url} target="_blank" className="text-align-center">
      <Icon className="font-size-3-rem"/>
      <h3 className="font-size-30-px font-weight-500">{socialMediaName}</h3>
      <p className="font-size-23-px">{username}</p>
    </a>
  )
}