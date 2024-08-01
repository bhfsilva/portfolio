import { useEffect } from "react";
import { FiGithub } from "react-icons/fi";
import { FiMail } from "react-icons/fi";
import { FiLinkedin } from "react-icons/fi";
import SocialMediaLink from "/src/components/social-media-link";

export default function Home() {
  useEffect(() => {
    CSS.paintWorklet.addModule("https://unpkg.com/houdini-paint-dot-grid/dist/dot-grid-worklet.js");
  }, []);

  const socialMedias = [
    {url: "https://github.com/bhfsilva?tab=repositories", Icon: FiGithub, username: "bhfsilva", socialMediaName: "GitHub"},
    {url: "mailto:bhfs.contato@gmail.com", Icon: FiMail, username: "bhfs.contato@gmail.com", socialMediaName: "Email"},
    {url: "https://linkedin.com/in/bhfsilva", Icon: FiLinkedin, username: "Bruno Henrique", socialMediaName: "Linkedin"}
  ]

  return(
    <> 
        <header className="ver default-outer-container z-index-100 position-fixed left-0-px right-0-px height-125-px align-items-center">
            <div className="ver default-inner-container width-100-percent display-flex align-items-center justify-content-space-between">
                <img className="ver" src="/static/header/bh-logo.svg" alt="BH! Logo"/>
                <nav className="ver display-flex gap-35-px font-size-23-px">
                    <a href="#experiencias">Experiências</a>
                    <a href="#projetos">Projetos</a>
                    <a href="#contato">Contato</a>
                </nav>
            </div>
        </header>
        <main>
            <section className="ver default-outer-container position-relative top-125-px">
                <div className="ver position-relative height-600-px default-inner-container display-flex align-items-center gap-55-px">
                    <div className="ver display-flex flex-direction-column justify-content-space-between">
                        <h1 className="ver font-weight-normal font-size-3-rem">
                            Olá, me chamo <mark>Bruno Henrique!</mark>
                            <span id="waving-emoji" className="margin-left-10-px">&#128075;</span>
                        </h1>
                        <p className="ver margin-top-30-px margin-bottom-30-px width-55-percent font-size-23-px line-height-40-px text-align-justify">
                            Estou continuamente me especializando em desenvolvimento back-end, focando na criação de aplicações robustas e soluções criativas.
                            Com um vasto conhecimento em linguagens como Java, Python e frameworks JavaScript modernos,
                            busco sempre resolver os mais variados problemas buscando as melhores soluções!
                        </p>
                        <div className="ver display-flex flex-flow-wrap gap-70-px">
                            {socialMedias.map(socialMedia => (
                                <SocialMediaLink 
                                    Icon={socialMedia.Icon}
                                    url={socialMedia.url}
                                    username={socialMedia.username}
                                    socialMediaName={socialMedia.socialMediaName}
                                />
                            ))}
                        </div>
                    </div>
                    <img className="ver position-absolute top--90-px right--99-px z-index--1" src="/static/intro/background-blob.gif" alt="blob gif"/>
                </div>
            </section>
            {/* <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent et ligula at arcu vulputate eleifend. Sed ac erat risus. In nec congue tortor. Vivamus consectetur odio ultricies, ultricies eros id, molestie urna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sit amet ante vel quam pretium fermentum. Nulla et facilisis nisi. Phasellus sit amet dignissim justo. Mauris dapibus quam a nisi viverra, id rhoncus risus pulvinar. Mauris dignissim lobortis augue, sed efficitur orci. Quisque id tortor ipsum. Praesent nec ante maximus tortor scelerisque faucibus. In sed dui ut mauris commodo dignissim eu non ex.

                Suspendisse elementum venenatis velit et pretium. Cras ut arcu at turpis cursus dapibus. Suspendisse potenti. Nam sodales sollicitudin eros, sit amet efficitur augue commodo ut. Sed sollicitudin in ex ac posuere. Nulla convallis rhoncus tellus. Nunc interdum lacinia augue quis eleifend. Ut interdum scelerisque semper. Ut eros libero, varius eget tristique eget, porttitor a purus. Phasellus vitae lacus venenatis, maximus urna a, porta odio.

                Phasellus sit amet dui consequat, tristique ex sed, varius erat. Cras eu elit ante. Suspendisse suscipit odio ipsum, quis sagittis ipsum posuere a. In pellentesque tellus ac ipsum semper rutrum. Etiam a justo ac lacus sagittis pulvinar nec eget nisi. Ut tortor lorem, maximus non augue at, efficitur fringilla massa. Fusce non ipsum varius, blandit tortor ut, ullamcorper lectus. Praesent vel porta dolor. Nam quis lacus lorem. Nulla facilisi. Morbi finibus diam vitae dapibus elementum.

                Nulla at neque dapibus, ornare lacus id, condimentum est. Phasellus ac urna sollicitudin, cursus massa sed, suscipit felis. Duis id finibus erat. Maecenas consequat magna id dictum pellentesque. Integer laoreet varius lacinia. Ut mattis sollicitudin mi non malesuada. Maecenas maximus aliquet interdum. Vivamus nec massa nibh. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam elementum, erat sit amet ultrices dignissim, augue purus tristique leo, eget tempus massa sapien vitae tellus. Nunc lacus nisl, efficitur quis enim ut, viverra maximus velit. Nullam lobortis neque ac felis mollis, quis facilisis quam iaculis.

                Integer vehicula, dui sed tempus suscipit, orci erat mollis lorem, non lobortis elit orci non felis. Sed eu ultricies urna. Sed interdum vel massa ac mollis. Nam pellentesque leo est, id venenatis elit interdum sed. Maecenas in ex a orci convallis vehicula. Curabitur faucibus ligula eu nibh maximus molestie. Sed quis est a dolor placerat condimentum.

                Ut laoreet quis neque ac elementum. Nunc sed pretium eros. In nec ornare dolor, ac condimentum neque. Etiam pulvinar tempus lectus vitae volutpat. Nunc et convallis risus. Pellentesque in mauris massa. Vivamus imperdiet tempor risus eget pulvinar. Sed ut aliquam metus. Fusce rutrum libero non diam tincidunt tristique. Etiam vitae risus in neque euismod aliquet. Vestibulum molestie tellus vel turpis consequat condimentum. Proin consectetur ut dolor quis malesuada. In pellentesque justo ut lectus euismod, cursus hendrerit lectus dictum. Morbi feugiat facilisis tellus, quis pellentesque augue. Morbi quis mi at odio commodo venenatis vitae a erat.

                Quisque elit nisi, tempor a quam lacinia, mollis facilisis metus. Quisque risus velit, eleifend sit amet elit in, varius molestie augue. In velit sapien, posuere nec elit ut, fermentum mattis erat. Morbi iaculis urna eu turpis luctus placerat. Nunc fermentum tempus mauris vitae consequat. Maecenas sit amet dui efficitur turpis aliquet mollis id ut risus. Maecenas posuere sit amet felis quis laoreet. Maecenas fringilla ante convallis, feugiat lectus vel, vulputate velit. Fusce vehicula viverra lacus, a faucibus magna. Aliquam in massa et ipsum hendrerit volutpat vel quis ipsum. Ut sagittis ante nec pretium lobortis. Donec rutrum in ante vitae tincidunt. Integer sit amet nisi sit amet justo rhoncus auctor vel eget mauris. Nam id eleifend neque, non pellentesque lacus.

                Pellentesque et ullamcorper orci, varius sagittis odio. Donec varius ac justo vitae iaculis. Morbi nec nibh ultrices, tincidunt quam sit amet, tincidunt arcu. Vivamus dictum, nisi quis elementum luctus, nulla odio molestie ipsum, euismod molestie magna velit nec risus. In quis imperdiet lacus. Cras mauris nisi, rutrum ut placerat sed, cursus nec leo. Aenean vel ligula vel nisl tincidunt luctus. Aenean in dapibus lorem, at porttitor lacus.

                Fusce ut hendrerit neque. Sed fringilla semper lectus, a fringilla mi posuere ut. Mauris scelerisque malesuada consequat. Pellentesque ac neque tellus. Nunc fringilla enim quis ex vestibulum, eu auctor nisl mollis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras rutrum lectus vel tempus tincidunt. Maecenas non leo nec ex molestie faucibus. Vestibulum eleifend lectus eget eros tristique ornare.

                Integer pellentesque, ipsum id volutpat elementum, lorem quam rutrum mauris, ut tincidunt est lectus et metus. Proin rutrum iaculis convallis. Duis quis aliquet mi. Donec sollicitudin magna congue felis tempor, eget rutrum nisi fringilla. Ut suscipit bibendum lacus, quis tincidunt odio euismod cursus. Etiam pellentesque libero sit amet bibendum convallis. Cras aliquam massa a eros ornare, et tincidunt dolor ornare. Donec cursus sagittis dolor, quis dictum ex dapibus vitae. Nulla at imperdiet justo.

                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent et ligula at arcu vulputate eleifend. Sed ac erat risus. In nec congue tortor. Vivamus consectetur odio ultricies, ultricies eros id, molestie urna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sit amet ante vel quam pretium fermentum. Nulla et facilisis nisi. Phasellus sit amet dignissim justo. Mauris dapibus quam a nisi viverra, id rhoncus risus pulvinar. Mauris dignissim lobortis augue, sed efficitur orci. Quisque id tortor ipsum. Praesent nec ante maximus tortor scelerisque faucibus. In sed dui ut mauris commodo dignissim eu non ex.

                Suspendisse elementum venenatis velit et pretium. Cras ut arcu at turpis cursus dapibus. Suspendisse potenti. Nam sodales sollicitudin eros, sit amet efficitur augue commodo ut. Sed sollicitudin in ex ac posuere. Nulla convallis rhoncus tellus. Nunc interdum lacinia augue quis eleifend. Ut interdum scelerisque semper. Ut eros libero, varius eget tristique eget, porttitor a purus. Phasellus vitae lacus venenatis, maximus urna a, porta odio.

                Phasellus sit amet dui consequat, tristique ex sed, varius erat. Cras eu elit ante. Suspendisse suscipit odio ipsum, quis sagittis ipsum posuere a. In pellentesque tellus ac ipsum semper rutrum. Etiam a justo ac lacus sagittis pulvinar nec eget nisi. Ut tortor lorem, maximus non augue at, efficitur fringilla massa. Fusce non ipsum varius, blandit tortor ut, ullamcorper lectus. Praesent vel porta dolor. Nam quis lacus lorem. Nulla facilisi. Morbi finibus diam vitae dapibus elementum.

                Nulla at neque dapibus, ornare lacus id, condimentum est. Phasellus ac urna sollicitudin, cursus massa sed, suscipit felis. Duis id finibus erat. Maecenas consequat magna id dictum pellentesque. Integer laoreet varius lacinia. Ut mattis sollicitudin mi non malesuada. Maecenas maximus aliquet interdum. Vivamus nec massa nibh. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam elementum, erat sit amet ultrices dignissim, augue purus tristique leo, eget tempus massa sapien vitae tellus. Nunc lacus nisl, efficitur quis enim ut, viverra maximus velit. Nullam lobortis neque ac felis mollis, quis facilisis quam iaculis.

                Integer vehicula, dui sed tempus suscipit, orci erat mollis lorem, non lobortis elit orci non felis. Sed eu ultricies urna. Sed interdum vel massa ac mollis. Nam pellentesque leo est, id venenatis elit interdum sed. Maecenas in ex a orci convallis vehicula. Curabitur faucibus ligula eu nibh maximus molestie. Sed quis est a dolor placerat condimentum.

                Ut laoreet quis neque ac elementum. Nunc sed pretium eros. In nec ornare dolor, ac condimentum neque. Etiam pulvinar tempus lectus vitae volutpat. Nunc et convallis risus. Pellentesque in mauris massa. Vivamus imperdiet tempor risus eget pulvinar. Sed ut aliquam metus. Fusce rutrum libero non diam tincidunt tristique. Etiam vitae risus in neque euismod aliquet. Vestibulum molestie tellus vel turpis consequat condimentum. Proin consectetur ut dolor quis malesuada. In pellentesque justo ut lectus euismod, cursus hendrerit lectus dictum. Morbi feugiat facilisis tellus, quis pellentesque augue. Morbi quis mi at odio commodo venenatis vitae a erat.

                Quisque elit nisi, tempor a quam lacinia, mollis facilisis metus. Quisque risus velit, eleifend sit amet elit in, varius molestie augue. In velit sapien, posuere nec elit ut, fermentum mattis erat. Morbi iaculis urna eu turpis luctus placerat. Nunc fermentum tempus mauris vitae consequat. Maecenas sit amet dui efficitur turpis aliquet mollis id ut risus. Maecenas posuere sit amet felis quis laoreet. Maecenas fringilla ante convallis, feugiat lectus vel, vulputate velit. Fusce vehicula viverra lacus, a faucibus magna. Aliquam in massa et ipsum hendrerit volutpat vel quis ipsum. Ut sagittis ante nec pretium lobortis. Donec rutrum in ante vitae tincidunt. Integer sit amet nisi sit amet justo rhoncus auctor vel eget mauris. Nam id eleifend neque, non pellentesque lacus.

                Pellentesque et ullamcorper orci, varius sagittis odio. Donec varius ac justo vitae iaculis. Morbi nec nibh ultrices, tincidunt quam sit amet, tincidunt arcu. Vivamus dictum, nisi quis elementum luctus, nulla odio molestie ipsum, euismod molestie magna velit nec risus. In quis imperdiet lacus. Cras mauris nisi, rutrum ut placerat sed, cursus nec leo. Aenean vel ligula vel nisl tincidunt luctus. Aenean in dapibus lorem, at porttitor lacus.

                Fusce ut hendrerit neque. Sed fringilla semper lectus, a fringilla mi posuere ut. Mauris scelerisque malesuada consequat. Pellentesque ac neque tellus. Nunc fringilla enim quis ex vestibulum, eu auctor nisl mollis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras rutrum lectus vel tempus tincidunt. Maecenas non leo nec ex molestie faucibus. Vestibulum eleifend lectus eget eros tristique ornare.

                Integer pellentesque, ipsum id volutpat elementum, lorem quam rutrum mauris, ut tincidunt est lectus et metus. Proin rutrum iaculis convallis. Duis quis aliquet mi. Donec sollicitudin magna congue felis tempor, eget rutrum nisi fringilla. Ut suscipit bibendum lacus, quis tincidunt odio euismod cursus. Etiam pellentesque libero sit amet bibendum convallis. Cras aliquam massa a eros ornare, et tincidunt dolor ornare. Donec cursus sagittis dolor, quis dictum ex dapibus vitae. Nulla at imperdiet justo.
            </p> */}
        </main>
    </> 
  )
}