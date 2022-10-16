import React from 'react';
import { allUserChat, showChat, newMessage } from '../../lib/api';
import { Link, Redirect } from 'react-router-dom';
import {seo} from '../../lib/functions'
import SecondHandNavbar from '../second-hand/SecondHandNavbar';

class Chats extends React.Component {
  state = {
    chats: null,
    oneChat: null,
    formData: {
      textContent: null
    }
  }

  async componentDidMount() {
    try {
      window.scrollTo(0, 0)

      seo({
        title: "Messages | Nu Hippies",
        metaDescription: "All your chat history"
      });


      if (this.props.match.params.id) {
        const chatId = this.props.match.params.id
        const resTwo = await showChat(chatId)
        const res = await allUserChat()

        this.setState({chats: res.data, oneChat: resTwo.data})
      } else {
        const res = await allUserChat()

        this.setState({chats: res.data})
      }

    } catch (err) {
      console.log(err);
    }
  }

  loadChat = async (chatId) => {
    try {
      const res = await showChat(chatId)
      this.setState({oneChat: res.data})
    } catch (err) {
      console.log(err)
    }
  }

  handleChange = event => {
    const formData = { ...this.state.formData, textContent: event.target.value }
    this.setState({ formData })
  }

  handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const res = await newMessage(this.props.match.params.id, this.state.formData)
      const formData = { ...this.state.formData, textContent: '' }
      this.setState({formData})
      this.componentDidMount()
      // this.loadChat(res.data._id)
    } catch (err) {
      console.log(err)
    }
    
  }

  render() {
    const { chats } = this.state

    if (!chats) return null
    console.log(this.state.oneChat)
    return (
      <>
        <SecondHandNavbar />
      
        <div className='chat-page'>

          {!chats.length > 0 &&

            <h1 className='no-messages-header'>You don&apos;t have any conversations yet</h1>

          }

          <div className='chats-container-left'>
            {this.state.chats.map(chat => {
            
              return <Link to={`/chats/${chat._id}`} key={chat._id} className={chat._id === this.props.match.params.id ?  "chat-preview-wrapper active" : "chat-preview-wrapper"} 
                onClick={() => {
                  this.loadChat(chat._id)
                }}>
                
                <img src={chat.isFirst ? chat.secondUserProfileImage : chat.firstUserProfileImage} />

                <div className='chat-preview-name-message-wrapper'>
                  <div className='chat-preview-username'>{chat.isFirst ? chat.secondUserName : chat.firstUserName}</div>
                  <div className='chat-preview-last-message'>{chat.textsArray.length > 0 ? chat.textsArray[chat.textsArray.length - 1].textContent : ''}</div>
                </div>
              </Link>
            })}
          </div>

          <div className='chats-form-right'>
            {this.props.match.params.id &&
          <div className="conversation-input-wrapper">

            {this.state.oneChat  &&
              <>

                <div className='username-picture-onechat'>
                  <img src={this.state.oneChat.firstUserId === this.props.user._id ? this.state.oneChat.secondUserProfileImage : this.state.oneChat.firstUserProfileImage} />
                  <h3>{this.state.oneChat.firstUserId === this.props.user._id ? this.state.oneChat.secondUserName : this.state.oneChat.firstUserName}</h3>
                </div>
                
                <div className='conversation-wrapper-reversed'>
                  <div className='conversation-wrapper'>

                    {this.state.oneChat.textsArray.map(text => {
                      const firstArray = text.updatedAt.split("T")
                      const dateArray = firstArray[0].split("-").reverse().join("/")
                      const timeArray = firstArray[1].split("")

                      //Temporary hard coded London time zone
                      timeArray[1] = Number(timeArray[1]) + 1
                      const finishedTimeArray = timeArray.slice(0, 5).join("")

                      return <div key={text._id} className={text.userId === this.props.user._id ? "chat-user-texts" : "chat-received-texts"}>
                        <div className='chat-text-content'>{text.textContent}</div>
                        <div className='chat-time-stamp'>{dateArray + " " + finishedTimeArray}</div>
                      </div>
                    })}
            
                  </div>
                </div>

                <form onSubmit={this.handleSubmit}>
                  <textarea
                    value={this.state.formData.textContent}
                    onChange={this.handleChange}
                  />
                  <button className='classic-btn'>Send</button>
                </form>

              </>
            }

          </div>
            }
          </div>
        
        </div>
      </>
    )
  }

}

export default Chats