import logo from '../../assets/logo.png';
import black from '../../assets/black.png';

const HomePage = () => {
  return (
    <div className="relative min-h-screen bg-mainPage bg-cover bg-center bg-fixed pt-20">
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative z-10 text-white">
        <div className='flex justify-center pt-8 mr-5'>
          <img src={logo} alt="Logo" className="w-24 h-24 mr-2 mb-1 filter brightness-[1.2] mt-4 " />
          <h1 className="text-gray-200 text-[70px] tracking-wider font-semibold pt-3.5 animate-typewriter">
            TFTStratify
          </h1>
        </div>
        <div className='flex justify-center font-semibold text-yellow-300 text-[20px] pb-5'>The Place for EVERYTHING TFT</div>
        <div className='flex justify-center text-[25px] text-center'>
          TFTStratify is the brand-new utility website to master your skills in Teamfight Tactics<br />
          and uncover the latest trends in the meta.Presenting the newest tier list and comps for <br />
           every patch, meticulously curated by our TFT experts Yaoyu</div>
        <div className='flex justify-center pt-10'>        
          <img src={black} className='w-[900px] h-[200px]'/>
        </div>
      </div>
      <div>
        <div></div>
      </div>
    </div>
  );
};

export default HomePage;