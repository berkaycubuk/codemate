<script lang="ts">
  import { personStore } from '../store'
  import type { User } from "../types";

  let user: User | any
  let connection: string | any = null

  export let accessToken: any

  personStore.subscribe((newValue: number) => {
    user = newValue
  })

  const getStatus = async () => {
    const response = await fetch(`${apiUrl}/connection/status`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: accessToken
      },
      body: JSON.stringify({
        person: user._id
      })
    })

    const data = await response.json()

    if (data !== null) {
      connection = data.status
    }
  }

  getStatus()

  const sendFriendRequest = async () => {
    const response = await fetch(`${apiUrl}/connection`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: accessToken
      },
      body: JSON.stringify({
        person: user._id
      })
    })

    const data = await response.json()

    if (data !== null) {
      connection = 'waiting'
    }
  }

  const acceptFriendRequest = async () => {
    const response = await fetch(`${apiUrl}/connection`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        Authorization: accessToken
      },
      body: JSON.stringify({
        person: user._id
      })
    })

    const data = await response.json()

    if (data !== null) {
      connection = 'connected'
    }
  }

  const deleteFriend = async () => {
    const response = await fetch(`${apiUrl}/connection`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        Authorization: accessToken
      },
      body: JSON.stringify({
        person: user._id
      })
    })

    const data = await response.json()

    if (data !== null) {
      connection = null
    }
  }

</script>

<div>
  <img src={ user.photoUrl } alt={ user.displayName } />
  <h2>{ user.displayName }</h2>
  {#if user.favProgLang === 'js'}
    <img style="width:20px; height:20px; filter: invert(1); margin-top: 2px;" src="https://simpleicons.org/icons/javascript.svg" alt={ user.favProgLang } />
  {:else}
    <img style="width:20px; height:20px; filter: invert(1); margin-top: 2px;" src={ 'https://simpleicons.org/icons/' + user.favProgLang.toLowerCase() + '.svg' } alt={ user.favProgLang } />
  {/if}
  <br />
  <p style="white-space: pre-line">{ user.bio }</p>
  <br />
  <a style="display: inline-block; margin-bottom: 10px;" href={ user.blog }>{ user.blog }</a>
  <br />
  {#if connection === null}
    <button on:click={() => sendFriendRequest()}>Send Friend Request</button>
  {:else if connection === 'pending'}
    <button on:click={() => acceptFriendRequest()}>Accept Friend Request</button>
  {:else if connection === 'waiting'}
    <button>Waiting Response</button>
  {:else}
    <button on:click={() => deleteFriend()}>Delete Friend</button>
  {/if}
</div>