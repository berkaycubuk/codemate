<script lang="ts">
  import { page } from '../store'
</script>

<div>
  <button class="button" on:click={() => page.set(0)}>Profile</button>
  <button class="button" on:click={() => page.set(1)}>People</button>
  <button class="button" on:click={() => page.set(2)}>Friends</button>
  <button class="button" on:click={() => page.set(4)}>Settings</button>
</div>