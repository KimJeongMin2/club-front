import axios from "axios";

const notionToken = process.env.REACT_APP_API

console.log("noodnfoen", notionToken)
const instance = axios.create({
    
    baseURL: notionToken,
  });

export default instance;  