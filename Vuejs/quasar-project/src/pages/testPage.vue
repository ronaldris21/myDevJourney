<template>
  <q-page>
    <q-card>
      <q-card-section>
        <div><q-btn @click="Clickme" label="Init" /></div>
        <div class="q-pa-md q-gutter-sm">
          <q-btn color="white" text-color="black" label="Standard" />
          <q-btn color="primary" label="Primary" />
          <q-btn color="secondary" label="Secondary" />
          <q-btn color="amber" glossy label="Amber" />
          <q-btn color="brown-5" label="Brown 5" />
          <q-btn color="deep-orange" glossy label="Deep Orange" />
          <q-btn color="purple" label="Purple" />
          <q-btn color="black" label="Black" />
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

const props = defineProps({
  courseId: String,
});

onMounted(() => {
  console.log(props.courseId);
  console.log('Welcome Aboard! This is Volaris');
});

var Clickme = function () {
  alert('Nice');
};
</script>
