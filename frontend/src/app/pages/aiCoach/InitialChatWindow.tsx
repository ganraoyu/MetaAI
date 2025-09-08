export const InitialChatWindow = () => {
  return (
    <div className="text-[0.85rem] px-4">
      <p>
        Hello! I'm MetaAI, your personal AI assistant for everything Teamfight Tactics.
        <br />
        <br />
        Enter your Summoner Name and Tagline below to get started!
      </p>
      <div>
        <div>
          <p>Region</p>
        </div>
        <div className="text-[0.75rem]">
          <input placeholder="Summoner Name" className="pl-2 m-2 rounded-md h-8 w-40"/>
          <input placeholder="Tagline" className="pl-2 m-2 rounded-md h-8 w-40" />
        </div>

        {/* Continuous scrolling buttons */}
        <div className="relative w-full h-10 overflow-hidden mt-4">
          <div className="flex animate-slide">
            {['What is TFT?', 'How do I get started?', 'Tips & Tricks', 'Meta Updates'].map((text, i) => (
              <button key={i} className="m-2 px-3 py-1 bg-[#1e1e1e] text-white rounded-md">{text}</button>
            ))}

            {/* Duplicate the buttons for seamless loop */}
            {['What is TFT?', 'How do I get started?', 'Tips & Tricks', 'Meta Updates'].map((text, i) => (
              <button key={`dup-${i}`} className="m-2 px-3 py-1 bg-[#1e1e1e] text-white rounded-md">{text}</button>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-slide {
          display: flex;
          width: max-content;
          animation: slide 10s linear infinite;
        }
      `}</style>
    </div>
  );
};
