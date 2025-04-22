import { faGithub, faYoutube, faPaypal, faTwitch} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Footer = () => {
  return (
    <div className="bg-mainBackground h-30 ">
      <div className='align-middle text-center pt-5'>
        <FontAwesomeIcon icon={faGithub} className="text-white text-xl px-3 h-7 w-7 hover:cursor-pointer" onClick={() => window.location.href = 'http://Github.com'}/>
        <FontAwesomeIcon icon={faYoutube} className="text-white text-xl px-3 h-7 w-7 hover:cursor-pointer"onClick={() => window.location.href = 'http://Youtube.com'}/>
        <FontAwesomeIcon icon={faPaypal} className="text-white text-xl px-3 h-7 w-7 hover:cursor-pointer"onClick={() => window.location.href = 'http://Paypal.com'}/>
        <FontAwesomeIcon icon={faTwitch} className="text-white text-xl px-3 h-7 w-7 hover:cursor-pointer"onClick={() => window.location.href = 'http://Twitch.com'}/>
      </div>
      <div className='flex justify-center text-white text-[12px] pt-6'>
        <p className='mr-8 hover:cursor-pointer'>Privacy Policy</p>
        <p className='hover:cursor-pointer'>Terms of Use</p>
      </div>
      <p className='text-white text-[10px] text-center'>
        © 2023 - 2025 TFTStratify. TFTStratify isn't endorsed by Riot Games and doesn't reflect the views or 
        opinions of Riot Games or anyone officially involved in producing or <br/> managing Riot Games properties. 
        Riot Games, and all associated properties are trademarks or registered trademarks of Riot Games, Inc.
      </p>
    </div>
  )
}

export default Footer