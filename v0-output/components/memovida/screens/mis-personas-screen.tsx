"use client"

import { useMemoVida, type Contact } from '@/lib/memovida-context'
import { TabletFrame } from '../tablet-frame'
import { Phone, Heart } from 'lucide-react'

const contacts: Contact[] = [
  {
    id: '1',
    name: 'Carlos',
    relation: 'Hijo',
    avatar: 'C',
    phone: '+52 555 123 4567'
  },
  {
    id: '2',
    name: 'Ana María',
    relation: 'Hija',
    avatar: 'A',
    phone: '+52 555 234 5678'
  },
  {
    id: '3',
    name: 'Pedro',
    relation: 'Nieto',
    avatar: 'P',
    phone: '+52 555 345 6789'
  },
  {
    id: '4',
    name: 'Sofía',
    relation: 'Nieta',
    avatar: 'S',
    phone: '+52 555 456 7890'
  },
  {
    id: '5',
    name: 'Rosa',
    relation: 'Hermana',
    avatar: 'R',
    phone: '+52 555 567 8901'
  },
  {
    id: '6',
    name: 'Dr. García',
    relation: 'Médico',
    avatar: 'D',
    phone: '+52 555 678 9012'
  },
]

const avatarColors = [
  'bg-blue-500',
  'bg-rose-500',
  'bg-emerald-500',
  'bg-purple-500',
  'bg-amber-500',
  'bg-teal-500',
]

export function MisPersonasScreen() {
  const { navigateTo, setSelectedContact } = useMemoVida()

  const handleCall = (contact: Contact) => {
    setSelectedContact(contact)
    navigateTo('videollamada')
  }

  return (
    <TabletFrame 
      title="Mis Personas" 
      showBackButton 
      showHomeButton
      headerColor="bg-teal-600"
    >
      <div className="p-6">
        <h2 className="text-xl text-muted-foreground mb-6">
          Toca a quien quieras contactar
        </h2>

        {/* Grid de contactos */}
        <div className="grid grid-cols-2 gap-4">
          {contacts.map((contact, index) => (
            <div
              key={contact.id}
              className="bg-card rounded-2xl p-5 border border-border"
            >
              {/* Avatar y nombre */}
              <div className="flex items-center gap-4 mb-4">
                <div className={`h-16 w-16 rounded-full ${avatarColors[index % avatarColors.length]} flex items-center justify-center text-white text-2xl font-bold`}>
                  {contact.avatar}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-card-foreground">{contact.name}</h3>
                  <p className="text-base text-muted-foreground flex items-center gap-1">
                    <Heart className="h-4 w-4 text-rose-400" />
                    {contact.relation}
                  </p>
                </div>
              </div>

              {/* Botón de llamada */}
              <button
                onClick={() => handleCall(contact)}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl py-3 flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="h-5 w-5" />
                <span className="font-medium text-lg">Llamar</span>
              </button>
            </div>
          ))}
        </div>

        {/* Contacto de emergencia */}
        <div className="mt-6 bg-rose-50 border-2 border-rose-200 rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-full bg-rose-500 flex items-center justify-center text-white">
                <Phone className="h-7 w-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-rose-700">Emergencia</h3>
                <p className="text-base text-rose-600">Ayuda inmediata</p>
              </div>
            </div>
            <button className="bg-rose-500 hover:bg-rose-600 text-white rounded-xl px-6 py-3 font-bold text-lg transition-colors">
              Llamar
            </button>
          </div>
        </div>
      </div>
    </TabletFrame>
  )
}
