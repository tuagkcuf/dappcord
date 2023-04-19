const Channels = ({ provider, account, dappcord, channels, currentChannel, setCurrentChannel }) => {
    const channelHandler = () => {
        console.log("click")
        
        return 
    }
    
    return (
        <div className="channels">
            <div className="channels__text">
                <h2>Text Channels</h2>
            </div>

            <div className="channels__voice">
                <h2>Voice Channels</h2>

                <ul>
                    {channels.map((channel, index) => (
                        <li 
                            key={index}
                            onClick={() => channelHandler(channel)}
                        >
                            {channel.name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Channels
