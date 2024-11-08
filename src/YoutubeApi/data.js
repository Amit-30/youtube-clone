const data = { 
    apiKey : String(import.meta.env.VITE_API_KEY)
}

export default data;

export const value_converter = (val) =>{
    if(val >= 1000000)
        return Math.floor(val/1000000)+'M';
    else if(val >= 1000)
        return Math.floor(val/1000)+'K';
    else
        return val;
}