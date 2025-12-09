<template>
  <UApp>
    <header
      class="dark:text-old-neutral-50 text-old-neutral-950 text-4xl font-bold font-serif h-20 w-full border-b border-old-neutral-950 dark:border-old-neutral-50 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
    >
      <RouterLink to="/" class="hover:text-primary">Blog Posts</RouterLink>
    </header>
    <main class="pt-30">
      <RouterView />
    </main>
  </UApp>
</template>
