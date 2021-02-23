<script lang="ts">
  import type { User } from "../types";

  export let user: User
</script>

<div>
  <img src={ user.photoUrl } alt={ user.displayName } />
  <img src={ '../../media/' + user.photoUrl + '.svg' } alt={ user.favProgLang } />
  <div>{ user.displayName }</div>
</div>