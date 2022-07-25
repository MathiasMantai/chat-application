const Message = ({author, message, time, source}) => {
    return (
        <div className={" grid mb-6 h-1/2 min-h-1/2 max-h-1/2 overflow-auto break-words " + (source === "self" ? "place-items-start" : "place-items-end") }>
            <div className="">
            <div className={"text-white text-left p-2 border border-md rounded-md " + (source === "self" ? "bg-emerald-600" : "bg-sky-600")}>
                {message}
            </div>
            <div className="flow-root text-sm">
                <div className="float-left mr-1">
                    {time}
                </div>
                <div className="float-right ml-1">
                    {author}
                </div>
            </div>
            </div>
        </div>
    )
}

export default Message;