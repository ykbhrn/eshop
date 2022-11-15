import React from 'react';
import { showChat, newMessage } from '../../lib/api';
import { Link, Redirect } from 'react-router-dom';
import {seo} from '../../lib/functions'
import SecondHandNavbar from '../second-hand/SecondHandNavbar';
import TextareaAutosize from 'react-textarea-autosize';

class PhoneChats extends React.Component {
  state = {
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

      const chatId = this.props.match.params.id
      const resTwo = await showChat(chatId)

      this.setState({oneChat: resTwo.data})
      
    } catch (err) {
      console.log(err);
      window.location.assign('/error')
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
    const reversedDiv = document.querySelector(".conversation-wrapper-reversed")

    try {
      const res = await newMessage(this.props.match.params.id, this.state.formData)
      const formData = { ...this.state.formData, textContent: '' }
      this.setState({formData})
      reversedDiv.scrollTop = 0
      this.componentDidMount()
      // this.loadChat(res.data._id)
    } catch (err) {
      console.log(err)
    }
    
  }

  render() {
    const { oneChat } = this.state

    if (!oneChat || !this.props.user) return null
    return (
      <>
        {/* <SecondHandNavbar /> */}

        <style>
          {'\
          .main-menu-wrapper{\
            display: none;\
          }\
          .phone-menu-wrapper{\
            display: none;\
          }\
          .footer-wrapper{\
            display: none;\
          }\
          '}
        </style>
      
        <div className='chat-page'>

          <div className='username-picture-onechat'>

            <Link className='chat-back' to="/chats">
              <i className="fa-solid fa-left-long"></i>
            </Link>

            <img src={this.state.oneChat.firstUserId === this.props.user._id ? this.state.oneChat.secondUserProfileImage : this.state.oneChat.firstUserProfileImage} />
            <h3>{this.state.oneChat.firstUserId === this.props.user._id ? this.state.oneChat.secondUserName : this.state.oneChat.firstUserName}</h3>
          </div>

          <div className='chats-form-right'>
            
            <div className="conversation-input-wrapper">
                
              <div className='conversation-wrapper-reversed'>
                <div className='conversation-wrapper'>

                  {this.state.oneChat.textsArray.map(text => {
                    const firstArray = text.updatedAt.split("T")
                    const dateArray = firstArray[0].split("-").reverse().join("/")
                    const timeArray = firstArray[1].split("")

                    //Temporary hard coded London time zone
                    timeArray[1] = Number(timeArray[1])
                    const finishedTimeArray = timeArray.slice(0, 5).join("")

                    return <div key={text._id} className={text.userId === this.props.user._id ? "chat-user-texts" : "chat-received-texts"}>
                      <div className='chat-text-content'>{text.textContent}</div>
                      <div className='chat-time-stamp'>{dateArray + " " + finishedTimeArray}</div>
                    </div>
                  })}
            
                </div>
              </div>

              <div className='chat-form' onSubmit={this.handleSubmit}>

                <TextareaAutosize
                  value={this.state.formData.textContent}
                  onChange={this.handleChange}
                />
                
                <img onClick={this.handleSubmit} src={this.state.formData.textContent ? "https://res.cloudinary.com/nuhippies/image/upload/v1667410869/Nu%20Hippies/icons/send_tb0ahp.png" : "https://res.cloudinary.com/nuhippies/image/upload/v1667410643/Nu%20Hippies/icons/send_ub5ud7.png"} />

              </div>
                
            </div>

          </div>
        
        </div>
      </>
    )
  }

}

export default PhoneChats