<script lang="ts">
  import { userStore, page } from '../store'
  import type { User } from "../types"

  export let user: User
  export let accessToken: any

  let displayName = user.displayName
  let favProgLang = user.favProgLang
  let bio = user.bio
  let blog = user.blog

  const saveSettings = async () => {
    const data = {
      displayName: displayName,
      favProgLang: favProgLang,
      bio: bio,
      blog: blog
    }
    const response = await fetch(`${apiUrl}/user`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        Authorization: accessToken
      },
      body: JSON.stringify(data)
    })

    const result = await response.json()
    if (result.user && result.user !== null) {
      userStore.set(result.user)
      page.set(0)
    }
  }
</script>

<div>
  <h2>Settings</h2>

  <div class="form-group">
    <label for="name">Display Name</label>
    <input bind:value={displayName} id="name" />
  </div>

  <div class="form-group">
    <label for="progLang">Favorite Programming Language</label>
    <select id="progLang" bind:value={ favProgLang }>
      <option value="html5" disabled>HTML</option>
      <option value="js">Javascript</option>
      <option value="php">PHP</option>
      <option value="java">Java</option>
      <option value="dart">Dart</option>
      <option value="c">C</option>
      <option value="cSharp">C#</option>
      <option value="cPlusPlus">C++</option>
      <option value="ruby">Ruby</option>
      <option value="go">Go</option>
      <option value="python">Python</option>
      <option value="haskell">Haskell</option>
      <option value="elixir">Elixir</option>
      <option value="fortran">Fortran</option>
      <option value="scala">Scala</option>
      <option value="kotlin">Kotlin</option>
      <option value="r">R</option>
      <option value="rust">Rust</option>
    </select>
  </div>

  <div class="form-group">
    <label for="bio">Bio</label>
    <textarea id="bio" bind:value={ bio }></textarea>
  </div>

  <div class="form-group">
    <label for="blog">Website</label>
    <input id="blog" bind:value={ blog } />
  </div>

  <button on:click={() => saveSettings()}>Save</button>
</div>