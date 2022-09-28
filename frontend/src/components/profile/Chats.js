import React from 'react';
import { allUserChat, showChat, newMessage } from '../../lib/api';
import { Link, Redirect } from 'react-router-dom';
import {seo} from '../../lib/functions'

class Chats extends React.Component {
  state = {
    chats: [],
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
      this.loadChat(res.data._id)
    } catch (err) {
      console.log(err)
    }
    
  }

  render() {
    const { chats } = this.state

    if (!chats) return null
    console.log(this.state.chats)
    return (
      <div className='chat-page'>

        <div className='chats-container-left'>
          {this.state.chats.map(chat => {
            
            return <Link to ={`/chats/${chat._id}`} key={chat._id} className={chat._id === this.props.match.params.id ?  "chat-preview-wrapper active" : "chat-preview-wrapper"} 
              onClick={() => {
                this.loadChat(chat._id)
              }}>

              <img src={chat.isFirst ? chat.secondUserProfileImage : chat.firstUserProfileImage} />
              <div>{chat.isFirst ? chat.secondUserName : chat.firstUserName}</div>
          
            </Link>
          })}
        </div>

        <div className='chats-form-right'>
          {this.props.match.params.id &&
          <div className="conversation-input-wrapper">

            <div className='conversation-wrapper-reversed'>
              <div className='conversation-wrapper'>

                {this.state.oneChat  &&
              <>
                {this.state.oneChat.textsArray.map(text => {
                  return <div key={text._id} className={text.userId === this.props.user._id ? "chat-user-texts" : "chat-received-texts"}>
                    {text.textContent}
                  </div>
                })}
              </>
                }
            
              </div>
            </div>

            <form onSubmit={this.handleSubmit}>
              <input
                value={this.state.formData.textContent}
                onChange={this.handleChange}
              />
            </form>

          </div>
          }
        </div>
        
      </div>
    )
  }

}

export default Chats