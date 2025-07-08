import './App.css';

export default function Items({ url, handleDelete, handleOpenWebsite, cardsRef, index }) {
    const theUrl = new URL(url)
    const websiteName = theUrl.host.replace(/\.\w+$/i, '').replace(/^www\./, "");
    
    
    return (
        <div className="card" ref={(el) => (cardsRef.current[index] = el)} onClick={() => handleOpenWebsite(url)} onDoubleClick={() => handleDelete(url) }  >
            <div 
                className="commonUsed card-content" 
                
                role="button" 
            >
                <img
                    src={`https://logo.clearbit.com/${theUrl.hostname}`} 
                    className="logo"
                    
                />
                <div className="name" >{websiteName}</div>
            </div>
        </div>
    )
}