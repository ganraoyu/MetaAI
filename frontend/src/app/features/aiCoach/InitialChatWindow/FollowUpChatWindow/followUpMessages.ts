export const getRandomFollowUpMessage = (): string => {
  const messages = [
    `Thank you for adding your user data! How can I assist you in your TFT journey today?`,
    `Data received! What aspect of your gameplay would you like me to analyze next?`,
    `Got it! Ready to explore your TFT stats and recommendations—where should we start?`,
    `Thanks for providing your info! How would you like me to help you improve your gameplay?`,
    `User data saved successfully! What insights are you looking for today?`,
    `All set! How can MetaAI guide you in mastering Teamfight Tactics now?`,
    `Thanks! Would you like to check your stats, build recommendations, or something else?`,
    `Great! Your data is in. What would you like to explore first in TFT?`,
    `Perfect! How can I assist you in climbing the TFT ranks today?`,
    `Thank you! Ready to provide insights and guidance—what should we focus on?`,
    `User info successfully recorded! Where shall we begin your TFT analysis?`,
    `Awesome! Your data is ready. Do you want to see your stats or get strategy tips?`,
    `Thanks for submitting your details! How may I help you optimize your team?`,
    `Data successfully added! What part of TFT would you like to dive into now?`,
    `Excellent! Your information is saved. Shall we review your gameplay or recommendations?`,
    `Thanks! How would you like MetaAI to assist you next? Stats, builds, or advice?`,
    `All done! Ready to explore your TFT performance. Where should we start?`,
    `Thank you! What area of your gameplay needs the most guidance today?`,
    `Great! Your Summoner Name and Tagline are in. What can I do for you next?`,
    `Perfect! How can I help enhance your TFT experience today?`
  ];

  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
};
  