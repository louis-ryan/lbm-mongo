import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import io from 'Socket.IO-client'
import NoteComments from "./NoteComments";

let socket

const Comments = ({ conversation, setConversation, user, comment, handleChange, handleSubmit, screenSize }) => {

  const [instantMessage, setInstantMessage] = useState({})
  const [typing, setTyping] = useState({})

  const router = useRouter()


  /**
   * On instant message set conversation to show messages
   */
  useEffect(() => {
    if (!instantMessage.comment) return
    if (!conversation) return
    const newComments = [
      ...conversation.comments, {
        comment: instantMessage.comment,
        timeOfComment: Date.now(),
        posterId: instantMessage.user,
        posterName: instantMessage.userName,
        commentIsNew: false,
      }
    ]

    setConversation({
      ...conversation,
      comments: newComments
    })

    document.getElementsByName('comment')[0].value = "";
    document.getElementById('scroll-window').scrollTo(0, document.getElementById('scroll-page').offsetHeight);
  }, [instantMessage])


  /**
   * Get websocket info
   */
  useEffect(() => {
    const socketInitializer = async () => {
      await fetch('/api/socket')
      socket = io()

      socket.on('connect', () => {
        socket.emit('join-room', router.asPath)
      })

      socket.on('update-input', msg => {
        if (!msg) return
        const msgArr = msg.split('#')
        const msgObj = {
          comment: msgArr[0],
          user: msgArr[1],
          userName: msgArr[2]
        }
        setInstantMessage(msgObj)
      })

      socket.on('typing', msg => {
        if (!msg) return
        const msgArr = msg.split('#')
        const msgObj = {
          typing: (msgArr[0] === 'true' ? true : false),
          user: msgArr[1],
          userName: msgArr[2],
          picture: msgArr[3]
        }
        setTyping(msgObj)
      })
    }
    socketInitializer()
  }, [])


  /**
   * If comment string is not empty, show b client that a is typing
   */
  useEffect(() => {
    if (comment.length > 0) {
      socket.emit('typing', `true#${user.sub}#${user.given_name}#${user.picture}`, router.asPath)
    } else {
      setTimeout(() => {
        socket.emit('typing', `false`, router.asPath)
      }, 2000)
    }
  }, [comment])


  return (
    <>
      <form>
        <div
          id="scroll-window"
          style={{
            height: screenSize === 'DESKTOP' ? "calc(100vh - 320px)" : "calc(100vh - 400px)",
            overflowY: "scroll",
            padding: "8px"
          }}
        >
          <NoteComments
            conversation={conversation}
            user={user}
            typing={typing}

          />
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "16px",
            width: "100%",
            width: screenSize === 'DESKTOP' ? "920px" : "100%",
            display: screenSize === 'DESKTOP' && "flex",
            justifyContent: screenSize === 'DESKTOP' && "space-between",
            padding: screenSize === 'MOBILE' && "16px"
          }}
        >
          <div style={{ height: "24px" }} />

          <input
            id="messageBox"
            placeholder='Comment'
            value={comment ? comment : ''}
            name='comment'
            onChange={(e) => handleChange(e.target.value)}
            style={{
              width: screenSize === 'DESKTOP' ? "720px" : "100%",
              fontSize: "16px",
              padding: "32px 8px"
            }}
          />

          <div style={{ height: "24px", width: "16px" }} />

          <div
            id="send"
            className="button primary"
            onClick={() => {
              if (comment.length === 0) return
              socket.emit('input-change', `${comment}#${user.sub}#${user.given_name}`, router.asPath)
              socket.emit('typing', `false#${user.sub}`, router.asPath)
              handleSubmit(comment)
              document.getElementsByName('comment')[0].value = "";
              document.getElementById('scroll-window').scrollTo(0, document.getElementById('scroll-page').offsetHeight);
            }}
            style={{
              width: screenSize === 'DESKTOP' && "200px",
              transform: screenSize === 'DESKTOP' && "translateY(4px)",
              height: "64px",
              paddingTop: "22px"
            }}
          >
            Comment
          </div>
        </div>
      </form>
    </>
  )
}

export default Comments;