const Message = ({author, message, time}) => {
    return (
        <div className="">
            <div>
                {message}
            </div>
            <div className="flex flex-row content-between">
                <div>
                    {time}
                </div>
                <div>
                    {author}
                </div>
            </div>
        </div>
    )
}

export default Message;