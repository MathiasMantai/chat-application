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
            //eigene nachrichten andere farbe als fremde
            //eigene nachrichtren nach rechts schieben
            this.setState(
                {messageList: [this.state.messageList, <div className="w-full"><Message author={messageData.author} message={messageData.message} time={messageData.time} source="self" /></div>]}
            );
            // console.log(this.state.messageList);
            await this.props.socket.emit("sendMessage", messageData);
            this.setState({message: ""});
        }
    }

    componentDidMount = () => {
        this.props.socket.on("receiveMessage", (data) => {
            this.setState(
                {messageList: [this.state.messageList, <div className="w-full"><Message author={data.author} message={data.message } time={data.time} source="other" /></div>]}
            );
            // console.log(this.state.messageList);
        });
    }

    arrayAddElement(array, element) {
        array = array.push(element)
        return array;
    }

    disconnect = () => {
        this.props.setShowChat(false);
        this.props.socket.emit("disconnectRoom", this.props.room);
    }

    render() {
        return (
            <div className="w-1/2 content-box border border-md border-black block">
                <div id="chat-header">
                    {this.props.room} <button onClick={this.disconnect}>Verbindung Trennen</button>
                </div>
                <div id="chat-body h-1/2 min-h-1/2 max-h-1/2 overflow-auto block p-2">
                    {this.state.messageList}
                </div>
                <div id="chat-footer">
                    <input type="text" placeholder="..." value={this.state.message} onChange={(event) => {
                        this.setState({message: event.target.value});
                    }}
                      />
                    <button className=""onClick={this.sendMessage}>Senden</button>
                </div>
            </div>
        )
    }
}