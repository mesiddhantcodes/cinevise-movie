import { GoogleGenerativeAI } from "@google/generative-ai";
import { OPENAI_KEY } from "../utils/constant";

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_OPEN_API_KEY);

export default genAI;
