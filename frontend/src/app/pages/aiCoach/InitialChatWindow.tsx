export const InitialChatWindow = () => {
  return (
    <div className="text-[0.85rem] px-4">
      <p>
        Hello! I'm MetaAI, your personal AI assistant for everything Teamfight Tactics. 
        <br />
        I'm here toprovide tips, insights, and in-depth data to help you improve your gameplay. 
        <br />
        If you'd like detailed, personalized stats, just enter your summoner name below!
      </p>
      <div>
        <div>
          <p>NA</p>
          
        </div>
        <div>
          <input placeholder="username" className="pl-2"/>
          <input placeholder="tagLine" className="pl-2" />
        </div>
        <button>What is TFT?</button>
        <button>How do I get started?</button>
      </div>
    </div>
  );
};
