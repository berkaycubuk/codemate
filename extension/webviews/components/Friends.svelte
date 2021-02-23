<script lang="ts">
  import { personStore, page } from '../store'
  import type { User } from "../types";

  export let users: User[]

  const goProfile = (user: User) => {
    personStore.set(user)
    page.set(3)
  }
</script>

<div>
  {#each users as user}
    <div class="user" on:click={() => goProfile(user)}>
      <img src={ user.photoUrl } alt={ user.displayName } />
      <div class="user-info">
        <h3>{ user.displayName }</h3>
        {#if user.favProgLang === 'js'}
          <img style="width:20px; height:20px; filter: invert(1); margin-top: 2px;" src="https://simpleicons.org/icons/javascript.svg" alt={ user.favProgLang } />
        {:else}
          <img style="width:20px; height:20px; filter: invert(1); margin-top: 2px;" src={ 'https://simpleicons.org/icons/' + user.favProgLang.toLowerCase() + '.svg' } alt={ user.favProgLang } />
        {/if}
      </div>
    </div>
  {/each}
</div>