<script setup lang="ts">
import { ref } from 'vue'
import { MainLayout } from '@/shared/ui/layouts/main-layout'
import { RouterView } from 'vue-router'
import { Toaster } from '@/shared/ui/sonner'
import Loader from '@/widgets/loader'
import { SidebarProvider, SidebarTrigger } from '@/shared/ui/sidebar'
import { AppSidebar } from '@/widgets/sidebar'
import { isAuthenticated } from './auth/auth'
import { AppNavbar } from '@/widgets/navbar'
import { TooltipProvider } from '@/shared/ui/tooltip'

const isLoading = ref(false)
const setLoading = (value: boolean) => (isLoading.value = value)
</script>

<template>
  <TooltipProvider :delay-duration="400">
    <SidebarProvider>
      <AppSidebar />
      <Loader v-if="isLoading" />
      <Toaster
        theme="system"
        position="bottom-right"
        :expand="false"
        :close-button="false"
      />
      <SidebarTrigger />
      <div class="app">
        <MainLayout>
          <!-- <template #logo>
          <div class="app__links">
            <a
              href="https://github.com/simpledeadly/Focuseek"
              target="_blank"
            >
              <img
                src="@/shared/assets/logo_dark.png"
                class="app__logo"
                alt="logo"
              />
            </a>
          </div>
        </template> -->
          <template
            v-if="isAuthenticated()"
            #nav
          >
            <AppNavbar />
          </template>
          <template #main>
            <RouterView
              class="app__main"
              @loading="(value: boolean) => setLoading(value)"
            />
          </template>
        </MainLayout>
      </div>
    </SidebarProvider>
  </TooltipProvider>
</template>

<style lang="scss">
.app {
  width: 100%;
  padding-top: 1rem;

  &__logo {
    width: 88px;
    margin: 0 auto;
  }

  &__links {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__icons {
    display: flex;
  }

  .icon {
    margin-left: 0.5rem;
    color: hsl(var(--muted-foreground));
    cursor: pointer;
    opacity: 0.5;
    transition: 0.05s;

    &:hover {
      color: hsl(var(--foreground));
      opacity: 1;
    }
  }

  &__main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
}

.toast {
  background: hsl(var(--primary-foreground));
  border: 1px solid hsl(var(--border));
}
</style>
