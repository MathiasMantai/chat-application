import React from 'react';
import Message from './Message';

export default class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            messageList: []
        }
    }

    sendMessage = async () => {
        if(this.state.message !== "") {
            const messageData = {
                room: this.props.room,
                author: this.props.username,
                message: this.state.message,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }

            this.setState(
                {messageList: [this.state.messageList, 
                    <div className="w-full p-3">
                        <Message 
                            author={messageData.author} 
                            message={messageData.message} 
                            time={messageData.time} 
                            source="self" 
                        />
                    </div>
                ]}
            );

            await this.props.socket.emit("sendMessage", messageData);
            this.setState({message: ""});
        }
    }

    componentDidMount = () => {
        this.props.socket.on("receiveMessage", (data) => {
            this.setState({messageList: [this.state.messageList, 
                <div className="w-full p-3">
                    <Message 
                        author={data.author} 
                        message={data.message } 
                        time={data.time} 
                        source="other" 
                    />
                </div>
            ]});
        });
    }

    arrayAddElement = (array, element) => {
        array = array.push(element)
        return array;
    }

    disconnect = () => {
        this.props.setShowChat(false);
        this.props.socket.emit("disconnectRoom", this.props.room);
    }

    render = () => {
        return (
            <div className="w-2/3 sm:w-1/3">
                <div className="chat-header border border-md border-zinc-500 align-middle space-between flow-root">
                    <div className="float-left p-2">
                        User: {this.props.username} | Raum: {this.props.room}
                    </div> 
                    <div className="float-right">
                        <button className="bg-emerald-600 text-white p-2" onClick={this.disconnect}>
                            Verbindung Trennen
                        </button>
                    </div>
                </div>
                <div className="min-h-[50vh] max-h-[50vh] overflow-auto border border-md border-zinc-500">
                    {this.state.messageList}
                </div>
                <div className="chat-footer border border-md border-zinc-500">
                    <input type="text" className="w-5/6 p-2" placeholder="Deine Nachricht" value={this.state.message} onChange={(event) => {
                        this.setState(
                            {message: event.target.value}
                        );
                    }}
                      />
                    <button className="bg-emerald-600 text-white p-2 w-1/6" onClick={this.sendMessage}>Senden</button>
                </div>
            </div>
        )
    }
}