import React, {useState} from "react"

export default function MemeComponent()
{
    // constructing an object in the 
    // state
    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        randomImage: ""
    })


    // all data from api is stored here
    const [allMeme, setAllMeme] = useState([])


    // using hooks for collecting the 
    // data from api
    React.useEffect(()=>{
        fetch("https://api.imgflip.com/get_memes")
        .then(res => res.json())
        .then(data => setAllMeme(data.data.memes))
    }, [])


    // getting the image url 
    // each time the button 
    // is clicked
    function getMemeImage()
    {
        const randomNumber = Math.floor(Math.random() * allMeme.length)
        // const url = allMeme[randomNumber].url
        const {url} = allMeme[randomNumber]
        
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))
    }


    // for two input fields
    function handleChange(event)
    {
        const {name, value} = event.target
        setMeme((prevData)=>{
            return({
                ...prevData,
                [name]: value
            });
        })
    }

    return (
        <main>
            <div className="form">
                <input 
                    type="text" 
                    className="form-inputs" 
                    placeholder="Top-text"
                    
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />

                <input 
                    type="text" 
                    className="form-inputs" 
                    placeholder="Bottom-text"
                    
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />
                
                <button 
                    className="form-button"
                    onClick={getMemeImage}
                >
                    Get a new meme image
                </button>
            </div>

            <div className="info">
                <img src={meme.randomImage} className="meme--image"/>
                <div className="top-bottom-text">
                    <h1 className="top-text">{meme.topText}</h1>
                    <h1 className="bottom-text">{meme.bottomText}</h1>
                </div>
            </div>
        </main>
    );
}
