<script lang="ts">
  import type { User } from "../types";

  export let user: User
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
  <a href={ user.blog }>{ user.blog }</a>
</div>