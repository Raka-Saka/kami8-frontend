interface Participant {
  id: string
  name: string
  language: string
}

interface ParticipantListProps {
  participants: Participant[]
  t: (key: string) => string
}

export default function ParticipantList({ participants, t }: ParticipantListProps) {
  return (
    <div className="participant-list">
      <h2>{t('participants')}</h2>
      <ul>
        {participants.map((participant) => (
          <li key={participant.id} className="participant-item">
            {participant.name} ({participant.language})
          </li>
        ))}
      </ul>
    </div>
  )
}
