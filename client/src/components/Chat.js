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
            
            this.setState({messageList: [this.state.messageList, <Message author={messageData.author} message={messageData.message} time={messageData.time} />]});

            console.log(this.state.messageList);
            await this.props.socket.emit("sendMessage", messageData);
        }
    }

    componentDidMount = () => {
        this.props.socket.on("receiveMessage", (data) => {
            this.setState({messageList: [this.state.messageList, <Message author={data.author} message={data.message } time={data.time} />]});
            console.log(this.state.messageList);
        });
    }

    arrayAddElement(array, element) {
        array = array.push(element)
        return array;
    }

    disconnect = () => {
        this.props.setShowChat(false);
    }

    render() {
        return (
            <div>
                <div id="chat-header">
                    {this.props.room} <button onClick={this.disconnect}>Verbindung Trennen</button>
                </div>
                <div id="chat-body">
                    {this.state.messageList}
                </div>
                <div id="chat-footer">
                    <input type="text" placeholder="..." onChange={(event) => {
                        this.setState({message: event.target.value});
                    }}
                      />
                    <button onClick={this.sendMessage}>Senden</button>
                </div>
            </div>

        )
    }
}