export default function SocialMediaLink({url, Icon, username, socialMediaName, size}) {

  let styles = {
    icon : ["font-size-3-rem"],
    socialMediaTitle: ["font-size-2-rem"],
    username: ["font-size-1-dot-3-rem"]
  }

  if (size == "medium") {
    styles.icon = ["font-size-2-rem"]
    styles.socialMediaTitle = ["font-size-1-dot-3-rem"]
    styles.username = ["font-size-1-dot-1-rem"]
  }

  return (
    <a href={url} target="_blank" className="text-align-center">
      <Icon className={styles.icon.join(" ")}/>
      <h3 className={`${styles.socialMediaTitle.join(" ")} font-weight-500`}>{socialMediaName}</h3>
      <p className={styles.username.join(" ")}>{username}</p>
    </a>
  )
}