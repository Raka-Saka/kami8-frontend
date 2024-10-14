interface Message {
  id: string
  content: string
  sender?: {
    id: number
    username: string
  }
  language: string
  timestamp: Date
  translatedText?: string
}

interface MessageBubbleProps {
  message: Message
  userLanguage: string
}

export default function MessageBubble({ message, userLanguage }: MessageBubbleProps) {
  const isCurrentUser = message.sender?.username === 'You';

  return (
    <div className={`message-bubble ${isCurrentUser ? 'message-bubble-sender' : 'message-bubble-receiver'}`}>
      <p className="font-semibold">{message.sender?.username || 'Unknown'}</p>
      <p>{message.content}</p>
      <div className="flex items-center justify-between mt-2 text-xs opacity-70">
        <span>{new Date(message.timestamp).toLocaleTimeString()}</span>
        <img
          src={`https://flagcdn.com/16x12/${message.language}.png`}
          alt={`${message.language} flag`}
          className="w-4 h-3 ml-2"
        />
      </div>
    </div>
  )
}
