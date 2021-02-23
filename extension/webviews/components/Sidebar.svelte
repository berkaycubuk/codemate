<script lang="ts">
  import { onMount } from 'svelte'
  import Header from './Header.svelte'
  import Profile from './Profile.svelte'
  import Person from './Person.svelte'
  import People from './People.svelte'
  import Friends from './Friends.svelte'
  import Settings from './Settings.svelte'
  import type { User } from '../types';
  import { page, userStore } from '../store'

  let accessToken = ''
  let user: User | any = null
  let users = <any>[]
  let friends = <any>[]
  let loading = true
  let pageNum = 0

  userStore.subscribe((newValue: User) => {
    user = newValue
  })

  page.subscribe((newValue: number) => {
    pageNum = newValue
  })

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
          if (data !== null) {
            userStore.set(data.user)
            // loading = false
          } else {
            console.log('error')
            // loading = false
          }

          const response2 = await fetch(`${apiUrl}/people`, {
            headers: {
              Authorization: accessToken
            }
          })
          let data2 = await response2.json()
          if (data2 !== null) {
            users = data2.users
          } else {
            console.log('error')
          }

          const response3 = await fetch(`${apiUrl}/connection/all`, {
            headers: {
              Authorization: accessToken
            }
          })
          let data3 = await response3.json()
          if (data3 !== null) {
            friends = data3.users
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
    <Header />
    {#if pageNum == 0}
      <Profile user={user} />
      <br />
      <button on:click={() => {
        accessToken = ''
        user = null
        tsvscode.postMessage({ type: 'logout', value: undefined })
      }}>Logout</button>
    {:else if pageNum == 1}
      <People users={users} />
    {:else if pageNum == 2}
      <Friends users={friends} />
    {:else if pageNum == 3}
      <Person accessToken={accessToken} />
    {:else}
      <Settings user={user} accessToken={accessToken} />
    {/if}
  {:else}
    <p>Welcome to Codemate!<br/>Please login.</p>
    <br />
    <button on:click={() => {
      tsvscode.postMessage({ type: 'authenticate', value: undefined })
    }}>Login with Github</button>
  {/if}
  <a style="display: block; width: fit-content; margin: 10px auto;" href="https://github.com/berkaycubuk/codemate/issues">Bug report</a>
</div>