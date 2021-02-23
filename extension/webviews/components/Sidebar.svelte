<script lang="ts">
  import { onMount } from 'svelte'
  import Header from './Header.svelte'
  import type { User } from '../types';

  let accessToken = ''
  let user: User | any = null
  let loading = true

  onMount(async () => {
    window.addEventListener('message', async (event) => {
      const message = event.data
      switch(message.type) {
        case 'token':
          accessToken = message.value
          const response = await fetch(`${apiUrl}/user`, {
            headers: {
              Authorization: accessToken
            }
          })
          let data = await response.json()
          if (data.json !== null) {
            user = data.user
            loading = false
          } else {
            console.log('error')
            loading = false
          }
      }
    })

    tsvscode.postMessage({ type: 'get-token', value: undefined })
  })
</script>

<!-- svelte-ignore missing-declaration -->
<div>
  {#if loading}
    <div>loading...</div>
  {:else if user}
    <Header user={user} />
    <br />
    <button on:click={() => {
      accessToken = ''
      user = null
      tsvscode.postMessage({ type: 'logout', value: undefined })
    }}>Logout</button>
  {:else}
    <p>Welcome to Codemate!<br/>Please login.</p>
    <br />
    <button on:click={() => {
      tsvscode.postMessage({ type: 'authenticate', value: undefined })
    }}>Login with Github</button>
  {/if}
</div>