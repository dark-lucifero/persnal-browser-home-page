import logo from './logo.svg';
import './App.css';

import { useState, useEffect, useRef } from "react"

function App() {
    const [ websites, setWebsites ] = useState([]);
    const dialogRef = useRef(null);
    const containerRef = useRef(null);
    
    useEffect(() => {
        const alllWebsites = JSON.parse(localStorage.getItem('websites')) || [];
        setWebsites(alllWebsites)
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
    
    function handleDelete(e) {
        const websiteToDelete = e.target.dataset.url;
        const websites = JSON.parse(localStorage.getItem('websites')) || [];
        
        const indexToRemove = websites.indexOf(websiteToDelete);
        
        const newArray = [...websites];
        if (indexToRemove !== -1) {
            newArray.splice(indexToRemove, 1);
        }
        
        setWebsites(newArray)
        localStorage.setItem("websites", JSON.stringify(newArray))
    }
    
    function handleOpenWebsite(e) {
        const websiteToOpen = e.target.dataset.url;
        window.open(websiteToOpen, "_self")
    }
    
    return (
        <div className="App">
            
            <form onSubmit={handleSubmit} className="searchContainer">
                <img src="./google.png" className="googleLogo" />
                <input type="text" placeholder="search..." className="searchBar" />
            </form>
            
            <div className="commonUsed-container" ref={containerRef}>
                
                {
                    websites.map((website) => {
                        const url = new URL(website)
                        const websiteName = url.host.replace(/\.\w+$/i, '').replace(/^www\./, "");
                        
                        return (
                            <div className="commonUsed" data-url={website} key={website} onDoubleClick={handleDelete} onClick={handleOpenWebsite} >
                                <img src={`https://logo.clearbit.com/${url.hostname}`} className="logo" />
                                <div className="name">{websiteName}</div>
                            </div>
                        )
                    })
                }
                
                
                <div className="addButton commonUsed" 
                    onClick={handleOpenDialog}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="logo" viewBox="0 0 512 512"><path fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M256 112v288M400 256H112"/></svg>
                    <div className="name">addUrl</div>
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
