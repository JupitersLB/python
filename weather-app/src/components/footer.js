import { Github, Linkedin, Gmail } from '@icons-pack/react-simple-icons';


const Footer = props => {
  return (
    <>
      <div className="footer py-2 flex justify-center w-full">
        <a rel="noopener noreferrer" href="https://github.com/JupitersLB" target="_blank">
          <Github className="mr-3" color="#7BD15E" />
        </a>
        <a rel="noopener noreferrer" href="https://www.linkedin.com/in/jupiters-liam-baker/" target="_blank">
          <Linkedin className="mr-3" color="#7BD15E" />
        </a>
        <a rel="noopener noreferrer" href="mailto:liam.baker2310@gmail.com" target="_blank">
          <Gmail color="#7BD15E" />
        </a>
      </div>
    </>
  )

}

export default Footer;
