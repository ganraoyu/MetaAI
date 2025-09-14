export const getRandomWelcomeMessage = (): string => {
  const messages = [
    `Hello Tactician! I'm MetaAI, your personal assistant for everything Teamfight Tactics.\n\nEntering your Summoner Name and Tagline isn’t required, but if you’d like more personalized advice, you can input them below!`,
    `Hey there! I'm MetaAI, your AI guide to mastering Teamfight Tactics.\n\nYour Summoner Name and Tagline aren’t needed, but adding them gives better, personalized insights!`,
    `Greetings, Tactician! MetaAI here, ready to help you navigate everything TFT.\n\nIt’s optional to provide your Summoner Name and Tagline, but doing so lets me give you more tailored guidance!`,
    `Hi! MetaAI at your service, ready to guide you in Teamfight Tactics.\n\nYou don’t have to enter your Summoner Name, but if you want better advice, please provide it!`,
    `Welcome, Tactician! MetaAI is here to provide insights for your TFT journey.\n\nEntering your Summoner Name and Tagline isn’t necessary, but it allows for more detailed recommendations!`,
    `Hello! Ready to climb the ranks? I'm MetaAI, your assistant for TFT.\n\nYour Summoner Name and Tagline are optional, but adding them lets me give you more personal tips!`,
    `Greetings! MetaAI here to assist your Teamfight Tactics journey.\n\nYou can skip adding your Summoner Name, but including it will let me give more personalized guidance!`,
    `Hey, Tactician! Let's get started with MetaAI.\n\nProviding your Summoner Name and Tagline isn’t required, but it helps me offer deeper insights!`,
    `Hi there! I'm MetaAI, ready to guide your TFT strategies.\n\nIt’s optional to enter your Summoner Name and Tagline, but doing so allows for tailored advice!`,
    `Welcome! MetaAI at your service.\n\nEntering your Summoner Name isn’t needed, but adding it will unlock more personalized guidance!`,
    `Hello Champion! MetaAI is ready to help you.\n\nYou don’t have to input your Summoner Name, but if you do, I can give better recommendations!`,
    `Hey! I'm your TFT assistant, MetaAI.\n\nProviding your Summoner Name is optional, but it helps me give more personal insights!`,
    `Greetings, Summoner! MetaAI here to guide you.\n\nYour Summoner Name and Tagline aren’t required, but adding them allows for personalized advice!`,
    `Hi! Let's optimize your TFT experience with MetaAI.\n\nYou don’t have to enter your Summoner Name, but doing so gives better tailored guidance!`,
    `Welcome back, Tactician! MetaAI at your side.\n\nInputting your Summoner Name is optional, but it helps me provide more personalized stats!`,
    `Hello! Ready for more TFT insights? I'm MetaAI.\n\nYour Summoner Name isn’t necessary, but adding it lets me give better advice!`,
    `Hey there! MetaAI ready to guide your TFT play.\n\nProviding your Summoner Name and Tagline is optional, but doing so allows for tailored recommendations!`,
    `Greetings! Dive into TFT with MetaAI's help.\n\nIt’s not required to enter your Summoner Name, but including it unlocks more personalized tips!`,
    `Hi! I'm MetaAI, your TFT guide.\n\nYou don’t have to type your Summoner Name, but adding it allows me to give better guidance!`,
    `Welcome, Summoner! MetaAI ready to provide insights.\n\nEntering your Summoner Name is optional, but it helps me provide tailored advice!`
  ];

  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
};
