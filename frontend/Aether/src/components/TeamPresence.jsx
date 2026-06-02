import { useEffect, useState } from 'react'
import socket from '../socket'

function TeamPresence() {

  const [users, setUsers] =
    useState([])

  useEffect(() => {

    socket.on(
      'onlineUsers',
      (onlineUsers) => {

        console.log(
          'Online Users:',
          onlineUsers
        )

        setUsers(
          onlineUsers
        )
      }
    )

    return () => {

      socket.off(
        'onlineUsers'
      )
    }

  }, [])

  return (

    <div className='bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-6'>

      <h2 className='text-2xl font-bold text-cyan-400 mb-6'>
        Online users
      </h2>

      <div className='space-y-4'>

        {users.length === 0 ? (

          <p className='text-slate-400'>
            No users online
          </p>

        ) : (

          users.map(user => (

            <div
              key={user.id}
              className='flex items-center gap-3'
            >

              <div className='w-3 h-3 rounded-full bg-green-500 animate-pulse' />

              <span className='font-semibold'>
                {user.name}
              </span>

              <span className='text-slate-400 text-sm'>
                ({user.role})
              </span>

            </div>

          ))

        )}

      </div>

    </div>

  )
}

export default TeamPresence