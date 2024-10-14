'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Send } from 'lucide-react'
import LanguageSelector from '@/components/LanguageSelector'
import { useTranslation } from '@/hooks/useTranslation'
import MessageBubble from '@/components/MessageBubble'

interface Message {
  id: string
  text: string
  sender: string
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
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputMessage,
        sender: 'You',
        language: selectedLanguage,
        timestamp: new Date(),
        translatedText: 'This is a placeholder for translated text' // This should be replaced with actual translation
      }
      setMessages([...messages, newMessage])
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
