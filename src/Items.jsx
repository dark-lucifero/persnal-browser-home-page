import './App.css';

export default function Items({ url, handleDelete, handleOpenWebsite, cardsRef, index }) {
    const theUrl = new URL(url)
    const websiteName = theUrl.host.replace(/\.\w+$/i, '').replace(/^www\./, "");
    
    return (
        <div className="card" ref={(el) => (cardsRef.current[index] = el)} >
            <div 
                className="commonUsed card-content" 
                key={url}
                onDoubleClick={() => handleDelete(url)} 
                onClick={() => handleOpenWebsite(url)} 
                role="button" 
            >
                <img
                    src={`https://logo.clearbit.com/${theUrl.hostname}`} 
                    className="logo"
                    onDoubleClick={() => handleDelete(url)} 
                    onClick={() => handleOpenWebsite(url)} 
                />
                <div className="name" onDoubleClick={() => handleDelete(url)} onClick={() => handleOpenWebsite(url)} >{websiteName}</div>
            </div>
        </div>
    )
}