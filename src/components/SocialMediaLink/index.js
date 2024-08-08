export default function SocialMediaLink({url, Icon, username, socialMediaName, size}) {

  let styles = {
    icon : ["font-size-3-rem"],
    socialMediaTitle: ["font-size-30-px"],
    username: ["font-size-23-px"]
  }

  if (size == "medium") {
    styles.icon = ["font-size-2-rem"]
    styles.socialMediaTitle = ["font-size-28-px"]
    styles.username = ["font-size-20-px"]
  }

  return (
    <a href={url} target="_blank" className="text-align-center">
      <Icon className={styles.icon.join(" ")}/>
      <h3 className={`${styles.socialMediaTitle.join(" ")} font-weight-500`}>{socialMediaName}</h3>
      <p className={styles.username.join(" ")}>{username}</p>
    </a>
  )
}