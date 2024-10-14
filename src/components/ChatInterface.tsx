'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Send } from 'lucide-react'
import LanguageSelector from '@/components/LanguageSelector'
import { useTranslation } from '@/hooks/useTranslation'
import MessageBubble from '@/components/MessageBubble'
import socket from '@/lib/socket'

interface Message {
  id: string
  content: string
  sender: {
    id: number
    username: string
  }
  language: string
  timestamp: Date
  translatedText?: string
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('en')
  const messageListRef = useRef<HTMLDivElement>(null)
  const { t } = useTranslation(selectedLanguage)

  useEffect(() => {
    // Join a room (you'll need to implement room selection)
    const roomId = '1' // Example room ID
    socket.emit('join_room', roomId)

    // Listen for new messages
    socket.on('receive_message', (message: Message) => {
      console.log('Received message:', message);
      setMessages(prevMessages => [...prevMessages, message])
    })

    return () => {
      socket.off('receive_message')
      socket.emit('leave_room', roomId)
    }
  }, [])

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        content: inputMessage,
        sender: {
          id: 0, // You might want to replace this with the actual user ID
          username: 'You'
        },
        language: selectedLanguage,
        timestamp: new Date(),
      }
      console.log('Sending message:', newMessage);
      socket.emit('send_message', newMessage)
      setMessages(prevMessages => [...prevMessages, newMessage]); // Add this line
      setInputMessage('')
    }
  }

  return (
    <div className="chat-container">
      <div className="message-list" ref={messageListRef}>
        {messages.map(message => (
          <MessageBubble key={message.id} message={message} userLanguage={selectedLanguage} />
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder={t('typeMessage')}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          className="input-field"
        />
        <button onClick={handleSendMessage} className="send-button">
          <Send className="h-5 w-5" />
        </button>
        <LanguageSelector
          selectedLanguage={selectedLanguage}
          onLanguageChange={setSelectedLanguage}
        />
      </div>
    </div>
  )
}
