import './HeaderBlock.css'
export default function HeaderBlock(){
    return(
        <>
        <header className="navbar d-flex aline-item-center justify-content-center">
            <nav className="nav">
                <img className="logo" src="../muvie-logo.png" alt="" />
                <h1>ALL MUVIES</h1>
            </nav> 
        </header>
        </>
    )
}