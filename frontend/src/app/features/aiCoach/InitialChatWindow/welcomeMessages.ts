export const getRandomWelcomeMessage = (): string => {
  const messages = [
    `Hello Tactician! I'm MetaAI, your personal assistant for everything Teamfight Tactics.\n\nEnter your Summoner Name and Tagline below to start exploring your stats!`,
    `Hey there! I'm MetaAI, your AI guide to mastering Teamfight Tactics.\n\nType in your Summoner Name and Tagline to get personalized insights!`,
    `Greetings, Tactician! MetaAI here, ready to help you navigate everything TFT.\n\nEnter your Summoner Name and Tagline to see detailed recommendations!`,
    `Hi! MetaAI at your service, ready to guide you in Teamfight Tactics.\n\nProvide your Summoner Name and Tagline to begin!`,
    `Welcome, Tactician! MetaAI is here to provide insights for your TFT journey.\n\nEnter your Summoner Name and Tagline below to get started!`,
    `Hello! Ready to climb the ranks? I'm MetaAI, your assistant for TFT.\n\nInput your Summoner Name and Tagline to see your stats!`,
    `Greetings! MetaAI here to assist your Teamfight Tactics journey.\n\nType in your Summoner Name and Tagline for recommendations!`,
    `Hey, Tactician! Let's get started with MetaAI.\n\nEnter your Summoner Name and Tagline to explore your gameplay data!`,
    `Hi there! I'm MetaAI, ready to guide your TFT strategies.\n\nProvide your Summoner Name and Tagline for insights!`,
    `Welcome! MetaAI at your service.\n\nEnter your Summoner Name and Tagline to unlock TFT stats.`,
    `Hello Champion! MetaAI is ready to help you.\n\nInput your Summoner Name and Tagline to begin analysis.`,
    `Hey! I'm your TFT assistant, MetaAI.\n\nProvide your Summoner Name and Tagline for detailed insights.`,
    `Greetings, Summoner! MetaAI here to guide you.\n\nEnter your Summoner Name and Tagline to continue.`,
    `Hi! Let's optimize your TFT experience with MetaAI.\n\nType your Summoner Name and Tagline below.`,
    `Welcome back, Tactician! MetaAI at your side.\n\nInput Summoner Name and Tagline for stats.`,
    `Hello! Ready for more TFT insights? I'm MetaAI.\n\nEnter your Summoner Name and Tagline to start.`,
    `Hey there! MetaAI ready to guide your TFT play.\n\nProvide Summoner Name and Tagline to continue.`,
    `Greetings! Dive into TFT with MetaAI's help.\n\nEnter your Summoner Name and Tagline to unlock advice.`,
    `Hi! I'm MetaAI, your TFT guide.\n\nType your Summoner Name and Tagline to begin.`,
    `Welcome, Summoner! MetaAI ready to provide insights.\n\nInput your Summoner Name and Tagline.`
  ];

  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
};
