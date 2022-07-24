import React from 'react';

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
            let tmp = this.state.messageList;
            tmp.push(messageData)
            this.setState({messageList: tmp});
            console.log(this.state.messageList);
            await this.props.socket.emit("sendMessage", messageData);
        }
    }

    componentDidMount = () => {
        this.props.socket.on("receiveMessage", (data) => {
            this.setState({messageList: this.state.messageList.push(data)});
            console.log(this.state.messageList);
        });
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
                    {/* {this.state.messageList.forEach((data) => {
                        return <h1>{data.message}</h1>
                    })} */}
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