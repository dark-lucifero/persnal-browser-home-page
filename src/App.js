import logo from './logo.svg';
import './App.css';

import { useState, useEffect, useRef } from "react"
import Items from "./Items"


function App() {
    const [ websites, setWebsites ] = useState([]);
    const dialogRef = useRef(null);
    const containerRef = useRef(null);
   const cardsRef = useRef([]);
   
    console.log(cardsRef.current)
    useEffect(() => {
        const alllWebsites = JSON.parse(localStorage.getItem('websites')) || [];
        setWebsites(alllWebsites)
        
        
        const cards = cardsRef.current;
        const wrapper = containerRef.current;
        
        
        const handleTouchMove = (e) => {
            const { clientX, clientY } = e.touches[0];
            
            cards.forEach((card) => {
                if(card == null) return
                const rect = card.getBoundingClientRect();
                const x = clientX - rect.left;
                const y = clientY - rect.top;
                card.style.backgroundImage = `radial-gradient(960px circle at ${x}px ${y}px, rgba(59, 248, 251, 1), transparent 15%)`;
            });
        };
        
        wrapper.addEventListener("touchmove", handleTouchMove);
        return () => {wrapper.removeEventListener("touchmove", handleTouchMove)}
        
    }, [])
    
    useEffect(() => {
        const isOdd = containerRef.current.children.length % 2 === 0;
        if (isOdd) {
            containerRef.current.classList.remove('odd-children');
        } else {
            containerRef.current.classList.add('odd-children'); 
        }
    }, [websites]);
    
    function handleSubmit(e) {
        e.preventDefault();
        const search = e.target[0].value;
        
        const url = `https://www.google.com/search?q=${search}&oq=${search}&gs_lcrp=EgZjaHJvbWUqDAgAECMYJxiABBiKBTIMCAAQIxgnGIAEGIoFMg8IARAuGEMYsQMYgAQYigUyDAgCEAAYQxiABBiKBTIMCAMQABhDGIAEGIoFMgwIBBAAGEMYgAQYigUyDwgFEC4YQxixAxiABBiKBTIHCAYQLhiABDIHCAcQLhiABDIHCAgQABiABDINCAkQLhjHARjRAxiABDIHCAoQLhiABDIHCAsQABiABDIHCAwQLhiABDIHCA0QABiABDIHCA4QABiABNIBBzg5NmowajSoAgCwAgA&sourceid=chrome-mobile&ie=UTF-8&hl=en`;
        
        window.open(url, "_self")
    }
    
    
    function handleOpenDialog() {
        dialogRef.current.showModal();
    }
    
    function handleCloseDialog() {
        dialogRef.current.close();
    }
    
    function handleAddWebsite(e) {
        e.preventDefault();
        const website = e.target[0].value;
        
        setWebsites([...websites, website])
        
        const urls = JSON.parse(localStorage.getItem('websites')) || [];
        urls.push(website);
        localStorage.setItem("websites", JSON.stringify(urls));
        dialogRef.current.close();
    }
    
    function handleDelete(websiteToDelete) {
        const websites = JSON.parse(localStorage.getItem('websites')) || [];
        
        const indexToRemove = websites.indexOf(websiteToDelete);
        
        const newArray = [...websites];
        if (indexToRemove !== -1) {
            newArray.splice(indexToRemove, 1);
        }
        
        setWebsites(newArray)
        localStorage.setItem("websites", JSON.stringify(newArray))
    }
    
    function handleOpenWebsite(url) {
        window.open(url, "_self")
    }
    
    return (
        <div className="App">
            
            <form onSubmit={handleSubmit} className="searchContainer">
                <img src="./google.png" className="googleLogo" />
                <input type="text" placeholder="search..." className="searchBar" />
            </form>
            
            <div className="commonUsed-container cards" ref={containerRef}>
                
                {
                
                    websites.map((url, index) => <Items url={url} handleOpenWebsite={handleOpenWebsite} handleDelete={handleDelete} cardsRef={cardsRef} index={index} /> )
                }
                
                
                <div className="card" 
                    onClick={handleOpenDialog}
                    ref={(el) => (cardsRef.current[cardsRef.current.length+1] = el)}
                >
                    <div className="card-content addButton commonUsed">
                        <svg xmlns="http://www.w3.org/2000/svg" className="logo" viewBox="0 0 512 512"><path fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M256 112v288M400 256H112"/></svg>
                        <div className="name">addUrl</div>
                    </div>
                </div>
                
            </div>
            
            <dialog className="addCommonUsedDailog" ref={dialogRef}>
                <button className="closeDialog" onClick={handleCloseDialog}>X</button>
                
                <form className="addUrls" onSubmit={handleAddWebsite}>
                    <input type="url" placeholder="url" />
                    <button type="submit" >Add</button>
                </form>
                
            </dialog>
            
        </div>
    );
}

export default App;
