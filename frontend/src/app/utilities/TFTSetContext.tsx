import { useContext, useState, createContext, ReactNode } from "react";

type TFTSetContextType = {
set: string;
setSet: React.Dispatch<React.SetStateAction<string>>;
};

const TFTSetContext = createContext<TFTSetContextType>({
set: "SET13",
setSet: () => {},
});

export const TFTSetProvider = ({ children }: { children: ReactNode }) => {
	const [set, setSet] = useState("SET13");
	
	return (
			<TFTSetContext.Provider value={{ set, setSet }}>
						{children}
			</TFTSetContext.Provider>
	);	
}

export const useTFTSetContext = () => useContext(TFTSetContext);