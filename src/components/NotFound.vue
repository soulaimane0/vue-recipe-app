<template>
  <section
    class="mx-auto w-full px-2.5 md:px-20 max-w-screen-xl min-h-[85vh] grid lg:grid-cols-2 items-center"
  >
    <!-- Content for 404 page -->
    <div class="order-last lg:order-first flex justify-center lg:justify-start">
      <div>
        <h6 class="font-bold text-primary">404</h6>
        <h1 class="font-bold text-5xl text-gray-900 mt-3 mb-6">Page not found</h1>
        <p class="font-semibold text-gray-500">
          Sorry, the page you are looking for doesn't exist.
          <br />You can go back to the homepage.
        </p>

        <!-- Button to go back home -->
        <div class="flex space-x-2 mt-12">
          <RouterLink to="/">
            <button
              class="bg-violet-500 text-white rounded-md px-4 py-2 hover:bg-violet-600 transition-colors duration-300"
            >
              Take me home
            </button>
          </RouterLink>
        </div>
      </div>
    </div>

    <!-- Image for 404 page -->
    <div class="order-first lg:order-last flex justify-center lg:justify-end">
      <img
        src="/src/assets/images/not-found.svg"
        alt="not found cloud"
        class="max-w-[300px] max-h-[170px] lg:max-w-[400px] lg:max-h-[270px]"
      />
    </div>
  </section>
</template>
