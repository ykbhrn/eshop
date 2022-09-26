import React from 'react';
import { showChat, newMessage } from '../../lib/api';
import { Link } from 'react-router-dom';
import {seo} from '../../lib/functions'

class Chats extends React.Component {
  state = {
    chat: [],
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
      const res = await showChat(chatId)
      this.setState({chat: res.data})

    } catch (err) {
      console.log(err);
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
      console.log(res.data)
    } catch (err) {
      console.log(err)
    }
    
  }

  render() {
    const { chat } = this.state

    if (!chat) return null
    return (
      <div className='register'>
        <div>
          {this.state.chat.textsArray &&
            <>
              {this.state.chat.textsArray.map(chat => {
                return <div key={chat._id}>{chat.textContent}</div>
              })}
            </>
          }
          
        </div>

        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleChange}
          />
        </form>
      </div>
    )
  }

}

export default Chats