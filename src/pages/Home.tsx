import { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom'

import { database } from '../services/firebase';

import { useAuth } from "../hooks/useAuth";

import { Button } from '../components/Button'

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'

import '../styles/auth.scss'

export function Home() {
  const [roomCode, setRoomCode ] = useState('');
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();


  async function handleCreateRoom() {
    if(!user){
      await signInWithGoogle();
    }

    history.push("/rooms/new");
  }

  async function handleJoinRoom(event: FormEvent){
    event.preventDefault();

    if (roomCode.trim() === '') {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if(!roomRef.exists()){
      alert("Room does not exists!");
      return;
    }

    if(roomRef.val().endedAt){
      alert("Room already closed!")
      return ;
    }

    history.push(`/rooms/${roomCode}`)
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie sala de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas de sua audiência em tempo real</p>
      </aside>

      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <button onClick={handleCreateRoom}  className="create-room">
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o google
          </button>
          <div className="separator">Ou entre em uma sala</div>
          <form onSubmit={ handleJoinRoom } >
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={event =>  setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">
              Entrar na sala
            </Button>

          </form>
        </div>
      </main>
    </div>
  )
}